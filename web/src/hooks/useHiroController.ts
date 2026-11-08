import { useCallback, useEffect, useRef, useState } from "react";
import type { ConnectionState, TerminalEntry } from "../models/movement";
import { HiroCommandService, type MotionState } from "../services/HiroCommandService";
import { TerminalBuffer } from "../services/TerminalBuffer";
import { MockSerialTransport } from "../transports/MockSerialTransport";
import type { SerialTransport } from "../transports/SerialTransport";
import { WebSerialTransport } from "../transports/WebSerialTransport";

export interface HiroController {
  state: ConnectionState;
  motionState: MotionState;
  entries: readonly TerminalEntry[];
  isMock: boolean;
  serialSupported: boolean;
  connectReal(): Promise<void>;
  connectMock(): Promise<void>;
  disconnect(): Promise<void>;
  executeMovement(id: number): Promise<void>;
  sendTerminal(input: string): Promise<void>;
  clearTerminal(): void;
}

/** Bridges serial domain objects to React while keeping port ownership outside components. */
export function useHiroController(): HiroController {
  const transportRef = useRef<SerialTransport>(new WebSerialTransport());
  const terminalRef = useRef(new TerminalBuffer());
  const serviceRef = useRef<HiroCommandService>();
  const subscriptionCleanupRef = useRef<(() => void) | undefined>();
  const [state, setState] = useState<ConnectionState>(transportRef.current.getState());
  const [motionState, setMotionState] = useState<MotionState>("ready");
  const [entries, setEntries] = useState<readonly TerminalEntry[]>([]);
  const [isMock, setIsMock] = useState(false);
  const refresh = useCallback(() => setEntries(terminalRef.current.snapshot()), []);

  const addEvent = useCallback((text: string, kind: "event" | "error" = "event") => { terminalRef.current.add(kind, text); refresh(); }, [refresh]);
  const subscribeTransport = useCallback((transport: SerialTransport) => {
    subscriptionCleanupRef.current?.();
    transportRef.current = transport;
    serviceRef.current = new HiroCommandService(transport, setMotionState);
    setState(transport.getState()); setIsMock(transport.isMock);
    const service = serviceRef.current;
    const cleanups = [
      transport.onState((next) => { setState(next); if (next === "disconnected") terminalRef.current.flushPartial(); refresh(); }),
      transport.onData((chunk) => { terminalRef.current.receive(chunk).forEach((entry) => service.observeFirmwareText(entry.text)); refresh(); }),
      transport.onError((error) => addEvent(error.message, "error"))
    ];
    subscriptionCleanupRef.current = () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  useEffect(() => {
    subscribeTransport(transportRef.current);
    return () => subscriptionCleanupRef.current?.();
  }, [subscribeTransport]);

  const replaceAndConnect = useCallback(async (transport: SerialTransport) => {
    if (transportRef.current.getState() === "connected") await transportRef.current.disconnect();
    subscribeTransport(transport);
    try { await transport.connect(); addEvent(transport.isMock ? "Mock mode active: no robot is connected." : "Serial port connected."); }
    catch (error) { addEvent(error instanceof Error ? error.message : "Connection failed.", "error"); }
  }, [addEvent, subscribeTransport]);

  const connectReal = useCallback(async () => {
    if (!WebSerialTransport.isSupported()) { addEvent("Web Serial is unavailable. Use a compatible desktop browser over localhost or HTTPS.", "error"); return; }
    if (isMock) await replaceAndConnect(new WebSerialTransport());
    else { try { await transportRef.current.connect(); addEvent("Serial port connected."); } catch (error) { addEvent(error instanceof Error ? error.message : "Connection failed.", "error"); } }
  }, [addEvent, isMock, replaceAndConnect]);
  const connectMock = useCallback(async () => replaceAndConnect(new MockSerialTransport()), [replaceAndConnect]);
  const disconnect = useCallback(async () => { try { await transportRef.current.disconnect(); addEvent("Serial port disconnected."); } catch (error) { addEvent(error instanceof Error ? error.message : "Disconnect failed.", "error"); } }, [addEvent]);
  const executeMovement = useCallback(async (id: number) => { try { const command = await serviceRef.current!.executeMovement(id); terminalRef.current.add("sent", command.trim()); refresh(); } catch (error) { addEvent(error instanceof Error ? error.message : "Command failed.", "error"); } }, [addEvent, refresh]);
  const sendTerminal = useCallback(async (input: string) => { try { const command = await serviceRef.current!.sendTerminalInput(input); terminalRef.current.add("sent", command.trim()); refresh(); } catch (error) { addEvent(error instanceof Error ? error.message : "Serial write failed.", "error"); } }, [addEvent, refresh]);
  const clearTerminal = useCallback(() => { terminalRef.current.clear(); refresh(); }, [refresh]);
  return { state, motionState, entries, isMock, serialSupported: WebSerialTransport.isSupported(), connectReal, connectMock, disconnect, executeMovement, sendTerminal, clearTerminal };
}
