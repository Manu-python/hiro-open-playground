import type { TerminalDirection, TerminalEntry } from "../models/movement";

/** Bounded terminal model that reconstructs line-oriented logs from arbitrary decoded chunks. */
export class TerminalBuffer {
  private entries: TerminalEntry[] = [];
  private partial = "";
  private sequence = 0;
  constructor(private readonly limit = 500) {}
  add(direction: TerminalDirection, text: string): TerminalEntry { return this.push(direction, text); }
  receive(chunk: string): TerminalEntry[] {
    const complete = `${this.partial}${chunk}`.split(/\r?\n/);
    this.partial = complete.pop() ?? "";
    return complete.filter((line) => line.length > 0).map((line) => this.push("received", line));
  }
  flushPartial(): TerminalEntry | undefined { if (!this.partial) return undefined; const text = this.partial; this.partial = ""; return this.push("received", text); }
  clear(): void { this.entries = []; this.partial = ""; }
  snapshot(): readonly TerminalEntry[] { return [...this.entries]; }
  private push(direction: TerminalDirection, text: string): TerminalEntry { const entry = { id: ++this.sequence, timestamp: new Date(), direction, text }; this.entries = [...this.entries, entry].slice(-this.limit); return entry; }
}
