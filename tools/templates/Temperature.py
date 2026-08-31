# Temperature.py
# sensor: Irrometer Soil Temperature Sensor (200TS)

wiring = 200SS-VA3 adapter  # How the sensor reaches the board. Through the 200SS-VA3 adapter, which does the excitation and calibration itself, or wired straight to the Arduino with a series resistor. Direct wiring supports one Watermark only: two bare sensors in the same soil read through each other and damage their electrodes.
Rx = 10  # Series resistor between the sensor and ground, used only for direct wiring. Irrometer's reference circuit uses 10 kilohms.  # min: 1  max: 100
therm_r25 = 10000  # Resistance of the 200TS at 25 C, for direct wiring. NOT PUBLISHED BY IRROMETER: the datasheet says the curve is built into their reading devices. The default assumes a generic 10 kilohm NTC and must be checked against your sensor before the reading is trusted.  # min: 100  max: 100000
therm_beta = 3435  # Beta coefficient of the 200TS, for direct wiring. Same caveat as the resistance above: this is a generic NTC value, not an Irrometer figure.  # min: 1000  max: 6000

# supported outputs:
#   - Raw value (Temperature, in °F)  # equation: 20 + 48.48(V-0.49)
#   - Raw value (Temperature, in °C)  # equation: ((20+48.48(V-0.49)-32)/1.8)


def read(raw_value: float) -> dict:
    result = {}
    return result


if __name__ == "__main__":
    test_raw = 512
    output   = read(test_raw)
    print(f"Sensor : Irrometer Soil Temperature Sensor (200TS)")
    print(f"Raw    : {test_raw}")
    print(f"Output : {output}")
