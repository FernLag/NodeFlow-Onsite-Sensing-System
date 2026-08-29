# Handover

For whoever picks this up next. It assumes you can read JavaScript and Python
but knows nothing about this project.

Written 29 August 2026, against the `site-restructure` branch.

## What this is in one paragraph

A static web page that writes Arduino code. A grower says which soil sensors
they own and which pins they used, and the page assembles a complete `.ino`
sketch in their browser and downloads it. Nothing runs on a server. It is
hosted on GitHub Pages. The only network call the site makes is one POST to a
Google Apps Script that records the configuration for research.

## The three pieces, and which one to edit

```
data/sensor_configuration_v2.xlsx     what the form offers
        |
        |  python3 tools/build.py
        v
assets/js/main.js  (top half)         generated config, do not hand edit
assets/js/main.js  (bottom half)      arduino templates and the generator
```

**The spreadsheet decides what appears in the form.** Sensors, measurements,
parameters, tooltips, ports, display options, and the questions in the download
dialog. If you want to add a measurement or change a label, this is the file.

**`tools/build.py` copies the spreadsheet into `main.js`.** It rewrites only
the `const` blocks at the top: `SENSOR_TYPES`, `OUTPUT_PARAMS`, `OUTPUT_VIZ`,
`VIZ_OPTIONS`, `PORTS`, `PORT_TIPS`, `SURVEY_QUESTIONS`. It never touches
anything below them.

**The bottom half of `main.js` is hand written and is where the Arduino code
lives.** `TEMPLATES.sensors` holds the code that reads each sensor,
`TEMPLATES.outputs` holds the code that turns a reading into a number, and
`TEMPLATES.viz` holds the code that puts it on the display. `buildIno()`
stitches them together.

### The rule that trips people up

Adding a measurement to the spreadsheet is not enough. The spreadsheet says a
measurement exists; `TEMPLATES.outputs` says what it computes. If the two
disagree the generator silently falls back to echoing the raw reading. Add
both, then run the verifier.

Names are matched case-insensitively through `OUTPUT_ALIASES` and
`SENSOR_ALIASES` in `main.js`, which is how a spreadsheet label like
`Raw value (Temperature, in °F)` finds a template called `Temperature F`. If
you rename something in the spreadsheet and it stops working, that map is the
first place to look.

## Run this before you commit anything

```sh
python3 tools/build.py            # spreadsheet into main.js
python3 tools/verify_sketches.py  # compiles every sketch the form can produce
```

The verifier builds one sketch for every combination the form can offer,
currently 297, and puts each through a real C++ compiler against
`tools/arduino_stub.h`. It catches unfilled template values, unbalanced braces,
undeclared variables and wrong argument types. It also reports configuration
gaps that compile but are useless, such as a measurement whose only display
option is "no visualization".

It needs Node and `g++` or `clang++`. Without a compiler it still runs the text
checks and says the compile step was skipped.

**Then bump `CACHE_NAME` in `sw.js`.** This is the step that breaks
deployments when it is forgotten. The service worker serves its cached copy
first, so without a new cache name a returning visitor keeps the old page
indefinitely and reports bugs you already fixed.

## Things that will surprise you

**Excel silently reverts your edits.** If the spreadsheet is open in Excel and
you change it with a script, Excel writes its whole in-memory copy back when it
saves or quits and your changes disappear. This happened twice during this
work. `build.py` now warns when it sees Excel's `~$` lock file. Quit Excel, not
just the window.

**There are two spreadsheets.** `sensor_configuration.xlsx` is the original,
kept untouched so it can be diffed. `sensor_configuration_v2.xlsx` is the
edited one, and `build.py` prefers it when present and prints which file it
read. If you settle on v2 as the master, rename it and simplify `find_excel()`.

**`render()` substitutes 0 for anything it cannot resolve.** That means a
template asking for a value the form never supplies produces a zero rather than
an error, which reads as a real calibration number. The fallback stays, because
a grower should never receive a file that will not compile, but every miss is
recorded in `RENDER_MISSES` and the verifier fails on it.

**Template variables are seeded from the spreadsheet defaults first**, then
overwritten by what the grower typed. The sensor's constants block declares
every parameter the sensor has, while the form only sends the ones the chosen
measurement needs, so without the seeding the unused ones came through as zero.

**Only A0 to A5 can be read.** `analogRead` does not work on a digital pin. The
ports sheet keeps D1 to D13 documented but switched off through its `active`
column. Turning one on is not enough to make it work: it needs a digital sensor
template first, and the verifier says so if it finds one active.

**`percent` is one shared global in the generated sketch.** Every sensor block
writes to it and then immediately displays it, so blocks must stay in that
order inside `loop()`. If you ever reorder the generated code, this is what
breaks.

## Wiring: two paths through the same sensor

A `wiring` parameter on the Watermark and temperature sensors chooses between
the 200SS-VA3 adapter and direct wiring. `buildIno()` looks at it and picks
`Watermark_direct` or `Temperature_direct` instead of the adapter template.

If a sensor is set to direct and has no `_direct` template, `buildIno()`
throws. That is deliberate: it used to fall back to the adapter template, which
handed someone code expecting a voltage from hardware they never wired.

Direct wiring is limited to one sensor per board, enforced in
`handleGenerate()`. Wet soil conducts between bare sensors. This is the
manufacturer's warning, not a software limitation, and removing the check
would damage people's sensors.

## Translations

`assets/js/i18n.js` holds English and Spanish. Fixed page text uses
`data-i18n="key"` attributes. Strings built in JavaScript call `t("key")`.
Spreadsheet text goes through `tData(group, id, fallback)` and is keyed on the
identifier rather than the English wording, so rewording a cell cannot silently
drop a translation.

Switching language calls `rebuildForLanguage()`, which rebuilds the sensor
blocks because their markup is assembled in JavaScript. It snapshots the
grower's selections first and restores them after.

The Spanish has not been reviewed by a native speaker. The long-term home for
it is `_es` columns in the spreadsheet, so the agronomists own the wording.
The keys are already identifier based, so that move is a change to `build.py`
and not to the shape of `i18n.js`.

Not translated yet: the privacy, terms, thank-you and 404 pages, and the text
the sketch writes to the LCD. The display needs its own pass because the
HD44780 character set has no accented letters.

## Known open questions

These are real and unresolved. Do not assume they were oversights.

1. **The 200TS temperature slope.** The VA-3 datasheet prints
   `degF = 50.68 * (V - 0.49) + 20` but also states the range as 20 to 132 F
   across 0.49 to 2.8 V. Those disagree. The endpoints give exactly 48.48,
   which is what the code uses. Ask Irrometer before changing it; the printed
   slope would read about 5 F high at the top of the scale.

2. **The bare 200TS thermistor curve.** Irrometer does not publish it; their
   datasheet says it is built into their own reading devices. Direct-wired
   temperature uses the beta equation with `therm_r25` and `therm_beta` exposed
   as parameters, defaulted to a generic 10 kilohm NTC. Resistance on that path
   is measured and trustworthy. The temperature is only as good as those two
   numbers.

3. **`k` for the capacitive probe** is a fitted value with no universal
   default. The current 6.1 produces a plausible curve across the readings the
   probe can actually produce, which the old default did not, but it is not
   calibrated to any particular soil.

4. **The soil texture thresholds** in `SOIL_THRESHOLDS` are the project's
   agronomic judgement, not a manufacturer figure. Worth a review by someone
   who knows the soils.

5. **`server/apps-script/Code.gs` is not deployed.** Until it replaces the live
   Apps Script, the only rate limiting and validation in force are the
   browser-side ones, which anyone can bypass. See `docs/SECURITY.md`.

6. **Contact details are placeholders.** `assets/js/config.js` ships with
   `REPLACE-ME@example.org`. While that is there, the site prints "contact
   details coming soon" instead of a broken link.

## Where the numbers come from

`docs/EQUATIONS.md` records, for every measurement, what the code actually
computes, what the spreadsheet's equation column says, and which to trust. It
cites the manufacturer documentation per constant.

The short version: **the spreadsheet's equation column documents Irrometer's
bare-sensor wiring, and the code implements the VA-3 adapter.** Both are
correct; they describe different hardware. That single fact explains most of
the apparent disagreements. The column is reference material and is not
executed by anything.

## The security posture

`docs/SECURITY.md` is the full account. The short version:

- No secrets anywhere. Nothing here needs one. The submission endpoint is
  public by necessity, because a static site has nowhere to hide it.
- Everything a person types is cleaned and length capped before it is stored,
  rendered or sent. Everything reaching `innerHTML` is escaped.
- The generated sketch cannot be broken out of: the header comment is
  neutralised, and a tampered parameter produces a sketch the compiler rejects
  rather than one that quietly misbehaves.
- Every page carries a Content-Security-Policy with `default-src 'self'`. The
  browser reaches exactly two origins, the site and the Apps Script endpoint.
  Adding a CDN font or an analytics script will be blocked silently, so widen
  the policy deliberately if you ever need to.

## Code style in this repo

Comments are lowercase, short, and free of rules made of dashes. Identifiers,
file names, product names and acronyms keep their case, because lowercasing
`SENSOR_TYPES` makes a comment wrong rather than tidy. Python docstrings keep
sentence case, since they are documentation rather than comments.

No em dashes anywhere, in code or in prose.

## Layout

```
index.html thank-you.html privacy.html terms.html 404.html
sw.js site.webmanifest robots.txt sitemap.xml favicon.ico

assets/css/styles.css     the whole stylesheet
assets/js/config.js       endpoint, limits, contact details, all public
assets/js/i18n.js         english and spanish
assets/js/main.js         generated config, then the generator
assets/js/site.js         footer, consent banner, service worker registration
assets/img  assets/docs

data/                     the spreadsheets
tools/build.py            spreadsheet into main.js
tools/watch.py            reruns build.py on save
tools/verify_sketches.py  compiles every sketch the form can produce
tools/generate_all_sketches.js   builds those sketches
tools/arduino_stub.h      stands in for the arduino headers
server/apps-script/       the submission endpoint
docs/                     security, deployment, equations, this file, guidelines
documentation/            manufacturer datasheets, gitignored, local only
```

## If you only read one thing

Run `python3 tools/verify_sketches.py` after every change. It found every
serious bug in this codebase: measurements that always reported 100 percent,
ports that produced code that would not compile, parameters silently arriving
as zero, and a wiring option that generated the wrong hardware's code. It will
find the next one too.
