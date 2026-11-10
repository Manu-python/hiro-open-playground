# Architecture

## System responsibilities

```text
React presentation -> HiroCommandService -> SerialTransport -> USB serial -> Arduino tester -> HIRO library
                         ^                     |
                         |                     v
TerminalBuffer <--- incoming chunks <--- WebSerialTransport
```

The verified Arduino tester owns robot motion. It parses newline-terminated decimal input at 9600 baud, moves HIRO to neutral before a recognized command, and calls the upstream HIRO library. The application does not alter that contract.

The web application separates responsibilities:

- `data/movements.ts` is the typed, single movement catalog used by controls and preview.
- `transports/SerialTransport.ts` defines the connection, write, incoming-data, status, and error contract. It enables future serial bridges or WebSockets without a UI rewrite.
- `WebSerialTransport` exclusively owns the browser port, streams, reader lifecycle, write serialization, and disconnect cleanup.
- `MockSerialTransport` implements the same contract for development only and is visibly opt-in.
- `HiroCommandService` validates movement identifiers and converts them to the current protocol (`N\n`). It tracks a firmware-ready hint; it does not claim hardware success.
- `TerminalBuffer` converts partial UTF-8-decoded chunks into bounded, structured log entries.
- React hooks and components render state and delegate actions; components never open their own ports.

## Design decisions

### One active transport

Movement cards and the terminal share one injected transport instance. This avoids competing handles for the same USB serial port and ensures all writes appear in one terminal history.

### Direct browser serial, no server

Web Serial is sufficient for an opt-in, local USB connection and avoids a local bridge or backend in Part 1. It requires a compatible browser, a secure context such as `localhost`, and a user port-selection gesture.

The rejected local-bridge alternative and its consequences are recorded in [ADR 0001](ADR-0001-DIRECT-WEB-SERIAL.md).

### Explicit completion semantics

The sketch prints `Ready for next command.` after the function returns. The command service uses that recognizable line only to re-enable fixed-movement controls; it remains a firmware-level indication, not proof of physical success. A missing line leaves controls locked rather than silently issuing another motion.

### GIF serving

Vite's `publicDir` points at the repository's canonical `assets/` folder. This serves the same media locally and copies it into production output without creating a second source copy. The UI renders only the selected preview.

## Related documentation

- [Development](DEVELOPMENT.md) — local commands and implementation conventions.
- [Serial protocol](SERIAL_PROTOCOL.md) — the firmware contract this architecture preserves.
- [Documentation map](README.md) — navigate to another guide.
