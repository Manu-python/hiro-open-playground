import { BaseSerialTransport } from "./SerialTransport";

type BrowserSerialPort = {
  readable: ReadableStream<Uint8Array> | null;
  writable: WritableStream<Uint8Array> | null;
  open(options: { baudRate: number }): Promise<void>;
  close(): Promise<void>;
  addEventListener?(type: "disconnect", listener: () => void): void;
  removeEventListener?(type: "disconnect", listener: () => void): void;
};

type BrowserSerial = { requestPort(): Promise<BrowserSerialPort> };

/** Owns one browser serial port and guarantees serialized writes and reader cleanup. */
export class WebSerialTransport extends BaseSerialTransport {
  readonly isMock = false;
  private port?: BrowserSerialPort;
  private reader?: ReadableStreamDefaultReader<Uint8Array>;
  private readTask?: Promise<void>;
  private writeTail: Promise<void> = Promise.resolve();
  private readonly decoder = new TextDecoder();

  static isSupported(): boolean { return "serial" in navigator; }

  async connect(): Promise<void> {
    if (this.getState() !== "disconnected" && this.getState() !== "error") return;
    if (!WebSerialTransport.isSupported()) throw new Error("Web Serial is unavailable in this browser. Use a compatible desktop browser over localhost or HTTPS.");
    this.setState("connecting");
    try {
      const serial = (navigator as Navigator & { serial: BrowserSerial }).serial;
      this.port = await serial.requestPort();
      this.port.addEventListener?.("disconnect", this.handleUnexpectedDisconnect);
      await this.port.open({ baudRate: 9600 });
      this.readTask = this.readLoop();
      this.setState("connected");
    } catch (cause) {
      const error = this.asError(cause, "Unable to open the selected serial port.");
      this.emitError(error); this.setState("error");
      await this.releasePort();
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (!this.port) { this.setState("disconnected"); return; }
    this.setState("disconnecting");
    await this.releasePort();
    this.setState("disconnected");
  }

  async send(data: string): Promise<void> {
    if (this.getState() !== "connected" || !this.port?.writable) throw new Error("No active serial connection.");
    const task = this.writeTail.then(async () => {
      const writer = this.port?.writable?.getWriter();
      if (!writer) throw new Error("The serial port is no longer writable.");
      try { await writer.write(new TextEncoder().encode(data)); } finally { writer.releaseLock(); }
    });
    this.writeTail = task.catch(() => undefined);
    try { await task; } catch (cause) { const error = this.asError(cause, "Serial write failed."); this.emitError(error); throw error; }
  }

  private async readLoop(): Promise<void> {
    if (!this.port?.readable) return;
    this.reader = this.port.readable.getReader();
    try {
      while (true) {
        const { value, done } = await this.reader.read();
        if (done) break;
        if (value) this.emitData(this.decoder.decode(value, { stream: true }));
      }
      const remaining = this.decoder.decode(); if (remaining) this.emitData(remaining);
    } catch (cause) {
      if (this.getState() === "connected") { const error = this.asError(cause, "Serial read failed."); this.emitError(error); this.setState("error"); }
    } finally { this.reader?.releaseLock(); this.reader = undefined; }
  }

  private async releasePort(): Promise<void> {
    const port = this.port; if (!port) return;
    port.removeEventListener?.("disconnect", this.handleUnexpectedDisconnect);
    try { await this.reader?.cancel(); } catch { /* Port may already be closed. */ }
    try { await this.readTask; } catch { /* Read errors are reported by the loop. */ }
    try { await port.close(); } catch (cause) { this.emitError(this.asError(cause, "Serial port cleanup failed.")); }
    this.decoder.decode(); this.port = undefined; this.readTask = undefined;
  }

  private handleUnexpectedDisconnect = (): void => {
    this.emitError(new Error("The serial device disconnected."));
    this.port = undefined; this.setState("disconnected");
  };
  private asError(cause: unknown, fallback: string): Error { return cause instanceof Error ? cause : new Error(fallback); }
}
