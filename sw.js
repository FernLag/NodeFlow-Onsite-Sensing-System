/* ============================================================
   sw.js: offline shell and the queue for submissions made while
   the visitor had no connection.

   MUST stay at the repository root: a service worker can only
   control pages at or below its own path.

   Bump CACHE_NAME on every deploy. Without it, people who have
   already visited keep the old files.
   ============================================================ */

importScripts("assets/js/config.js");

const CACHE_NAME = "nodeflow-cache-v6";

const CFG = self.NODEFLOW_CONFIG || {};
const LIMITS = Object.assign(
  { maxPayloadBytes: 64 * 1024, maxQueuedSubmissions: 50 },
  CFG.limits || {},
);
const SUBMIT_ENDPOINT = CFG.submitEndpoint || "";

const APP_SHELL = [
  "./",
  "./index.html",
  "./privacy.html",
  "./terms.html",
  "./thank-you.html",
  "./404.html",
  "./site.webmanifest",
  "./favicon.ico",
  "./assets/css/styles.css",
  "./assets/js/config.js",
  "./assets/js/main.js",
  "./assets/js/site.js",
  "./assets/img/nodeflow-logo.png",
  "./assets/img/ucanr-logo.png",
  "./assets/img/ucsc-logo.png",
  "./assets/img/favicon-32.png",
  "./assets/img/favicon-16.png",
  "./assets/img/apple-touch-icon.png",
  "./assets/docs/consent.pdf",
];

const DB_NAME = "nodeflow-queue";
const STORE = "submissions";

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE, {
        keyPath: "id",
        autoIncrement: true,
      });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function getAllSubmissions() {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readonly");
        const req = tx.objectStore(STORE).getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      }),
  );
}

function deleteSubmission(id) {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      }),
  );
}

/* Only the fields the spreadsheet expects survive the trip through the queue.
   Anything else in the body is dropped, so a malformed or padded payload
   cannot be parked in storage and replayed later. */
const ALLOWED_FIELDS = [
  "timestamp",
  "name",
  "email",
  "country",
  "filename",
  "ino_comment",
  "variables",
];

function sanitizePayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }
  const clean = {};
  for (const key of ALLOWED_FIELDS) {
    const value = payload[key];
    if (typeof value === "string") {
      clean[key] = value.slice(0, 8000);
    } else if (value != null) {
      clean[key] = String(value).slice(0, 8000);
    }
  }
  const size = new TextEncoder().encode(JSON.stringify(clean)).length;
  if (size > LIMITS.maxPayloadBytes) return null;
  return clean;
}

async function queueSubmission(payload) {
  const clean = sanitizePayload(payload);
  if (!clean) return;

  const existing = await getAllSubmissions();
  /* A queue with no ceiling is somewhere to dump data. Drop the oldest
     entries rather than growing without limit. */
  const overflow = existing.length - (LIMITS.maxQueuedSubmissions - 1);
  for (let i = 0; i < overflow; i++) {
    await deleteSubmission(existing[i].id);
  }

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).add({ payload: clean, ts: Date.now() });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function flushQueue() {
  if (!SUBMIT_ENDPOINT) return;
  const items = await getAllSubmissions();
  for (const item of items) {
    const clean = sanitizePayload(item.payload);
    if (!clean) {
      await deleteSubmission(item.id);
      continue;
    }
    try {
      await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(clean),
      });
      await deleteSubmission(item.id);
    } catch (_) {
      break; /* still offline: leave the rest for the next attempt */
    }
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.allSettled(APP_SHELL.map((url) => cache.add(url))),
      ),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  /* Submissions: try the network, park the body locally if it fails. */
  if (SUBMIT_ENDPOINT && request.url.startsWith(SUBMIT_ENDPOINT)) {
    event.respondWith(
      fetch(request.clone()).catch(async () => {
        try {
          const payload = await request.clone().json();
          await queueSubmission(payload);
        } catch (_) {}
        return new Response(JSON.stringify({ queued: true }), {
          headers: { "Content-Type": "application/json" },
        });
      }),
    );
    return;
  }

  if (request.method !== "GET") return;

  /* Only this origin is cached. A cross-origin response is passed straight
     through so nothing third-party is stored under our own cache. */
  if (new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((resp) => {
          if (resp.ok && resp.type === "basic") {
            const copy = resp.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return resp;
        })
        .catch(async () => {
          if (cached) return cached;
          const fallback = await caches.match("./404.html");
          return (
            fallback ||
            new Response("Offline, and this page has not been cached yet.", {
              status: 503,
              headers: { "Content-Type": "text/plain;charset=utf-8" },
            })
          );
        });
    }),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "flush-queue") {
    event.waitUntil(flushQueue());
  }
  if (event.data === "skip-waiting") {
    self.skipWaiting();
  }
});

self.addEventListener("sync", (event) => {
  if (event.tag === "flush-queue") {
    event.waitUntil(flushQueue());
  }
});
