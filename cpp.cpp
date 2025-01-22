#include "esp_camera.h"
#include <WiFi.h>

const char* ssid = "ASUS_60";
const char* password = "knife_7666";

void startCameraServer();

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = 15;
  config.pin_d1 = 2;
  config.pin_d2 = 4;
  config.pin_d3 = 5;
  config.pin_d4 = 18;
  config.pin_d5 = 19;
  config.pin_d6 = 21;
  config.pin_d7 = 22;
  config.pin_xclk = 0;
  config.pin_pclk = 23;
  config.pin_vsync = 25;
  config.pin_href = 26;
  config.pin_sscb_sda = 27;
  config.pin_sscb_scl = 28;
  config.pin_pwdn = 32;
  config.pin_reset = -1;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  if (esp_camera_init(&config) != ESP_OK) {
    Serial.println("Camera init failed");
    return;
  }

  startCameraServer();
}

void loop() {}

void startCameraServer() {
  // Start the camera HTTP server, stream on a URL like /stream
  Serial.println("Camera stream ready");
}
