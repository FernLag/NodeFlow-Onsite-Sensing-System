const SENSOR_TYPES = {
  DF_robot: {
    label: "Soil moisture capacitive sensor (such as the DFRobot SEN0308)",
    tip: "Direct sensor reading (Analog to Digital conversion)",
    outputs: [
      {
        value: "Raw Value (ADC)",
        display: "Raw Sensor Value (ADC)",
        tip: "Direct sensor reading (Analog to Digital conversion)",
      },
      {
        value: "Raw Value (%)",
        display: "Raw Sensor Value (%)",
        tip: "We will transform the raw value and express it as a percentage - 0% corresponds to the lowest possible value (dry) and 100% corresponds to the higest possible value (wet).",
      },
      {
        value: "Thresholds",
        display: "Management Thresholds",
        tip: "This variable will tell you if the soil is very dry, dry or wet. It transforms the raw value into these three qualitative states, using two thresholds that you specify.",
      },
      {
        value: "Wetting Front",
        display: "Wetting Front arrival at sensor's depth",
        tip: "This variables specifies when the water has arrived at the depth at which the sensor is positioned.",
      },
      {
        value: "Volumetric Soil Moisture",
        display: "Volumetric Soil Moisture",
        tip: "The volumetric soil moisture content, expressed here as a percentage (%), references to the volume of water reported to the volume of soil. It is calculated as θv = Vw/Vs⋅100 where Vw is  the water volume, Vs the dry soil volume.",
      },
      {
        value: "Vertical Flow Rate",
        display: "Vertical Flow Rate",
        tip: "",
      },
      {
        value: "Total Available Water",
        display: "Total Available Water",
        tip: "Available water capacity is the amount of water that can be stored in a soil profile and be available for growing crops. It is also known as available water content (AWC), profile available water (PAW) or total available water (TAW).",
      },
    ],
    params: [
      {
        name: "air_val",
        display: "Air value",
        label: "Air value: raw reading in open air. The DFRobot probe outputs at most 2.9 V, about 593 counts on a 5 V board, so this sits just under 600.",
        value: "590",
        min: "0",
        max: "1023",
        units: "ADC",
      },
      {
        name: "water_val",
        display: "Water value",
        label: "Water value: raw reading submerged in water",
        value: "0",
        min: "0",
        max: "1023",
        units: "ADC",
      },
      {
        name: "fc",
        display: "Field Capacity",
        label: "Field capacity: The amount of water that remains in the soil after all the excess water at saturation has been drained.",
        value: "0.3",
        min: "0",
        max: "1",
        units: "m³/m³",
      },
      {
        name: "wp",
        display: "Wilting point",
        label: "Wilting point:  When plants take up all the available water for a given soil and it dries out to the point where it cannot supply any water to keep plants from dying",
        value: "0.1",
        min: "0",
        max: "1",
        units: "m³/m³",
      },
      {
        name: "k",
        display: "k",
        label: "k: calibration scaling factor, fitted by matching gravimetric samples to the sensor. The default spreads a typical probe across 0 to about 50 % volumetric water, but it is soil specific and should be calibrated.",
        value: "2.2",
        min: "0",
        max: "10",
        units: "",
      },
      {
        name: "air_val_min",
        display: "Air value (minimum)",
        label: "Air value: raw reading in open air",
        value: "0",
        min: "0",
        max: "0",
        units: "ADC",
      },
      {
        name: "air_val_max",
        display: "Air value (max)",
        label: "Air value: raw reading in open air",
        value: "600",
        min: "0",
        max: "1023",
        units: "ADC",
      },
      {
        name: "a",
        display: "Upper threshold",
        label: "",
        value: "450",
        min: "0",
        max: "1023",
        units: "ADC",
      },
      {
        name: "b",
        display: "Lower threshold",
        label: "",
        value: "350",
        min: "0",
        max: "1023",
        units: "ADC",
      },
      {
        name: "shallow",
        display: "Shallow sensor depth",
        label: "",
        value: "15",
        min: "0",
        max: "200",
        units: "cm",
      },
      {
        name: "deep",
        display: "Deep sensor depth",
        label: "",
        value: "40",
        min: "0",
        max: "200",
        units: "cm",
      },
      {
        name: "threshold",
        display: "Front arrival reading",
        label: "",
        value: "400",
        min: "0",
        max: "1023",
        units: "ADC",
      },
    ],
  },
  Watermark: {
    label: "Irrometer Watermark (200SS)",
    tip: "Electrical resistance of the granular matrix, in kilohms. This is only available when the sensor is wired straight to the Arduino. Through the 200SS-VA3 adapter the resistance never leaves the adapter, so on that wiring the reading shown is tension in kPa instead.",
    outputs: [
      {
        value: "Raw value (Resistance)",
        display: "Raw value (Resistance, in kΩ)",
        tip: "Electrical resistance of the granular matrix, in kilohms. This is only available when the sensor is wired straight to the Arduino. Through the 200SS-VA3 adapter the resistance never leaves the adapter, so on that wiring the reading shown is tension in kPa instead.",
      },
      {
        value: "Raw Value (%)",
        display: "Raw Sensor Value (%)",
        tip: "This sensor measures electrical resistance inside a granular matrix to determine soil water tension. With this option, you are reading the resistance value (kΩ), expressed as a percentage - 0% corresponds to the lowest possible value and 100% corresponds to the higest possible value.",
      },
      {
        value: "Tension (kPa)",
        display: "Tension (kPa)",
        tip: "This sensor measures electrical resistance inside a granular matrix to determine soil water tension. Once resistance is known, a calibration equation converts the value to soil water tension (kPa), using the following equation: kPa = (−3.213 × R − 4.093) / (1 − 0.009733 × R − 0,2892), where R is resistance in kΩ. This covers the range of 10 to 100 kPa. Values are linearly extrapolated for values below 10 kPa and above 100 kPa. You can use this option if you cannot measure soil temperature.",
      },
      {
        value: "Management Thresholds",
        display: "Management Thresholds",
        tip: "Tells you where the soil stands between (Dry plant stressed, Irrigation range, Saturation).",
      },
    ],
    params: [
      {
        name: "water_val",
        display: "Water value",
        label: "Water value: raw reading submerged in water",
        value: "0",
        min: "0",
        max: "239",
        units: "kΩ",
      },
      {
        name: "Resistance",
        display: "Resistance",
        label: "Resistance",
        value: "0",
        min: "0",
        max: "200",
        units: "kΩ",
      },
      {
        name: "air_val_max",
        display: "Air value (max)",
        label: "",
        value: "239",
        min: "0",
        max: "239",
        units: "kPa",
      },
      {
        name: "soil_type",
        display: "Soil Type",
        label: "Soil texture sets the irrigation thresholds. Choosing a type fills in the two tension values below, which you can still adjust.",
        value: "Loam",
        min: "",
        max: "",
        units: "",
        choices: "Loamy sand|Fine sandy loam|Sandy loam|Loam|Clay",
      },
      {
        name: "thr_low",
        display: "Wet threshold (10% depletion)",
        label: "",
        value: "23",
        min: "0",
        max: "239",
        units: "kPa",
      },
      {
        name: "thr_high",
        display: "Dry threshold (40% depletion)",
        label: "",
        value: "65",
        min: "0",
        max: "239",
        units: "kPa",
      },
      {
        name: "wiring",
        display: "Connection",
        label: "How the sensor reaches the board. Through the 200SS-VA3 adapter, which does the excitation and calibration itself, or wired straight to the Arduino with a series resistor. Direct wiring supports one Watermark only: two bare sensors in the same soil read through each other and damage their electrodes.",
        value: "200SS-VA3 adapter",
        min: "",
        max: "",
        units: "",
        choices: "200SS-VA3 adapter|Direct to Arduino",
      },
      {
        name: "Rx",
        display: "Series resistor",
        label: "Series resistor between the sensor and ground, used only for direct wiring. Irrometer's reference circuit uses 10 kilohms.",
        value: "10",
        min: "1",
        max: "100",
        units: "kOhm",
      },
      {
        name: "soil_temp_c",
        display: "Soil temperature",
        label: "Soil temperature used to compensate the Watermark calibration when wiring direct. Irrometer uses 24 C when no temperature sensor is available.",
        value: "24",
        min: "-10",
        max: "60",
        units: "C",
      },
    ],
  },
  Watermark_Temperature: {
    label: "Irrometer Watermark (200SS) combined with Irrometer Soil Temperature Sensor (200TS)",
    tip: "Electrical resistance of the granular matrix, in kilohms. This is only available when the sensor is wired straight to the Arduino. Through the 200SS-VA3 adapter the resistance never leaves the adapter, so on that wiring the reading shown is tension in kPa instead.",
    outputs: [
      {
        value: "Raw value (Resistance)",
        display: "Raw value (Resistance, in kΩ)",
        tip: "Electrical resistance of the granular matrix, in kilohms. This is only available when the sensor is wired straight to the Arduino. Through the 200SS-VA3 adapter the resistance never leaves the adapter, so on that wiring the reading shown is tension in kPa instead.",
      },
      {
        value: "Raw Value (%)",
        display: "Raw Sensor Value (%)",
        tip: "This sensor measures electrical resistance inside a granular matrix to determine soil water tension. With this option, you are reading the resistance value (kΩ), expressed as a percentage - 0% corresponds to the lowest possible value and 100% corresponds to the higest possible value.",
      },
      {
        value: "Tension",
        display: "Tension",
        tip: "This sensor measures electrical resistance inside a granular matrix to determine soil water tension. Once resistance is known, a calibration equation converts the value to soil water tension (kPa), using the following equation: kPa = (−3.213 × R − 4.093) / (1 − 0.009733 × R − 0.01205 × T), where R is resistance in kΩ and T is temperature in °C. This covers the range of 10 to 100 kPa. Values are linearly extrapolated for values below 10 kPa and above 100 kPa. Temperature affects the measured resistance; a temperature sensor input improves accuracy. . You can use this option if you can measure soil temperature.",
      },
      {
        value: "Raw value (Temperature, in °F)",
        display: "Raw value (Temperature, in °F)",
        tip: "You are reading soil temperature in Fahrenheit using your soil temperature sensor.",
      },
      {
        value: "Raw value (Temperature, in °C)",
        display: "Raw value (Temperature, in °C)",
        tip: "You are reading soil temperature in Celsius using your soil temperature sensor.",
      },
      {
        value: "Management Thresholds",
        display: "Management Thresholds",
        tip: "",
      },
    ],
    params: [
      {
        name: "air_val_max",
        display: "Air value (max)",
        label: "",
        value: "239",
        min: "0",
        max: "239",
        units: "kPa",
      },
      {
        name: "water_val",
        display: "Water value",
        label: "",
        value: "0",
        min: "0",
        max: "239",
        units: "kPa",
      },
      {
        name: "soil_type",
        display: "Soil Type",
        label: "Soil texture sets the irrigation thresholds. Choosing a type fills in the two tension values below, which you can still adjust.",
        value: "Loam",
        min: "",
        max: "",
        units: "",
        choices: "Loamy sand|Fine sandy loam|Sandy loam|Loam|Clay",
      },
      {
        name: "thr_low",
        display: "Wet threshold (10% depletion)",
        label: "",
        value: "23",
        min: "0",
        max: "239",
        units: "kPa",
      },
      {
        name: "thr_high",
        display: "Dry threshold (40% depletion)",
        label: "",
        value: "65",
        min: "0",
        max: "239",
        units: "kPa",
      },
      {
        name: "wiring",
        display: "Connection",
        label: "How the sensor reaches the board. Through the 200SS-VA3 adapter, which does the excitation and calibration itself, or wired straight to the Arduino with a series resistor. Direct wiring supports one Watermark only: two bare sensors in the same soil read through each other and damage their electrodes.",
        value: "200SS-VA3 adapter",
        min: "",
        max: "",
        units: "",
        choices: "200SS-VA3 adapter|Direct to Arduino",
      },
      {
        name: "Rx",
        display: "Series resistor",
        label: "Series resistor between the sensor and ground, used only for direct wiring. Irrometer's reference circuit uses 10 kilohms.",
        value: "10",
        min: "1",
        max: "100",
        units: "kOhm",
      },
    ],
  },
  Temperature: {
    label: "Irrometer Soil Temperature Sensor (200TS)",
    tip: "You are reading soil temperature in Fahrenheit using your soil temperature sensor.",
    outputs: [
      {
        value: "Raw value (Temperature, in °F)",
        display: "Raw value (Temperature, in °F)",
        tip: "You are reading soil temperature in Fahrenheit using your soil temperature sensor.",
      },
      {
        value: "Raw value (Temperature, in °C)",
        display: "Raw value (Temperature, in °C)",
        tip: "You are reading soil temperature in Celsius using your soil temperature sensor.",
      },
    ],
    params: [
      {
        name: "wiring",
        display: "Connection",
        label: "How the sensor reaches the board. Through the 200SS-VA3 adapter, which does the excitation and calibration itself, or wired straight to the Arduino with a series resistor. Direct wiring supports one Watermark only: two bare sensors in the same soil read through each other and damage their electrodes.",
        value: "200SS-VA3 adapter",
        min: "",
        max: "",
        units: "",
        choices: "200SS-VA3 adapter|Direct to Arduino",
      },
      {
        name: "Rx",
        display: "Series resistor",
        label: "Series resistor between the sensor and ground, used only for direct wiring. Irrometer's reference circuit uses 10 kilohms.",
        value: "10",
        min: "1",
        max: "100",
        units: "kOhm",
      },
      {
        name: "therm_r25",
        display: "Thermistor R at 25 C",
        label: "Resistance of the 200TS at 25 C, for direct wiring. NOT PUBLISHED BY IRROMETER: the datasheet says the curve is built into their reading devices. The default assumes a generic 10 kilohm NTC and must be checked against your sensor before the reading is trusted.",
        value: "10000",
        min: "100",
        max: "100000",
        units: "Ohm",
      },
      {
        name: "therm_beta",
        display: "Thermistor beta",
        label: "Beta coefficient of the 200TS, for direct wiring. Same caveat as the resistance above: this is a generic NTC value, not an Irrometer figure.",
        value: "3435",
        min: "1000",
        max: "6000",
        units: "K",
      },
    ],
  },
};

const PORT_TIPS = {
  A1: "Analog pin A1. A0 is taken by the shield's buttons, so sensors start here.",
  A2: "Analog pin A2.",
  A3: "Analog pin A3.",
  A4: "Analog pin A4.",
  A5: "Analog pin A5.",
};

const PORTS = [
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
];

const VIZ_OPTIONS = [
  {
    value: "none",
    label: "No visualization",
    tip: "Display the information in a visual representation on the LCD screen. Currently there is nothing selected.",
  },
  {
    value: "bar",
    label: "Loading bar",
    tip: "Displays a loading bar that changes based on water content.",
  },
  {
    value: "raw_lcd",
    label: "Raw value",
    tip: "Displays the raw sensor value",
  },
  {
    value: "state_lcd",
    label: "State: Very Dry, Dry, or Wet",
    tip: "Displays the general state at which soil seems to be for the capacitive sensors",
  },
  {
    value: "transformed_lcd",
    label: "Transformed Raw Value 0-100",
    tip: "A more concise version of the raw sensor value",
  },
  {
    value: "front_lcd",
    label: "Front detected",
    tip: "Shows front detected when the wetting front reaches the deep sensor",
  },
  {
    value: "temp_lcd",
    label: "Temperature",
    tip: "Displays the temperatue in celsius",
  },
  {
    value: "kpa_lcd",
    label: "Tension",
    tip: "Displays soil tension in kPa",
  },
  {
    value: "rate_lcd",
    label: "Flow rate",
    tip: "Displays the flow rate between 2 sensors",
  },
  {
    value: "wm_state_lcd",
    label: "State: Dry plant stressed, Irrigation range, or Saturation",
    tip: "Displays the state at which the soils seems to be for the Watermark sensors",
  },
];

const SURVEY_QUESTIONS = [
  {
    key: "filename",
    label: "File name",
    type: "text",
    required: true,
    placeholder: "e.g. apples_field2 (no spaces, no .ino)",
  },
  {
    key: "name",
    label: "Your name",
    type: "text",
    required: true,
    placeholder: "e.g. John R.",
  },
  {
    key: "country",
    label: "Country",
    type: "text",
    required: true,
    placeholder: "e.g. United States of America",
  },
  {
    key: "email",
    label: "Email address",
    type: "email",
    required: true,
    placeholder: "e.g. name@example.com",
  },
  {
    key: "ino_comment",
    label: "Comment to include in the code (optional)",
    type: "text",
    required: false,
    placeholder: "e.g. Orchard block 2, installed June 2026",
  },
];

const OUTPUT_PARAMS = {
  DF_robot: {
    "Raw Value (ADC)": ["air_val_min"],
    "Raw Value (%)": ["air_val_max", "water_val"],
    "Thresholds": ["a", "b"],
    "Wetting Front": ["shallow", "deep", "threshold"],
    "Volumetric Soil Moisture": ["air_val", "water_val", "FC", "WP"],
    "Vertical Flow Rate": ["shallow", "deep", "threshold"],
    "Total Available Water": ["air_val", "water_val", "FC", "WP"],
  },
  Watermark: {
    "Raw value (Resistance)": [],
    "Raw Value (%)": ["abs(air_val_max)", "water_val"],
    "Tension (kPa)": [],
    "Management Thresholds": ["soil_type", "thr_low", "thr_high"],
  },
  Watermark_Temperature: {
    "Raw value (Resistance)": [],
    "Raw Value (%)": ["abs(air_val_max)", "water_val"],
    "Tension": [],
    "Raw value (Temperature, in °F)": [],
    "Raw value (Temperature, in °C)": [],
    "Management Thresholds": ["soil_type", "thr_low", "thr_high"],
  },
  Temperature: {
    "Raw value (Temperature, in °F)": [],
    "Raw value (Temperature, in °C)": [],
  },
};

const OUTPUT_VIZ = {
  DF_robot: {
    "Raw Value (ADC)": ["none", "raw_lcd"],
    "Raw Value (%)": ["none", "bar", "transformed_lcd"],
    "Thresholds": ["none", "state_lcd"],
    "Wetting Front": ["none", "front_lcd"],
    "Volumetric Soil Moisture": ["none", "bar", "transformed_lcd", "state_lcd"],
    "Vertical Flow Rate": ["none", "rate_lcd"],
    "Total Available Water": ["none", "bar", "transformed_lcd", "state_lcd"],
  },
  Watermark: {
    "Raw value (Resistance)": ["none", "raw_lcd"],
    "Raw Value (%)": ["none", "wm_state_lcd", "bar", "transformed_lcd"],
    "Tension (kPa)": ["none", "kpa_lcd"],
    "Management Thresholds": ["none", "wm_state_lcd"],
  },
  Watermark_Temperature: {
    "Raw value (Resistance)": ["none", "raw_lcd"],
    "Raw Value (%)": ["none", "wm_state_lcd", "bar", "transformed_lcd"],
    "Tension": ["none", "kpa_lcd"],
    "Raw value (Temperature, in °F)": ["none", "temp_lcd"],
    "Raw value (Temperature, in °C)": ["none", "temp_lcd"],
    "Management Thresholds": ["none", "wm_state_lcd"],
  },
  Temperature: {
    "Raw value (Temperature, in °F)": ["none", "temp_lcd"],
    "Raw value (Temperature, in °C)": ["none", "temp_lcd"],
  },
};

const TEMPLATES = {
  sensors: {
    DF_robot: {
      constants: `/* Sensor {idx}: DF_robot on port {port} */
const int   air_val_min_{idx} = {air_val_min};
const int   air_val_max_{idx} = {air_val_max};
const int   Vair_{idx}        = {air_val};
const int   Vwat_{idx}        = {water_val};
const float k_{idx}           = {k};
float WP_{idx}                = {wp};
float FC_{idx}                = {fc};
const int   thr_a_{idx}       = {a};
const int   thr_b_{idx}       = {b};
const int   front_thr_{idx}   = {threshold};
const int   shallowDepth_{idx} = {shallow};
const int   deepDepth_{idx}    = {deep};
`,
      read: `  int sensorValue_{idx} = analogRead({readPin});
  bool connected_{idx} = portHasSensor({readPin}) && sensorValue_{idx} < 1015;
  /* Volumetric water content: x = -1/k * ln((V - Vwat) / (Vair - Vwat))
     Every divisor and logarithm is guarded, because a parameter this output
     does not use is emitted as 0 and would otherwise divide by zero. */
  x = 0;
  if (k_{idx} != 0 && (Vair_{idx} - Vwat_{idx}) > 0 && (sensorValue_{idx} - Vwat_{idx}) > 0) {
    x = (-1.0 / k_{idx}) *
        (log((float)(sensorValue_{idx} - Vwat_{idx})) - log((float)(Vair_{idx} - Vwat_{idx})));
  }`,
    },
    Temperature: {
      constants: `/* Sensor {idx}: Irrometer 200TS soil temperature sensor on {port},
   read through the 200SS-VA3 adapter. */
const float Vref_{idx} = 5.0;
`,
      read: `  int   sensorValue_{idx} = readSettled({readPin});
  float tempVolts_{idx} = (sensorValue_{idx} / 1023.0) * Vref_{idx};
  /* The VA-3 scales temperature over 0.49 to 2.8 V, so anything below that
     floor is a missing or unwired probe rather than very cold soil. Without
     this check an empty channel reads about -4 F and looks like data. */
  bool  connected_{idx} = sensorValue_{idx} < VA3_MAX_COUNTS &&
                          tempVolts_{idx} >= VA3_TEMP_MIN_VOLTS;
  float tempF_{idx}     = 48.48 * (tempVolts_{idx} - 0.490) + 20.0;
  float T_{idx}         = (tempF_{idx} - 32.0) / 1.8;`,
    },
    Watermark: {
      constants: `/* Sensor {idx}: Watermark via 200SS-VA3 adapter on port {port}
   The adapter outputs 0-2.8 V proportional to tension: kPa = Volts / 0.01176.
   It performs sensor excitation, the calibration equation and (when a 200TS
   is fitted) temperature compensation internally. */
const float Vref_{idx}    = 5.0;      /* Arduino ADC reference */
const float VA3_SCALE_{idx} = 0.01176; /* volts per centibar, 200SS-VA3 datasheet */
const float dry_kPa_{idx} = {air_val_max};   /* tension treated as 0 %  */
const float wet_kPa_{idx} = {water_val};     /* tension treated as 100 % */
const float thr_low_{idx}  = {thr_low};      /* 10 % depletion, kPa */
const float thr_high_{idx} = {thr_high};     /* 40 % depletion, kPa */
`,
      read: `  int   sensorValue_{idx} = readSettled({readPin});
  /* The VA-3 actively drives this pin, so the float test detects a missing
     adapter. Note 0 V is also a legitimate reading (fully saturated soil). */
  bool  connected_{idx} = sensorValue_{idx} < VA3_MAX_COUNTS;   /* passive: VA-3 never nears 5 V */
  float volts_{idx} = (sensorValue_{idx} / 1023.0) * Vref_{idx};
  float kPa_{idx}   = volts_{idx} / VA3_SCALE_{idx};   /* soil water tension */`,
    },
    /* Watermark wired straight to the board, no adapter. Resistance is
       measured with the shared excitation pins and converted with Irrometer's
       own three-segment calibration. */
    Watermark_direct: {
      constants: `/* Sensor {idx}: Watermark 200SS wired direct to {port}.
   Series resistor to ground on the same pin; excitation on D2 and D3.
   No adapter, so the sketch does the excitation and calibration itself. */
const float Rx_{idx}          = {Rx};            /* series resistor, kOhm */
const float soilTempC_{idx}   = {soil_temp_c};   /* used to compensate */
const float dry_kPa_{idx}     = {air_val_max};
const float wet_kPa_{idx}     = {water_val};
const float thr_low_{idx}     = {thr_low};
const float thr_high_{idx}    = {thr_high};
`,
      read: `  float resK_{idx} = readDirectResistance({readPin}, Rx_{idx});
  bool  connected_{idx} = resK_{idx} > 0 && (resK_{idx} * 1000.0) < WM_OPEN_OHMS;
  float kPa_{idx} = connected_{idx}
                    ? constrain(watermarkCentibars(resK_{idx}, soilTempC_{idx}), 0, 239)
                    : 0;
  int   sensorValue_{idx} = (int)(resK_{idx} * 10);   /* kOhm x10, for display */
  float volts_{idx} = 0;   /* not meaningful on this wiring */`,
    },

    /* 200TS wired straight to the board. Resistance is honest; the conversion
       to temperature is not Irrometer's, see the tooltip on the coefficients. */
    Temperature_direct: {
      constants: `/* Sensor {idx}: Irrometer 200TS wired direct to {port}.
   The 200TS is a thermistor. Irrometer does not publish its resistance to
   temperature curve, so the coefficients below are a generic NTC assumption
   the grower can correct. Resistance itself is measured, not assumed. */
const float Rx_{idx}       = {Rx};           /* series resistor, kOhm */
const float thermR25_{idx} = {therm_r25};    /* ohms at 25 C */
const float thermBeta_{idx} = {therm_beta};  /* K */
`,
      read: `  float resK_{idx} = readDirectResistance({readPin}, Rx_{idx});
  bool  connected_{idx} = resK_{idx} > 0.05 && resK_{idx} < 500.0;
  /* Beta equation: 1/T = 1/T0 + (1/B) ln(R/R0), kelvin throughout. */
  float T_{idx} = 0;
  if (connected_{idx}) {
    float ohms_{idx} = resK_{idx} * 1000.0;
    float invT_{idx} = (1.0 / 298.15) + (1.0 / thermBeta_{idx}) * log(ohms_{idx} / thermR25_{idx});
    T_{idx} = (1.0 / invT_{idx}) - 273.15;
  }
  float tempF_{idx} = T_{idx} * 1.8 + 32.0;
  int   sensorValue_{idx} = (int)(resK_{idx} * 10);
  float tempVolts_{idx} = 0;   /* not meaningful on this wiring */`,
    },

    Watermark_Temperature: {
      constants: `/* Sensor {idx}: Watermark + 200TS temperature, both via the 200SS-VA3.
   Watermark channel on {port}, shared temperature channel on {partnerPort}.
   The adapter compensates the tension internally; the temperature channel is
   read here only so it can be displayed. */
const float Vref_{idx}      = 5.0;
const float VA3_SCALE_{idx} = 0.01176;   /* volts per centibar, VA-3 datasheet */
const float dry_kPa_{idx}   = {air_val_max};
const float wet_kPa_{idx}   = {water_val};
const float thr_low_{idx}   = {thr_low};    /* 10 % depletion, kPa */
const float thr_high_{idx}  = {thr_high};   /* 40 % depletion, kPa */
`,
      read: `  /* Watermark channel on {port}; shared 200TS channel on {partnerPort} */
  int   sensorValue_{idx} = readSettled({readPin});
  bool  connected_{idx} = sensorValue_{idx} < VA3_MAX_COUNTS;   /* passive: VA-3 never nears 5 V */
  float volts_{idx} = (sensorValue_{idx} / 1023.0) * Vref_{idx};
  float kPa_{idx}   = volts_{idx} / VA3_SCALE_{idx};   /* already compensated */

  /* degF = 48.48 x (Volts - 0.490) + 20   (VA-3 temperature scaling) */
  int   tempRaw_{idx}   = readSettled({partnerPort});
  float tempVolts_{idx} = (tempRaw_{idx} / 1023.0) * Vref_{idx};
  bool  tempPresent_{idx} = tempVolts_{idx} >= VA3_TEMP_MIN_VOLTS;
  float tempF_{idx}     = 48.48 * (tempVolts_{idx} - 0.490) + 20.0;
  float T_{idx}         = (tempF_{idx} - 32.0) / 1.8;`,
    },
  },
  outputs: {
    Temperature: {
      "Temperature F": `  /* degF = 48.48 x (Volts - 0.490) + 20 */
  percent = (int)tempF_{idx};`,
      "Temperature C": `  percent = (int)T_{idx};`,
      "Raw value (Temperature)": `  percent = (int)T_{idx};`,
      "Raw Value": `  percent = sensorValue_{idx};`,
    },
    DF_robot: {
      "Raw Value": `  percent = sensorValue_{idx};`,
      "Transformed Raw Value": `  /* (X - min) / (max - min) * 100, where min is the reading in air and
     max is the reading in water. A capacitive probe reads HIGH in air and
     LOW in water, so the span runs downwards: air = 0 %, water = 100 %. */
  if (air_val_max_{idx} == Vwat_{idx}) {
    percent = 0;                       /* not calibrated - avoid divide by zero */
  } else {
    percent = (int)constrain(
      (air_val_max_{idx} - (float)sensorValue_{idx}) * 100.0 / (air_val_max_{idx} - Vwat_{idx}),
      0, 100
    );
  }`,
      /* Volumetric water content in its own right: x is already a fraction of
         soil volume, so this is simply x as a percentage. Distinct from Total
         Available Water below, which rescales the same x against the field
         capacity and wilting point of this soil. The two used to emit
         identical code, which meant one of them was answering the wrong
         question. */
      "Total Available Water (volumetric?)": `  percent = (int)constrain(x * 100.0, 0, 100);`,
      /* The fraction of the water the soil can actually give a crop:
         0 % at the wilting point, 100 % at field capacity. Wetter than field
         capacity still reads 100 %, which is correct: the surplus drains. */
      "Total Available Water": `  if (FC_{idx} <= WP_{idx}) {
    percent = 0;                       /* thresholds not set */
  } else {
    percent = (int)constrain((x - WP_{idx}) * 100.0 / (FC_{idx} - WP_{idx}), 0, 100);
  }`,
      "Rate of Change": `  /* dV/dt = a (good or stop irrigating) */
  static unsigned long lastTime_{idx}  = 0;
  static int            prevValue_{idx} = sensorValue_{idx};
  unsigned long nowTime_{idx} = millis();
  float dt_{idx} = (nowTime_{idx} - lastTime_{idx}) / 1000.0;
  float dVdt_{idx} = (dt_{idx} > 0) ? ((sensorValue_{idx} - prevValue_{idx}) / dt_{idx}) : 0;
  percent = (dVdt_{idx} <= thr_a_{idx}) ? 100 : 0;  /* 100 = good, 0 = stop irrigating */
  prevValue_{idx} = sensorValue_{idx};
  lastTime_{idx}  = nowTime_{idx};`,
      "Wetting Front": `  /* Two sensors at different depths. Water has "arrived" at a depth
     once that sensor reads below the threshold. Report the deepest one reached. */
  int deepReading_{idx} = readSettled({partnerPort});
  int frontDepth_{idx};
  if      (deepReading_{idx}    < front_thr_{idx}) frontDepth_{idx} = deepDepth_{idx};
  else if (sensorValue_{idx}    < front_thr_{idx}) frontDepth_{idx} = shallowDepth_{idx};
  else                                             frontDepth_{idx} = -1;
  percent = (frontDepth_{idx} < 0) ? 0 : 100;`,
      "Vertical flow rate": `  /* Speed of the wetting front between the two sensor depths.
     Each depth records the moment it first reads below the threshold; the
     rate is the depth difference divided by the time between them. */
  int deepReading_{idx} = readSettled({partnerPort});
  static unsigned long tShallow_{idx} = 0;
  static unsigned long tDeep_{idx}    = 0;
  static int           rate_{idx}     = -1;   /* -1 = not measured yet */
  bool wetShallow_{idx} = sensorValue_{idx} < front_thr_{idx};
  bool wetDeep_{idx}    = deepReading_{idx} < front_thr_{idx};

  if (wetShallow_{idx} && tShallow_{idx} == 0) tShallow_{idx} = millis();
  if (wetDeep_{idx}    && tDeep_{idx}    == 0) tDeep_{idx}    = millis();

  if (tShallow_{idx} && tDeep_{idx} && rate_{idx} < 0) {
    unsigned long dt_{idx} = (tDeep_{idx} > tShallow_{idx})
                             ? (tDeep_{idx} - tShallow_{idx}) : 1;
    float hours_{idx} = dt_{idx} / 3600000.0;
    float cm_{idx}    = (float)(deepDepth_{idx} - shallowDepth_{idx});
    rate_{idx} = (hours_{idx} > 0) ? (int)(cm_{idx} / hours_{idx}) : 0;
  }

  /* Reset once the soil dries back out, so the next irrigation is measured. */
  if (!wetShallow_{idx} && !wetDeep_{idx}) {
    tShallow_{idx} = 0; tDeep_{idx} = 0; rate_{idx} = -1;
  }
  percent = (rate_{idx} < 0) ? 0 : rate_{idx};`,

      "1-2-3 point calibration": `  /* soil_moisture - WP*100/(FC-WP), with both divisors guarded */
  float soil_moisture_{idx} = 0;
  if (thr_b_{idx} != thr_a_{idx}) {
    soil_moisture_{idx} = (float)(sensorValue_{idx} - thr_a_{idx}) * 100.0 / (thr_b_{idx} - thr_a_{idx});
  }
  if (FC_{idx} != WP_{idx}) {
    percent = (int)(soil_moisture_{idx} - WP_{idx} * 100.0 / (FC_{idx} - WP_{idx}));
  } else {
    percent = (int)soil_moisture_{idx};
  }`,
      "Management thresholds": `  /* Capacitive probe reads HIGH when dry, and percent is
     always "higher = wetter", so dry maps to 0 and wet to 100. */
  if      (sensorValue_{idx} > thr_a_{idx}) percent = 0;    /* very dry */
  else if (sensorValue_{idx} > thr_b_{idx}) percent = 50;   /* dry      */
  else                                       percent = 100; /* wet      */`,

      "Threshold (very dry/dry/wet)": `  /* Capacitive probe reads HIGH when dry:
     x > a -> very dry, x > b -> dry, otherwise wet (expects a > b). */
  if      (sensorValue_{idx} > thr_a_{idx}) percent = 0;
  else if (sensorValue_{idx} > thr_b_{idx}) percent = 50;
  else                                       percent = 100;`,
    },
    Watermark: {
      "Transformed Raw Value": `  /* Tension expressed as a wetness percentage: dry_kPa -> 0 %, wet_kPa -> 100 % */
  {
    float wmSpan_{idx} = dry_kPa_{idx} - wet_kPa_{idx};
    percent = (wmSpan_{idx} != 0)
      ? (int)constrain((dry_kPa_{idx} - kPa_{idx}) * 100.0 / wmSpan_{idx}, 0, 100)
      : 0;   /* not calibrated */
  }`,
      "Raw value (Resistance)": `  /* The VA-3 outputs tension, not resistance, so the raw figure
     available here is the adapter's own reading in kPa. */
  percent = (int)kPa_{idx};`,

      Tension: `  /* kPa = Volts / 0.01176 (200SS-VA3 output scaling, 0 to 239 kPa) */
  percent = (int)constrain(kPa_{idx}, 0, 239);`,

      "Management thresholds": `  /* Soil water tension against the irrigation range for this soil type.
     Low tension means wet, so percent runs 0 = driest .. 100 = wettest. */
  if      (kPa_{idx} >= thr_high_{idx}) percent = 0;    /* dry, plant stressed */
  else if (kPa_{idx} >  thr_low_{idx})  percent = 50;   /* irrigation range   */
  else                                  percent = 100;  /* saturation         */`,
    },
    Watermark_direct: {
      "Raw value (Resistance)": `  /* Genuine resistance on this wiring, in kOhm */
  percent = (int)resK_{idx};`,
      Tension: `  percent = (int)kPa_{idx};`,
      "Transformed Raw Value": `  {
    float wmSpan_{idx} = dry_kPa_{idx} - wet_kPa_{idx};
    percent = (wmSpan_{idx} != 0)
      ? (int)constrain((dry_kPa_{idx} - kPa_{idx}) * 100.0 / wmSpan_{idx}, 0, 100)
      : 0;
  }`,
      "Management thresholds": `  if      (kPa_{idx} >= thr_high_{idx}) percent = 0;
  else if (kPa_{idx} >  thr_low_{idx})  percent = 50;
  else                                  percent = 100;`,
    },

    Temperature_direct: {
      "Temperature F": `  percent = (int)tempF_{idx};`,
      "Temperature C": `  percent = (int)T_{idx};`,
      "Raw value (Temperature)": `  percent = (int)T_{idx};`,
      "Raw Value": `  percent = (int)resK_{idx};   /* resistance, kOhm */`,
    },

    Watermark_Temperature: {
      "Temperature F": `  /* deg F = 20 + 48.48 x (V - 0.49) */
  percent = (int)tempF_{idx};`,

      "Temperature C": `  /* deg C = (deg F - 32) / 1.8 */
  percent = (int)T_{idx};`,

      "Raw value (Temperature)": `  percent = (int)T_{idx};  /* temperature, directly read */`,
      "Raw value (Resistance)": `  /* The VA-3 reports tension, not resistance */
  percent = (int)kPa_{idx};`,
      "Transformed Raw Value": `  /* Tension as a wetness percentage: dry_kPa -> 0 %, wet_kPa -> 100 % */
  {
    float wmSpan_{idx} = dry_kPa_{idx} - wet_kPa_{idx};
    percent = (wmSpan_{idx} != 0)
      ? (int)constrain((dry_kPa_{idx} - kPa_{idx}) * 100.0 / wmSpan_{idx}, 0, 100)
      : 0;   /* not calibrated */
  }`,
      Temperature: `  percent = (int)T_{idx};  /* temperature, directly read */`,
      Tension: `  /* kPa = Volts / 0.01176, temperature-compensated inside the VA-3 */
  percent = (int)constrain(kPa_{idx}, 0, 239);`,

      "Management thresholds": `  /* Soil water tension against the irrigation range for this soil type.
     Low tension means wet, so percent runs 0 = driest .. 100 = wettest. */
  if      (kPa_{idx} >= thr_high_{idx}) percent = 0;    /* dry, plant stressed */
  else if (kPa_{idx} >  thr_low_{idx})  percent = 50;   /* irrigation range   */
  else                                  percent = 100;  /* saturation         */`,
    },
  },
  viz: {
    none: {
      includes: "",
      globals: "",
      setup: "",
      loop: `  /* no visualization for sensor {idx} */`,
    },
    bar: {
      includes: `#include <LiquidCrystal.h>`,
      globals: `LiquidCrystal lcd(8, 9, 4, 5, 6, 7);
const int LCD_NB_ROWS    = 2;
const int LCD_NB_COLUMNS = 16;

byte START_DIV_0_OF_1[8] = { B01111, B11000, B10000, B10000, B10000, B10000, B11000, B01111 };
byte START_DIV_1_OF_1[8] = { B01111, B11000, B10011, B10111, B10111, B10011, B11000, B01111 };
byte DIV_0_OF_2[8]       = { B11111, B00000, B00000, B00000, B00000, B00000, B00000, B11111 };
byte DIV_1_OF_2[8]       = { B11111, B00000, B11000, B11000, B11000, B11000, B00000, B11111 };
byte DIV_2_OF_2[8]       = { B11111, B00000, B11011, B11011, B11011, B11011, B00000, B11111 };
byte END_DIV_0_OF_1[8]   = { B11110, B00011, B00001, B00001, B00001, B00001, B00011, B11110 };
byte END_DIV_1_OF_1[8]   = { B11110, B00011, B11001, B11101, B11101, B11001, B00011, B11110 };

void setup_progressbar() {
  lcd.createChar(0, START_DIV_0_OF_1);
  lcd.createChar(1, START_DIV_1_OF_1);
  lcd.createChar(2, DIV_0_OF_2);
  lcd.createChar(3, DIV_1_OF_2);
  lcd.createChar(4, DIV_2_OF_2);
  lcd.createChar(5, END_DIV_0_OF_1);
  lcd.createChar(6, END_DIV_1_OF_1);
}

void draw_progressbar(byte pct, const __FlashStringHelper *label) {
  lcd.setCursor(0, 0);
  lcd.print(label); lcd.print(F(": "));
  lcd.print(pct); lcd.print(F(" %          "));
  lcd.setCursor(0, 1);
  byte nb_columns = map(pct, 0, 100, 0, LCD_NB_COLUMNS * 2 - 2);
  for (byte i = 0; i < LCD_NB_COLUMNS; ++i) {
    if (i == 0) {
      lcd.write(nb_columns > 0 ? (nb_columns -= 1, 1) : (byte)0);
    } else if (i == LCD_NB_COLUMNS - 1) {
      lcd.write(nb_columns > 0 ? 6 : 5);
    } else {
      if      (nb_columns >= 2) { lcd.write(4); nb_columns -= 2; }
      else if (nb_columns == 1) { lcd.write(3); nb_columns -= 1; }
      else                        lcd.write(2);
    }
  }
}`,
      setup: `  lcd.begin(LCD_NB_COLUMNS, LCD_NB_ROWS);
  setup_progressbar();
  setBacklight(true);
  lastActivity = millis();`,
      loop: `  draw_progressbar((byte)constrain(percent, 0, 100), F("{label}"));`,
    },
    raw_lcd: {
      includes: "",
      globals: "",
      setup: "",
      loop: `  lcd.setCursor(0, 0);
  lcd.print(F("{label} "));
  lcd.print(percent); lcd.print(F("        "));
  lcd.setCursor(0, 1);
  lcd.print(F("                "));`,
    },
    state_lcd: {
      includes: "",
      globals: "",
      setup: "",
      loop: `  lcd.setCursor(0, 0);
  lcd.print(F("{label}        "));
  lcd.setCursor(0, 1);
{stateLines}`,
    },
    transformed_lcd: {
      includes: "",
      globals: "",
      setup: "",
      loop: `  lcd.setCursor(0, 0);
  lcd.print(F("{label} "));
  lcd.print(percent); lcd.print(F(" %      "));
  lcd.setCursor(0, 1);
  lcd.print(F("                "));`,
    },
    front_lcd: {
      includes: "",
      globals: "",
      setup: "",
      loop: `  lcd.setCursor(0, 0);
  lcd.print(F("{label} front  "));
  lcd.setCursor(0, 1);
  if      (frontDepth_{idx} < 0) lcd.print(F("not arrived yet "));
  else  { lcd.print(F("at ")); lcd.print(frontDepth_{idx}); lcd.print(F(" cm       ")); }`,
    },
    temp_lcd: {
      includes: "",
      globals: "",
      setup: "",
      loop: `  lcd.setCursor(0, 0);
  lcd.print(F("{label} "));
  lcd.print(percent); lcd.print(F(" {tempUnit}      "));
  lcd.setCursor(0, 1);
  lcd.print(F("                "));`,
    },
    wm_state_lcd: {
      includes: "",
      globals: "",
      setup: "",
      loop: `  lcd.setCursor(0, 0);
  lcd.print(F("{label}        "));
  lcd.setCursor(0, 1);
  if      (percent == 0)  lcd.print(F("Dry plant stress"));
  else if (percent < 100) lcd.print(F("Irrigation range"));
  else                    lcd.print(F("Saturation      "));`,
    },
    rate_lcd: {
      includes: "",
      globals: "",
      setup: "",
      loop: `  lcd.setCursor(0, 0);
  lcd.print(F("{label}        "));
  lcd.setCursor(0, 1);
  if (percent <= 0) lcd.print(F("front not moved "));
  else { lcd.print(percent); lcd.print(F(" cm/hr         ")); }`,
    },
    kpa_lcd: {
      includes: "",
      globals: "",
      setup: "",
      loop: `  lcd.setCursor(0, 0);
  lcd.print(F("{label} "));
  lcd.print(percent); lcd.print(F(" kPa    "));
  /* Tension runs the opposite way to every percentage on this display: 0 kPa
     is saturated soil, a big number is dry. The figure stays in kPa because
     that is what it is, and line 2 says which way it runs so nobody has to
     remember. */
  lcd.setCursor(0, 1);
  if      (kPa_{idx} >= thr_high_{idx}) lcd.print(F("DRY  stressed   "));
  else if (kPa_{idx} >  thr_low_{idx})  lcd.print(F("OK   irrigate   "));
  else                                  lcd.print(F("WET  saturated  "));`,
    },
  },
  buttonNav: {
    globals: `const int buttonPin = A0;
const int numSensors = {numBlocks};
int currentSensor    = 0;

/* ---- Battery monitoring (9 V through the barrel jack) ----
   The ADC normally measures against the supply, so a sagging supply is
   invisible. Comparing the fixed internal 1.1 V reference against the supply
   instead lets the chip work out its own rail voltage. This only reports
   anything useful when the board is powered through VIN or the barrel jack;
   on regulated USB power the rail stays at 5 V until it simply stops. */
const float BATT_WARN_V  = 4.75;   /* rail sags below this as a 9 V dies */
const float BATT_CLEAR_V = 4.85;   /* must rise past this to clear the warning */
bool battLow = false;

float readSupplyVoltage() {
  /* Measure the 1.1 V bandgap against Vcc, then invert to get Vcc.
     This repoints the ADC multiplexer, so afterwards it is put back on a
     normal channel and given a throwaway conversion. Without that, the next
     sensor reading is taken while the mux is still settling and comes back
     wildly wrong (a temperature channel would swing between its extremes). */
  ADMUX = _BV(REFS0) | _BV(MUX3) | _BV(MUX2) | _BV(MUX1);
  delay(3);                       /* let the reference settle */
  ADCSRA |= _BV(ADSC);
  while (bit_is_set(ADCSRA, ADSC));
  uint16_t result = ADCL | (ADCH << 8);

  analogRead(A0);                 /* restore the mux to a real channel */
  delay(2);
  analogRead(A0);                 /* throwaway conversion so it settles */

  if (result == 0) return 5.0;
  return 1125300.0 / result / 1000.0;   /* 1.1 * 1023 * 1000 / reading */
}

void checkBattery() {
  static unsigned long lastCheck = 0;
  if (millis() - lastCheck < 30000UL && lastCheck != 0) return;
  lastCheck = millis();
  float v = readSupplyVoltage();
  /* Hysteresis so a reading sitting on the threshold does not flicker. */
  if (!battLow && v < BATT_WARN_V)  battLow = true;
  if (battLow  && v > BATT_CLEAR_V) battLow = false;
}

/* ---- Screen blanking ----
   The backlight is the largest single draw. It turns off after a period of
   inactivity and comes back on the next button press. Readings and logging
   continue while the screen is off. */
const int  LCD_BACKLIGHT_PIN = 10;      /* change if your shield differs */
const unsigned long SCREEN_TIMEOUT_MS = 300000UL;   /* 5 minutes */
unsigned long lastActivity = 0;
bool screenOn = true;

void setBacklight(bool on) {
  pinMode(LCD_BACKLIGHT_PIN, OUTPUT);
  digitalWrite(LCD_BACKLIGHT_PIN, on ? HIGH : LOW);
  screenOn = on;
}

void updateScreenPower() {
  if (screenOn && (millis() - lastActivity > SCREEN_TIMEOUT_MS)) {
    lcd.clear();
    setBacklight(false);
  }
}

/* Is anything actually plugged into this port?
   A pin with nothing attached is high impedance: it floats, and analogRead()
   still returns a number, so the sketch would happily display noise as data.
   We read the pin twice, once with the internal (~30k) pull-up engaged and
   once without. A sensor that is driving the pin holds its level against that
   weak pull-up, so both readings agree. A bare pin follows the pull-up and the
   two readings diverge. The pin is never driven as an output, so this can
   never fight a sensor that is present. */
const int FLOAT_SWING = 200;   /* ADC counts the pin may move before we call it empty */

/* Is a VA-3 channel present?
   The adapter refreshes each channel every 5 minutes, so between updates its
   output is a HELD value with high impedance. Engaging the Arduino pull-up
   drags that node toward 5 V (reading "missing") and can corrupt the held
   value until the next refresh. So: never load the pin, only read it.
   The VA-3 never outputs above 2.8 V (~573 counts), so a pin near the 5 V
   rail cannot be a real channel. A reading of 0 is valid: saturated soil. */
/* The VA-3 cannot output above 2.8 V, which is 573 counts on a 5 V reference.
   Anything meaningfully above that is an unconnected pin, not a reading, so
   the channel is reported as missing rather than converted into a number. */
const int VA3_MAX_COUNTS = 620;

/* The VA-3's temperature channel is scaled 0.49 to 2.8 V for 20 to 132 F.
   Below 0.49 V the channel is not reporting a temperature at all. */
const float VA3_TEMP_MIN_VOLTS = 0.45;   /* 0.49 V floor, with a little slack */

int readSettled(uint8_t pin) {
  /* All analog pins share one ADC whose sample capacitor keeps charge from
     the channel read just before, and the button ladder on A0 is read every
     loop. While a button is held, A0 sits near 0 V and drags the next
     reading down, which showed a submerged Watermark as wetter whenever a
     button was pressed. Against the VA-3's weakly driven output a single
     extra read is not always enough, so sample until the value stops
     moving (or give up after a few tries and take the latest). */
  /* Read a few times and AVERAGE, discarding the first throwaway sample.
     The VA-3 output is high impedance between its 5 minute refreshes, so a
     single reading picks up ADC crosstalk and mains hum and jumps around.
     Averaging several settled samples turns that jitter into a steady value. */
  analogRead(pin);                 /* throwaway: let the mux/ADC cap settle */
  delayMicroseconds(200);
  long sum = 0;
  const byte N = 8;
  for (byte i = 0; i < N; i++) {
    sum += analogRead(pin);
    delayMicroseconds(300);
  }
  return (int)(sum / N);
}

bool va3ChannelPresent(uint8_t pin) {
  return readSettled(pin) < VA3_MAX_COUNTS;   /* passive - no pull-up, ever */
}

/* ---------------------------------------------------------------------
   Direct wiring, no adapter.

   A bare WATERMARK is a variable resistor. Irrometer's reference circuit puts
   it in a divider with a known series resistor and reads the midpoint. Two
   rules from their developer guide are not optional:

     - excitation must alternate polarity. A steady DC voltage builds charge on
       the electrodes, which offsets the reading and eats the sensor. Two
       digital pins take turns being source and ground, and the two readings
       are averaged.
     - excitation must be brief. No more than 50 ms, with the measurement taken
       within about 100 microseconds of it starting.

   ONE bare sensor only. Wet soil conducts between sensors, so two of them
   share a path and the board ends up reading between the wrong electrodes.
   Isolating more than one needs a multiplexer, which this sketch does not
   drive. The form refuses to generate more than one direct block.
   --------------------------------------------------------------------- */

const int WM_EXC_A = 2;    /* free on the LCD keypad shield */
const int WM_EXC_B = 3;
const long WM_OPEN_OHMS  = 40000L;   /* above this: nothing connected */
const long WM_SHORT_OHMS = 200L;     /* below this: shorted leads */

float readDirectResistance(uint8_t pin, float rxKOhm) {
  pinMode(WM_EXC_A, OUTPUT);
  pinMode(WM_EXC_B, OUTPUT);

  /* Direction 1: A drives, B is ground. */
  digitalWrite(WM_EXC_B, LOW);
  digitalWrite(WM_EXC_A, HIGH);
  delayMicroseconds(90);
  int v1 = analogRead(pin);
  digitalWrite(WM_EXC_A, LOW);

  delay(10);

  /* Direction 2: B drives, A is ground. Reverses the charge left by the first
     reading so the sensor ends the cycle neutral. */
  digitalWrite(WM_EXC_A, LOW);
  digitalWrite(WM_EXC_B, HIGH);
  delayMicroseconds(90);
  int v2 = analogRead(pin);
  digitalWrite(WM_EXC_B, LOW);

  /* Leave both pins low so nothing sits energised between readings. */
  pinMode(WM_EXC_A, INPUT);
  pinMode(WM_EXC_B, INPUT);

  float supply = 5.0;
  float volts1 = (v1 / 1023.0) * supply;
  float volts2 = (v2 / 1023.0) * supply;
  if (volts1 <= 0.001 || volts2 >= supply - 0.001) return -1.0;

  float rA = rxKOhm * (supply - volts1) / volts1;
  float rB = rxKOhm * volts2 / (supply - volts2);
  return (rA + rB) / 2.0;
}

/* Irrometer's published three-segment calibration. resK is kilohms, TC is
   soil temperature in Celsius. Returns centibars, which are kPa. */
float watermarkCentibars(float resK, float TC) {
  float tempD = 1.00 + 0.018 * (TC - 24.00);
  float ohms = resK * 1000.0;
  if (ohms >= WM_OPEN_OHMS || ohms <= 0) return 255.0;   /* open circuit */
  if (ohms <= WM_SHORT_OHMS) return 0.0;                 /* shorted */
  if (ohms > 8000.0) {
    return (-2.246 - 5.239 * resK * tempD
            - 0.06756 * resK * resK * tempD * tempD);
  }
  if (ohms > 1000.0) {
    return (-3.213 * resK - 4.093) / (1.0 - 0.009733 * resK - 0.01205 * TC);
  }
  if (ohms > 550.0) {
    return (resK * 23.156 - 12.736) * tempD;
  }
  return 0.0;                                            /* saturated */
}

bool portHasSensor(uint8_t pin) {
  /* A floating pin holds whatever charge it last saw (leakage is tiny), so a
     simple pull-up-vs-float comparison passes even with nothing attached, and
     analogRead of a floating pin returns a leftover of the previous channel.
     Instead: discharge the pin, then engage the pull-up. An empty pin follows
     us - near 0 after discharge, climbing toward 1023 under the pull-up. A
     sensor that drives the pin snaps back to its own level both times. */
  pinMode(pin, OUTPUT);
  digitalWrite(pin, LOW);       /* discharge pin + ADC sample capacitor */
  delay(1);
  pinMode(pin, INPUT);          /* release */
  delay(2);
  int lowRead = analogRead(pin);
  pinMode(pin, INPUT_PULLUP);   /* now try to drag it high */
  delay(2);
  int highRead = analogRead(pin);
  pinMode(pin, INPUT);
  return (highRead - lowRead) < FLOAT_SWING;
}

int readButton() {
  int v = analogRead(buttonPin);
  if (v < 50)   return 0;
  if (v < 250)  return 1;
  if (v < 450)  return 2;
  if (v < 650)  return 3;
  if (v < 850)  return 4;
  return -1;
}

void handleButtonPress() {
  int button = readButton();
  static unsigned long lastPressTime = 0;
  unsigned long currentTime = millis();
  if (button >= 0) {
    lastActivity = currentTime;
    /* First press after the screen blanks only wakes it, so nobody changes
       sensor by accident while reaching for the display. */
    if (!screenOn) {
      setBacklight(true);
      lastPressTime = currentTime;
      return;
    }
  }
  if (currentTime - lastPressTime > 200) {
    if (button == 0) currentSensor = (currentSensor < numSensors - 1) ? currentSensor + 1 : 0;
    if (button == 3) currentSensor = (currentSensor > 0) ? currentSensor - 1 : numSensors - 1;
    lastPressTime = currentTime;
  }
}`,
    loopHook: `  handleButtonPress();
  checkBattery();
  updateScreenPower();`,
  },
};

/* ============================================================
   Shared helpers for the hand-written half of this file.
   build.py never touches anything below the config blocks.
   ============================================================ */

const CFG = (self.NODEFLOW_CONFIG || {});

/* i18n.js defines these. The fallbacks keep the generator working on its own,
   which is how the sketch verifier loads it. */
const t = self.t || ((key) => key);
const tData = self.tData || ((group, key, fallback) => fallback);
const LIMITS = Object.assign(
  {
    minSubmitIntervalMs: 5000,
    maxSubmitsPerHour: 20,
    maxPayloadBytes: 64 * 1024,
    maxTextFieldLength: 200,
    maxCommentLength: 500,
    maxSensorBlocks: 24,
  },
  CFG.limits || {},
);

/* Anything that reaches innerHTML goes through these first. Saved names and
   file names come back out of localStorage, which the page itself wrote, but
   a value that was typed once and stored is still untrusted on the way back
   in: without escaping, a name containing markup would run as markup. */
function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* For values placed inside a single-quoted JavaScript string in an inline
   handler. Escaping the HTML is not enough there: the quote and the
   backslash have to survive the JavaScript parser as well. */
function escapeJsString(value) {
  return String(value == null ? "" : value)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, "\\\"")
    .replace(/</g, "\\x3C")
    .replace(/\r?\n/g, " ");
}

/* Strip control characters and clamp length. Used on every value the visitor
   types before it is stored, rendered or sent anywhere. */
function cleanText(value, maxLength) {
  const limit = maxLength || LIMITS.maxTextFieldLength;
  return String(value == null ? "" : value)
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, limit);
}

/* A file name has to survive a download attribute, a spreadsheet cell and an
   Arduino sketch folder name, so it is reduced to a conservative set. */
function cleanFilename(value) {
  const base = cleanText(value, 80)
    .replace(/\.ino$/i, "")
    .replace(/[^A-Za-z0-9 _-]/g, "")
    .replace(/\s+/g, "_")
    .replace(/^[_.-]+/, "")
    .slice(0, 60);
  return base;
}

function isEmailShaped(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || ""));
}

/* Anything written into the sketch's header block comment. A closing comment
   marker typed into a name or a note would end the header early and the rest
   of it would be compiled as code, so that sequence is broken up and line
   breaks are flattened. */
function commentSafe(value, maxLength) {
  return cleanText(value, maxLength || LIMITS.maxCommentLength)
    .replace(/\*\//g, "* /")
    .replace(/\/\*/g, "/ *")
    .replace(/[\r\n]+/g, " ");
}

function byteLength(text) {
  return new TextEncoder().encode(text).length;
}

/* A placeholder with no matching value falls back to 0, so a grower is never
   handed a file that will not compile. The cost of that is silence: a
   calibration value the form forgot to collect becomes a zero in the sketch
   and the reading is wrong rather than obviously broken. Every miss is
   recorded here so tools/verify_sketches.py can fail on it. */
const RENDER_MISSES = [];

function render(template, vars) {
  if (!template) return "";
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    if (vars[key] === undefined) {
      RENDER_MISSES.push(key);
      return "0";
    }
    return vars[key];
  });
}

const SENSOR_ALIASES = {
  "soil moisture capacitive sensor (such as the dfrobot sen0308)": "DF_robot",
  df_robot: "DF_robot",
  "irrometer watermark (200ss)": "Watermark",
  watermark: "Watermark",
  "irrometer watermark (200ss) combined with irrometer soil temperature sensor":
    "Watermark_Temperature",
  watermark_temperature: "Watermark_Temperature",
  temperature: "Temperature",
  "irrometer soil temperature sensor (200ts)": "Temperature",
  "soil temperature sensor (200ts)": "Temperature",
  "soil temperature sensor": "Temperature",
  "200ts": "Temperature",
};

function resolveSensorKey(name) {
  if (!name) return name;
  const n = String(name).toLowerCase().trim();
  const alias = SENSOR_ALIASES[n];
  if (alias) return alias;
  /* Fall back to keywords so renaming or truncating the Excel label still resolves */
  /* A standalone temperature sensor mentions temperature but no Watermark. */
  if (
    (n.includes("temperature") || n.includes("200ts")) &&
    !n.includes("watermark") &&
    !n.includes("combined")
  )
    return "Temperature";
  if (n.includes("capacitive") || n.includes("dfrobot")) return "DF_robot";
  if (n.includes("temperature") || n.includes("combined"))
    return "Watermark_Temperature";
  if (n.includes("watermark") || n.includes("irrometer")) return "Watermark";
  return name;
}

const OUTPUT_ALIASES = {
  /* "Management thresholds" is the shared display name. Each sensor has its
     own template under that key, so the wording differs while the option
     reads the same in the form. */
  "management thresholds": "Management thresholds",
  "predetermined thresholds": "Management thresholds",
  "predetermined thresholds (very dry/dry/wet)": "Management thresholds",
  "raw value (bits)": "Raw Value",
  "raw value (adc)": "Raw Value",
  "raw sensor value (adc)": "Raw Value",
  "raw sensor value (bits)": "Raw Value",
  "raw value (%)": "Transformed Raw Value",
  "raw sensor value (%)": "Transformed Raw Value",
  "volumetric soil moisture": "Total Available Water (volumetric?)",
  "total available water": "Total Available Water",
  "rate of change of soil water status": "Rate of Change",
  "rate of change": "Rate of Change",
  "wetting front": "Wetting Front",
  "1-2-3 point calibration": "1-2-3 point calibration",
  "1-2-3 point calibrations": "1-2-3 point calibration",
  "quick 1, 2 or 3 point calibration procedure": "1-2-3 point calibration",
  "rate of change of soil water status": "Rate of Change",
  thresholds: "Threshold (very dry/dry/wet)",
  "threshold (very dry/dry/wet)": "Threshold (very dry/dry/wet)",
  "raw value (resistance)": "Raw value (Resistance)",
  "raw value (resistance, in kω)": "Raw value (Resistance)",
  "tension (kpa)": "Tension",
  tension: "Tension",
  "raw value (temperature, in °f)": "Temperature F",
  "raw value (temperature, in °c)": "Temperature C",
  "raw value (temperature)": "Raw value (Temperature)",
  temperature: "Temperature",
};

function resolveOutputKey(name) {
  if (!name) return name;
  const alias = OUTPUT_ALIASES[name.toLowerCase().trim()];
  return alias || name;
}

function lookupTemplate(map, name) {
  if (!name || !map) return null;
  if (map[name]) return map[name];
  const resolved = resolveOutputKey(name);
  if (map[resolved]) return map[resolved];
  const lower = resolved.toLowerCase().trim();
  for (const [k, v] of Object.entries(map)) {
    if (k.toLowerCase().trim() === lower) return v;
  }
  return null;
}

/* Short names for the LCD. Line 1 is "PORT ABBREV value" within 16 chars. */
/* Available water depletion thresholds by soil texture, in kPa.
   low = 10 % depletion (wet end of the irrigation range),
   high = 40 % depletion (irrigate by this point). */
const SOIL_THRESHOLDS = {
  "Loamy sand": { low: 12, high: 20 },
  "Fine sandy loam": { low: 13, high: 25 },
  "Sandy loam": { low: 15, high: 30 },
  Loam: { low: 23, high: 65 },
  Clay: { low: 38, high: 160 },
};

/* Line 1 of the LCD is 16 characters and reads "PORT NAME VALUE", so a name
   gets seven of them. It names what the probe measures rather than who makes
   it: a grower knows they installed a capacitive sensor, not that the part
   number is a DFRobot. Keep new entries to seven characters. */
/* Seven characters, the room line 1 leaves after the port. */
const SENSOR_ABBREV_DIRECT = {
  Watermark: "WM-WIRE",
  Watermark_Temperature: "WM-WIRE",
  Temperature: "TS-WIRE",
};

const SENSOR_ABBREV = {
  DF_robot: "CAPSENS",
  Watermark: "WM200SS",
  Watermark_Temperature: "WM+TEMP",
  Temperature: "TS200",
};

/* Watermark management thresholds use agronomic states; the capacitive probe
   keeps the plain wet/dry wording. percent is always "higher = wetter". */
/* True when this block says it is wired straight to the Arduino rather than
   through the 200SS-VA3. */
function isDirectWiring(block) {
  const p = (block.params || []).find(
    (prm) => normalizeParamName(prm.name) === "wiring",
  );
  return !!p && /direct/i.test(String(p.value));
}

function stateLinesFor(sensorKey) {
  if (sensorKey === "Watermark" || sensorKey === "Watermark_Temperature") {
    return `  if      (percent == 0)  lcd.print(F("Dry plant stress"));
  else if (percent < 100) lcd.print(F("Irrigation range"));
  else                    lcd.print(F("Saturation      "));`;
  }
  return `  if      (percent == 0)  lcd.print(F("VERY DRY        "));
  else if (percent < 100) lcd.print(F("DRY             "));
  else                    lcd.print(F("WET             "));`;
}

function stripComments(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:"'])\/\/[^\n]*/g, "$1")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/, ""))
    .filter(
      (line, i, arr) =>
        !(
          line.trim() === "" &&
          arr[i - 1] !== undefined &&
          arr[i - 1].trim() === ""
        ),
    )
    .join("\n");
}

function buildIno(blocks, surveyAnswers = {}) {
  const now = new Date().toISOString().slice(0, 10);
  const numBlocks = blocks.length;
  const includes = new Set(["#include <math.h>"]);
  let globals = "",
    setupBody = "",
    constants = "",
    loopBody = "";

  const lcdTpl = TEMPLATES.viz.bar;
  if (lcdTpl.includes) includes.add(lcdTpl.includes);
  if (lcdTpl.globals) globals += lcdTpl.globals + "\n";
  if (lcdTpl.setup) setupBody += lcdTpl.setup + "\n";

  globals += render(TEMPLATES.buttonNav.globals, { numBlocks }) + "\n";
  loopBody += TEMPLATES.buttonNav.loopHook + "\n\n";

  blocks.forEach((b, i) => {
    const idx = i + 1;
    const vars = {
      idx,
      port: b.port,
      readPin: b.port,
      partnerPort: b.partnerPort || "A2",
    };
    vars.tempUnit = /(^|[^a-z])f\b|in °f|fahrenheit/i.test(b.output || "")
      ? "F"
      : "C";
    /* A temperature output reads the shared 200TS channel, not this block's
       Watermark port, so label the display with the port it actually came
       from. Tension still reports the Watermark port, which is correct. */
    const sensorKey = resolveSensorKey(b.sensor);
    /* A block wired straight to the board uses a different template entirely:
       it has to do the excitation and calibration the adapter would have done.
       The choice is a parameter rather than a separate sensor type, so the
       grower picks their sensor first and says how it is connected second. */
    const wiredDirect = isDirectWiring(b);
    const templateKey =
      wiredDirect && TEMPLATES.sensors[sensorKey + "_direct"]
        ? sensorKey + "_direct"
        : sensorKey;
    const outKey = resolveOutputKey(b.output);
    const isTempReading =
      outKey === "Temperature F" ||
      outKey === "Temperature C" ||
      outKey === "Temperature" ||
      outKey === "Raw value (Temperature)";
    const labelPort = isTempReading && b.partnerPort ? b.partnerPort : b.port;
    vars.port = labelPort;
    /* LCD line 1: port, short sensor name, then the value. */
    vars.label = `${labelPort} ${(wiredDirect ? SENSOR_ABBREV_DIRECT[sensorKey] : SENSOR_ABBREV[sensorKey]) || SENSOR_ABBREV[sensorKey] || "SENSOR"}`;
    vars.stateLines = stateLinesFor(sensorKey);

    /* The sensor's constants block declares every parameter the sensor has,
       while the form only sends the ones the chosen measurement needs. Seed
       from the spreadsheet defaults first so an unused constant carries a
       sensible value rather than a zero, then let the grower's entries win.
       Zero is the worst possible filler here: it is what divide-by-zero
       guards look for, and it reads as a real calibration value. */
    const defaults = SENSOR_TYPES[sensorKey]?.params || [];
    defaults.forEach((p) => {
      vars[p.name] =
        p.value !== "" && p.value !== null && p.value !== undefined
          ? p.value
          : "0";
    });

    b.params.forEach((p) => {
      vars[p.name] =
        p.value !== "" && p.value !== null && p.value !== undefined
          ? p.value
          : "0";
    });

    loopBody += `  /* Sensor ${idx}: ${b.sensor} on ${b.port}, showing ${b.output} */\n`;

    const sensorTpl = lookupTemplate(TEMPLATES.sensors, templateKey);
    if (sensorTpl) {
      constants += render(sensorTpl.constants, vars) + "\n";
      loopBody += render(sensorTpl.read, vars) + "\n";
    } else {
      loopBody += `  int sensorValue_${idx} = analogRead(${b.port});\n`;
      loopBody += `  bool connected_${idx} = portHasSensor(${b.port});\n`;
    }

    const sensorOutputs = lookupTemplate(TEMPLATES.outputs, templateKey) || {};
    const outputTpl = lookupTemplate(sensorOutputs, b.output);
    loopBody += outputTpl
      ? render(outputTpl, vars) + "\n"
      : `  percent = sensorValue_${idx};\n`;

    /* Outputs that depend on a probe on ANOTHER port must also verify that
       probe is present, or a floating partner pin feeds garbage into them. */
    const resolvedOut = resolveOutputKey(b.output);
    const needsPartnerProbe =
      !wiredDirect &&
      (resolvedOut === "Wetting Front" ||
      (sensorKey === "Watermark_Temperature" &&
        [
          "Tension",
          "Temperature F",
          "Temperature C",
          "Raw value (Temperature)",
        ].includes(resolvedOut)));
    if (needsPartnerProbe) {
      /* The presence test has to match the probe on the partner port. A
         Watermark's partner hangs off the VA-3, whose output stays below
         VA3_MAX_COUNTS whenever a probe is attached. A capacitive probe is
         wired straight to the pin and reads HIGH in dry soil, so the VA-3
         test would call it missing exactly when the soil is driest, which is
         when a wetting front reading matters most. */
      const partnerCheck =
        sensorKey === "Watermark_Temperature" && isTempReading
          ? /* the temperature channel proves itself by clearing its 0.49 V
               floor, which an empty channel never does */
            `tempPresent_${idx}`
          : sensorKey === "Watermark" || sensorKey === "Watermark_Temperature"
            ? `va3ChannelPresent(${vars.partnerPort})`
            : `portHasSensor(${vars.partnerPort})`;
      loopBody += `  connected_${idx} = connected_${idx} && ${partnerCheck};\n`;
    }

    loopBody += `  if (connected_${idx}) {\n`;
    loopBody += `    Serial.print(F("${labelPort} (${b.output}): "));\n`;
    loopBody += `    Serial.println(percent);\n`;
    loopBody += `  } else {\n`;
    loopBody += `    Serial.println(F("${labelPort}: no sensor detected"));\n`;
    loopBody += `  }\n`;

    /* Only the sensor currently selected by the buttons owns the LCD,
       otherwise every block overwrites the one before it. */
    const vizTpl = lookupTemplate(TEMPLATES.viz, b.viz) || TEMPLATES.viz.none;
    const vizBody = render(vizTpl.loop, vars)
      .split("\n")
      .map((line) => (line.trim() ? "    " + line : line))
      .join("\n");

    const pad = (s) => (s + "                ").slice(0, 16);
    /* A low battery matters more than the reading, so it claims line 2.
       The reading stays on line 1 either way. */
    const battLine =
      `      if (battLow) {\n` +
      `        lcd.setCursor(0, 1);\n` +
      `        lcd.print(F("Battery low     "));\n` +
      `      }\n`;
    if (b.viz && b.viz !== "none") {
      loopBody += `  if (currentSensor == ${i} && screenOn) {\n`;
      loopBody += `    if (connected_${idx}) {\n${vizBody}\n${battLine}    } else {\n`;
      loopBody += `      lcd.setCursor(0, 0);\n`;
      loopBody += `      lcd.print(F("${pad(labelPort + ": no sensor")}"));\n`;
      loopBody += `      lcd.setCursor(0, 1);\n`;
      loopBody += `      lcd.print(F("${pad("check wiring")}"));\n`;
      loopBody += `    }\n  }\n\n`;
    } else {
      loopBody += `  if (currentSensor == ${i}) {\n${vizBody}\n  }\n\n`;
    }
  });

  const header = blocks
    .map(
      (b, i) =>
        ` *   Sensor ${i + 1}: ${b.sensor} on ${b.port} → ${b.output} [${b.viz}]`,
    )
    .join("\n");

  const surveyLines = SURVEY_QUESTIONS.filter(
    (q) =>
      q.key !== "filename" && q.key !== "ino_comment" && surveyAnswers[q.key],
  )
    .map((q) => ` *   ${q.label.padEnd(24)}: ${commentSafe(surveyAnswers[q.key])}`)
    .join("\n");

  const surveySection = surveyLines
    ? ` * ────────────────────────────────────────────────\n${surveyLines}\n`
    : "";

  const commentSection = surveyAnswers.ino_comment
    ? ` * ────────────────────────────────────────────────\n *  Note: ${commentSafe(surveyAnswers.ino_comment)}\n`
    : "";

  return `/*
 * ════════════════════════════════════════════════
 *  NodeFlow On-site Sensing System
 *  Generated : ${now}
 *  Sensors   : ${numBlocks}
${commentSection} * ────────────────────────────────────────────────
${header}
${surveySection} * ════════════════════════════════════════════════
 */

${[...includes].join("\n")}

#define BAUD_RATE 9600

int   percent;
float x;

${stripComments(globals).trim()}

${stripComments(constants).trim()}

void setup() {
  Serial.begin(BAUD_RATE);
${stripComments(setupBody)}  Serial.println("Sketch ready.");
}

void loop() {

${stripComments(loopBody)}  delay(1000);
}
`;
}

function initTooltips() {
  const popup = document.createElement("div");
  popup.id = "tooltip-popup";
  popup.setAttribute("role", "tooltip");
  popup.style.cssText = `
    position: fixed; z-index: 9999; max-width: 260px; padding: 8px 11px;
    background: #232326; color: #eef2d4; font-size: 12px;
    font-family: system-ui, -apple-system, sans-serif; line-height: 1.5;
    border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.22);
    pointer-events: none; opacity: 0; transition: opacity 0.15s; white-space: normal;
  `;
  document.body.appendChild(popup);

  document.addEventListener("mouseover", (e) => {
    const badge = e.target.closest(".tip-badge");
    if (!badge) return;
    const text = badge.dataset.tip;
    if (!text) return;
    popup.textContent = text;
    popup.style.opacity = "1";
  });

  document.addEventListener("mousemove", (e) => {
    const badge = e.target.closest(".tip-badge");
    if (!badge) {
      popup.style.opacity = "0";
      return;
    }
    const x = e.clientX + 14,
      y = e.clientY + 14;
    const pw = popup.offsetWidth,
      ph = popup.offsetHeight;
    popup.style.left =
      (x + pw > window.innerWidth ? e.clientX - pw - 10 : x) + "px";
    popup.style.top =
      (y + ph > window.innerHeight ? e.clientY - ph - 10 : y) + "px";
  });

  document.addEventListener("mouseout", (e) => {
    if (!e.target.closest(".tip-badge")) popup.style.opacity = "0";
  });

  /* Keyboard and screen-reader users reach the badge with Tab. The text is
     already on the button as its accessible name; showing the bubble on focus
     puts the same words on screen for sighted keyboard users. */
  document.addEventListener("focusin", (e) => {
    const badge = e.target.closest(".tip-badge");
    if (!badge || !badge.dataset.tip) {
      popup.style.opacity = "0";
      return;
    }
    popup.textContent = badge.dataset.tip;
    popup.style.opacity = "1";
    const r = badge.getBoundingClientRect();
    const pw = popup.offsetWidth;
    const ph = popup.offsetHeight;
    const left = Math.min(r.left, window.innerWidth - pw - 10);
    const below = r.bottom + 8;
    popup.style.left = Math.max(10, left) + "px";
    popup.style.top =
      (below + ph > window.innerHeight ? r.top - ph - 8 : below) + "px";
  });

  document.addEventListener("focusout", (e) => {
    if (e.target.closest(".tip-badge")) popup.style.opacity = "0";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") popup.style.opacity = "0";
  });
}

function tipBadge(text, id = "") {
  const safe = escapeHtml(text || "");
  const idAttr = id ? `id="${id}"` : "";
  return `<button type="button" class="tip-badge" ${idAttr} data-tip="${safe}" aria-label="${escapeHtml(t("tip.prefix"))} ${safe}"><span aria-hidden="true">i</span></button>`;
}

function setTip(id, text) {
  const el = document.getElementById(id);
  if (!el) return;
  el.dataset.tip = text || "";
  el.setAttribute("aria-label", t("tip.prefix") + " " + (text || ""));
}

let uid = 0;
const nextUid = () => ++uid;

function addBlock() {
  /* A ceiling on the form keeps a runaway loop or a pasted-in script from
     building a payload big enough to matter. The board has five analog ports;
     nobody legitimately needs more blocks than this. */
  const existing = document.querySelectorAll(".sensor-block").length;
  if (existing >= LIMITS.maxSensorBlocks) {
    showFormError(
      t("msg.blockLimit", { n: LIMITS.maxSensorBlocks }),
    );
    return;
  }

  const bid = nextUid();
  const defKey = Object.keys(SENSOR_TYPES)[0];
  const defCfg = SENSOR_TYPES[defKey];
  const usedPorts = [...document.querySelectorAll("[id^='port-sel-']")].map(
    (s) => s.value,
  );
  const freePort = PORTS.find((p) => !usedPorts.includes(p)) || PORTS[0];

  const sensorOpts = Object.entries(SENSOR_TYPES)
    .map(([k, v]) => `<option value="${escapeHtml(k)}">${escapeHtml(tData("sensors", k, v.label))}</option>`)
    .join("");
  const outputOpts = defCfg.outputs
    .map((o) => `<option value="${escapeHtml(o.value)}">${escapeHtml(tData("outputs", o.value, o.display || o.value))}</option>`)
    .join("");
  const vizOpts = VIZ_OPTIONS.map(
    (v) => `<option value="${escapeHtml(v.value)}">${escapeHtml(tData("viz", v.value, v.label))}</option>`,
  ).join("");

  const block = document.createElement("div");
  block.className = "sensor-block";
  block.dataset.bid = bid;

  block.innerHTML = `
    <div class="block-head">
      <h3 class="block-title"><span class="sensor-num" id="bnum-${bid}"></span> ${escapeHtml(t("form.blockTitle"))}</h3>
      <button class="remove-btn" type="button" onclick="removeBlock(${bid})" id="rem-${bid}">${escapeHtml(t("form.remove"))}</button>
    </div>
    <div class="block-body">
      <p class="block-intro">${escapeHtml(t("form.blockIntro"))}</p>

      <p class="pair-caption">${escapeHtml(t("form.pairCaption"))}</p>
      <div class="row2">
        <div class="field">
          <div class="field-label">
            <label for="stype-sel-${bid}">${escapeHtml(t("form.sensorType"))} <span class="req" aria-hidden="true">*</span></label>
            ${tipBadge(t("tip.sensorType"), `stype-tip-${bid}`)}
          </div>
          <select id="stype-sel-${bid}" required aria-required="true" onchange="onSensorChange(${bid})">
            ${sensorOpts}
          </select>
        </div>
        <div class="field">
          <div class="field-label">
            <label for="port-sel-${bid}">${escapeHtml(t("form.port"))} <span class="req" aria-hidden="true">*</span></label>
            ${tipBadge(t("tip.port"), `port-tip-${bid}`)}
          </div>
          <select id="port-sel-${bid}" required aria-required="true" onchange="checkDuplicatePorts(); updatePortTip(${bid})">
            ${PORTS.map((p) => `<option value="${p}" ${p === freePort ? "selected" : ""}>${p}</option>`).join("")}
          </select>
          <span class="err-msg" id="err-port-${bid}">${escapeHtml(t("form.required"))}</span>
        </div>
      </div>

      <div class="section-card">
        <div class="section-head">
          <label class="section-label" for="output-sel-${bid}" id="output-label-${bid}">${escapeHtml(t("form.outputLabel"))} <span class="req" aria-hidden="true">*</span></label>
          ${tipBadge(t("tip.output"), `output-tip-${bid}`)}
        </div>
        <div class="section-body">
          <div class="field">
            <select id="output-sel-${bid}" required aria-required="true" onchange="updateOutputTip(${bid})">
              ${outputOpts}
            </select>
            <span class="err-msg" id="err-output-${bid}">${escapeHtml(t("form.required"))}</span>
          </div>
        </div>
      </div>

      <div class="section-card">
        <div class="section-head">
          <label class="section-label" for="viz-sel-${bid}">${escapeHtml(t("form.vizLabel"))}</label>
          ${tipBadge(t("tip.viz"), `viz-tip-${bid}`)}
        </div>
        <div class="section-body">
          <div class="field">
            <select id="viz-sel-${bid}" onchange="updateVizTip(${bid})">${vizOpts}</select>
          </div>
        </div>
      </div>

      <div class="section-card" id="partner-card-${bid}" style="display:none">
        <div class="section-head"><label class="section-label" for="partner-sel-${bid}">${escapeHtml(t("form.partnerLabel"))} <span class="req" aria-hidden="true">*</span></label></div>
        <div class="section-body">
          <div class="wetting-front-msg">
            ${escapeHtml(t("form.partnerHelp1"))} <strong>${escapeHtml(t("form.partnerHelpShallow"))}</strong>${escapeHtml(t("form.partnerHelp2"))} <strong>${escapeHtml(t("form.partnerHelpDeep"))}</strong> ${escapeHtml(t("form.partnerHelp3"))}
          </div>
          <div class="field">
            <select id="partner-sel-${bid}" aria-required="true" onchange="syncTempPorts(${bid}); refreshAllBlocks()"></select>
          </div>
        </div>
      </div>

      <div class="section-card" id="params-card-${bid}">
        <div class="section-head"><span class="section-label">${escapeHtml(t("form.paramsLabel"))}</span>
          ${tipBadge(t("tip.params"), `params-tip-${bid}`)}
        </div>
        <div class="section-body">
          <p class="block-intro" id="cal-hint-${bid}" style="display:none">
            <strong>${escapeHtml(t("form.calHintTitle"))}</strong> ${escapeHtml(t("form.calHint"))}
          </p>
          <div id="params-${bid}"></div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("sensors-list").appendChild(block);
  defCfg.params.forEach((p) =>
    addParamRow(
      bid,
      p.name,
      p.display || p.name,
      p.value,
      p.label,
      p.min,
      p.max,
      p.units || "",
      p.choices || "",
    ),
  );
  renumberBlocks();
  updateRemoveBtns();
  checkDuplicatePorts();
  refreshParams(bid);
  refreshViz(bid);
}

function removeBlock(bid) {
  document.querySelector(`.sensor-block[data-bid="${bid}"]`).remove();
  renumberBlocks();
  updateRemoveBtns();
  checkDuplicatePorts();
}

function renumberBlocks() {
  document.querySelectorAll(".sensor-block").forEach((b, i) => {
    const el = b.querySelector(".sensor-num");
    if (el) el.textContent = i + 1;
  });
}

function updateRemoveBtns() {
  const blocks = document.querySelectorAll(".sensor-block");
  blocks.forEach((b) => {
    const btn = b.querySelector(".remove-btn");
    if (btn) btn.disabled = blocks.length === 1;
  });
}

function updatePortTip(bid) {
  setTip(
    `port-tip-${bid}`,
    PORT_TIPS[document.getElementById(`port-sel-${bid}`).value] || "",
  );
}

function updateOutputTip(bid) {
  const val = document.getElementById(`output-sel-${bid}`).value;
  const key = document.getElementById(`stype-sel-${bid}`).value;
  const cfg = SENSOR_TYPES[key];
  const match = cfg?.outputs.find((o) => o.value === val);
  setTip(`output-tip-${bid}`, tData("outputTips", val, match?.tip || ""));
  refreshParams(bid);
  refreshViz(bid);
}

function refreshViz(bid) {
  const sensorKey = document.getElementById(`stype-sel-${bid}`).value;
  const outputVal = document.getElementById(`output-sel-${bid}`).value;
  const sel = document.getElementById(`viz-sel-${bid}`);
  if (!sel) return;

  const vizMap = OUTPUT_VIZ[sensorKey] || {};
  let allowed = vizMap[outputVal];
  if (!allowed || allowed.length === 0)
    allowed = VIZ_OPTIONS.map((v) => v.value);
  if (!allowed.includes("none")) allowed = ["none", ...allowed];

  const prev = sel.value;
  sel.innerHTML = VIZ_OPTIONS.filter((v) => allowed.includes(v.value))
    .map(
      (v) =>
        `<option value="${escapeHtml(v.value)}">${escapeHtml(tData("viz", v.value, v.label))}</option>`,
    )
    .join("");
  sel.value = allowed.includes(prev) ? prev : "none";
  updateVizTip(bid);
}

/* The Volumetric / TAW equations contain 1/k, but the sheet's in_a..in_e
   columns are full before k. Require it in code so the field appears and the
   value reaches the sketch. (Adding k to a free in_ column also works.) */
/* Parameters that belong to the whole sensor rather than to one measurement.
   The spreadsheet lists inputs per measurement in in_a..in_e, which is right
   for calibration values but wrong for these: how the sensor is wired, and the
   constants that wiring needs, apply to every measurement it offers. Without
   this they were filtered out of the block before it reached the generator,
   and the templates silently received zeros. */
const SENSOR_WIDE_PARAMS = [
  "wiring",
  "Rx",
  "soil_temp_c",
  "therm_r25",
  "therm_beta",
];

/* These only exist because the sensor is wired straight to the board. On the
   adapter path they are noise: the adapter owns the series resistor, does its
   own temperature compensation, and never exposes a thermistor. Showing a
   grower a field they must not touch is worse than not showing it. */
const DIRECT_ONLY_PARAMS = ["Rx", "soil_temp_c", "therm_r25", "therm_beta"];

/* The wiring a block is currently set to, read from the form. */
function blockWiringValue(bid) {
  let value = "";
  document.querySelectorAll(`#params-${bid} .param-row`).forEach((row) => {
    const nameEl = document.getElementById(`pname-${row.dataset.rid}`);
    if (nameEl && normalizeParamName(nameEl.value) === "wiring") {
      const valEl = document.getElementById(`pval-${row.dataset.rid}`);
      if (valEl) value = valEl.value;
    }
  });
  return value;
}

function extraParamsFor(outputVal) {
  const key = resolveOutputKey(outputVal);
  const extra = SENSOR_WIDE_PARAMS.slice();
  if (
    key === "Total Available Water (volumetric?)" ||
    key === "Total Available Water"
  ) {
    extra.push("k");
  }
  return extra;
}

function normalizeParamName(name) {
  if (!name) return "";
  /* Excel writes FC/WP where the params sheet says fc/wp, and sometimes wraps a
     name in a function call such as abs(air_val_max). Match on the bare name. */
  const inner = String(name).match(/\(([^)]*)\)/);
  const bare = inner ? inner[1] : String(name);
  return bare.trim().toLowerCase();
}

function neededHas(needed, paramName) {
  const target = normalizeParamName(paramName);
  return needed.some((n) => normalizeParamName(n) === target);
}

function refreshParams(bid) {
  const sensorKey = document.getElementById(`stype-sel-${bid}`).value;
  const outputVal = document.getElementById(`output-sel-${bid}`).value;
  const cfg = SENSOR_TYPES[sensorKey];
  if (!cfg) return;

  const outputMap = OUTPUT_PARAMS[sensorKey] || {};
  const needed = (outputMap[outputVal] ?? cfg.params.map((p) => p.name)).concat(
    extraParamsFor(outputVal),
  );

  const direct = /direct/i.test(blockWiringValue(bid));

  document.querySelectorAll(`#params-${bid} .param-row`).forEach((row) => {
    const rid = row.dataset.rid;
    const nameEl = document.getElementById(`pname-${rid}`);
    if (!nameEl) return;
    const isLocked = row.dataset.locked === "1";
    const directOnly = neededHas(DIRECT_ONLY_PARAMS, nameEl.value);
    const visible =
      neededHas(needed, nameEl.value) && !isLocked && (!directOnly || direct);
    row.style.display = visible ? "" : "none";
    const valInput = document.getElementById(`pval-${rid}`);
    if (valInput) valInput.required = visible;
  });

  const card = document.getElementById(`params-card-${bid}`);
  if (card) {
    const anyVisible = [
      ...document.querySelectorAll(`#params-${bid} .param-row`),
    ].some((r) => r.style.display !== "none");
    card.style.display = anyVisible ? "" : "none";
  }

  /* Show the how-to-calibrate hint only when a measured value is on screen */
  const CAL_PARAMS = ["air_val", "air_val_max", "water_val"];
  const calHint = document.getElementById(`cal-hint-${bid}`);
  if (calHint) {
    const calVisible = [
      ...document.querySelectorAll(`#params-${bid} .param-row`),
    ].some((row) => {
      if (row.style.display === "none") return false;
      const nameEl = document.getElementById(`pname-${row.dataset.rid}`);
      return nameEl && CAL_PARAMS.includes(normalizeParamName(nameEl.value));
    });
    calHint.style.display = calVisible ? "" : "none";
  }

  const partnerCard = document.getElementById(`partner-card-${bid}`);
  if (partnerCard) {
    const myPort = document.getElementById(`port-sel-${bid}`).value;
    const isWettingFront = outputVal === "Wetting Front";
    const isDeepPartner = isPortUsedAsDeepPartner(myPort, bid);
    const isTempCombo = resolveSensorKey(sensorKey) === "Watermark_Temperature";
    const label = partnerCard.querySelector(".section-label");
    const sel = document.getElementById(`partner-sel-${bid}`);

    if (isTempCombo) {
      /* This sensor is a pair: the Watermark on this block's port plus a
         separate soil temperature probe that needs its own port. */
      partnerCard.style.display = "";
      if (sel) sel.style.display = "";
      if (label)
        label.innerHTML = `Soil temperature sensor port <span class="req">*</span>`;
      partnerCard.querySelector(".wetting-front-msg").innerHTML =
        `One <strong>soil temperature probe</strong> is shared by every Watermark sensor ` +
        `(the T terminal on the VA-3 board). Select the port it is plugged into. This ` +
        `applies to all Watermark + temperature blocks.`;
      populatePartnerPorts(bid, "temp");
      syncTempPorts(bid);
    } else if (isWettingFront && !isDeepPartner) {
      partnerCard.style.display = "";
      if (sel) sel.style.display = "";
      if (label)
        label.innerHTML = `Deep (partner) sensor port <span class="req">*</span>`;
      partnerCard.querySelector(".wetting-front-msg").innerHTML =
        `Wetting front needs two sensors at different depths. This block is the <strong>shallow</strong> sensor. ` +
        `Add a second sensor block for the <strong>deep</strong> sensor, then choose its port here.`;
      populatePartnerPorts(bid);
    } else if (isWettingFront && isDeepPartner) {
      partnerCard.style.display = "";
      if (label)
        label.innerHTML = `Deep (partner) sensor port <span class="req">*</span>`;
      partnerCard.querySelector(".wetting-front-msg").innerHTML =
        `This sensor is already linked as the <strong>deep</strong> partner of another wetting-front block. ` +
        `No partner selection needed here.`;
      if (sel) sel.style.display = "none";
    } else {
      partnerCard.style.display = "none";
    }
  }
}

/* The VA-3 board carries a single temperature probe shared by all Watermark
   sensors, so every Watermark+temperature block must name the same port. */
function syncTempPorts(sourceBid) {
  const src = document.getElementById(`partner-sel-${sourceBid}`);
  if (!src || !src.value) return;
  document.querySelectorAll(".sensor-block").forEach((block) => {
    const bid = block.dataset.bid;
    if (bid === String(sourceBid)) return;
    const st = document.getElementById(`stype-sel-${bid}`);
    if (!st || resolveSensorKey(st.value) !== "Watermark_Temperature") return;
    const sel = document.getElementById(`partner-sel-${bid}`);
    if (sel && sel.value !== src.value) {
      if (![...sel.options].some((o) => o.value === src.value)) {
        sel.insertAdjacentHTML(
          "beforeend",
          `<option value="${src.value}">${src.value}</option>`,
        );
      }
      sel.value = src.value;
    }
  });
}

function isPortUsedAsDeepPartner(port, selfBid) {
  if (!port) return false;
  let used = false;
  document.querySelectorAll(".sensor-block").forEach((block) => {
    const bid = block.dataset.bid;
    if (bid === String(selfBid)) return;
    const out = document.getElementById(`output-sel-${bid}`);
    const sel = document.getElementById(`partner-sel-${bid}`);
    if (out && out.value === "Wetting Front" && sel && sel.value === port)
      used = true;
  });
  return used;
}

function populatePartnerPorts(bid, mode = "front") {
  const sel = document.getElementById(`partner-sel-${bid}`);
  if (!sel) return;
  const myPort = document.getElementById(`port-sel-${bid}`).value;
  const takenPorts = [...document.querySelectorAll("[id^='port-sel-']")].map(
    (el) => el.value,
  );
  const current = sel.value;
  let choices, emptyMsg;

  if (mode === "temp") {
    /* The VA-3 temperature channel is wired independently, so any analog port
       is a candidate EXCEPT this block's own Watermark port - one pin cannot
       carry both the tension and the temperature signal. Not defaulted:
       silently picking a port made the sketch read an unconnected pin. */
    choices = PORTS.filter((p) => /^A[1-5]$/.test(p) && p !== myPort);
    emptyMsg = "No analog port available";
  } else {
    /* The deep wetting-front sensor IS its own block, so pick from those. */
    choices = takenPorts.filter((p) => p !== myPort && /^A[1-5]$/.test(p));
    emptyMsg = "Add a second sensor block first";
  }

  const placeholder =
    mode === "temp" ? `<option value="">Select the port</option>` : "";

  sel.innerHTML =
    choices.length === 0
      ? `<option value="">${emptyMsg}</option>`
      : placeholder +
        choices
          .map(
            (p) =>
              `<option value="${p}" ${p === current ? "selected" : ""}>${p}</option>`,
          )
          .join("");

  /* keep a deliberate earlier choice, otherwise leave it unselected */
  if (mode === "temp" && !choices.includes(current)) sel.value = "";
}

function refreshAllPartnerDropdowns() {
  document.querySelectorAll(".sensor-block").forEach((block) => {
    const bid = block.dataset.bid;
    const out = document.getElementById(`output-sel-${bid}`);
    const st = document.getElementById(`stype-sel-${bid}`);
    if (st && resolveSensorKey(st.value) === "Watermark_Temperature") {
      populatePartnerPorts(bid, "temp");
    } else if (out && out.value === "Wetting Front") {
      populatePartnerPorts(bid);
    }
  });
}

function refreshAllBlocks() {
  document
    .querySelectorAll(".sensor-block")
    .forEach((block) => refreshParams(block.dataset.bid));
}

function updateVizTip(bid) {
  const val = document.getElementById(`viz-sel-${bid}`).value;
  const match = VIZ_OPTIONS.find((v) => v.value === val);
  setTip(`viz-tip-${bid}`, tData("vizTips", val, match?.tip || ""));
}

function onSensorChange(bid) {
  const key = document.getElementById(`stype-sel-${bid}`).value;
  const cfg = SENSOR_TYPES[key];
  if (!cfg) return;
  /* The sheet's per-sensor tooltip is really the first measurement's tooltip,
     a quirk of how the rows are laid out, so it reads as the wrong help text
     on the sensor picker. The badge keeps the text that is actually about
     choosing a sensor. */
  setTip(`stype-tip-${bid}`, t("tip.sensorType"));
  document.getElementById(`output-sel-${bid}`).innerHTML = cfg.outputs
    .map(
      (o) =>
        `<option value="${escapeHtml(o.value)}">${escapeHtml(tData("outputs", o.value, o.display || o.value))}</option>`,
    )
    .join("");
  updateOutputTip(bid);
  const container = document.getElementById(`params-${bid}`);
  container.innerHTML = "";
  cfg.params.forEach((p) =>
    addParamRow(
      bid,
      p.name,
      p.display || p.name,
      p.value,
      p.label,
      p.min,
      p.max,
      p.units || "",
      p.choices || "",
    ),
  );
  refreshParams(bid);
}

function addParamRow(
  bid,
  nameVal = "",
  displayVal = "",
  valueVal = "",
  tooltipText = "",
  minVal = "",
  maxVal = "",
  unitsVal = "",
  choicesVal = "",
) {
  const choices = Array.isArray(choicesVal)
    ? choicesVal
    : String(choicesVal || "")
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);
  const rid = nextUid();
  const container = document.getElementById(`params-${bid}`);
  const row = document.createElement("div");
  row.className = "param-row";
  row.dataset.rid = rid;
  const isLocked =
    minVal !== "" && maxVal !== "" && String(minVal) === String(maxVal);
  row.dataset.locked = isLocked ? "1" : "0";
  const defaultVal =
    valueVal !== "" && valueVal !== null && valueVal !== undefined
      ? valueVal
      : "0";
  const shownName = displayVal || nameVal;
  row.innerHTML = `
    <div class="field">
      <div class="field-label">
        <span class="param-name-caption">${escapeHtml(t("form.parameter"))}</span>
        ${tooltipText ? tipBadge(tooltipText) : ""}
      </div>
      <input type="text" id="pname-${rid}" value="${escapeHtml(nameVal)}" required readonly style="display:none">
      <div class="param-display-name" id="plabel-${rid}">${escapeHtml(tData("params", nameVal, shownName))}</div>
    </div>
    <div class="field value-unit-field">
      <div class="value-unit-labels">
        <span class="value-caption" id="pvlabel-${rid}">${escapeHtml(t("form.value"))} <span class="req" aria-hidden="true">*</span></span>
        ${unitsVal ? `<span class="unit-label">${escapeHtml(t("form.units"))}</span>` : ""}
      </div>
      <div class="value-unit-row">
        ${
          choices.length
            ? `<select id="pval-${rid}" required aria-required="true" aria-labelledby="plabel-${rid} pvlabel-${rid}" onchange="onChoiceParam(${bid}, '${escapeJsString(nameVal)}', this.value)" style="flex:1">
               ${choices.map((c) => `<option value="${escapeHtml(c)}" ${c === defaultVal ? "selected" : ""}>${escapeHtml(c)}</option>`).join("")}
             </select>`
            : `<input type="number" id="pval-${rid}" value="${escapeHtml(defaultVal)}" placeholder="0" step="0.001" required aria-required="true" aria-labelledby="plabel-${rid} pvlabel-${rid}"
               ${minVal !== "" ? `min="${minVal}"` : ""}
               ${maxVal !== "" ? `max="${maxVal}"` : ""}
               oninput="
                 const mn = this.min !== '' ? parseFloat(this.min) : -Infinity;
                 const mx = this.max !== '' ? parseFloat(this.max) : Infinity;
                 if (this.value !== '' && !isNaN(parseFloat(this.value))) {
                   if (parseFloat(this.value) < mn) this.value = mn;
                   if (parseFloat(this.value) > mx) this.value = mx;
                 }
                 const dot = this.value.indexOf('.');
                 if (dot !== -1 && this.value.length - dot - 1 > 3) this.value = this.value.slice(0, dot + 4);
               ">`
        }
        ${unitsVal ? '<div class="unit-box">' + escapeHtml(unitsVal) + "</div>" : ""}
      </div>
    </div>
  `;
  container.appendChild(row);
  updateParamRemoveBtns(bid);
}

/* A dropdown parameter can change which other parameters are worth showing:
   choosing direct wiring brings out the series resistor, choosing the adapter
   puts it away again. */
function onChoiceParam(bid, name, value) {
  const key = normalizeParamName(name);
  if (key === "soil_type") applySoilType(bid, value);
  refreshParams(bid);
}

/* Choosing a soil texture fills in the two tension thresholds for that soil.
   The values stay editable, so a grower can tune them to their own field. */
function applySoilType(bid, soil) {
  const t = SOIL_THRESHOLDS[soil];
  if (!t) return;
  document.querySelectorAll(`#params-${bid} .param-row`).forEach((row) => {
    const rid = row.dataset.rid;
    const nameEl = document.getElementById(`pname-${rid}`);
    const valEl = document.getElementById(`pval-${rid}`);
    if (!nameEl || !valEl) return;
    const nm = normalizeParamName(nameEl.value);
    if (nm === "thr_low") valEl.value = t.low;
    if (nm === "thr_high") valEl.value = t.high;
  });
}

function removeParamRow(bid, rid) {
  const container = document.getElementById(`params-${bid}`);
  if (container.querySelectorAll(".param-row").length <= 1) return;
  container.querySelector(`.param-row[data-rid="${rid}"]`)?.remove();
  updateParamRemoveBtns(bid);
}

function updateParamRemoveBtns(bid) {
  const rows = document.querySelectorAll(`#params-${bid} .param-row`);
  rows.forEach((r) => {
    const btn = r.querySelector(".rem-param-btn");
    if (btn) btn.disabled = rows.length === 1;
  });
}

function checkDuplicatePorts() {
  refreshAllPartnerDropdowns();
  const portMap = {};
  const ports = [];
  document.querySelectorAll("[id^='port-sel-']").forEach((el) => {
    portMap[el.value] = (portMap[el.value] || 0) + 1;
    ports.push(el.value);
  });
  const dupes = Object.entries(portMap)
    .filter(([, c]) => c > 1)
    .map(([p]) => p);
  const analogCount = ports.filter((p) => /^A[1-5]$/.test(p)).length;
  /* note: the shared temperature port is not a sensor block, so it never
     appears in this list and cannot trigger a false duplicate warning */
  const messages = [];
  if (dupes.length)
    messages.push(
      t("msg.portsDuplicate", { s: dupes.length > 1 ? "s" : "", ports: dupes.join(", ") }),
    );
  if (analogCount >= 5) messages.push(t("msg.portsFull"));
  const warn = document.getElementById("port-warning");
  if (messages.length) {
    warn.innerHTML = messages.map((m) => `⚠ ${m}`).join("<br>");
    warn.classList.add("show");
  } else warn.classList.remove("show");
}

/* One visible place for every problem that stops a generation. It sits just
   above the generate button, is announced by role="alert" in the markup, and
   moves focus to the first field at fault. alert() used to do this job; it
   cannot be styled, cannot be read alongside the field, and on a phone it
   hides the form behind a system dialog. */
function showFormError(message, focusEl) {
  const box = document.getElementById("form-error");
  if (box) {
    box.textContent = message;
    box.classList.add("show");
    box.scrollIntoView({ block: "center", behavior: "smooth" });
  }
  if (focusEl && typeof focusEl.focus === "function") {
    focusEl.focus({ preventScroll: true });
  }
}

function clearFormError() {
  const box = document.getElementById("form-error");
  if (box) {
    box.textContent = "";
    box.classList.remove("show");
  }
  document
    .querySelectorAll('[aria-invalid="true"]')
    .forEach((el) => el.removeAttribute("aria-invalid"));
}

function validate() {
  const portMap = {};
  document.querySelectorAll("[id^='port-sel-']").forEach((el) => {
    portMap[el.value] = (portMap[el.value] || []).concat(el.id);
  });
  const duplicated = Object.entries(portMap).filter(
    ([, ids]) => ids.length > 1,
  );
  if (duplicated.length) {
    const first = document.getElementById(duplicated[0][1][0]);
    if (first) first.setAttribute("aria-invalid", "true");
    showFormError(
      t("msg.duplicatePort", { port: duplicated[0][0] }),
      first,
    );
    return false;
  }

  let firstBad = null;
  document.querySelectorAll("input[required]").forEach((el) => {
    if (el.style.display === "none") return;
    if (el.offsetParent === null) return;
    const empty = !el.value || el.value.trim() === "";
    el.classList.toggle("error", empty);
    if (empty) {
      el.setAttribute("aria-invalid", "true");
      if (!firstBad) firstBad = el;
    } else {
      el.removeAttribute("aria-invalid");
    }
  });

  if (firstBad) {
    showFormError(
      t("msg.emptyRequired"),
      firstBad,
    );
    return false;
  }
  return true;
}

function downloadFile(content, filename) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

let _pendingBlocks = [];
let _pendingFilename = "";

const SAVED_KEY = "nodeflow_survey_v1";
const FILES_KEY = "nodeflow_files_v1";
let _savedAnswers = null;
let _savedFiles = {};

function loadSavedFiles() {
  try {
    const raw = localStorage.getItem(FILES_KEY);
    _savedFiles = raw ? JSON.parse(raw) : {};
  } catch (_) {
    _savedFiles = {};
  }
}

function saveFile(filename, blocks) {
  try {
    _savedFiles[filename] = { blocks, timestamp: new Date().toISOString() };
    localStorage.setItem(FILES_KEY, JSON.stringify(_savedFiles));
  } catch (_) {}
  renderSavedConfigs();
}

function deleteSavedFile(filename) {
  delete _savedFiles[filename];
  try {
    localStorage.setItem(FILES_KEY, JSON.stringify(_savedFiles));
  } catch (_) {}
}

function loadSavedAnswers() {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    _savedAnswers = raw ? JSON.parse(raw) : null;
  } catch (_) {
    _savedAnswers = null;
  }
  renderSavedBanner();
}

function saveAnswers(answers) {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(answers));
    _savedAnswers = answers;
    renderSavedBanner();
  } catch (_) {}
}

function clearSavedAnswers() {
  try {
    localStorage.removeItem(SAVED_KEY);
  } catch (_) {}
  _savedAnswers = null;
  renderSavedBanner();
}

function renderSavedBanner() {
  const banner = document.getElementById("saved-banner");
  if (!banner) return;
  if (_savedAnswers && _savedAnswers.name) {
    banner.innerHTML = `${escapeHtml(t("saved.welcome"))} <strong>${escapeHtml(_savedAnswers.name)}</strong>${escapeHtml(t("saved.infoSaved"))}
      <a href="#" onclick="editSavedAnswers(); return false;">${escapeHtml(t("saved.edit"))}</a> ·
      <a href="#" onclick="clearSavedAnswers(); return false;">${escapeHtml(t("saved.clear"))}</a>`;
    banner.classList.add("show");
  } else {
    banner.classList.remove("show");
  }
}

function editSavedAnswers() {
  openSurvey(_savedAnswers);
}

function handleGenerate() {
  document
    .querySelectorAll(".error")
    .forEach((el) => el.classList.remove("error"));
  clearFormError();
  if (!validate()) return;

  _pendingBlocks = [];
  document.querySelectorAll(".sensor-block").forEach((block) => {
    const bid = block.dataset.bid;
    const sensorKey = document.getElementById(`stype-sel-${bid}`).value;
    const outputVal = document.getElementById(`output-sel-${bid}`).value;
    const outputMap = OUTPUT_PARAMS[sensorKey] || {};
    const cfg = SENSOR_TYPES[sensorKey];
    const needed = (
      outputMap[outputVal] ?? (cfg ? cfg.params.map((p) => p.name) : [])
    ).concat(extraParamsFor(outputVal));
    const params = [];
    document.querySelectorAll(`#params-${bid} .param-row`).forEach((row) => {
      const rid = row.dataset.rid;
      const pname = document.getElementById(`pname-${rid}`)?.value || "";
      if (!neededHas(needed, pname)) return;
      params.push({
        name: pname,
        value: document.getElementById(`pval-${rid}`)?.value || "",
      });
    });
    const partnerSel = document.getElementById(`partner-sel-${bid}`);
    _pendingBlocks.push({
      port: document.getElementById(`port-sel-${bid}`).value,
      sensor: document.getElementById(`stype-sel-${bid}`).value,
      output: document.getElementById(`output-sel-${bid}`).value,
      viz: document.getElementById(`viz-sel-${bid}`).value,
      partnerPort: partnerSel ? partnerSel.value : "",
      params,
    });
  });

  for (const b of _pendingBlocks) {
    if (
      resolveSensorKey(b.sensor) === "Watermark_Temperature" &&
      b.partnerPort === b.port
    ) {
      showFormError(
        t("msg.samePort", { port: b.port }),
      );
      return;
    }
    if (
      resolveSensorKey(b.sensor) === "Watermark_Temperature" &&
      !b.partnerPort
    ) {
      showFormError(
        t("msg.needTempPort"),
      );
      return;
    }
  }

  /* Wet soil conducts between bare sensors, so two of them read partly through
     each other and the electrodes corrode. Isolating more than one needs a
     multiplexer the sketch does not drive, so the form stops at one. */
  const directBlocks = _pendingBlocks.filter(isDirectWiring);
  if (directBlocks.length > 1) {
    showFormError(
      t("msg.oneDirectOnly", { ports: directBlocks.map((b) => b.port).join(", ") }),
    );
    return;
  }

  const deepPorts = _pendingBlocks
    .filter((b) => b.output === "Wetting Front" && b.partnerPort)
    .map((b) => b.partnerPort);
  for (const b of _pendingBlocks) {
    if (
      b.output === "Wetting Front" &&
      !b.partnerPort &&
      !deepPorts.includes(b.port)
    ) {
      showFormError(
        t("msg.needDeepSensor"),
      );
      return;
    }
  }

  _pendingFilename =
    _pendingBlocks.length === 1
      ? `sensor_${_pendingBlocks[0].port}.ino`
      : `sensors_${_pendingBlocks.map((b) => b.port).join("_")}.ino`;

  if (_savedAnswers && _savedAnswers.name && _savedAnswers.email) {
    openFilenamePrompt();
  } else {
    openSurvey();
  }
}

/* ---------- modal focus handling ----------------------------------
   A dialog that does not hold focus is a trap for anyone using a keyboard or
   a screen reader: Tab walks out of it into the page behind, which is still
   visible and still clickable. */
let _focusBeforeModal = null;

function trapFocus(e) {
  const overlay = document.getElementById("survey-overlay");
  if (!overlay || !overlay.classList.contains("show")) return;

  if (e.key === "Escape") {
    e.preventDefault();
    closeSurvey();
    return;
  }
  if (e.key !== "Tab") return;

  const focusable = overlay.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function showModal() {
  const overlay = document.getElementById("survey-overlay");
  if (!overlay) return;
  _focusBeforeModal = document.activeElement;
  overlay.classList.add("show");
  document.addEventListener("keydown", trapFocus);
  const target = overlay.querySelector("input, select, button");
  if (target) target.focus();
}

function openSurvey(prefill = {}) {
  const overlay = document.getElementById("survey-overlay");
  const body = document.getElementById("survey-body");
  body.innerHTML = SURVEY_QUESTIONS.map((q) => {
    const req = q.required ? `<span class="req" aria-hidden="true">*</span>` : "";
    const val = prefill[q.key] || "";
    const maxLen =
      q.key === "ino_comment" ? LIMITS.maxCommentLength : LIMITS.maxTextFieldLength;
    return `
      <div class="field survey-field">
        <label for="sq-${escapeHtml(q.key)}">${escapeHtml(tData("survey", q.key, q.label))} ${req}</label>
        <input type="${escapeHtml(q.type)}" id="sq-${escapeHtml(q.key)}"
               placeholder="${escapeHtml(q.placeholder || "")}"
               maxlength="${maxLen}" autocomplete="${q.key === "email" ? "email" : q.key === "name" ? "name" : q.key === "country" ? "country-name" : "off"}"
               value="${escapeHtml(val)}" ${q.required ? 'required aria-required="true"' : ""}
               aria-describedby="sqerr-${escapeHtml(q.key)}">
        <span class="err-msg" id="sqerr-${escapeHtml(q.key)}">${escapeHtml(t("form.required"))}</span>
      </div>`;
  }).join("");
  const cb = document.getElementById("consent-checkbox");
  const btn = document.getElementById("confirm-btn");
  if (cb) cb.checked = false;
  if (btn) btn.disabled = true;
  showModal();
}

function openFilenamePrompt() {
  const overlay = document.getElementById("survey-overlay");
  const body = document.getElementById("survey-body");
  const fileNames = Object.keys(_savedFiles).sort();
  const hasFiles = fileNames.length > 0;

  const fileList = hasFiles
    ? `
    <div class="filename-section">
      <div class="filename-section-head">
        <strong>${escapeHtml(t("dialog.option1"))}</strong>
        <span class="filename-section-help">${escapeHtml(t("dialog.option1Help"))}</span>
      </div>
      <div class="saved-file-list">
        ${fileNames
          .map((fn) => {
            const ts = new Date(_savedFiles[fn].timestamp).toLocaleString();
            return `
          <div class="saved-file-row">
            <button type="button" class="saved-file-btn" onclick="selectSavedFilename('${escapeJsString(fn)}')">
              <span class="saved-file-name">${escapeHtml(fn)}</span>
              <span class="saved-file-meta">
                <span class="saved-file-ts">${escapeHtml(t("dialog.lastUsed"))} ${escapeHtml(ts)}</span>
                <span class="saved-file-action" aria-hidden="true">${escapeHtml(t("dialog.clickToUse"))} →</span>
              </span>
            </button>
            <button type="button" class="saved-file-del" onclick="removeSavedFile('${escapeJsString(fn)}'); return false;" aria-label="${escapeHtml(t("saved.forgetName"))} ${escapeHtml(fn)}" title="${escapeHtml(t("saved.forgetName"))}">✕</button>
          </div>`;
          })
          .join("")}
      </div>
    </div>
    <div class="saved-file-divider"><span>${escapeHtml(t("dialog.or"))}</span></div>
    <div class="filename-section">
      <div class="filename-section-head">
        <strong>${escapeHtml(t("dialog.option2"))}</strong>
        <span class="filename-section-help">${escapeHtml(t("dialog.option2Help"))}</span>
      </div>
    </div>`
    : "";

  body.innerHTML = `
    ${fileList}
    <div class="field survey-field">
      <label for="sq-filename">${escapeHtml(hasFiles ? t("dialog.filenameOrPrevious") : t("dialog.filename"))} <span class="req" aria-hidden="true">*</span></label>
      <input type="text" id="sq-filename" placeholder="${escapeHtml(t("dialog.filenamePlaceholder"))}"
             maxlength="60" autocomplete="off" required aria-required="true"
             aria-describedby="sqerr-filename filename-help">
      <span class="err-msg" id="sqerr-filename">${escapeHtml(t("form.required"))}</span>
      <span class="field-help" id="filename-help">${escapeHtml(t("dialog.filenameHelp"))}</span>
      <label class="stamp-opt">
        <input type="checkbox" id="sq-timestamp">
        ${escapeHtml(t("dialog.stamp"))}
      </label>
    </div>
    <div class="field survey-field">
      <label for="sq-ino_comment">${escapeHtml(t("dialog.comment"))}</label>
      <input type="text" id="sq-ino_comment" maxlength="${LIMITS.maxCommentLength}" autocomplete="off"
             placeholder="${escapeHtml(t("dialog.commentPlaceholder"))}">
    </div>
    <p class="saved-info-note">
      ${escapeHtml(t("dialog.submittingAs"))} <strong>${escapeHtml(_savedAnswers.name)}</strong> (${escapeHtml(_savedAnswers.email)}).
      <a href="#" onclick="closeSurvey(); editSavedAnswers(); return false;">${escapeHtml(t("dialog.notYou"))}</a>
    </p>`;

  const cb = document.getElementById("consent-checkbox");
  const btn = document.getElementById("confirm-btn");
  if (cb) cb.checked = true;
  if (btn) btn.disabled = false;
  showModal();
}

/* Saved files keep the whole sensor configuration, not just a name, so a
   previous setup can be reloaded into the form and adjusted. */
function renderSavedConfigs() {
  const wrap = document.getElementById("saved-configs");
  if (!wrap) return;
  const names = Object.keys(_savedFiles).sort();
  if (names.length === 0) {
    wrap.innerHTML = "";
    return;
  }
  wrap.innerHTML = `
    <div class="filename-section-head">
      <strong>${escapeHtml(t("saved.loadTitle"))}</strong>
      <span class="filename-section-help">${escapeHtml(t("saved.loadHelp"))}</span>
    </div>
    <div class="saved-file-list">
      ${names
        .map((fn) => {
          const rec = _savedFiles[fn];
          const n = (rec.blocks || []).length;
          const ts = new Date(rec.timestamp).toLocaleString();
          return `
        <div class="saved-file-row">
          <button type="button" class="saved-file-btn" onclick="loadSavedConfig('${escapeJsString(fn)}')">
            <span class="saved-file-name">${escapeHtml(fn)}</span>
            <span class="saved-file-meta">
              <span class="saved-file-ts">${n} ${escapeHtml(n === 1 ? t("saved.sensor") : t("saved.sensors"))} · ${escapeHtml(ts)}</span>
              <span class="saved-file-action" aria-hidden="true">${escapeHtml(t("saved.load"))} →</span>
            </span>
          </button>
          <button type="button" class="saved-file-del" onclick="removeSavedFile('${escapeJsString(fn)}'); return false;" aria-label="${escapeHtml(t("saved.forgetConfig"))} ${escapeHtml(fn)}" title="${escapeHtml(t("saved.forgetConfig"))}">✕</button>
        </div>`;
        })
        .join("")}
    </div>`;
}

function loadSavedConfig(fn) {
  const rec = _savedFiles[fn];
  if (!rec || !rec.blocks || rec.blocks.length === 0) return;
  if (
    !confirm(
      t("saved.confirmLoad", { name: fn }),
    )
  )
    return;

  document.getElementById("sensors-list").innerHTML = "";
  rec.blocks.forEach((b) => {
    addBlock();
    const bid = [...document.querySelectorAll(".sensor-block")].pop().dataset
      .bid;

    const stype = document.getElementById(`stype-sel-${bid}`);
    if (stype && [...stype.options].some((o) => o.value === b.sensor)) {
      stype.value = b.sensor;
      onSensorChange(bid); /* repopulates outputs and params */
    }
    const port = document.getElementById(`port-sel-${bid}`);
    if (port && b.port) port.value = b.port;

    const out = document.getElementById(`output-sel-${bid}`);
    if (out && [...out.options].some((o) => o.value === b.output)) {
      out.value = b.output;
      updateOutputTip(bid); /* refreshes params and viz lists */
    }
    const viz = document.getElementById(`viz-sel-${bid}`);
    if (viz && [...viz.options].some((o) => o.value === b.viz))
      viz.value = b.viz;

    /* restore saved values into the matching parameter rows */
    (b.params || []).forEach((p) => {
      document.querySelectorAll(`#params-${bid} .param-row`).forEach((row) => {
        const rid = row.dataset.rid;
        const nameEl = document.getElementById(`pname-${rid}`);
        if (
          nameEl &&
          normalizeParamName(nameEl.value) === normalizeParamName(p.name)
        ) {
          const valEl = document.getElementById(`pval-${rid}`);
          if (valEl) valEl.value = p.value;
        }
      });
    });

    const partner = document.getElementById(`partner-sel-${bid}`);
    if (partner && b.partnerPort) {
      if (![...partner.options].some((o) => o.value === b.partnerPort)) {
        partner.insertAdjacentHTML(
          "beforeend",
          `<option value="${escapeHtml(b.partnerPort)}">${escapeHtml(b.partnerPort)}</option>`,
        );
      }
      partner.value = b.partnerPort;
    }
  });

  checkDuplicatePorts();
  refreshAllBlocks();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function selectSavedFilename(fn) {
  const input = document.getElementById("sq-filename");
  if (input) {
    input.value = fn;
    input.focus();
  }
}

function removeSavedFile(fn) {
  if (
    !confirm(
      t("saved.confirmDelete", { name: fn }),
    )
  )
    return;
  deleteSavedFile(fn);
  openFilenamePrompt();
}

function closeSurvey() {
  document.getElementById("survey-overlay").classList.remove("show");
  document.removeEventListener("keydown", trapFocus);
  clearGenerateError();
  const genBtn = document.getElementById("gen-btn");
  setButtonLoading(genBtn, false);
  if (_focusBeforeModal && typeof _focusBeforeModal.focus === "function") {
    _focusBeforeModal.focus();
  }
  _focusBeforeModal = null;
}

/* ---------- submission guards ----------------------------------------
   The endpoint is a Google Apps Script web app: public by necessity, since
   this is a static site with no server of its own. These checks are the
   browser's share of the work only. The script itself must enforce the same
   rules, because anything here can be bypassed by anyone willing to open a
   console. See server/apps-script/Code.gs. */

const RATE_KEY = "nodeflow_submits_v1";

function recentSubmissions() {
  try {
    const raw = JSON.parse(localStorage.getItem(RATE_KEY) || "[]");
    const cutoff = Date.now() - 3600000;
    return Array.isArray(raw) ? raw.filter((t) => t > cutoff) : [];
  } catch (_) {
    return [];
  }
}

function rateLimitCheck() {
  const stamps = recentSubmissions();
  const now = Date.now();
  if (stamps.length && now - stamps[stamps.length - 1] < LIMITS.minSubmitIntervalMs) {
    return t("msg.tooFast");
  }
  if (stamps.length >= LIMITS.maxSubmitsPerHour) {
    return t("msg.hourlyLimit", { n: LIMITS.maxSubmitsPerHour });
  }
  return "";
}

function recordSubmission() {
  const stamps = recentSubmissions();
  stamps.push(Date.now());
  try {
    localStorage.setItem(RATE_KEY, JSON.stringify(stamps.slice(-100)));
  } catch (_) {}
}

function setButtonLoading(btn, loading, busyText) {
  if (!btn) return;
  const label = btn.querySelector(".gen-btn-label");
  if (loading) {
    btn.dataset.idleLabel = label ? label.textContent : btn.textContent;
    btn.disabled = true;
    btn.classList.add("is-loading");
    btn.setAttribute("aria-busy", "true");
    if (label) label.textContent = busyText || "Working...";
  } else {
    btn.disabled = false;
    btn.classList.remove("is-loading");
    btn.removeAttribute("aria-busy");
    if (label && btn.dataset.idleLabel) label.textContent = btn.dataset.idleLabel;
  }
}

/* Everything sent to the endpoint is rebuilt here from scratch: known keys
   only, each one cleaned and length-capped, and the whole thing refused if it
   is somehow still oversized. */
function buildSubmissionPayload(answers, blocks) {
  const variables = blocks
    .map((b, i) => {
      const paramStr = b.params
        .map((prm) => cleanText(prm.name, 60) + ": " + cleanText(prm.value, 40))
        .join(", ");
      return (
        "Sensor " +
        (i + 1) +
        ": Type: " +
        cleanText(b.sensor, 60) +
        " | Port: " +
        cleanText(b.port, 8) +
        " | Output: " +
        cleanText(b.output, 60) +
        " | Viz: " +
        cleanText(b.viz, 40) +
        " | Params: " +
        paramStr
      );
    })
    .join(" || ")
    .slice(0, 8000);

  return {
    timestamp: new Date().toISOString(),
    name: cleanText(answers.name),
    email: cleanText(answers.email),
    country: cleanText(answers.country),
    filename: cleanText(answers.filename, 80),
    ino_comment: cleanText(answers.ino_comment, LIMITS.maxCommentLength),
    variables,
  };
}

function sendSubmission(payload) {
  const endpoint = CFG.submitEndpoint;
  if (!endpoint) return; /* nothing configured: nothing is sent */

  const body = JSON.stringify(payload);
  if (byteLength(body) > LIMITS.maxPayloadBytes) {
    showGenerateError(
      t("msg.tooLarge"),
    );
    return;
  }

  recordSubmission();
  fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body,
  }).catch(() => {});
}

function confirmSurvey() {
  clearGenerateError();

  let valid = true;
  let firstBad = null;

  const flag = (el, bad, message) => {
    const err = el ? document.getElementById(el.id.replace("sq-", "sqerr-")) : null;
    if (el) {
      el.classList.toggle("error", bad);
      el.setAttribute("aria-invalid", bad ? "true" : "false");
    }
    if (err) {
      if (message) err.textContent = message;
      err.classList.toggle("show", bad);
    }
    if (bad) {
      valid = false;
      if (!firstBad) firstBad = el;
    }
  };

  SURVEY_QUESTIONS.forEach((q) => {
    const el = document.getElementById(`sq-${q.key}`);
    if (!el) return;
    const value = el.value.trim();
    if (q.required && value === "") {
      flag(el, true, t("form.required"));
      return;
    }
    if (value && q.key === "email" && !isEmailShaped(value)) {
      flag(el, true, t("dialog.badEmail"));
      return;
    }
    flag(el, false, "");
  });

  /* The filename field only exists on the short repeat-visitor dialog, so it
     is checked on its own rather than through SURVEY_QUESTIONS. */
  const fnEl = document.getElementById("sq-filename");
  if (fnEl) {
    const cleaned = cleanFilename(fnEl.value);
    if (fnEl.value.trim() === "") {
      flag(fnEl, true, t("form.required"));
    } else if (cleaned === "") {
      flag(
        fnEl,
        true,
        t("dialog.badFilename"),
      );
    } else {
      fnEl.value = cleaned;
      flag(fnEl, false, "");
    }
  }

  if (!valid) {
    if (firstBad) firstBad.focus();
    return;
  }

  const blocked = rateLimitCheck();
  if (blocked) {
    showGenerateError(blocked);
    return;
  }

  const answers = {};
  SURVEY_QUESTIONS.forEach((q) => {
    const cap =
      q.key === "ino_comment" ? LIMITS.maxCommentLength : LIMITS.maxTextFieldLength;
    const el = document.getElementById(`sq-${q.key}`);
    if (el) {
      answers[q.key] = cleanText(el.value, cap);
    } else if (_savedAnswers && _savedAnswers[q.key]) {
      answers[q.key] = cleanText(_savedAnswers[q.key], cap);
    } else {
      answers[q.key] = "";
    }
  });

  /* Read the timestamp choice BEFORE closing the modal removes the checkbox. */
  const stampEl = document.getElementById("sq-timestamp");
  const wantStamp = !!(stampEl && stampEl.checked);

  const toSave = { ...answers };
  delete toSave.filename;
  delete toSave.ino_comment;
  saveAnswers(toSave);
  closeSurvey();

  const btn = document.getElementById("confirm-btn");
  const genBtn = document.getElementById("gen-btn");
  setButtonLoading(btn, true, t("dialog.generating"));
  setButtonLoading(genBtn, true, t("form.generating"));

  let code;
  try {
    code = buildIno(_pendingBlocks, answers);
  } catch (err) {
    setButtonLoading(btn, false);
    setButtonLoading(genBtn, false);
    showGenerateError(
      t("msg.generateFailed"),
    );
    return;
  }
  const rawName = cleanFilename(answers.filename || "");
  const base =
    rawName || cleanFilename(_pendingFilename || "nodeflow") || "nodeflow";
  /* Only stamp the name if the user asked for it. Browsers cannot overwrite a
     download, so without a stamp a repeated name becomes name-1.ino; with it,
     each file is unique and dated. The choice is left to the user. */
  let filename = base + ".ino";
  if (wantStamp) {
    const d = new Date();
    const stamp =
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0") +
      "_" +
      String(d.getHours()).padStart(2, "0") +
      String(d.getMinutes()).padStart(2, "0");
    filename = base + "_" + stamp + ".ino";
  }
  downloadFile(code, filename);
  saveFile(filename, _pendingBlocks);

  setButtonLoading(btn, false);
  setButtonLoading(genBtn, false);
  clearGenerateError();
  clearFormError();

  document.getElementById("preview-code").textContent = code;
  document.getElementById("preview-wrap").classList.add("show");
  const sf = document.getElementById("success-filename");
  if (sf) sf.textContent = filename;
  document.getElementById("success-banner").classList.add("show");

  try {
    sendSubmission(buildSubmissionPayload(answers, _pendingBlocks));
  } catch (_) {}
}

function showGenerateError(msg) {
  let box = document.getElementById("generate-error");
  if (!box) {
    box = document.createElement("div");
    box.id = "generate-error";
    box.className = "generate-error";
    box.setAttribute("role", "alert");
    const body = document.getElementById("survey-body");
    if (body && body.parentNode)
      body.parentNode.insertBefore(box, body.nextSibling);
    else document.body.appendChild(box);
  }
  box.textContent = msg;
  box.classList.add("show");
}

function clearGenerateError() {
  const box = document.getElementById("generate-error");
  if (box) box.classList.remove("show");
}

function copyPreview() {
  const code = document.getElementById("preview-code").textContent;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.querySelector(".copy-btn");
    btn.textContent = t("result.copied");
    setTimeout(() => (btn.textContent = t("result.copy")), 1500);
  });
}

const INFO_KEY = "nodeflow_info_open_v1";

function toggleInfoBox() {
  const body = document.getElementById("info-box-body");
  const chevron = document.getElementById("info-box-chevron");
  const btn = document.querySelector(".info-box-title");
  if (!body) return;

  const isOpen = !body.classList.contains("collapsed");
  body.classList.toggle("collapsed", isOpen);
  if (chevron) chevron.innerHTML = isOpen ? "&#9656;" : "&#9662;";
  if (btn) btn.setAttribute("aria-expanded", String(!isOpen));

  try {
    localStorage.setItem(INFO_KEY, isOpen ? "closed" : "open");
  } catch (_) {}
}

function restoreInfoBoxState() {
  let state = "open";
  try {
    state = localStorage.getItem(INFO_KEY) || "open";
  } catch (_) {}
  if (state === "closed") {
    const body = document.getElementById("info-box-body");
    const chevron = document.getElementById("info-box-chevron");
    const btn = document.querySelector(".info-box-title");
    if (body) body.classList.add("collapsed");
    if (chevron) chevron.innerHTML = "&#9656;";
    if (btn) btn.setAttribute("aria-expanded", "false");
  }
}

/* Switching language has to rebuild the sensor blocks, because their markup is
   assembled in JavaScript rather than sitting in the page. The current
   selections are read out first and put back afterwards, so nobody loses work
   by changing language halfway through. */
function rebuildForLanguage() {
  const snapshot = [...document.querySelectorAll(".sensor-block")].map((block) => {
    const bid = block.dataset.bid;
    const partner = document.getElementById(`partner-sel-${bid}`);
    return {
      sensor: document.getElementById(`stype-sel-${bid}`).value,
      port: document.getElementById(`port-sel-${bid}`).value,
      output: document.getElementById(`output-sel-${bid}`).value,
      viz: document.getElementById(`viz-sel-${bid}`).value,
      partnerPort: partner ? partner.value : "",
      params: [...document.querySelectorAll(`#params-${bid} .param-row`)].map((row) => ({
        name: document.getElementById(`pname-${row.dataset.rid}`)?.value || "",
        value: document.getElementById(`pval-${row.dataset.rid}`)?.value || "",
      })),
    };
  });

  document.getElementById("sensors-list").innerHTML = "";
  snapshot.forEach((b) => {
    addBlock();
    const bid = [...document.querySelectorAll(".sensor-block")].pop().dataset.bid;

    const stype = document.getElementById(`stype-sel-${bid}`);
    if (stype && [...stype.options].some((o) => o.value === b.sensor)) {
      stype.value = b.sensor;
      onSensorChange(bid);
    }
    const port = document.getElementById(`port-sel-${bid}`);
    if (port && b.port) port.value = b.port;

    const out = document.getElementById(`output-sel-${bid}`);
    if (out && [...out.options].some((o) => o.value === b.output)) {
      out.value = b.output;
      updateOutputTip(bid);
    }
    const viz = document.getElementById(`viz-sel-${bid}`);
    if (viz && [...viz.options].some((o) => o.value === b.viz)) viz.value = b.viz;

    b.params.forEach((p) => {
      document.querySelectorAll(`#params-${bid} .param-row`).forEach((row) => {
        const nameEl = document.getElementById(`pname-${row.dataset.rid}`);
        if (nameEl && normalizeParamName(nameEl.value) === normalizeParamName(p.name)) {
          const valEl = document.getElementById(`pval-${row.dataset.rid}`);
          if (valEl) valEl.value = p.value;
        }
      });
    });

    const partner = document.getElementById(`partner-sel-${bid}`);
    if (partner && b.partnerPort) partner.value = b.partnerPort;
  });

  checkDuplicatePorts();
  refreshAllBlocks();
  renderSavedBanner();
  renderSavedConfigs();
}

if (self.NodeFlowI18n) self.NodeFlowI18n.init();

initTooltips();
addBlock();
loadSavedAnswers();
loadSavedFiles();
restoreInfoBoxState();
