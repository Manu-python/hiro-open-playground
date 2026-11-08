import { useEffect, useRef, useState } from "react";
import type { TerminalEntry } from "../models/movement";
interface Props { entries: readonly TerminalEntry[]; connected: boolean; onSend(input: string): void; onClear(): void; }
export function Terminal({ entries, connected, onSend, onClear }: Props) {
  const [input, setInput] = useState(""); const [autoscroll, setAutoscroll] = useState(true); const logRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (autoscroll) logRef.current?.scrollTo({ top: logRef.current.scrollHeight }); }, [entries, autoscroll]);
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (!input.trim() || !connected) return; onSend(input); setInput(""); };
  return <section className="panel terminal" aria-labelledby="terminal-heading"><div className="section-title"><div><p className="eyebrow">Shared active connection</p><h2 id="terminal-heading">Serial terminal</h2></div><div className="terminal-actions"><label><input type="checkbox" checked={autoscroll} onChange={(event) => setAutoscroll(event.target.checked)} /> Autoscroll</label><button className="ghost" onClick={onClear}>Clear</button></div></div>
    <div className="terminal-log" ref={logRef} aria-live="polite">{entries.length === 0 ? <p className="placeholder">Connection and command activity will appear here.</p> : entries.map((entry) => <div className={`log-entry ${entry.direction}`} key={entry.id}><time>{entry.timestamp.toLocaleTimeString()}</time><span>{entry.direction === "sent" ? "TX" : entry.direction === "received" ? "RX" : entry.direction.toUpperCase()}</span><code>{entry.text}</code></div>)}</div>
    <form onSubmit={submit} className="terminal-input"><input aria-label="Serial input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type a command, e.g. 99" disabled={!connected}/><button type="submit" disabled={!connected || !input.trim()}>Send newline</button></form>
  </section>;
}
