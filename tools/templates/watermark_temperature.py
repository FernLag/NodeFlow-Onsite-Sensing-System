# Watermark_Temperature.py
# Sensor: Irrometer Watermark (200SS) combined with Irrometer Soil Temperature Sensor (200TS)

air_val_max = 239  # The maximum air value.  # min: 0  max: 239
water_val = 0  # The set water value.  # min: 0  max: 239
soil_type = Loam  # Soil texture sets the irrigation thresholds. Choosing a type fills in the two tension values below, which you can still adjust.
thr_low = 23  # Threshold to calculate how wet the soil is at 10% depletion.  # min: 0  max: 239
thr_high = 65  # Threshold to calculate how dry the soil is at 40% depletion.  # min: 0  max: 239

# Supported outputs:
#   - Raw value (Resistance)  # equation: Rx*(Vs-A1)/A1
#   - Raw Value (%)  # inputs: abs(air_val_max), water_val  # equation: (X-min)/(max-min)*100
#   - Tension  # equation: Inside of the code itself for simplicity
#   - Raw value (Temperature, in °F)  # equation: 20 + 48.48(V-0.49)
#   - Raw value (Temperature, in °C)  # equation: ((20+48.48(V-0.49)-32)/1.8)
#   - Management Thresholds  # inputs: soil_type, thr_low, thr_high


def read(raw_value: float) -> dict:
    result = {}
    return result


if __name__ == "__main__":
    test_raw = 512
    output   = read(test_raw)
    print(f"Sensor : Irrometer Watermark (200SS) combined with Irrometer Soil Temperature Sensor (200TS)")
    print(f"Raw    : {test_raw}")
    print(f"Output : {output}")
