/*
 * arduino_stub.h
 *
 * enough of the Arduino and AVR environment for a desktop c++ compiler to
 * syntax check a generated sketch. it is not a simulator and it runs nothing.
 * the point is to catch the mistakes that would otherwise surface only when a
 * grower presses upload: an unresolved template placeholder, a variable that
 * was never declared, a function called with the wrong types, a brace in the
 * wrong place.
 *
 * used by tools/verify_sketches.py. add to it when a template starts using an
 * Arduino API that is not here yet.
 */

#ifndef NODEFLOW_ARDUINO_STUB_H
#define NODEFLOW_ARDUINO_STUB_H

#include <cstdint>
#include <cmath>
#include <cstring>

typedef uint8_t byte;
typedef bool boolean;

/* ---- pins ---- */
static const uint8_t A0 = 14, A1 = 15, A2 = 16, A3 = 17;
static const uint8_t A4 = 18, A5 = 19, A6 = 20, A7 = 21;

static const uint8_t LOW = 0, HIGH = 1;
static const uint8_t INPUT = 0, OUTPUT = 1, INPUT_PULLUP = 2;

/* ---- core functions ---- */
void pinMode(uint8_t pin, uint8_t mode);
void digitalWrite(uint8_t pin, uint8_t value);
int digitalRead(uint8_t pin);
int analogRead(uint8_t pin);
void analogWrite(uint8_t pin, int value);
void analogReference(uint8_t mode);
void delay(unsigned long ms);
void delayMicroseconds(unsigned int us);
unsigned long millis();
unsigned long micros();

long map(long x, long inMin, long inMax, long outMin, long outMax);

/*
 constrain, min, max and abs are macros in the real headers, which is what
   lets them take any numeric type. keep them macros here for the same reason.
                 */
#define constrain(amt, low, high) \
  ((amt) < (low) ? (low) : ((amt) > (high) ? (high) : (amt)))
#ifndef min
#define min(a, b) ((a) < (b) ? (a) : (b))
#endif
#ifndef max
#define max(a, b) ((a) > (b) ? (a) : (b))
#endif

/* ---- flash string helpers ---- */
class __FlashStringHelper;
#define F(string_literal) (reinterpret_cast<const __FlashStringHelper *>(string_literal))
#define PROGMEM

class String {
 public:
  String() {}
  String(const char *) {}
  String(int, int = 10) {}
  String(long, int = 10) {}
  String(unsigned int, int = 10) {}
  String(double, int = 2) {}
  String(float, int = 2) {}
  String operator+(const String &) const { return String(); }
  const char *c_str() const { return ""; }
  unsigned int length() const { return 0; }
};

/* ---- Serial ---- */
class SerialClass {
 public:
  void begin(unsigned long) {}
  void end() {}
  int available() { return 0; }
  int read() { return -1; }
  void flush() {}

  void print(const char *) {}
  void print(const __FlashStringHelper *) {}
  void print(const String &) {}
  void print(char) {}
  void print(int, int = 10) {}
  void print(unsigned int, int = 10) {}
  void print(long, int = 10) {}
  void print(unsigned long, int = 10) {}
  void print(double, int = 2) {}

  void println() {}
  void println(const char *) {}
  void println(const __FlashStringHelper *) {}
  void println(const String &) {}
  void println(char) {}
  void println(int, int = 10) {}
  void println(unsigned int, int = 10) {}
  void println(long, int = 10) {}
  void println(unsigned long, int = 10) {}
  void println(double, int = 2) {}
};
extern SerialClass Serial;

/* ---- LiquidCrystal ---- */
class LiquidCrystal {
 public:
  LiquidCrystal(uint8_t, uint8_t, uint8_t, uint8_t, uint8_t, uint8_t) {}
  LiquidCrystal(uint8_t, uint8_t, uint8_t, uint8_t, uint8_t, uint8_t, uint8_t,
                uint8_t, uint8_t, uint8_t, uint8_t) {}
  void begin(uint8_t, uint8_t) {}
  void clear() {}
  void home() {}
  void setCursor(uint8_t, uint8_t) {}
  void createChar(uint8_t, uint8_t[]) {}
  void display() {}
  void noDisplay() {}
  void cursor() {}
  void noCursor() {}
  void blink() {}
  void noBlink() {}

  void write(uint8_t) {}
  void write(int) {}

  void print(const char *) {}
  void print(const __FlashStringHelper *) {}
  void print(const String &) {}
  void print(char) {}
  void print(int, int = 10) {}
  void print(unsigned int, int = 10) {}
  void print(long, int = 10) {}
  void print(unsigned long, int = 10) {}
  void print(double, int = 2) {}
};

/* ---- AVR registers used by the battery check ---- */
extern volatile uint8_t ADMUX;
extern volatile uint8_t ADCSRA;
extern volatile uint8_t ADCL;
extern volatile uint8_t ADCH;
extern volatile uint16_t ADC;

static const uint8_t REFS0 = 6, REFS1 = 7;
static const uint8_t MUX0 = 0, MUX1 = 1, MUX2 = 2, MUX3 = 3;
static const uint8_t ADSC = 6, ADEN = 7, ADIF = 4;

#define _BV(bit) (1 << (bit))
#define bit_is_set(sfr, bit) ((sfr) & _BV(bit))
#define bit_is_clear(sfr, bit) (!((sfr) & _BV(bit)))

/* ---- arduino's binary literal macros, B00000000 through B11111111 ---- */
#define B0 0
#define B1 1
#define B00 0
#define B01 1
#define B10 2
#define B11 3
#define B000 0
#define B001 1
#define B010 2
#define B011 3
#define B100 4
#define B101 5
#define B110 6
#define B111 7
#define B0000 0
#define B0001 1
#define B0010 2
#define B0011 3
#define B0100 4
#define B0101 5
#define B0110 6
#define B0111 7
#define B1000 8
#define B1001 9
#define B1010 10
#define B1011 11
#define B1100 12
#define B1101 13
#define B1110 14
#define B1111 15
#define B00000 0
#define B00001 1
#define B00010 2
#define B00011 3
#define B00100 4
#define B00101 5
#define B00110 6
#define B00111 7
#define B01000 8
#define B01001 9
#define B01010 10
#define B01011 11
#define B01100 12
#define B01101 13
#define B01110 14
#define B01111 15
#define B10000 16
#define B10001 17
#define B10010 18
#define B10011 19
#define B10100 20
#define B10101 21
#define B10110 22
#define B10111 23
#define B11000 24
#define B11001 25
#define B11010 26
#define B11011 27
#define B11100 28
#define B11101 29
#define B11110 30
#define B11111 31

#endif /* NODEFLOW_ARDUINO_STUB_H */
