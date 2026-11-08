import { useState } from "react";
import { movements } from "../data/movements";
import type { MovementCategory } from "../models/movement";
import type { MotionState } from "../services/HiroCommandService";

const labels: Record<MovementCategory, string> = { "neutral-emote": "Neutral & emotes", "exercise-dance": "Exercise & dance", "easy-locomotion": "Easy locomotion", "advanced-locomotion": "Advanced locomotion" };
interface Props { connected: boolean; motionState: MotionState; onMovement(id: number): void; }
export function MovementPanel({ connected, motionState, onMovement }: Props) {
  const [selected, setSelected] = useState(movements[0]);
  const disabled = !connected || motionState !== "ready";
  return <section className="panel movements" aria-labelledby="movement-heading">
    <div className="section-title"><div><p className="eyebrow">Fixed firmware commands</p><h2 id="movement-heading">Movement control</h2></div><p className="muted">{motionState === "ready" ? "Ready to send" : motionState === "sending" ? "Writing command…" : "Waiting for firmware readiness…"}</p></div>
    <p className="notice">A sent command is not a safety stop or a completion guarantee. Keep a physical power disconnect accessible.</p>
    <div className="movement-layout"><div className="movement-groups">{(Object.keys(labels) as MovementCategory[]).map((category) => <div className="movement-group" key={category}><h3>{labels[category]}</h3><div className="movement-grid">{movements.filter((movement) => movement.category === category).map((movement) => <button className={`movement-card ${selected.id === movement.id ? "selected" : ""}`} disabled={disabled} key={movement.id} onClick={() => { setSelected(movement); onMovement(movement.id); }}><span className="command">{movement.id}</span><span>{movement.name}</span></button>)}</div></div>)}</div>
      <aside className="preview"><p className="eyebrow">Selected reference</p><img src={selected.gifPath} alt={`${selected.name} movement reference`} loading="lazy"/><h3>{selected.name}</h3><code>{selected.functionName}</code><p>{selected.description}</p><p className="muted">Reference GIF only; actual movement depends on pose and hardware.</p></aside></div>
  </section>;
}
