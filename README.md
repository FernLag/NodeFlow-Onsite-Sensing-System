# NodeFlow (On-site) Sensing System — code generator

A static web app that writes Arduino sketches for a soil sensing system. A
grower fills in a form describing their hardware — which sensor, which port,
what measurement, how to display it, plus calibration values — and the page
assembles a complete `.ino` file in the browser and downloads it.

Nothing runs on a server. The site is hosted on GitHub Pages, and the only
network call it makes is the one that records a submission for research.

Our goal is to develop and encourage the adoption of do-it-yourself, low-cost,
open-source technologies that improve farm-scale water management.

Made with Python, JavaScript and HTML/CSS.

---

## Repository layout

```
.
├── index.html              the generator
├── thank-you.html          what to do after the download
├── privacy.html            privacy policy
├── terms.html              terms of use
├── 404.html                custom not-found page
├── sw.js                   service worker (must stay at the root)
├── site.webmanifest        installable-app metadata
├── robots.txt              crawler rules
├── sitemap.xml             page list for search engines
├── favicon.ico
│
├── assets/
│   ├── css/styles.css      the whole stylesheet
│   ├── js/config.js        endpoints, limits, contact details (public)
│   ├── js/main.js          generated config + the generator itself
│   ├── js/site.js          header, footer, consent banner, service worker
│   ├── img/                logos, favicons, share image
│   └── docs/consent.pdf    research consent form
│
├── data/                   master spreadsheets
├── tools/
│   ├── build.py            spreadsheet -> main.js config blocks
│   ├── watch.py            reruns build.py when the spreadsheet is saved
│   └── templates/          per-sensor stubs written by build.py
│
├── server/apps-script/     the submission endpoint, to paste into Apps Script
└── docs/                   security notes and the deployment checklist
```

## Architecture

Three pieces do the real work.

**`data/sensor_configuration.xlsx`** is the source of truth. It defines the
sensors, the measurements each one offers, the parameters each measurement
needs, the tooltips, and the display options allowed for each, across the
sheets `sensors`, `params`, `viz_options`, `ports` and `survey_questions`.

**`tools/build.py`** reads that spreadsheet with `openpyxl` and rewrites only
the configuration blocks at the top of `assets/js/main.js`: `SENSOR_TYPES`,
`OUTPUT_PARAMS`, `OUTPUT_VIZ`, `VIZ_OPTIONS`, `PORTS`, `PORT_TIPS` and
`SURVEY_QUESTIONS`.

**`assets/js/main.js`** has two halves. The generated configuration at the top,
and hand-written code below it: the Arduino code templates and the generator
that assembles them. `build.py` never touches the hand-written half.

## Hardware supported

- DFRobot capacitive soil moisture probe, wired straight to an analog pin
- Irrometer Watermark 200SS tension sensors through a 200SS-VA3 adapter
- Irrometer 200TS soil temperature sensor, standalone or paired with a
  Watermark

The VA-3 handles up to three Watermarks plus one shared temperature probe,
outputs 0 to 2.8 V, and refreshes each channel every five minutes, holding the
previous value in between. Tension is `kPa = Volts / 0.0117`; temperature is
`°F = 48.48 × (V − 0.49) + 20`. The adapter never exposes resistance.

The target board is an Arduino Uno R3 with a 16×2 LCD keypad shield. The
buttons are a resistor ladder on A0, so A0 is reserved and sensors use A1–A5.
The LCD shows port, short sensor name and value on line 1 (for example
`A2 WM200SS 34 kPa`), with a bar, state or warning on line 2.

Measurements offered: raw value in ADC counts, raw value as a percentage,
management thresholds (three agronomic states from soil-specific tension
thresholds), tension in kPa, temperature, wetting front, and vertical flow
rate. One convention runs throughout: a higher percentage always means wetter,
except for raw readings, which report the sensor faithfully.

Also implemented: a low-battery warning using the ATmega's internal 1.1 V
reference (works on battery through the barrel jack only, not on USB power
banks), backlight blanking after five minutes without a button press,
multi-sample ADC averaging against crosstalk on the shared converter, and
passive sensor-presence detection that never drives the VA-3's weakly held
output pins.

---

## For developers

### Changing what the form offers

Keep the master spreadsheet at `data/sensor_configuration.xlsx`. It is
deliberately not committed, so edit your own copy and rebuild:

```sh
python3 tools/build.py
```

That rewrites the configuration blocks in `assets/js/main.js` from the
spreadsheet. To rebuild automatically every time you save the spreadsheet:

```sh
python3 tools/watch.py     # Ctrl+C to stop
```

Requires `openpyxl` (`pip install openpyxl`).

If you add a new output in Excel, add a matching entry in `TEMPLATES.outputs`
in `assets/js/main.js` by hand. The same applies to new sensor types
(`TEMPLATES.sensors`) and new display options (`TEMPLATES.viz`). `build.py`
never writes Arduino logic.

### Deploying

1. Edit the spreadsheet.
2. `python3 tools/build.py`
3. **Bump `CACHE_NAME` in `sw.js`.** This is not optional. Without it, anyone
   who has visited before keeps serving the old files out of their cache.
4. Commit and push. GitHub Pages publishes from the repository root.

The full checklist, including what to change before a first public deploy, is
in `docs/DEPLOYMENT.md`.

### Local development

Service workers need a real origin, so open the site over HTTP rather than
`file://`:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. The page detects localhost and unregisters
the service worker so you are never served a stale cache while working.

### Configuration

`assets/js/config.js` holds the submission endpoint, the contact address and
the rate limits, in one place shared by the page and the service worker.
Everything in it is public. It must never contain an API key, a token or a
password; see `docs/SECURITY.md`.
