# Development

## Local commands

From `web/`:

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run test
npm.cmd run build
```

`npm.cmd run test` runs Vitest without hardware. Tests cover the catalog, protocol serialization and validation, terminal chunk parsing and bounds, mock lifecycle/errors, and subscription cleanup. Build output is placed in `web/dist/` and is ignored by Git.

## Development contract

- Use the mock transport intentionally for UI development. It may emit firmware-like text but does not control hardware.
- Keep all serial APIs inside `src/transports/`; React calls services through `useHiroController`.
- Add movements to `src/data/movements.ts`, not to individual components. Update tests and docs in the same change.
- `TerminalBuffer` receives arbitrary text chunks, so do not treat a read as a complete line or decode UTF-8 chunks independently.
- Keep terminal memory bounded. The current buffer holds at most 500 entries.

## Hardware testing

Record the browser, operating system, board, serial port behavior, library version, and observed result in any hardware-validation report. Do not modify the tested sketch merely to accommodate unverified browser assumptions.

## Future protocol work

Any protocol extension should begin with a separate firmware experiment, a documented compatibility plan, and tests. Consider explicit acknowledgements or telemetry only after validating their behavior and safety implications.

## Related documentation

- [Architecture](ARCHITECTURE.md) — component responsibilities and design decisions.
- [Contributing](../CONTRIBUTING.md) — review and firmware-safety expectations.
- [Documentation map](README.md) — navigate to another guide.
