# Watermark.py
# sensor: Irrometer Watermark (200SS)

water_val = 0  # Water value: raw reading submerged in water  # min: 0  max: 239
air_val_max = 239  # The maximum air value.  # min: 0  max: 239
soil_type = Loam  # Soil texture sets the irrigation thresholds. Choosing a type fills in the two tension values below, which you can still adjust.
thr_low = 23  # Threshold to calculate how wet the soil is at 10% depletion.  # min: 0  max: 239
thr_high = 65  # Threshold to calculate how dry the soil is at 40% depletion.  # min: 0  max: 239
wiring = 200SS-VA3 adapter  # How the sensor reaches the board. Through the 200SS-VA3 adapter, which does the excitation and calibration itself, or wired straight to the Arduino with a series resistor. Direct wiring supports one Watermark only: two bare sensors in the same soil read through each other and damage their electrodes.
Rx = 10  # Series resistor between the sensor and ground, used only for direct wiring. Irrometer's reference circuit uses 10 kilohms.  # min: 1  max: 100
soil_temp_c = 24  # Soil temperature used to compensate the Watermark calibration when wiring direct. Irrometer uses 24 C when no temperature sensor is available.  # min: -10  max: 60

# supported outputs:
#   - Raw value (Resistance)  # equation: Rx*(Vs-A1)/A1
#   - Raw Value (%)  # inputs: abs(air_val_max), water_val  # equation: (X-min)/(max-min)*100
#   - Tension (kPa)
#   - Management Thresholds  # inputs: soil_type, thr_low, thr_high


def read(raw_value: float) -> dict:
    result = {}
    return result


if __name__ == "__main__":
    test_raw = 512
    output   = read(test_raw)
    print(f"Sensor : Irrometer Watermark (200SS)")
    print(f"Raw    : {test_raw}")
    print(f"Output : {output}")
