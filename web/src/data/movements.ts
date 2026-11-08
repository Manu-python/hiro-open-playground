import type { Movement } from "../models/movement";

const assetBase = "/movement-premades/UTIEEE_HIRO_PreLoaded-Sequences";

/** The single source of movement metadata for controls, previews, and validation. */
export const movements: readonly Movement[] = [
  { id: 0, name: "Neutral stance", functionName: "neutralStance(hiro)", description: "Returns HIRO to its neutral pose.", category: "neutral-emote", gifPath: `${assetBase}/0_neutralStance.gif` },
  { id: 1, name: "Wave", functionName: "wave(hiro)", description: "Performs the library wave emote.", category: "neutral-emote", gifPath: `${assetBase}/1_wave.gif` },
  { id: 2, name: "Side-to-side worm", functionName: "sideToSideWorm(hiro, speed)", description: "Performs a side-to-side worm-like motion.", category: "exercise-dance", gifPath: `${assetBase}/2_sideToSideWorm.gif` },
  { id: 3, name: "Side-to-side stretch", functionName: "sideToSideStretch(hiro, speed)", description: "Performs a side-to-side stretching motion.", category: "exercise-dance", gifPath: `${assetBase}/3_sideToSideStretch.gif` },
  { id: 4, name: "Cabbage Patch", functionName: "cabbagePatch(hiro, speed, repetitions)", description: "Runs the first Cabbage Patch choreography.", category: "exercise-dance", gifPath: `${assetBase}/4_cabbagePatch.gif` },
  { id: 5, name: "Cabbage Patch 2", functionName: "cabbagePatch2(hiro, speed, repetitions)", description: "Runs the second Cabbage Patch choreography.", category: "exercise-dance", gifPath: `${assetBase}/5_cabbagePatch2.gif` },
  { id: 6, name: "Push-ups", functionName: "pushUps(hiro, speed, repetitions)", description: "Runs the push-up exercise motion.", category: "exercise-dance", gifPath: `${assetBase}/6_pushUps.gif` },
  { id: 7, name: "Easy forward", functionName: "easyForward(hiro, steps, speed)", description: "Runs the pre-choreographed easy forward walk.", category: "easy-locomotion", gifPath: `${assetBase}/7_easyForward.gif` },
  { id: 8, name: "Easy backward", functionName: "easyBackward(hiro, steps, speed)", description: "Runs the pre-choreographed easy backward walk.", category: "easy-locomotion", gifPath: `${assetBase}/8_easyBackward.gif` },
  { id: 9, name: "Easy clockwise", functionName: "easyClockwise(hiro, steps, speed)", description: "Runs the pre-choreographed easy clockwise turn.", category: "easy-locomotion", gifPath: `${assetBase}/9_easyClockwise.gif` },
  { id: 10, name: "Easy counterclockwise", functionName: "easyCounterClockwise(hiro, steps, speed)", description: "Runs the pre-choreographed easy counterclockwise turn.", category: "easy-locomotion", gifPath: `${assetBase}/10_easyCounterClockwise.gif` },
  { id: 11, name: "Advanced walk forward", functionName: "walkForward(hiro, stance, step, stride, speed, trim)", description: "Runs the advanced forward walk with the tester's fixed parameters.", category: "advanced-locomotion", gifPath: `${assetBase}/11_walkForward.gif` },
  { id: 12, name: "Advanced walk backward", functionName: "walkBackward(hiro, stance, step, stride, speed, trim)", description: "Runs the advanced backward walk with the tester's fixed parameters.", category: "advanced-locomotion", gifPath: `${assetBase}/12_walkBackward.gif` },
  { id: 13, name: "Advanced rotate clockwise", functionName: "rotateClockwise(hiro, stance, step, stride, speed)", description: "Runs the advanced clockwise rotation with the tester's fixed parameters.", category: "advanced-locomotion", gifPath: `${assetBase}/13_rotateClockwise.gif` },
  { id: 14, name: "Advanced rotate counterclockwise", functionName: "rotateCounterClockwise(hiro, stance, step, stride, speed)", description: "Runs the advanced counterclockwise rotation with the tester's fixed parameters.", category: "advanced-locomotion", gifPath: `${assetBase}/14_rotateCounterClockwise.gif` }
];

export const movementById = new Map(movements.map((movement) => [movement.id, movement]));
