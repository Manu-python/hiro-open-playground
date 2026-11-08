# Contributing to HIRO Open Playground

Thank you for helping make HIRO work easier to study and extend. This is a student-maintained educational repository; keep changes reviewable, factual, and compatible with upstream HIRO where possible.

## Before changing code

1. Read [Architecture](docs/ARCHITECTURE.md), [Serial protocol](docs/SERIAL_PROTOCOL.md), and [Development](docs/DEVELOPMENT.md).
2. Keep one purposeful change per branch or pull request.
3. Run the relevant checks in `web/` before requesting review.
4. State whether hardware was actually used in your PR description. Never represent simulated testing as physical validation.

## Firmware and assets

The Arduino tester is verified on hardware and its movement GIFs are canonical references. Do not casually rename, reformat, replace, or delete either. Isolate proposed firmware work in a new sketch or focused change, explain compatibility impact, and obtain review before uploading it to a robot.

## Adding or changing a movement

The web catalog in `web/src/data/movements.ts` is the single source of UI metadata. Update it, its tests, and [the movement reference](docs/MOVEMENT_REFERENCE.md) together. Confirm the number, upstream function signature, GIF filename, and sketch parameters from source—do not estimate timing, range, speed, or safety behavior.

## Style and review

Use TypeScript types at public boundaries, keep browser serial APIs inside transport implementations, and put serial protocol logic in services. Prefer small components and clear tests over clever abstractions. Document decisions that affect compatibility or future transports.

## Safety

Never add a UI control that claims to stop a movement unless firmware and hardware behavior have been deliberately validated. Keep connection errors visible and retain a physical power-disconnect plan during tests.
