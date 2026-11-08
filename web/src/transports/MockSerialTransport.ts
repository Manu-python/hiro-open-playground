import { BaseSerialTransport } from "./SerialTransport";

/** Development-only transport; never selected automatically for a failed hardware connection. */
export class MockSerialTransport extends BaseSerialTransport {
  readonly isMock = true;
  readonly sent: string[] = [];
  private shouldFailConnect = false;
  failNextConnection(): void { this.shouldFailConnect = true; }
  async connect(): Promise<void> {
    this.setState("connecting");
    if (this.shouldFailConnect) { this.shouldFailConnect = false; const error = new Error("Mock connection failure."); this.emitError(error); this.setState("error"); throw error; }
    this.setState("connected"); this.emitData("Mock HIRO transport connected. No hardware is being controlled.\n");
  }
  async disconnect(): Promise<void> { this.setState("disconnecting"); this.setState("disconnected"); }
  async send(data: string): Promise<void> {
    if (this.getState() !== "connected") throw new Error("No active mock connection.");
    this.sent.push(data); this.emitData(`Mock received: ${data.trim()}\n`);
    if (/^(?:[0-9]|1[0-4])\n$/.test(data)) this.emitData("Movement function returned.\nReady for next command.\n");
  }
  simulateIncoming(chunk: string): void { this.emitData(chunk); }
}
