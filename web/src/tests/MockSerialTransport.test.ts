import { describe, expect, it } from "vitest";
import { MockSerialTransport } from "../transports/MockSerialTransport";

describe("MockSerialTransport", () => {
  it("models connection states and outgoing commands", async () => {
    const transport = new MockSerialTransport(); const states: string[] = [];
    const stop = transport.onState((state) => states.push(state));
    await transport.connect(); await transport.send("99\n"); await transport.disconnect(); stop();
    expect(states).toEqual(["connecting", "connected", "disconnecting", "disconnected"]);
    expect(transport.sent).toEqual(["99\n"]);
  });

  it("reports simulated connection errors and supports listener cleanup", async () => {
    const transport = new MockSerialTransport(); const chunks: string[] = [];
    const stop = transport.onData((chunk) => chunks.push(chunk)); stop(); transport.simulateIncoming("ignored");
    expect(chunks).toEqual([]);
    transport.failNextConnection(); await expect(transport.connect()).rejects.toThrow("Mock connection failure");
    expect(transport.getState()).toBe("error");
  });
});
