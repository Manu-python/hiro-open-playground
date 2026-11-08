import type { ConnectionState } from "../models/movement";

interface Props { state: ConnectionState; isMock: boolean; serialSupported: boolean; onConnect(): void; onDisconnect(): void; onMock(): void; }
export function ConnectionPanel({ state, isMock, serialSupported, onConnect, onDisconnect, onMock }: Props) {
  const connected = state === "connected";
  const busy = state === "connecting" || state === "disconnecting";
  return <section className="panel connection-panel" aria-labelledby="connection-heading">
    <div><p className="eyebrow">Transport</p><h2 id="connection-heading">Connection &amp; device status</h2><p className="muted">USB serial • 9600 baud • explicit browser permission</p></div>
    <div className="status-row"><span className={`status-dot ${state}`} aria-hidden="true" /><span role="status">{isMock ? `Mock ${state}` : state}</span>{isMock && <span className="badge">SIMULATED</span>}</div>
    {!serialSupported && <p className="notice error">Web Serial is unavailable here. Use a compatible desktop browser in a secure context such as localhost. Mock mode remains available during development.</p>}
    <div className="button-row"><button onClick={onConnect} disabled={connected || busy || !serialSupported}>Connect HIRO</button><button className="secondary" onClick={onDisconnect} disabled={!connected || busy}>Disconnect</button>{import.meta.env.DEV && <button className="ghost" onClick={onMock} disabled={busy}>Use mock transport</button>}</div>
  </section>;
}
