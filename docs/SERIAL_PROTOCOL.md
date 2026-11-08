# Serial protocol

The current firmware contract is defined by the preserved [Arduino tester](../arduino-scripts/built-in-function-testing/built-in-function-testing/built-in-function-testing.ino).

## Transport

| Property | Value |
| --- | --- |
| Connection | USB serial |
| Baud rate | 9600 |
| Request framing | Decimal ASCII command followed by `\n` |
| Firmware input | `Serial.readStringUntil('\n')`, then trim |
| Response | Informational text written by the firmware |

The firmware accepts only digits. Empty input is ignored, nonnumeric input prints `Invalid input. Enter a number.`, and unsupported numeric values print `Unknown command. Enter 99 for menu.`

## Commands

Commands `0` through `14` select a fixed tester movement; `99` prints the menu. The application validates fixed movement controls against `0..14`, serializes as `id + "\n"`, and exposes `99` through the terminal. See the [movement reference](MOVEMENT_REFERENCE.md) for the complete mapping.

For commands `0..14`, the sketch prints `Executing command: N`, calls `neutralStance(hiro)`, executes its switch case, then prints `Movement function returned.` and `Ready for next command.`. Command `0` still first calls neutral stance in the shared handler.

## Operational limits

- A completed browser write only means bytes were accepted by the serial stream.
- Movement routines are blocking; a later command is not a reliable interruption or stop.
- The UI prevents another card command until the recognizable `Ready for next command.` firmware line arrives. This is a conservative firmware-flow hint, not mechanical telemetry.
- Terminal input remains intentionally direct for debugging. Users should not send additional motion commands while the robot is busy.
- A physical power disconnect must remain available. The protocol contains no validated emergency-stop command.
