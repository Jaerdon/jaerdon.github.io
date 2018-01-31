---------------------------------
# PrintUI 3D Install Instructions
---------------------------------

**WARNING: FOLLOWING THESE INSTRUCTIONS INCORRECTLY CAN CORRUPT YOUR PRINTER FIRMWARE**

1. Create the following G-Code file and save it onto your SD card. Replace "\<SSID>" with your network's SSID, and "\<PASS>" with your network's password.
	```gcode
	M550 <SSID>
	M551 <PASS>
	```
	Please note each of these is case-sensitive.

2. Run the G-Code file as if it was a normal print. It should finish without any errors. Alternatively, if one is connected over USB, one can simply send the above commands line by line. Once finished, power cycle your printer.

3. Download PrintUI 3D from here. (Right-click -> Save As)

4. Once you've power cycled your printer, an IP should appear in the upper left-hand corner. This is your printer's local IP address. Then, in a web browser, go to `http://<Printer's IP>/up`, replacing <Printer's IP> with the IP address displayed on the printer. Click "Choose File" next to the "Upload web" button, and upload the PrintUI 3D file you downloaded in Step 3. Once finished, click "Upload web"
**IMPORTANT: DO NOT UPLOAD TO ANY OTHER OPTION, THESE ARE FOR UPDATING FIRMWARE**

5. Once the webpage verifies that the upload is complete, you can go to `http://<Printer's IP>` and access the webpage from there. 