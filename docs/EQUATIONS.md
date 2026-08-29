# What the generated code actually computes

Last reviewed: 29 August 2026, against the manufacturer documentation in
`documentation/`.

This is the reference the `equation` column in `data/sensor_configuration.xlsx`
is trying to be. Every "what the code computes" entry below was read out of the
template in `assets/js/main.js`, not copied from that template's own comment.

## The one thing that explains most of the disagreements

**The spreadsheet documents the bare-sensor wiring. The code implements the
VA-3 adapter.** Both are real, both are Irrometer's, and they need completely
different arithmetic.

Wire a Watermark 200SS straight to an analog pin through a series resistor and
you have to do the work yourself: measure resistance with a voltage divider,
then run a calibration curve to get tension, with a temperature correction
term. Irrometer publishes all of that. That is what the `Rx*(Vs-A1)/A1` cell
and the `-3.213R - 4.093` tooltip describe, and they are correct for that
wiring.

Put a **200SS-VA3** between the sensor and the board and none of it runs. The
adapter does the excitation, the resistance measurement and the calibration
internally, and hands out a voltage proportional to tension: **0.01176 volts
per centibar, 0 to 239 kPa across 0 to 2.8 V**. The only arithmetic left is a division.
The adapter never exposes resistance at all, so there is no `Rx` and no divider
in the sketch.

The system this generator targets uses the VA-3. So where the sheet and the
code disagree about the Watermark, neither is wrong; they are describing
different hardware. The sheet is documenting the path this project does not
take.

## Where each number comes from

| Value | Source | Confidence |
|---|---|---|
| `0.01176` V per centibar, 0 to 239 kPa over 0 to 2.8 VDC | `documentation/va3.pdf`, Output Scaling and Specifications | **confirmed.** The datasheet prints `Reading (kPa) = Volts / 0.0117` in the text and `RESOLUTION: 0.01176 volts per centibar` in the specifications. The code now uses the more precise figure |
| Five minute update per channel, 500 ms power-up | `documentation/va3.pdf`, Operation and Power | **confirmed.** "the adapter will update each sensor channel on a five minute reading interval", `UPDATE RATE: 5 minutes`, `POWER UP TIME: 500ms` |
| Temperature channel scaled 0.49 to 2.8 VDC for 20 to 132 F (-6 to 56 C) | `documentation/va3.pdf`, Output Scaling | **confirmed** |
| `degF = 48.48 * (V - 0.49) + 20` | derived from the range endpoints | **the datasheet contradicts itself here.** It prints the slope as `50.68` but states the range as 20 to 132 F across 0.49 to 2.8 V. Those disagree: (132 - 20) / (2.8 - 0.49) = 48.48 exactly, while 50.68 would put full scale at 137.1 F. The code uses 48.48, which matches the stated range. **Ask Irrometer before changing it**; adopting 50.68 would read about 5 F high at the top of the scale |
| `R = Rx * (Vs - A1) / A1`, with `Rx` = 10 kOhm | `documentation/reading4.png` and `reading8.png`, and Fig. 2 which shows R1 = 10K | manufacturer published, **bare-sensor wiring only** |
| `kPa = (-3.213R - 4.093) / (1 - 0.009733R - 0.01205T)` | Shock 1998, `documentation/reading5.png`, the 1 to 8 kOhm segment | published, **bare-sensor wiring only** |
| Full three-segment Watermark curve with `tempD = 1.00 + 0.018 * (TC - 24)` | `documentation/reading6.png` | manufacturer published, not used here |
| 200TS resistance-to-temperature relationship | `documentation/temp.pdf` | **there is no published equation.** The datasheet says the relationship "is constant and built into the reading devices that are used to interrogate the sensor". The 200TS is a precision thermistor, accuracy +-0.2 C. So the temperature arithmetic belongs to the VA-3, not to the sensor |
| Capacitive probe output 0 to 2.9 VDC, supply 3.3 to 5.5 VDC | `documentation/dfrobot_specs.png` | **confirmed.** On a 5 V reference that caps the raw reading at about 593 counts, which is worth knowing when calibrating: an air reading near 590 is the ceiling, not a fault |
| Capacitive probe air and water calibration | no manufacturer equation exists | project convention. DFRobot publishes no calibration curve, so the two-point air/water span is the standard user procedure |
| Soil texture tension thresholds | project convention, `SOIL_THRESHOLDS` in main.js | agronomic judgement, should be checked by the project's agronomists |

## Capacitive probe (DFRobot SEN0308)

Reads **high in air, low in water**, which is why several spans below run
downwards.

| Measurement | What the code computes | Sheet's `equation` cell | Verdict |
|---|---|---|---|
| Raw Value (ADC) | `X`, the ADC reading 0 to 1023 | *(blank)* | code fills a gap |
| Raw Value (%) | `(air_val_max - X) * 100 / (air_val_max - water_val)`, clamped 0 to 100, and 0 if the two calibration points are equal | `(X-min)/(max-min)*100` | algebraically the same once `min` is the air reading and `max` the water reading, but the sheet does not say the span inverts, nor that it clamps, nor what happens uncalibrated |
| Thresholds | `X > a` gives 0 (very dry), `X > b` gives 50 (dry), otherwise 100 (wet). Expects `a > b` | `x > a → 'Too a' x > b → 'v ab' → 'good'` | sheet is garbled; the code is precise |
| Wetting Front | deep reading `< threshold` gives the deep depth; else shallow reading `< threshold` gives the shallow depth; else not arrived | `wetting has arrived at XX cm` | prose replaced by the rule |
| Volumetric Soil Moisture | `(x - WP) * 100 / (FC - WP)`, clamped, where `x = (-1/k) * (ln(X - water_val) - ln(air_val - water_val))` | `1/k*ln(V-water_val)/(air_val-water_val)` | the sheet describes only the intermediate `x`, and differs on two counts: no minus sign, and the division is outside the log rather than inside. **One of the two is wrong** |
| Vertical Flow Rate | `(deep depth - shallow depth) / hours between the two arrival times`, reset when the soil dries back out | *(blank)* | code fills a gap |
| Total Available Water | `(x - WP) * 100 / (FC - WP)`, clamped | `soil_moisture-WP*100/(FC-WP)` | **the sheet has a precedence bug.** As written it means `soil_moisture - (WP*100/(FC-WP))`. The code ignores it and does the right thing |

**Two measurements produce identical code.** Volumetric Soil Moisture and Total
Available Water generate byte-identical sketches. One of them is presumably
meant to report the volumetric fraction rather than the available-water
percentage.

## Watermark 200SS through the 200SS-VA3

| Measurement | What the code computes | Sheet's `equation` cell | Verdict |
|---|---|---|---|
| Raw value (Resistance) | `kPa`, the adapter's own tension figure | `Rx*(Vs-A1)/A1` | correct for a bare sensor, but the VA-3 never exposes resistance. The measurement name promises something this hardware cannot give |
| Raw Value (%) | `(dry_kPa - kPa) * 100 / (dry_kPa - wet_kPa)`, clamped, 0 if uncalibrated | `(X-min)/(max-min)*100` | different quantity: the code works in tension, not raw counts. Low tension means wet, so the span runs downwards |
| Tension (kPa) | `V / 0.01176`, clamped 0 to 239 | *(blank; the tooltip gives the resistance curve)* | the tooltip's `-3.213R - 4.093` is the bare-sensor equation and does not run here. The VA-3 has already done it |
| Management Thresholds | `kPa >= thr_high` gives 0 (dry, stressed); `kPa > thr_low` gives 50 (irrigation range); otherwise 100 (saturation) | *(blank)* | code fills a gap |

## Irrometer 200TS soil temperature

The 200TS is a thermistor. On its own it has no voltage output; the equation
below belongs to the VA-3's temperature channel.

| Measurement | What the code computes | Sheet's `equation` cell | Verdict |
|---|---|---|---|
| Raw value (Temperature, °F) | `20 + 48.48 * (V - 0.49)` | `20 + 48.48(V-0.49)` | **matches.** Only the implicit multiplication differs |
| Raw value (Temperature, °C) | `(20 + 48.48 * (V - 0.49) - 32) / 1.8` | `((20+48.48(V-0.49)-32)/1.8)` | **matches** |

## Watermark combined with 200TS

Same as the Watermark rows above, plus the two temperature rows. One extra
behaviour worth recording: on this sensor a temperature reading requires
**both** channels to be present, because `connected` is the Watermark channel
AND the temperature channel. A 200TS on its own with no Watermark beside it
reports "no sensor". That follows from the measurement being offered under a
combined sensor type, but it surprises people.

## How the VA-3 ties it all together

```
  Watermark 200SS  ->|
  Watermark 200SS  ->|  200SS-VA3  ->  0 to 2.8 V  ->  Arduino analog pin
  Watermark 200SS  ->|  (does the excitation, resistance
  200TS thermistor ->|   measurement and calibration)
```

- Up to three Watermarks plus one shared temperature probe per adapter.
- Output is proportional to tension at 0.01176 V per centibar. Divide and you are done.
- Because the adapter's output tops out at 2.8 V, about 573 counts on a 5 V
  reference, sensor presence is detected as `reading < VA3_MAX_COUNTS` (620).
- The wetting front partner check used to call `va3ChannelPresent()` on a
  capacitive probe. That has been changed to `portHasSensor()`, which is the
  right test for a probe wired straight to a pin. **An earlier note in this
  branch overstated the consequence.** It claimed the probe would be reported
  missing in dry soil. It would not have been: the DFRobot output cannot exceed
  2.9 V, about 593 counts, so the 620 threshold always passed. The old check was
  a no-op rather than a false negative, and the change makes it actually detect
  presence rather than fixing a wrong reading.
- The temperature channel needs its own presence test, and now has one. It is
  scaled from 0.49 V upwards, so an empty channel sits near 0 V, passes the
  `< 620` test, and produces about -4 F. The sketch now requires the
  temperature channel to clear a 0.45 V floor before it will believe it.
- Each channel refreshes on a five minute interval, confirmed by the datasheet,
  with the adapter producing its first output 500 ms after power up. So a
  grower switching on should expect the first sweep to be current and later
  channels to lag by up to five minutes.

## Rows that are notes rather than formulas

`Thresholds`, `Rate of Change of Soil Water Status`, `Wetting Front`,
`Vertical Flow Rate` and both `Management Thresholds` rows describe branching
or two-sensor logic. A single expression cannot represent them in either
direction, so their entry here is a two or three line statement and the column
can never become their source.

## Sources

Primary sources are in `documentation/` in this repository:

- `va3.pdf` 200SS-VA3 adapter datasheet, the authority for output scaling,
  update rate and the temperature channel
- `temp.pdf` 200TS temperature sensor datasheet
- `200ss.pdf` 200SS Watermark sensor datasheet
- `reading1.png` to `reading8.png` Irrometer's developer integration guide
- `dfrobot_specs.png` DFRobot capacitive probe specification

Online copies:

- Irrometer, Reading WATERMARK Sensors developer guide: <https://www.irrometer.com/200ss.html>
- Irrometer, WATERMARK Sensor Voltage Adapter 200SS-VA: <https://www.irrometer.com/pdf/405.pdf>
- Irrometer, 200SS-VA3 Sensor Adapter: <https://www.irrometer.com/pdf/427.pdf>
- Irrometer, 200SS WATERMARK Sensor: <https://www.irrometer.com/pdf/403.pdf>
- Irrometer, Temperature Sensor Model 200TS: <https://www.irrometer.com/pdf/406.pdf>
- Shock, C.C. et al. (1998), calibration of the Watermark 200SS, quoted in the developer guide above
