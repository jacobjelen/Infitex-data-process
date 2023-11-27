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
    - go to **[https://infitex-data-process.netlify.app/](https://infitex-data-process.netlify.app/)** [![Netlify Status](https://api.netlify.com/api/v1/badges/a0271b1e-07f6-454d-b792-ab5d0c44274b/deploy-status)](https://app.netlify.com/sites/infitex-data-process/deploys)
    - upload the .txt file with recorded data
    - click ‘Process’
    - download in a .txt or .csv
    - the data is in the following format: **XXXXXXXXXXXXXX**
        - timestamp is in milliseconds since you plug in the sensor(usb)
        - X is 0 - 1000 from left to right of the insole
        - Y is 0 - 1000 from heel to toe of the insole
        - Z/activation is 0 - 4095 representing the pressure. Anything below 100 is considered noise. I was only able to get values up to about 2500 with the pressure I could excerpt on with my thumb.

5. Live visualisation
    - go to **XXXXXXXXXXXXXX**
    - click Connect and select Seeed XIAO M0
    - you should see when you press on the sensor

**Recording and visualising data does not work simultaneously. the serial port can only be connected to one at a time**