![HIRO Open Playground banner](assets/docs-visuals/UT-IEEE-HIRO-Open-Playground-Banner.png)

# HIRO Open Playground

HIRO Open Playground is an educational, traceable workspace for experimenting with the [HIRO](https://github.com/TakamoriRobot/HIRO) quadruped movement library. It pairs a verified Arduino movement tester with a local browser control interface, movement references, and contributor documentation.

It is being developed by students in the Vanguard university outreach program, including the IEEE Student Branch at UT Austin, for students learning robotics at their own institutions. This repository is independent community work: it is **not** an official Takamori Robot product, does not replace its software, and does not claim endorsement or ownership of HIRO.

Current maintenance release: **v1.1**. See the [release notes](CHANGELOG.md) and the [documentation map](docs/README.md).

## Current status

Implemented:

- A verified Arduino serial movement tester at [`arduino-scripts/built-in-function-testing/built-in-function-testing/built-in-function-testing.ino`](arduino-scripts/built-in-function-testing/built-in-function-testing/built-in-function-testing.ino).
- Fifteen preserved reference GIFs and a [movement reference](docs/MOVEMENT_REFERENCE.md).
- A React + TypeScript Web Serial control panel with an integrated terminal and explicit development-only mock transport.
- Unit tests for the command, terminal, and transport contracts.

Experimental / unverified:

- The web interface has not been validated with physical HIRO hardware as part of this repository change.
- Web Serial behavior varies by browser and operating system.
- User choreography, remote control, parameters, and telemetry are intentionally out of scope for Part 1.

## Quick start

1. Read [Getting started](docs/GETTING_STARTED.md), including the safety notes.
2. In Arduino IDE, install the upstream **HIRO** library and a supported Raspberry Pi Pico board package, then open and upload the tester sketch above.
3. Start the web control interface:

   ```powershell
   cd web
   npm.cmd install
   npm.cmd run dev
   ```

4. Open the localhost URL in a Web Serial-capable browser, connect to the robot, and select a movement. The protocol uses 9600 baud and newline-terminated decimal commands.

See [Serial protocol](docs/SERIAL_PROTOCOL.md) for the command contract and [Movement reference](docs/MOVEMENT_REFERENCE.md) for GIFs. The menu command (`99`) is available from the terminal.

## Repository map

```text
arduino-scripts/  Verified Arduino tester (preserved)
assets/           Canonical movement GIFs (preserved)
docs/             Setup, architecture, protocol, and reference documentation
web/              Local React/TypeScript Web Serial application and tests
```

## Safety and limitations

HIRO can move after a serial write finishes. The firmware is blocking while it runs a motion, so the browser cannot safely provide a guaranteed Stop control or infer mechanical completion. Keep a physical power disconnect available, use a clear test area, secure cables, and test at a safe distance. A terminal line such as `Movement function returned.` reports firmware flow only; it is not evidence that the robot moved safely or successfully.

The interface reports that a command was written, not that a motion completed. Do not queue or repeatedly issue movement commands while the firmware is busy.

## Release status and roadmap

- **v1.0 — complete:** Part 1 delivered documented fixed movements, direct USB serial control, mock development, and tests.
- **v1.1 — current:** Documentation navigation, compact movement-reference media, and small visual cleanup. No firmware, serial-protocol, or platform-identity behavior changed.
- **Future:** Consider documented choreography, configurable parameters, alternate transports, and real telemetry only after protocol and hardware behavior are validated.

## Contributing

Start with [CONTRIBUTING.md](CONTRIBUTING.md) and [Development](docs/DEVELOPMENT.md). In particular, do not modify the known-working firmware or replace movement media without a focused, reviewed reason.

## Documentation

Start at the [documentation map](docs/README.md) for the shortest route to setup, protocol, movements, architecture, or contribution guidance.
