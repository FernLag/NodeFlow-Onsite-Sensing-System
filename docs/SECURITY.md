# Security notes and audit

Last reviewed: 29 August 2026, against the state of the repository on the
`site-restructure` branch.

## The shape of the thing

This is a static site. There is no application server, no database, no session
and no login. The sketch is assembled in the visitor's own browser and never
leaves it except as a file they download.

That removes most of the usual attack surface and concentrates what remains in
three places:

1. The one outbound endpoint, a Google Apps Script web app that appends a row
   to the project spreadsheet.
2. Data the page writes to, and later reads back from, the visitor's own
   browser storage.
3. The generated `.ino` text, which is code that a person then compiles and
   runs on hardware.

## Rules for this repository

- **No secrets, ever.** Nothing here needs an API key, a token or a password.
  Anything committed to this repository is public, and anything shipped to a
  browser is public even if the repository is private. `.gitignore` blocks
  `.env`, `*.pem` and `*.key` as a backstop, not as permission to try.
- **One place for configuration.** Endpoints, limits and contact details live
  in `assets/js/config.js`. It is served to every visitor, so it holds only
  values that are safe in public.
- **The browser's checks are a courtesy.** Length caps, rate limits and payload
  size checks in `main.js` and `sw.js` improve behaviour for ordinary users.
  They stop nobody who opens a console. Every one of them is repeated in
  `server/apps-script/Code.gs`, which is where they are actually enforced.

## Audit findings

### Fixed in this change

**Stored markup executed when read back (severity: medium).** `renderSavedBanner`,
`renderSavedConfigs` and `openFilenamePrompt` interpolated names and file names
straight into `innerHTML`. A name containing `<img src=x onerror=...>` ran the
moment the page was reopened, and the value survived in `localStorage`, so it
ran on every later visit. The reach was the visitor's own browser, but the
value passed through a form and back out of storage, which is exactly the path
a stored injection takes. Every such value now goes through `escapeHtml`, and
values interpolated into inline handlers go through `escapeJsString`.

**Comment breakout in the generated sketch (severity: medium).** The header of
the generated `.ino` is one C block comment holding the name, country and free
text note. A closing comment marker in any of those fields ended the header
early and everything after it became code the grower would then compile and
upload. `commentSafe` now breaks up both comment markers and flattens line
breaks.

**No limits on what could be submitted (severity: medium).** The page accepted
free text of any length, an email of any shape, and any number of sensor
blocks, then posted the lot. `cleanText`, `cleanFilename`, `isEmailShaped` and
a 64 KB payload ceiling now apply before anything is sent, the form is capped
at 24 sensor blocks, and the payload is rebuilt field by field from a fixed
list rather than forwarded as assembled.

**No rate limiting anywhere (severity: medium).** Nothing stopped a loop from
filling the spreadsheet. The browser now refuses submissions closer than five
seconds apart and more than twenty in an hour, and
`server/apps-script/Code.gs` enforces a per-email hourly limit and a global
per-minute ceiling with a script lock, which is the limit that actually counts.

**Formula injection into the spreadsheet (severity: medium).** A field
beginning with `=`, `+`, `-` or `@` is evaluated as a formula when the sheet is
opened or exported, so a submission could run in a team member's spreadsheet.
`Code.gs` prefixes such values with an apostrophe before writing the row.

**Unbounded offline queue (severity: low).** The IndexedDB queue in the service
worker grew without limit and stored whatever JSON it was handed. It is now
capped at 50 entries, oldest dropped first, and each payload is reduced to the
seven expected string fields and size-checked before it is stored or replayed.

**Service worker cached responses from any origin (severity: low).** The old
fetch handler cached every successful GET, including cross-origin responses.
It now passes cross-origin requests straight through and stores only basic
same-origin responses.

**The service worker never ran in production (severity: low, availability).**
`index.html` registered `sw.js` while the file on disk was `service.js`, so
registration 404'd and offline use silently did not work. The file is now
`sw.js` at the repository root, which is also the only place it can live and
still control the whole site.

**No Content-Security-Policy (severity: low).** Every page now carries a meta
CSP: `default-src 'self'`, images limited to self and `data:`, `object-src
'none'`, `base-uri 'self'`, `form-action 'none'`, and `connect-src` limited to
self plus the submission endpoint's origin.

**Validation was invisible to assistive technology (severity: low).** Failures
were reported through `alert()`, which cannot be associated with a field.
Errors now appear in a `role="alert"` region, the offending field gets
`aria-invalid` and focus, and dialog fields carry `aria-describedby` pointing
at their own message.

### Fixed in the 29 August review

**Configuration values reached the markup unescaped (severity: low).** Port
names from the spreadsheet, and the partner-port option built in
`syncTempPorts`, were interpolated into HTML without escaping. Nothing a
visitor types reaches those paths, so this was not exploitable from the
browser, but a spreadsheet edit could have broken the markup, and the rest of
the file already escaped everything else. They now go through `escapeHtml` like
the rest.

**Two interface strings were still hardcoded English** in the partner-port
dropdown, which meant a Spanish user saw them untranslated. Now keyed like the
rest. Not a security issue; found during the same sweep.

### Checked and clean, 29 August

- No credential-shaped assignments anywhere in the working tree or in the last
  25 commits. The only matches are this file and `Code.gs` saying that secrets
  do not belong here.
- The browser reaches exactly two origins: the site itself and the Apps Script
  endpoint. No CDN, no fonts, no analytics script, no embeds. Every page still
  carries `default-src 'self'` with `connect-src` limited to those two.
- No `eval`, no `new Function`, no `document.write`, and no assignment of a
  form value straight into `innerHTML`.
- The service worker still imports only its own config, refuses to cache
  cross-origin responses, reduces each queued payload to seven known string
  fields, and caps the queue at 50.
- A tampered parameter value, of the kind you would get by editing a number
  field in the DOM, produces a sketch the compiler rejects rather than one that
  quietly does something else. The header comment still cannot be broken out
  of.
- Browser storage holds six keys, all prefixed `nodeflow_`: the saved survey
  answers, saved configurations, the info box state, the language, the consent
  answer and the submission timestamps used for rate limiting. Nothing else.
- The direct-wiring code returns both excitation pins to `INPUT` when it
  finishes, so no pin is left driving a sensor between readings. That matters
  for the hardware as much as for the software: Irrometer's guide is explicit
  that sustained DC destroys the electrodes.

### Open, with reasons

**The submission endpoint is public and cannot be hidden.** A static site has
nothing to hide it behind: the URL must be in the page for the page to call it.
It is not a credential, and knowing it grants no access to the spreadsheet. It
does mean anyone can post to it, which is why the enforcement in
`server/apps-script/Code.gs` matters. **That script is not deployed yet.**
Until it replaces the current deployment, the only limits in force are the
browser-side ones, which can be bypassed.

**The endpoint URL is in the git history.** It appeared in `service.js` and
`main.js` in earlier commits. Rewriting history would not help, since the URL
was served to every visitor anyway. If you would rather start clean, create a
new Apps Script deployment with `Code.gs`, put the new `/exec` URL in
`config.js`, and archive the old deployment; the old URL then accepts nothing.

**`mode: "no-cors"` hides the response.** The page cannot read whether the
endpoint accepted or rejected a submission, so a rate-limited submission looks
identical to a successful one. The alternative is CORS headers from Apps
Script and a preflight on every request. The download, which is what the
visitor actually came for, never depends on the endpoint, so the failure is
invisible by design rather than by accident.

**Inline event handlers keep `'unsafe-inline'` in the CSP.** The form markup is
built as HTML strings with `onclick` and `onchange` attributes, so `script-src`
must allow inline script. The rest of the policy still holds. Removing it means
moving to delegated listeners throughout `main.js`; worth doing, not done here.

**Parameter values are interpolated into the generated C++.** A value typed
into a number field lands in the sketch as a literal. Someone editing the DOM
can put arbitrary text there and produce a sketch that does something else.
The result is a file on their own machine that they then choose to upload, so
this is self-inflicted rather than a path to anyone else. The inputs are typed,
range-clamped and decimal-limited, which is as far as it is worth going.

**Third parties.** Pages are served by GitHub Pages; submissions land in Google
Sheets through Apps Script. Both see the traffic and are covered by their own
terms. No other third-party host is contacted: there are no CDN fonts, no
analytics scripts and no embeds, which is what lets `default-src 'self'` hold.

## Privacy posture

- Nothing is sent while the form is being filled in. The one request happens
  when the visitor confirms a download, after reading the consent form.
- Visit counting is off unless `analytics.endpoint` is set in `config.js`, and
  even then it only fires after an explicit yes on the banner. It sends a path
  and a timestamp, sets no cookie, and loads no third-party script.
- Name, email, country, saved configurations and the consent answer are kept in
  `localStorage` on the visitor's own device and are cleared with the
  **Clear** control on the generator page or by clearing site data.

## Reporting a problem

Please report suspected vulnerabilities privately to the project contact in
`assets/js/config.js` rather than opening a public issue, and give us a
reasonable window to fix it before disclosing.
