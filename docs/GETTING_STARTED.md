# Getting started

## What you need

- A HIRO setup supported by the upstream project, a USB data cable, and a safe, clear test space.
- Arduino IDE 2.0 or later and the upstream HIRO library. The [upstream README](https://github.com/TakamoriRobot/HIRO) documents installing the Raspberry Pi Pico/RP2040/RP2350 board package and `HIRO by Joseph Casebeer, Takamori Robot`.
- Node.js 20+ for the local web application.
- A browser with the Web Serial API (typically a Chromium-family desktop browser) for real USB control. Use `localhost` or another secure context.

## Flash the tester

1. Open `arduino-scripts/built-in-function-testing/built-in-function-testing/built-in-function-testing.ino` in Arduino IDE.
2. Select the correct Pico-compatible board and the robot's port according to the upstream setup instructions.
3. Confirm the HIRO headers resolve, then upload the sketch.
4. Open Serial Monitor at **9600 baud** with line ending set to newline. Send `99` to print the firmware menu.

The tester sketch is intentionally preserved. It calls `neutralStance(hiro)` before each recognized movement and uses its own fixed test parameters.

## Run the GUI

```powershell
cd web
npm.cmd install
npm.cmd run dev
```

Open the URL printed by Vite. The browser must report Web Serial availability before the real **Connect HIRO** button can work. Select the correct port in the browser's chooser; an existing permission alone does not mean a device is connected.

In development builds, **Use mock transport** is available for UI work without a robot. Its status is deliberately labeled simulated and it is never used automatically after a real connection fails.

## Connect and command

1. Position HIRO safely; keep a physical power disconnect available.
2. Connect the USB data cable and click **Connect HIRO**.
3. Select a movement card. The interface sends its decimal number followed by a newline.
4. Read incoming firmware output in the terminal. Use terminal input for `99` or other deliberate protocol experiments.
5. Click **Disconnect** only when it is safe to release the port.

Commands are not a safety-stop mechanism. The motion firmware is blocking, so do not assume a second command interrupts the first. See [Serial protocol](SERIAL_PROTOCOL.md).
