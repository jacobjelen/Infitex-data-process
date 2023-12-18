/*
  infi-tex 4 wire data logger

  The sensor pins are mapped as follows:
    A0 = Y-
    A1 = Y+
    A2 = X+
    A3 = X-

  A0 and A1 both have 4k7 ohm pull-up resistors to + 5 V (or +3.3 V on the V2 variant)
  A2 and A3 both have 4k7 ohm pull-down resistors to GND

  Use the #define ms_BETWEEN_ADC_READS to change the rate at which data is captured.
  e.g.s:
    ms_BETWEEN_ADC_READS 1000 would result in 1 set of reading being taken each second
    If you wanted a sample rate of 50 Hz then 1 / 50 = 0.020 s or 20 ms i.e: ms_BETWEEN_ADC_READS 20
    
  Notes:
  - Arduino functions are sequential and are blocking i.e. the analogue reads happen one after each other and data is not transported via DMA.
  - It appears to take less than 1 ms to record all 4 ADC channels
  - Comment out / uncomment / change the values in the #defines below to activate / deactivate functionality
  - The 4 wire Datalogger V2 can measure 12 bit ADC values instead of 10 bit values for an increased resolution...
*/

#define ms_BETWEEN_ADC_READS 1
//#define MEASURE_ADC_CAPTURE_DURATION
#define MEASURE_12_BIT_ADC_VALUES // 4 wire Datalogger V2 ONLY!!!
// #define V2_DUAL_DATALOGGER // 4 wire Datalogger V2 DUAL ONLY!!!

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 115200 bits per second:
  Serial.begin(115200);

  #ifdef MEASURE_12_BIT_ADC_VALUES
  analogReadResolution(12);
  #endif // MEASURE_12_BIT_ADC_VALUES
}

// the loop routine runs over and over again forever:
void loop() {
  unsigned long LastReadTime = millis();

  #ifdef MEASURE_ADC_CAPTURE_DURATION
  unsigned long ADCStart;
  #endif // MEASURE_ADC_CAPTURE_DURATION
  
  while(1)
  {
    if( millis() > LastReadTime + (ms_BETWEEN_ADC_READS) )
    {
      Serial.println("ERROR: SYSTEM NOT KEEPING UP WITH REQUIRED SAMPLE RATE - PLEASE REVISE");

      // Update the last time data was "read":
      LastReadTime = millis();
    }
    else if( millis() == LastReadTime + (ms_BETWEEN_ADC_READS) )
    {
      // Update the last time data was read:
      LastReadTime = millis();

      #ifdef MEASURE_ADC_CAPTURE_DURATION
      ADCStart = millis();
      #endif // MEASURE_ADC_CAPTURE_DURATION

      // Read the inputs on the analog pins:
      int sensorValue1 = analogRead(A0);
      int sensorValue2 = analogRead(A1);
      int sensorValue3 = analogRead(A2);
      int sensorValue4 = analogRead(A3);

      #ifdef V2_DUAL_DATALOGGER
      int sensorValue5 = analogRead(A7);
      int sensorValue6 = analogRead(A8);
      int sensorValue7 = analogRead(A9);
      int sensorValue8 = analogRead(A10);
      #endif // V2_DUAL_DATALOGGER

      #ifdef MEASURE_ADC_CAPTURE_DURATION
      String tmp = "It takes the following duration in ms to capture all ADC channels: ";
      Serial.println(tmp + (millis() - ADCStart) );
      #endif // MEASURE_ADC_CAPTURE_DURATION

      // Print the values to the serial port with delineating characters:
      String p1 = "#";
      String p2 = ",";
      String p3 = ";";

      #ifdef V2_DUAL_DATALOGGER
      Serial.println(millis() + p1 + sensorValue1 + p2 + sensorValue2 + p2 + sensorValue3 + p2 + sensorValue4 + p2 + sensorValue5 + p2 + sensorValue6 + p2 + sensorValue7 + p2 + sensorValue8 + p3);
      #else // V2_DUAL_DATALOGGER
      Serial.println(millis() + p1 + sensorValue1 + p2 + sensorValue2 + p2 + sensorValue3 + p2 + sensorValue4 + p3);
      #endif // V2_DUAL_DATALOGGER
    }
  }
}
