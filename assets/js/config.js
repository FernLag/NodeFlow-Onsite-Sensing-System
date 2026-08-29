/* ============================================================
   NodeFlow (On-site) site configuration
   ------------------------------------------------------------
   Everything here is PUBLIC. This file is served to every visitor
   and is readable by anyone. Never put an API key, token, password
   or private URL in it. See docs/SECURITY.md.

   This file is loaded by index.html and imported by sw.js, so the
   page and the service worker always agree on the endpoint.
   ============================================================ */

(function (root) {
  "use strict";

  var CONFIG = {
    /* Public site address. Used for canonical links and sharing. */
    siteUrl: "https://fernlag.github.io/NodeFlow-Onsite-Sensing-System/",

    /* ---- Contact -------------------------------------------------
       REPLACE BEFORE PUBLISHING. While this is left as the sample
       value the site prints "contact details coming soon" instead of
       a broken mailto link, so nothing invented is shown to visitors. */
    contactEmail: "REPLACE-ME@example.org",
    contactName: "The NodeFlow project team",

    /* ---- Research submission endpoint -----------------------------
       The Google Apps Script web app that records form submissions.
       A public endpoint by necessity: this is a static site with no
       server of its own, so the address cannot be hidden. It is not a
       credential. Protect it in the Apps Script itself (origin check,
       per-email rate limit, payload size cap). See
       server/apps-script/Code.gs. */
    submitEndpoint:
      "https://script.google.com/macros/s/AKfycbzBDJalu2LdNU2UC-ySZJlxW5dh_3Djhq73sBU4JycPbOGjfBLdSuepAJs9jiIKUH1uUw/exec",

    /* ---- Client-side rate limits ---------------------------------
       A first line of defence only. The server must enforce its own;
       anything in the browser can be bypassed. */
    limits: {
      minSubmitIntervalMs: 5000, // no two submissions closer than this
      maxSubmitsPerHour: 20, // per browser
      maxPayloadBytes: 64 * 1024, // reject anything larger
      maxQueuedSubmissions: 50, // offline queue ceiling
      maxTextFieldLength: 200, // name, email, country, filename
      maxCommentLength: 500, // free-text comment
      maxSensorBlocks: 24, // form ceiling
    },

    /* ---- Analytics ------------------------------------------------
       Cookieless and consent-gated. Nothing is sent until a visitor
       answers Yes on the banner, and nothing at all is sent while
       `endpoint` is empty (the default). No personal data, no cookies,
       no third-party script. */
    analytics: {
      endpoint: "", // e.g. your own collector; empty = analytics off
      siteId: "nodeflow-onsite",
    },
  };

  if (typeof module === "object" && module.exports) module.exports = CONFIG;
  root.NODEFLOW_CONFIG = CONFIG;
})(typeof self !== "undefined" ? self : this);
