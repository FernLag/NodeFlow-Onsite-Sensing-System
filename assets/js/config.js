/*
   NodeFlow (on-site) site configuration
   everything here is PUBLIC. this file is served to every visitor
   and is readable by anyone. never put an API key, token, password
   or private URL in it. see docs/SECURITY.md.

   this file is loaded by index.html and imported by sw.js, so the
   page and the service worker always agree on the endpoint.
    */

(function (root) {
  "use strict";

  var CONFIG = {
    /* public site address. used for canonical links and sharing. */
    siteUrl: "https://fernlag.github.io/NodeFlow-Onsite-Sensing-System/",

    /*
 ---- contact
       REPLACE BEFORE PUBLISHING. while this is left as the sample
       value the site prints "contact details coming soon" instead of
       a broken mailto link, so nothing invented is shown to visitors.
                  */
    contactEmail: "REPLACE-ME@example.org",
    contactName: "The NodeFlow project team",

    /*
 ---- research submission endpoint
       the Google Apps Script web app that records form submissions.
       a public endpoint by necessity: this is a static site with no
       server of its own, so the address cannot be hidden. it is not a
       credential. protect it in the Apps Script itself (origin check,
       per-email rate limit, payload size cap). see
       server/apps-script/Code.gs.
        */
    submitEndpoint:
      "https://script.google.com/macros/s/AKfycbzBDJalu2LdNU2UC-ySZJlxW5dh_3Djhq73sBU4JycPbOGjfBLdSuepAJs9jiIKUH1uUw/exec",

    /*
 ---- client-side rate limits
       a first line of defence only. the server must enforce its own;
       anything in the browser can be bypassed.
              */
    limits: {
      minSubmitIntervalMs: 5000, // no two submissions closer than this
      maxSubmitsPerHour: 20, // per browser
      maxPayloadBytes: 64 * 1024, // reject anything larger
      maxQueuedSubmissions: 50, // offline queue ceiling
      maxTextFieldLength: 200, // name, email, country, filename
      maxCommentLength: 500, // free-text comment
      maxSensorBlocks: 24, // form ceiling
    },

    /*
 ---- analytics
       cookieless and consent-gated. nothing is sent until a visitor
       answers yes on the banner, and nothing at all is sent while
       `endpoint` is empty (the default). no personal data, no cookies,
       no third-party script.
          */
    analytics: {
      endpoint: "", // e.g. your own collector; empty = analytics off
      siteId: "nodeflow-onsite",
    },
  };

  if (typeof module === "object" && module.exports) module.exports = CONFIG;
  root.NODEFLOW_CONFIG = CONFIG;
})(typeof self !== "undefined" ? self : this);
