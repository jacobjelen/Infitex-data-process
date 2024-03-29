# Infitex-data-process
Processing data from the 4-wire datalogger

## Simple datalogger-data process

1. Install CoolTerm
    - Mac: https://download.cnet.com/coolterm/3000-2383_4-10915190.html
    - Windows: https://coolterm.en.lo4d.com/windows

2. Connect in sensor
    - Connect it to USB
    - Open CoolTerm
    - Click the down arrow in bottom left
    - Select Port > pick your usb port
    - Click Connect
    - You should now see data coming in, if the sensor is connected

3. Record data
    - In the top menu, go to Connection > Capture to text/binary file > Start
    - Ideally name the file in the popup
    - To stop recording, go to Connection > Capture to text/binary file > Stop

4. Process data
    - go to **[https://infitex-data-process.netlify.app/](https://infitex-data-process.netlify.app/)**   [![Netlify Status](https://api.netlify.com/api/v1/badges/a0271b1e-07f6-454d-b792-ab5d0c44274b/deploy-status)](https://app.netlify.com/sites/infitex-data-process/deploys)
    - upload the .txt file with recorded data
    - click ‘Process’
    - download in a .txt or .csv
    - the data is in **timestamp,x,y,z;**. For exaplme: **2047594,60,677,1568;**
        - timestamp is in milliseconds since you plug in the sensor(usb)
        - X is 0 - 1000 from left to right of the insole
        - Y is 0 - 1000 from heel to toe of the insole
        - Z/activation is 0 - 4095 representing the pressure. Anything below 100 is considered noise. I was only able to get values up to about 2500 with the pressure I could excerpt on with my thumb.

5. Live visualisation
    - go to **[https://infitex-datalogger-insole.netlify.app/](https://infitex-datalogger-insole.netlify.app/)**  [![Netlify Status](https://api.netlify.com/api/v1/badges/b2fb875b-c504-46f7-ab6c-7fb0ed7eec1c/deploy-status)](https://app.netlify.com/sites/infitex-datalogger-insole/deploys)
    - click Connect and select Seeed XIAO M0
    - you should see when you press on the sensor

**Recording and visualising data does not work simultaneously. the serial port can only be connected to one at a time**


## Edit/Upload firmware to the Data-logger

1. Install Arduino IDE
    - **[https://www.arduino.cc/en/software](https://www.arduino.cc/en/software)**

2. Install Seeed SAMD Library to Arduino IDO
    - go to Arduino IDE (top left) - Settings
    - In the "Additional Boards Manager URLs" field, add this URL: https://files.seeedstudio.com/arduino/package_seeeduino_boards_index.json 
    - (if you have multiple URLs, separate them with commas)
    - Click the "OK" button.
    - go to Tools > Board > Boards Manager
    - find "Seeed SAMD Boards" in the list and click the "Install" button.
    - Wait for the installation to finish and click the "Close" button.
    - You'll now see the XIAO and other Seed SAMD boards under the Tools > Board menu.

3. Open DataloggerFirmware/DataloggerFirmware.ino in Arduino

4. Connect your data-logger to USB
    - Tools - Board - Seeed SAMD Boards - Seeeduino XIAO
    - Tools - Port - select the port where Seeeduino XIAO is connected

5. Upload the firmware
    - Sketch - Upload
