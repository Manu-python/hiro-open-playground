import { ConnectionPanel } from "./components/ConnectionPanel";
import { MovementPanel } from "./components/MovementPanel";
import { Terminal } from "./components/Terminal";
import { useHiroController } from "./hooks/useHiroController";
import "./styles.css";

export default function App() {
  const hiro = useHiroController();
  return <main><header className="hero"><div><p className="eyebrow">Vanguard outreach • IEEE UT Austin</p><h1>HIRO Open Playground</h1><p>Local, transparent controls for the preserved HIRO movement tester.</p></div><a href="https://github.com/TakamoriRobot/HIRO" target="_blank" rel="noreferrer">Upstream HIRO library ↗</a></header>
    <ConnectionPanel state={hiro.state} isMock={hiro.isMock} serialSupported={hiro.serialSupported} onConnect={() => void hiro.connectReal()} onDisconnect={() => void hiro.disconnect()} onMock={() => void hiro.connectMock()} />
    <MovementPanel connected={hiro.state === "connected"} motionState={hiro.motionState} onMovement={(id) => void hiro.executeMovement(id)} />
    <Terminal entries={hiro.entries} connected={hiro.state === "connected"} onSend={(input) => void hiro.sendTerminal(input)} onClear={hiro.clearTerminal}/>
    <footer>
      <span className="developer-credit">Develop by: <span className="developer-logo"><img src="/logos/ut_ieee_logo_2.png" alt="UT IEEE logo" /></span></span>
    </footer>
  </main>;
}
