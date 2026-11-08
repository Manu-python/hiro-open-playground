export type MovementCategory = "neutral-emote" | "exercise-dance" | "easy-locomotion" | "advanced-locomotion";

export interface Movement {
  readonly id: number;
  readonly name: string;
  readonly functionName: string;
  readonly description: string;
  readonly category: MovementCategory;
  readonly gifPath: string;
}

export type ConnectionState = "disconnected" | "connecting" | "connected" | "disconnecting" | "error";

export type TerminalDirection = "received" | "sent" | "event" | "error";

export interface TerminalEntry {
  readonly id: number;
  readonly timestamp: Date;
  readonly direction: TerminalDirection;
  readonly text: string;
}
