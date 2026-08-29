/* ============================================================
   site.js — page furniture that is not the code generator itself:
   service worker registration, offline notice, consent banner,
   the sticky action bar, contact details and the visit counter.

   Loaded on every page. main.js is only loaded on the generator.
   ============================================================ */

(function () {
  "use strict";

  var CFG = self.NODEFLOW_CONFIG || {};
  var byId = function (id) {
    return document.getElementById(id);
  };

  /* ---------- contact details ---------------------------------------
     config.js ships with a sample address. Until it is replaced the
     page says so rather than printing a mailto link that bounces. */
  function renderContact() {
    var slots = document.querySelectorAll(".contact-slot");
    if (!slots.length) return;
    var email = (CFG.contactEmail || "").trim();
    var usable = email && email.indexOf("@") > 0 && !/example\.org$/i.test(email);
    slots.forEach(function (slot) {
      if (!usable) {
        slot.textContent = "Contact details coming soon.";
        return;
      }
      var who = document.createElement("span");
      who.textContent = (CFG.contactName || "The project team") + " — ";
      var a = document.createElement("a");
      a.href = "mailto:" + email;
      a.textContent = email;
      slot.textContent = "";
      slot.appendChild(who);
      slot.appendChild(a);
    });
  }

  /* ---------- footer year ---------- */
  function renderYear() {
    var y = byId("foot-year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* ---------- consent + cookieless visit counting -------------------
     Nothing is sent unless the visitor says yes AND an endpoint is
     configured. The answer lives in localStorage, not a cookie. */
  var CONSENT_KEY = "nodeflow_consent_v1";

  function readConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (_) {
      return null;
    }
  }

  function writeConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (_) {}
  }

  function countVisit() {
    var a = CFG.analytics || {};
    if (!a.endpoint) return; /* analytics off until an endpoint is set */
    try {
      var body = JSON.stringify({
        site: a.siteId || "nodeflow",
        path: location.pathname,
        ref: document.referrer ? new URL(document.referrer).origin : "",
        ts: new Date().toISOString(),
      });
      if (body.length > 2048) return;
      fetch(a.endpoint, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        body: body,
      }).catch(function () {});
    } catch (_) {}
  }

  function initConsent() {
    var bar = byId("consent-bar");
    var answer = readConsent();

    if (answer === "yes") {
      countVisit();
      return;
    }
    if (answer === "no" || !bar) return;

    bar.hidden = false;
    document.body.classList.add("consent-open");
    var yes = byId("consent-yes");
    var no = byId("consent-no");
    if (yes)
      yes.addEventListener("click", function () {
        writeConsent("yes");
        bar.hidden = true;
        document.body.classList.remove("consent-open");
        countVisit();
      });
    if (no)
      no.addEventListener("click", function () {
        writeConsent("no");
        bar.hidden = true;
        document.body.classList.remove("consent-open");
      });
  }

  /* ---------- sticky action bar (small screens) --------------------
     Appears once the form itself has been reached, and stands down
     whenever the real generate button is on screen: two buttons doing the
     same job in view at once is just noise. */
  function initStickyCta() {
    var bar = byId("sticky-cta");
    var form = byId("sensors-list");
    var genBtn = byId("gen-btn");
    if (!bar || !form || !("IntersectionObserver" in window)) return;

    var reachedForm = false;
    var genVisible = true;

    var update = function () {
      bar.hidden = !reachedForm || genVisible;
    };

    new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) reachedForm = true;
        });
        update();
      },
      { rootMargin: "0px 0px -30% 0px" },
    ).observe(form);

    if (genBtn) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          genVisible = e.isIntersecting;
        });
        update();
      }).observe(genBtn);
    } else {
      genVisible = false;
    }

    update();
  }

  /* ---------- consent checkbox in the download dialog ---------- */
  function initSurveyConsent() {
    var cb = byId("consent-checkbox");
    var btn = byId("confirm-btn");
    if (!cb || !btn) return;
    cb.addEventListener("change", function () {
      btn.disabled = !cb.checked;
    });
  }

  /* ---------- offline notice ---------- */
  function updateOnlineStatus() {
    var bar = byId("offline-bar");
    document.body.classList.toggle("is-offline", !navigator.onLine);
    if (!navigator.onLine) {
      if (!bar) {
        bar = document.createElement("div");
        bar.id = "offline-bar";
        bar.setAttribute("role", "status");
        bar.textContent =
          "You are offline. The form still works and your file will download. Research information is sent when you reconnect.";
        document.body.appendChild(bar);
      }
    } else if (bar) {
      bar.remove();
    }
  }

  /* ---------- service worker ---------- */
  var IS_LOCAL =
    ["localhost", "127.0.0.1", "::1", ""].indexOf(location.hostname) !== -1 ||
    location.protocol === "file:";

  var updateRequested = false;

  function initServiceWorker() {
    if (!("serviceWorker" in navigator)) return;

    if (IS_LOCAL) {
      navigator.serviceWorker.getRegistrations().then(function (rs) {
        rs.forEach(function (r) {
          r.unregister();
        });
      });
      if (window.caches)
        caches.keys().then(function (ks) {
          ks.forEach(function (k) {
            caches.delete(k);
          });
        });
      console.info(
        "[NodeFlow] localhost detected - service worker disabled for development.",
      );
      return;
    }

    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("sw.js")
        .then(function (reg) {
          var flush = function () {
            if (navigator.serviceWorker.controller) {
              navigator.serviceWorker.controller.postMessage("flush-queue");
            }
            if (reg.sync) reg.sync.register("flush-queue").catch(function () {});
          };
          window.addEventListener("online", flush);
          if (navigator.onLine) flush();

          function showUpdateBar(worker) {
            if (byId("update-bar")) return;
            var bar = document.createElement("div");
            bar.id = "update-bar";
            bar.setAttribute("role", "status");

            var msg = document.createElement("span");
            msg.textContent = "A new version of this page is available.";
            var btn = document.createElement("button");
            btn.id = "update-btn";
            btn.type = "button";
            btn.textContent = "Refresh";
            btn.addEventListener("click", function () {
              updateRequested = true;
              worker.postMessage("skip-waiting");
            });

            bar.appendChild(msg);
            bar.appendChild(btn);
            document.body.appendChild(bar);
          }

          if (reg.waiting) showUpdateBar(reg.waiting);

          reg.addEventListener("updatefound", function () {
            var nw = reg.installing;
            if (!nw) return;
            nw.addEventListener("statechange", function () {
              if (
                nw.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                showUpdateBar(nw);
              }
            });
          });
        })
        .catch(function () {});

      navigator.serviceWorker.addEventListener("controllerchange", function () {
        if (!updateRequested) return;
        updateRequested = false;
        window.location.reload();
      });
    });
  }

  /* ---------- go ---------- */
  renderContact();
  renderYear();
  initConsent();
  initStickyCta();
  initSurveyConsent();
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  updateOnlineStatus();
  initServiceWorker();
})();
