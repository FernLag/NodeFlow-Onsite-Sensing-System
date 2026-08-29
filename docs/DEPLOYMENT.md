# Deployment

GitHub Pages serves this repository from its root. There is no build step for
the site itself: what is committed is what is published.

## Before the first public deploy

These three are placeholders and must be replaced.

1. **Contact address.** `assets/js/config.js` ships with
   `contactEmail: "REPLACE-ME@example.org"`. While that value is there, the
   footer, the privacy policy, the terms and the 404 page all print
   "Contact details coming soon" instead of a link, so nothing invented is
   shown to visitors. Put the real project address in and the link appears
   everywhere at once.

2. **The submission endpoint.** `server/apps-script/Code.gs` is the endpoint
   this site is written against: it validates the body, caps field lengths,
   rate limits per email and globally, and stops submitted text from being
   evaluated as a spreadsheet formula. Paste it over the current Apps Script,
   redeploy as a web app, and put the new `/exec` URL in `config.js`. Until
   that happens the only limits in force are the ones in the browser, which
   anyone can bypass.

3. **The site address.** Canonical links, `sitemap.xml`, `robots.txt` and the
   Open Graph tags all name
   `https://fernlag.github.io/NodeFlow-Onsite-Sensing-System/`. If the site
   moves to its own domain, update those together, or search engines will keep
   pointing at the old address.

## Every deploy

1. Edit `data/sensor_configuration.xlsx`.
2. `python3 tools/build.py`
3. **Bump `CACHE_NAME` in `sw.js`** (`nodeflow-cache-v3` to `-v4`, and so on).
   This is the step that breaks deployments when it is skipped. The service
   worker serves the cached copy first, so without a new cache name a returning
   visitor keeps the old page and the old generator, indefinitely, and reports
   bugs you have already fixed.
4. Check the pages still load over a local server:
   `python3 -m http.server 8000`, then `http://localhost:8000`. The page
   detects localhost and unregisters the service worker, so you always see your
   current files while developing.
5. Commit and push to the default branch.

## When adding a page

- Copy the head block from an existing page. It carries the title, the
  description, the canonical link, the CSP, the Open Graph tags and the icons.
- Give it its own `<title>` and `<meta name="description">`. No two pages
  should share either.
- Add it to `sitemap.xml`, and to `APP_SHELL` in `sw.js` if it should work
  offline.
- Add it to the footer if a visitor would ever want to find it.

## When adding a third-party resource

Every page carries `default-src 'self'`. A font from a CDN, an embedded video
or a hosted analytics script will be blocked with nothing in the interface to
say so. Either inline the resource, or widen the CSP in every page's head, in
which case update `docs/SECURITY.md` to say what was widened and why. Adding a
tracker also means rewriting the "no third-party trackers" claim in
`privacy.html`; do not leave that page saying something the site no longer
does.

## Checking a deploy landed

- Open the site in a private window. A private window has no old service
  worker, so it shows what a new visitor gets.
- In an ordinary window, confirm the "A new version is available" bar appears
  on a page you had open before the deploy. If it never appears, `CACHE_NAME`
  was not bumped.
- Generate a file end to end and confirm a row arrives in the spreadsheet.
