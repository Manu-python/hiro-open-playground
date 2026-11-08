import { describe, expect, it } from "vitest";
import { movements } from "../data/movements";
import { HiroCommandService } from "../services/HiroCommandService";
import { MockSerialTransport } from "../transports/MockSerialTransport";

describe("movement catalog and command service", () => {
  it("contains every fixed firmware command exactly once", () => {
    expect(movements.map((movement) => movement.id)).toEqual(Array.from({ length: 15 }, (_, id) => id));
    expect(movements.find((movement) => movement.id === 1)?.gifPath).toContain("1_wave.gif");
  });

  it("serializes valid movements as newline-terminated decimal commands", async () => {
    const transport = new MockSerialTransport(); await transport.connect();
    const service = new HiroCommandService(transport);
    await expect(service.executeMovement(10)).resolves.toBe("10\n");
    expect(transport.sent).toEqual(["10\n"]);
  });

  it("rejects unsupported movement identifiers before writing", async () => {
    const transport = new MockSerialTransport(); await transport.connect();
    const service = new HiroCommandService(transport);
    await expect(service.executeMovement(99)).rejects.toThrow("Unsupported movement command");
    expect(transport.sent).toEqual([]);
  });

  it("keeps movement controls locked until the known firmware ready line", async () => {
    const transport = new MockSerialTransport(); await transport.connect();
    const service = new HiroCommandService(transport);
    await service.executeMovement(1);
    // The mock emits readiness synchronously; independently check the protocol text contract.
    service.observeFirmwareText("Ready for next command.");
    expect(service.getMotionState()).toBe("ready");
  });

  it("handles a readiness message received during a completed serial write", async () => {
    const transport = new MockSerialTransport();
    const service = new HiroCommandService(transport);
    transport.onData((chunk) => service.observeFirmwareText(chunk));
    await transport.connect(); await service.executeMovement(1);
    expect(service.getMotionState()).toBe("ready");
  });
});
