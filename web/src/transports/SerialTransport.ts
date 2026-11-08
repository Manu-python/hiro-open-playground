import type { ConnectionState } from "../models/movement";

export type Unsubscribe = () => void;

/** UI-independent contract for physical or simulated serial connections. */
export interface SerialTransport {
  readonly isMock: boolean;
  getState(): ConnectionState;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  send(data: string): Promise<void>;
  onData(listener: (chunk: string) => void): Unsubscribe;
  onState(listener: (state: ConnectionState) => void): Unsubscribe;
  onError(listener: (error: Error) => void): Unsubscribe;
}

export abstract class BaseSerialTransport implements SerialTransport {
  abstract readonly isMock: boolean;
  private state: ConnectionState = "disconnected";
  private readonly dataListeners = new Set<(chunk: string) => void>();
  private readonly stateListeners = new Set<(state: ConnectionState) => void>();
  private readonly errorListeners = new Set<(error: Error) => void>();

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract send(data: string): Promise<void>;
  getState = (): ConnectionState => this.state;
  onData = (listener: (chunk: string) => void): Unsubscribe => this.subscribe(this.dataListeners, listener);
  onState = (listener: (state: ConnectionState) => void): Unsubscribe => this.subscribe(this.stateListeners, listener);
  onError = (listener: (error: Error) => void): Unsubscribe => this.subscribe(this.errorListeners, listener);
  protected setState(state: ConnectionState): void { this.state = state; this.stateListeners.forEach((listener) => listener(state)); }
  protected emitData(chunk: string): void { this.dataListeners.forEach((listener) => listener(chunk)); }
  protected emitError(error: Error): void { this.errorListeners.forEach((listener) => listener(error)); }
  private subscribe<T>(listeners: Set<(value: T) => void>, listener: (value: T) => void): Unsubscribe { listeners.add(listener); return () => listeners.delete(listener); }
}
