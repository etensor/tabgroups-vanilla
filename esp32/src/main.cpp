#include <Arduino.h>
#include <SPI.h>
#include <LedControl.h>
// #include <WiFiMulti.h>
#include <WiFi.h>
#include <AsyncUDP.h>
#include <ArduinoJson.h>

#include <vector>
#include <cmath>

#include "matrixr.h"

#define mapRange(a1,a2,b1,b2,s) (b1 + (s-a1)*(b2-b1)/(a2-a1))
// rosettacode/map_range


// wifi settings
// -------------
// WiFiMulti wifiMulti;
bool isConnected = false;
const char *w_ssid = "daniju";
const char *w_passwd = "20601022";


// udp settings
AsyncUDP udp;
DynamicJsonDocument doc(1024);



// led matrix settings

int pinCS = 5;
int pinDIN = 23;
int pinCLK = 18;
LedControl lc = LedControl(pinDIN, pinCLK, pinCS, 1);

const unsigned char PROGMEM smiley[] = {
    B00000000,
    B01000010,
    B00000000,
    B00011000,
    B10000001,
    B01000010,
    B00111100,
    B00000000};

byte smiley_face[8] = {0x3C, 0x42, 0xA5, 0x81, 0xA5, 0x99, 0x42, 0x3C};

// std::vector<std::array<int,2>>

std::vector<std::vector<std::array<int, 2>>> positions{
    {{{1, 1}, {1, 2}, {2, 1}}},
    {{{6, 6}, {6, 5}, {5, 6}}},
    {{{1, 5}, {1, 6}, {2, 6}}},
    {{{5, 1}, {6, 1}, {6, 2}}}};

Matrixr mtr;

void printByte(byte character[])
{
  int i = 0;
  for (i = 0; i < 8; i++)
    lc.setRow(0, i, character[i]);
}

//bool gback = false;

void setup()
{
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);

  lc.shutdown(0, false);  // The MAX72XX is in power-saving mode on startup
  lc.setIntensity(0, 15); // Set the brightness to maximum value
  lc.clearDisplay(0);     // and clear the display

  Serial.println("Starting up...");

  /// <== non-blocking
  WiFi.mode(WIFI_STA);
  WiFi.begin(w_ssid, w_passwd);

  // <== blocking
  // wifiMulti.addAP(WIFI_SSID, WIFI_PASSWORD);
  // while (wifiMulti.run() != WL_CONNECTED) {
  //  delay(150);
  //}

  if (udp.listen(1234)){
    Serial.println("UDP Listening. . .");

    udp.onPacket([](AsyncUDPPacket packet) {
      //packet.remoteIP().toString().c_str(),
      //packet.localIP().toString().c_str(),
      
      deserializeJson(doc, packet.data());
      //Serial.println("\n\n");
      serializeJsonPretty(doc, Serial);

    });

  }


}


void loop() {
  // put your main code here, to run repeatedly:
  //digitalWrite(LED_BUILTIN, HIGH);

  if (WiFi.status() == WL_CONNECTED && !isConnected) {
    Serial.println("WiFi connected.");
    Serial.print("\t IP address: \n\t");
    Serial.println(WiFi.localIP());
    digitalWrite(LED_BUILTIN, HIGH);
    isConnected = true;
    mtr.printMap(lc,positions, 250, 5, false);
  }
  else if (WiFi.status() != WL_CONNECTED) {
    Serial.print(". ");
    digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
    delay(1000);
    isConnected = false;
    mtr.printMap(lc,positions, 200, 7, true);
  }

  // works fokin nice :)
  //lc.setRow(0,mapRange(-M_PI,M_PI,0,7, (float) doc["sensordata"]["gyro"]["x"]), 0b1111111);

  //lc.setLed(0, 
  //  mapRange(-M_PI,M_PI,0,7, (float) doc["sensordata"]["gyro"]["x"]),
  //  mapRange(-M_PI,M_PI,0,7, (float) doc["sensordata"]["gyro"]["y"]),
  //  1);


  if (doc["sensordata"]["touch"].size() > 0) {
    for (int i = 0; i < doc["sensordata"]["touch"].size(); i++) {
      lc.setLed(0,
        mapRange(-1,1,0,8, (float) doc["sensordata"]["touch"][i]["x"]),
        mapRange(-1,1,8,0, (float) doc["sensordata"]["touch"][i]["y"]),
        1
      );
    }

  }

  delay(15);
  lc.clearDisplay(0);

  


}





  //digitalWrite(LED_BUILTIN, LOW);


  // printByte(smiley_face);

  /*
  lc.setLed(0,1,1,1);
  lc.setLed(0,1,2,1);
  */

  // mtr.printMap(lc,positions, 250, 5, false);

  // mtr.moveForm(positions,1,1,-1);
  // gback ? mtr.moveMap(positions,-1,-1) : mtr.moveMap(positions,1,1);
  // gback = !gback;

  // mtr.printMap(lc,positions, 200, 7, true);