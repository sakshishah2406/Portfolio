import { useRef } from "react";
import { portfolio } from "../data/portfolio";
import { useIdlePress } from "../hooks/useIdlePress";
import { EditableName } from "./EditableName";
import { Keyboard } from "./Keyboard";
import { SlotMachine } from "./SlotMachine";

export function Hero({ name, saveName, detailsOpen }) {
  const nameRef = useRef(null);
  const keyboardRef = useRef(null);
  useIdlePress(nameRef, keyboardRef, detailsOpen);

  return (
    <div className="wrap hero">
      <div className="top2">
        <div className="hl">
          <h1>
            Hi, I’m <EditableName ref={nameRef} name={name} saveName={saveName} />
          </h1>
          <span className="badge">
            <i />
            {portfolio.availability}
          </span>
        </div>
        <SlotMachine paused={detailsOpen} />
      </div>
      <div className="stage">
        <Keyboard ref={keyboardRef} />
      </div>
    </div>
  );
}
