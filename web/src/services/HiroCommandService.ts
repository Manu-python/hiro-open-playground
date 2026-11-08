import { movementById } from "../data/movements";
import type { SerialTransport } from "../transports/SerialTransport";

export type MotionState = "ready" | "sending" | "awaiting-firmware";

/** Validates and serializes the small, fixed firmware protocol without owning UI state. */
export class HiroCommandService {
  private motionState: MotionState = "ready";
  private readinessObservedDuringWrite = false;
  constructor(private readonly transport: SerialTransport, private readonly onMotionState?: (state: MotionState) => void) {}
  getMotionState(): MotionState { return this.motionState; }
  static serializeMovement(id: number): string {
    if (!Number.isInteger(id) || !movementById.has(id)) throw new Error(`Unsupported movement command: ${id}`);
    return `${id}\n`;
  }
  async executeMovement(id: number): Promise<string> {
    if (this.motionState !== "ready") throw new Error("A previous movement is still awaiting firmware readiness.");
    const command = HiroCommandService.serializeMovement(id);
    this.setMotionState("sending");
    this.readinessObservedDuringWrite = false;
    try {
      await this.transport.send(command);
      this.setMotionState(this.readinessObservedDuringWrite ? "ready" : "awaiting-firmware");
      return command;
    }
    catch (error) { this.setMotionState("ready"); throw error; }
  }
  async sendTerminalInput(input: string): Promise<string> {
    const command = `${input.replace(/[\r\n]+$/g, "")}\n`;
    await this.transport.send(command); return command;
  }
  /** Interprets only the known firmware readiness text; not a hardware-success claim. */
  observeFirmwareText(text: string): void {
    if (!text.includes("Ready for next command.")) return;
    this.readinessObservedDuringWrite = true;
    if (this.motionState === "awaiting-firmware") this.setMotionState("ready");
  }
  private setMotionState(state: MotionState): void { this.motionState = state; this.onMotionState?.(state); }
}
