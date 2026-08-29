/*
 * generate_all_sketches.js
 *
 * builds a sketch for every combination the spreadsheet allows: each sensor,
 * each measurement that sensor offers, each display option that measurement
 * allows, and each choice of a picker parameter such as soil texture. it then
 * adds the multi-sensor cases, because identifiers in a generated sketch are
 * suffixed per block and a collision only shows up when two blocks are present.
 *
 * writes one .ino per case into the output directory and a manifest.json
 * listing them. tools/verify_sketches.py compiles what comes out.
 *
 * run through the Python driver:  python3 tools/verify_sketches.py
 * or directly:                    node tools/generate_all_sketches.js <outdir>
 *
 * with no directory given it writes to a fresh one under the system temp
 * directory, never into the repository.
 */

const fs = require("fs");
const os = require("os");
const path = require("path");
const vm = require("vm");

const ROOT = path.dirname(__dirname);
const OUT = process.argv[2] || fs.mkdtempSync(path.join(os.tmpdir(), "nodeflow-sketches-"));

/*
  load ----
   main.js ends by wiring itself to a page: building a first sensor block,
   reading localStorage, attaching tooltips. none of that can run without a
   DOM, and none of it is needed to generate a sketch, so the file is loaded
   up to that bootstrap and no further.
          */
function loadGenerator() {
  const file = path.join(ROOT, "assets", "js", "main.js");
  let src = fs.readFileSync(file, "utf8");

  const marker = "\ninitTooltips();";
  const cut = src.indexOf(marker);
  if (cut < 0) {
    throw new Error(
      "Could not find the bootstrap call at the end of assets/js/main.js.\n" +
        "If it was renamed, update the marker in this script.",
    );
  }
  src = src.slice(0, cut);

  const sandbox = { self: {}, console, TextEncoder };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(
    src +
      "\n;globalThis.__api = { buildIno, SENSOR_TYPES, OUTPUT_PARAMS, OUTPUT_VIZ," +
      " VIZ_OPTIONS, PORTS, resolveSensorKey, resolveOutputKey, extraParamsFor," +
      " RENDER_MISSES };",
    sandbox,
    { filename: "main.js" },
  );
  return sandbox.__api;
}

const api = loadGenerator();

/*  helpers ---- */

/*
 every port the form actually offers, read from the config rather than
   hardcoded. a port that produces a sketch the compiler rejects is exactly
   the kind of thing a fixed list of five hides.
             */
const PORTS = api.PORTS.slice();

/*
 the form does not hand every parameter to the generator: it keeps only the
   ones the chosen measurement declares, plus the sensor-wide ones. building
   blocks any other way tests a combination no grower can actually produce, and
   hides parameters that go missing on the real path.
            */
function paramsFor(sensorKey, output, overrides) {
  const cfg = api.SENSOR_TYPES[sensorKey];
  const outputMap = api.OUTPUT_PARAMS[sensorKey] || {};
  const needed = (outputMap[output] || cfg.params.map((p) => p.name)).concat(
    api.extraParamsFor(output),
  );
  const wanted = new Set(needed.map((n) => String(n).trim().toLowerCase()));

  return cfg.params
    .filter((p) => wanted.has(String(p.name).trim().toLowerCase()))
    .map((p) => ({
      name: p.name,
      value:
        overrides && Object.prototype.hasOwnProperty.call(overrides, p.name)
          ? overrides[p.name]
          : p.value,
    }));
}

/*
 a parameter offering a list of choices, such as soil texture, has to be
   exercised on every choice: each one loads a different pair of thresholds.
               */
function choiceSets(sensorKey) {
  const cfg = api.SENSOR_TYPES[sensorKey];
  const sets = [null];
  cfg.params.forEach((p) => {
    if (!p.choices) return;
    String(p.choices)
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean)
      .forEach((choice) => {
        const o = {};
        o[p.name] = choice;
        sets.push(o);
      });
  });
  return sets;
}

/*
 parameter ranges matter as much as the defaults: a min of 0 in a divisor,
   or a max that is smaller than a min, only shows up at the extremes.
                  */
function extremeSets(sensorKey) {
  const cfg = api.SENSOR_TYPES[sensorKey];
  const low = {};
  const high = {};
  let any = false;
  cfg.params.forEach((p) => {
    if (p.choices) return;
    if (p.min !== "" && p.min !== undefined) {
      low[p.name] = p.min;
      any = true;
    }
    if (p.max !== "" && p.max !== undefined) {
      high[p.name] = p.max;
      any = true;
    }
  });
  return any ? [low, high] : [];
}

/*
 the same filter refreshViz() applies in the form: a display option is only
   offered if the measurement allows it AND it is switched on in the
   viz_options sheet. testing anything else would test combinations no one can
   actually choose.
     */
function vizFor(sensorKey, output) {
  const map = api.OUTPUT_VIZ[sensorKey] || {};
  let allowed = map[output];
  if (!allowed || !allowed.length) allowed = api.VIZ_OPTIONS.map((v) => v.value);
  if (!allowed.includes("none")) allowed = ["none"].concat(allowed);
  return api.VIZ_OPTIONS.filter((v) => allowed.includes(v.value)).map((v) => v.value);
}

/*
 gaps between the spreadsheet and the templates. none of these stop a sketch
   compiling, which is exactly why they need reporting: they are the failures
   that reach a grower looking like working software.
           */
function configWarnings() {
  const known = new Set(api.VIZ_OPTIONS.map((v) => v.value));
  const warnings = [];

  /*
 only A0 to A5 are ADC channels on an Uno. analogRead of a digital pin does
     not compile, so switching one on in the ports sheet needs a digital sensor
     template first, not just a TRUE in a cell.
              */
  api.PORTS.filter((p) => !/^A[0-5]$/.test(p)).forEach((p) => {
    warnings.push(
      "port " + p + " is switched on, but it is not an analog channel. The " +
        "sketch reads sensors with analogRead, which only works on A0 to A5. " +
        "A digital port needs a digital sensor template before it can be used.",
    );
  });

  for (const sensorKey of Object.keys(api.SENSOR_TYPES)) {
    for (const output of api.SENSOR_TYPES[sensorKey].outputs) {
      const out = output.value;
      const declared = (api.OUTPUT_VIZ[sensorKey] || {})[out] || [];

      declared
        .filter((v) => !known.has(v))
        .forEach((v) => {
          warnings.push(
            sensorKey + " / " + out + ': the display option "' + v +
              '" is allowed by the sensors sheet but is switched off in the ' +
              "viz_options sheet, so nobody can pick it",
          );
        });

      const offered = vizFor(sensorKey, out);
      if (offered.length <= 1) {
        warnings.push(
          sensorKey + " / " + out + ": the only display option on offer is " +
            '"No visualization", so this measurement can only produce a sketch ' +
            "that shows nothing on the screen",
        );
      }
    }
  }
  return warnings;
}

function needsPartner(sensorKey, output) {
  return (
    api.resolveSensorKey(sensorKey) === "Watermark_Temperature" ||
    /wetting front/i.test(output)
  );
}

function block(sensorKey, output, viz, port, partnerPort, overrides) {
  return {
    port,
    sensor: sensorKey,
    output,
    viz,
    partnerPort: partnerPort || "",
    params: paramsFor(sensorKey, output, overrides),
  };
}

function slug(text) {
  return String(text)
    .replace(/[^A-Za-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 60);
}

/*  cases --- */

const cases = [];

function add(name, blocks, answers) {
  cases.push({
    name,
    blocks,
    answers: answers || { name: "Verification", country: "Test" },
  });
}

for (const sensorKey of Object.keys(api.SENSOR_TYPES)) {
  for (const output of api.SENSOR_TYPES[sensorKey].outputs) {
    const out = output.value;
    const vizzes = vizFor(sensorKey, out);
    const variants = choiceSets(sensorKey).concat(extremeSets(sensorKey));

    for (const viz of vizzes) {
      variants.forEach((overrides, i) => {
        const partner = needsPartner(sensorKey, out) ? "A2" : "";
        const blocks = [block(sensorKey, out, viz, "A1", partner, overrides)];

        /*
 Wetting front reads a shallow and a deep probe, so the partner has
           to exist as a block of its own or the sketch is half a sketch.
                          */
        if (/wetting front/i.test(out)) {
          blocks.push(block(sensorKey, "Raw Value (ADC)", "none", "A2", "", overrides));
        }

        const label = [sensorKey, slug(out), slug(viz), "v" + i].join("__");
        add(label, blocks);
      });
    }
  }
}

/* every sensor at once, which is where per-block identifier collisions show. */
const mixed = Object.keys(api.SENSOR_TYPES).map((key, i) => {
  const out = api.SENSOR_TYPES[key].outputs[0].value;
  const vizzes = vizFor(key, out);
  return block(
    key,
    out,
    vizzes[vizzes.length - 1],
    PORTS[i % PORTS.length],
    needsPartner(key, out) ? "A5" : "",
  );
});
add("mixed__one_of_each_sensor", mixed);

/* a full board: five sensors, one per analog port. */
const full = PORTS.map((port, i) => {
  const keys = Object.keys(api.SENSOR_TYPES);
  const key = keys[i % keys.length];
  const outputs = api.SENSOR_TYPES[key].outputs;
  const out = outputs[i % outputs.length].value;
  const vizzes = vizFor(key, out);
  return block(
    key,
    out,
    vizzes[i % vizzes.length],
    port,
    needsPartner(key, out) ? "A5" : "",
  );
});
add("full__five_analog_ports", full);

/*
 free text that a person could reasonably type, including the sequences that
   would end the header comment early if they were not neutralised.
              */
/* one block on each port the form lists. */
api.PORTS.forEach((port) => {
  add(
    "port__" + slug(port),
    [block("DF_robot", "Raw Value (ADC)", "raw_lcd", port, "")],
  );
});

/*
 the comment markers are built from pieces so this file does not itself
   contain a stray block comment.
        */
const CLOSE = "*" + "/";
const OPEN = "/" + "*";
add("header__awkward_free_text", [block("DF_robot", "Raw Value (ADC)", "none", "A1", "")], {
  name: 'Grower "Tester" O\'Brien ' + CLOSE + " int x = 1; " + OPEN,
  country: "Cote d'Ivoire </script>",
  ino_comment: "block 2 " + CLOSE + " while(1); " + OPEN + " installed 2026",
});

/*  write --- */

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const manifest = [];
let failures = 0;

for (const c of cases) {
  let code;
  api.RENDER_MISSES.length = 0;
  try {
    code = api.buildIno(c.blocks, c.answers);
  } catch (err) {
    console.error("GENERATE FAILED  " + c.name + "\n  " + err.message);
    failures++;
    continue;
  }
  const file = path.join(OUT, c.name + ".ino");
  fs.writeFileSync(file, code);
  manifest.push({
    name: c.name,
    file,
    /*
 placeholders the templates asked for that no parameter supplied. each
       one silently became a zero in this sketch.
               */
    missingValues: Array.from(new Set(api.RENDER_MISSES)).sort(),
    blocks: c.blocks.map((b) => ({
      sensor: b.sensor,
      port: b.port,
      output: b.output,
      viz: b.viz,
    })),
  });
}

const warnings = configWarnings();

fs.writeFileSync(
  path.join(OUT, "manifest.json"),
  JSON.stringify(
    { generated: manifest.length, failures, warnings, cases: manifest },
    null,
    2,
  ),
);

console.log(
  "generated " + manifest.length + " sketch(es)" +
    (failures ? ", " + failures + " failed to build" : ""),
);
process.exit(failures ? 1 : 0);
