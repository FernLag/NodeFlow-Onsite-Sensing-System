# Temperature.py
# Sensor: Irrometer Soil Temperature Sensor (200TS)

# No parameters defined

# Supported outputs:
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
