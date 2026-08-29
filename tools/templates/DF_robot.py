# DF_robot.py
# sensor: Soil moisture capacitive sensor (such as the DFRobot SEN0308)

air_val = 590  # Air value: raw reading in open air. The DFRobot probe outputs at most 2.9 V, about 593 counts on a 5 V board, so this sits just under 600.  # min: 0  max: 1023
water_val = 280  # Water value: the raw reading with the probe standing in water. Typically around 280 on a 5 V board. Measure it, do not assume it.  # min: 0  max: 1023
fc = 0.3  # Field capacity: The amount of water that remains in the soil after all the excess water at saturation has been drained.  # min: 0  max: 1
wp = 0.1  # Wilting point:  When plants take up all the available water for a given soil and it dries out to the point where it cannot supply any water to keep plants from dying  # min: 0  max: 1
k = 6.1  # k: calibration scaling factor, fitted by matching gravimetric samples to the sensor. The default spreads a typical probe across 0 to about 50 % volumetric water, but it is soil specific and should be calibrated.  # min: 0  max: 10
air_val_min = 0  # Air value: raw reading in open air  # min: 0  max: 0
air_val_max = 590  # Air value: raw reading in open air  # min: 0  max: 1023
a = 450  # The upper threshold used to calculate the state of the sensor.  # min: 0  max: 1023
b = 350  # The lower theshold used to calculate the state of the sensor.  # min: 0  max: 1023
shallow = 15  # The depth of the sensor closest to the surface.  # min: 0  max: 200
deep = 40  # The depth of the sensor deepest in the soil.  # min: 0  max: 200
threshold = 400  # The threshold for the front arrival.  # min: 0  max: 1023

# supported outputs:
#   - Raw Value (ADC)  # inputs: air_val_min
#   - Raw Value (%)  # inputs: air_val_max, water_val  # equation: (X-min)/(max-min)*100
#   - Thresholds  # inputs: a, b  # equation: x > a → 'Too a' x > b → 'v ab' → 'good'
#   - Wetting Front  # inputs: shallow, deep, threshold
#   - Volumetric Soil Moisture  # inputs: air_val, water_val, FC, WP  # equation: 1/k*ln(V-water_val)/(air_val-water_val)
#   - Vertical Flow Rate  # inputs: shallow, deep, threshold
#   - Total Available Water  # inputs: air_val, water_val, FC, WP  # equation: soil_moisture-WP*100/(FC-WP)


def read(raw_value: float) -> dict:
    result = {}
    return result


if __name__ == "__main__":
    test_raw = 512
    output   = read(test_raw)
    print(f"Sensor : Soil moisture capacitive sensor (such as the DFRobot SEN0308)")
    print(f"Raw    : {test_raw}")
    print(f"Output : {output}")
