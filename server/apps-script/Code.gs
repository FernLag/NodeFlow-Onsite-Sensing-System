/*
*
 * NodeFlow (on-site) submission endpoint
 * Google Apps Script web app that writes one row per generated file
 * into the project spreadsheet.
 *
 * this is the ONLY endpoint the site talks to, and it is the only
 * place where limits can actually be enforced. everything the browser
 * does (length caps, rate limiting, payload size) is a courtesy: a
 * person with a console can skip all of it. treat every field below
 * as hostile input.
 *
 * DEPLOY
 *   1. open the project spreadsheet, extensions > Apps Script.
 *   2. paste this file over Code.gs.
 *   3. set SHEET_ID below to the spreadsheet id, or leave it empty to
 *      use the spreadsheet the script is bound to.
 *   4. deploy > new deployment > web app.
 *        execute as:      me
 *        who has access:  anyone
 *      "anyone" is required for a browser to POST to it. access to the
 *      spreadsheet itself is unaffected and stays private.
 *   5. copy the /exec URL into assets/js/config.js as submitEndpoint.
 *
 * NEVER put an API key, token or password in this file. it is not a
 * secret store, and the repository is public.
 */

/** empty means: the spreadsheet this script is bound to. */
var SHEET_ID = "";
var SHEET_NAME = "submissions";

/** fields accepted from the page. anything else in the body is dropped. */
var FIELDS = [
  "timestamp",
  "name",
  "email",
  "country",
  "filename",
  "ino_comment",
  "variables",
];

var LIMITS = {
  maxBodyBytes: 64 * 1024, // reject anything larger outright
  maxFieldLength: 8000, // per field, after trimming
  maxShortFieldLength: 200, // name, email, country, filename
  perIdentityPerHour: 20, // rows accepted per email per hour
  globalPerMinute: 60, // total rows accepted per minute
};

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return reply(400, "empty request");
    }
    if (e.postData.contents.length > LIMITS.maxBodyBytes) {
      return reply(413, "payload too large");
    }

    var raw;
    try {
      raw = JSON.parse(e.postData.contents);
    } catch (err) {
      return reply(400, "malformed json");
    }
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      return reply(400, "unexpected shape");
    }

    var row = sanitize(raw);
    if (!row.email || !isEmailShaped(row.email)) {
      return reply(400, "invalid email");
    }
    if (!row.name) {
      return reply(400, "missing name");
    }

    var limited = rateLimited(row.email);
    if (limited) {
      return reply(429, limited);
    }

    append(row);
    return reply(200, "ok");
  } catch (err) {
    // never echo the exception back: it can leak sheet names and ids.
    console.error(err);
    return reply(500, "server error");
  }
}

/** GET exists only so the deployment can be health-checked. */
function doGet() {
  return reply(200, "ok");
}

/* */

function sanitize(raw) {
  var out = {};
  var short = { name: 1, email: 1, country: 1, filename: 1 };

  FIELDS.forEach(function (key) {
    var value = raw[key];
    if (value === null || value === undefined) {
      out[key] = "";
      return;
    }
    if (typeof value === "object") {
      out[key] = ""; // no nested structures are expected in any field
      return;
    }
    var cap = short[key] ? LIMITS.maxShortFieldLength : LIMITS.maxFieldLength;
    out[key] = String(value)
      .replace(/[\u0000-\u001F\u007F]/g, " ")
      .trim()
      .slice(0, cap);
  });

  // the page's timestamp is a claim, not a fact. keep it, but record ours too.
  out.received_at = new Date().toISOString();
  return out;
}

function isEmailShaped(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/*
*
 * Rate limiting.
 *
 * Apps Script has no request context to key on beyond what the body
 * carries, so this limits per submitted email plus a global ceiling.
 * counters live in the script cache, which expires on its own.
 */
function rateLimited(email) {
  var cache = CacheService.getScriptCache();
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(5000);
  } catch (err) {
    return "busy, try again";
  }

  try {
    var globalKey = "rl_global_" + Math.floor(Date.now() / 60000);
    var globalCount = Number(cache.get(globalKey) || 0) + 1;
    cache.put(globalKey, String(globalCount), 120);
    if (globalCount > LIMITS.globalPerMinute) {
      return "too many requests";
    }

    var idKey =
      "rl_" +
      Utilities.base64EncodeWebSafe(
        Utilities.computeDigest(
          Utilities.DigestAlgorithm.SHA_256,
          email.toLowerCase(),
        ),
      ).slice(0, 24);
    var count = Number(cache.get(idKey) || 0) + 1;
    cache.put(idKey, String(count), 3600);
    if (count > LIMITS.perIdentityPerHour) {
      return "hourly limit reached";
    }
    return "";
  } finally {
    lock.releaseLock();
  }
}

function append(row) {
  var book = SHEET_ID
    ? SpreadsheetApp.openById(SHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  var sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
    sheet.appendRow(FIELDS.concat(["received_at"]));
  }

  var values = FIELDS.map(function (key) {
    return neutralize(row[key]);
  });
  values.push(row.received_at);
  sheet.appendRow(values);
}

/*
*
 * a cell beginning with = + - or @ is treated as a formula when the sheet
 * is opened or exported. prefixing an apostrophe keeps a submitted value
 * text, which is what stops a submission from running as a formula in
 * someone else's spreadsheet.
 */
function neutralize(value) {
  var text = String(value === null || value === undefined ? "" : value);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function reply(status, message) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: status, message: message }),
  ).setMimeType(ContentService.MimeType.JSON);
}
