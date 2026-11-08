# Movement reference

These 15 GIFs are the original repository assets. They are visual references, not calibrated motion specifications. HIRO's actual behavior can depend on its starting pose, mechanical condition, power, and environment. The tester calls `neutralStance(hiro)` before every recognized command, including command `0`.

The upstream Takamori Robot HIRO library defines the named movement functions; the parameter values below are selected by this repository's tester (`speed = 2`, `steps = 1`, and, where used, `repetitions = 2`). Those values do **not** describe every use of the upstream library.

## Contents

| Command | Movement | Library function | Category |
| ---: | --- | --- | --- |
| [0](#0-neutral-stance) | Neutral stance | `neutralStance` | Neutral/emote |
| [1](#1-wave) | Wave | `wave` | Neutral/emote |
| [2](#2-side-to-side-worm) | Side-to-side worm | `sideToSideWorm` | Exercise/dance |
| [3](#3-side-to-side-stretch) | Side-to-side stretch | `sideToSideStretch` | Exercise/dance |
| [4](#4-cabbage-patch) | Cabbage Patch | `cabbagePatch` | Exercise/dance |
| [5](#5-cabbage-patch-2) | Cabbage Patch 2 | `cabbagePatch2` | Exercise/dance |
| [6](#6-push-ups) | Push-ups | `pushUps` | Exercise/dance |
| [7](#7-easy-forward) | Easy forward | `easyForward` | Easy locomotion |
| [8](#8-easy-backward) | Easy backward | `easyBackward` | Easy locomotion |
| [9](#9-easy-clockwise) | Easy clockwise | `easyClockwise` | Easy locomotion |
| [10](#10-easy-counterclockwise) | Easy counterclockwise | `easyCounterClockwise` | Easy locomotion |
| [11](#11-advanced-walk-forward) | Advanced walk forward | `walkForward` | Advanced locomotion |
| [12](#12-advanced-walk-backward) | Advanced walk backward | `walkBackward` | Advanced locomotion |
| [13](#13-advanced-rotate-clockwise) | Advanced rotate clockwise | `rotateClockwise` | Advanced locomotion |
| [14](#14-advanced-rotate-counterclockwise) | Advanced rotate counterclockwise | `rotateCounterClockwise` | Advanced locomotion |

## 0. Neutral stance

`neutralStance(hiro)` — establishes the tester's neutral pose.

![Command 0 — Neutral stance](../assets/movement-premades/UTIEEE_HIRO_PreLoaded-Sequences/0_neutralStance.gif)

## 1. Wave

`wave(hiro)` — wave emote.

![Command 1 — Wave](../assets/movement-premades/UTIEEE_HIRO_PreLoaded-Sequences/1_wave.gif)

## 2. Side-to-side worm

`sideToSideWorm(hiro, TEST_SPEED)` — a side-to-side worm-like dance. The tester uses speed `2`.

![Command 2 — Side-to-side worm](../assets/movement-premades/UTIEEE_HIRO_PreLoaded-Sequences/2_sideToSideWorm.gif)

## 3. Side-to-side stretch

`sideToSideStretch(hiro, TEST_SPEED)` — a side-to-side stretch. The tester uses speed `2`.

![Command 3 — Side-to-side stretch](../assets/movement-premades/UTIEEE_HIRO_PreLoaded-Sequences/3_sideToSideStretch.gif)

## 4. Cabbage Patch

`cabbagePatch(hiro, TEST_SPEED, TEST_REPETITIONS)` — first Cabbage Patch choreography. The tester selects speed `2` and two repetitions.

![Command 4 — Cabbage Patch](../assets/movement-premades/UTIEEE_HIRO_PreLoaded-Sequences/4_cabbagePatch.gif)

## 5. Cabbage Patch 2

`cabbagePatch2(hiro, TEST_SPEED, TEST_REPETITIONS)` — second Cabbage Patch choreography. The tester selects speed `2` and two repetitions.

![Command 5 — Cabbage Patch 2](../assets/movement-premades/UTIEEE_HIRO_PreLoaded-Sequences/5_cabbagePatch2.gif)

## 6. Push-ups

`pushUps(hiro, TEST_SPEED, TEST_REPETITIONS)` — push-up exercise motion. The tester selects speed `2` and two repetitions.

![Command 6 — Push-ups](../assets/movement-premades/UTIEEE_HIRO_PreLoaded-Sequences/6_pushUps.gif)

## 7. Easy forward

`easyForward(hiro, TEST_STEPS, TEST_SPEED)` — pre-choreographed forward motion. The tester selects one step at speed `2`.

![Command 7 — Easy forward](../assets/movement-premades/UTIEEE_HIRO_PreLoaded-Sequences/7_easyForward.gif)

## 8. Easy backward

`easyBackward(hiro, TEST_STEPS, TEST_SPEED)` — pre-choreographed backward motion. The tester selects one step at speed `2`.

![Command 8 — Easy backward](../assets/movement-premades/UTIEEE_HIRO_PreLoaded-Sequences/8_easyBackward.gif)

## 9. Easy clockwise

`easyClockwise(hiro, TEST_STEPS, TEST_SPEED)` — pre-choreographed clockwise turn. The tester selects one step at speed `2`.

![Command 9 — Easy clockwise](../assets/movement-premades/UTIEEE_HIRO_PreLoaded-Sequences/9_easyClockwise.gif)

## 10. Easy counterclockwise

`easyCounterClockwise(hiro, TEST_STEPS, TEST_SPEED)` — pre-choreographed counterclockwise turn. The tester selects one step at speed `2`.

![Command 10 — Easy counterclockwise](../assets/movement-premades/UTIEEE_HIRO_PreLoaded-Sequences/10_easyCounterClockwise.gif)

## 11. Advanced walk forward

`walkForward(hiro, STANCE, STEP, WALK_STRIDE, TEST_SPEED, TRIM)` — advanced forward walking using the tester's fixed values: stance `0`, step `60`, stride `25`, speed `2`, trim `0`.

![Command 11 — Advanced walk forward](../assets/movement-premades/UTIEEE_HIRO_PreLoaded-Sequences/11_walkForward.gif)

## 12. Advanced walk backward

`walkBackward(hiro, STANCE, STEP, WALK_STRIDE, TEST_SPEED, TRIM)` — advanced backward walking using the tester's fixed values.

![Command 12 — Advanced walk backward](../assets/movement-premades/UTIEEE_HIRO_PreLoaded-Sequences/12_walkBackward.gif)

## 13. Advanced rotate clockwise

`rotateClockwise(hiro, STANCE, STEP, ROTATE_STRIDE, TEST_SPEED)` — advanced clockwise rotation using stance `0`, step `60`, stride `20`, speed `2`.

![Command 13 — Advanced rotate clockwise](../assets/movement-premades/UTIEEE_HIRO_PreLoaded-Sequences/13_rotateClockwise.gif)

## 14. Advanced rotate counterclockwise

`rotateCounterClockwise(hiro, STANCE, STEP, ROTATE_STRIDE, TEST_SPEED)` — advanced counterclockwise rotation using the tester's fixed values.

![Command 14 — Advanced rotate counterclockwise](../assets/movement-premades/UTIEEE_HIRO_PreLoaded-Sequences/14_rotateCounterClockwise.gif)

For communication details, see the [serial protocol](SERIAL_PROTOCOL.md). Do not interpret any GIF as a safety guarantee.
