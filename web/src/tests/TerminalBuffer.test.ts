import { describe, expect, it } from "vitest";
import { TerminalBuffer } from "../services/TerminalBuffer";

describe("TerminalBuffer", () => {
  it("reassembles newline records split across serial chunks", () => {
    const buffer = new TerminalBuffer();
    expect(buffer.receive("Execut")).toEqual([]);
    expect(buffer.receive("ing command: 1\r\nReady").map((entry) => entry.text)).toEqual(["Executing command: 1"]);
    expect(buffer.receive(" for next command.\n").map((entry) => entry.text)).toEqual(["Ready for next command."]);
  });

  it("bounds retained terminal history and clears partial data", () => {
    const buffer = new TerminalBuffer(2); buffer.add("event", "one"); buffer.add("event", "two"); buffer.add("event", "three");
    expect(buffer.snapshot().map((entry) => entry.text)).toEqual(["two", "three"]);
    buffer.receive("unfinished"); buffer.clear(); expect(buffer.flushPartial()).toBeUndefined();
  });
});
