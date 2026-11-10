# ADR 0001: Use direct Web Serial for Part 1

## Status

Accepted for Part 1.

## Context

The existing tester already accepts a small USB serial protocol. A local bridge or backend would add deployment, security, and port-ownership complexity without enabling a Part 1 requirement.

## Decision

Use the browser Web Serial API behind the `SerialTransport` interface. It is available only in compatible browsers and secure contexts such as localhost, requires a user port-selection gesture, and is checked at runtime. Unsupported browsers display a limitation rather than a misleading connection UI.

## Consequences

No server or extension is required for supported browsers. Other browsers cannot directly control HIRO through this interface. The transport abstraction intentionally leaves room for a future local bridge, WebSocket transport, or wireless adapter without changing the React controls.

## Related documentation

- [Architecture](ARCHITECTURE.md) — how this decision shapes the application.
- [Documentation map](README.md) — navigate to another guide.
