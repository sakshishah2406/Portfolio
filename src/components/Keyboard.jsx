import { forwardRef } from "react";
import { keyboardKeys } from "../data/portfolio";

function Key({ letter, label, href, color, rotation }) {
  return (
    <a className={`key k${color}`} style={{ "--r": `${rotation}deg` }} href={href}>
      <span className="face">
        <b>{letter}</b>
        <small>{label}</small>
      </span>
    </a>
  );
}

export const Keyboard = forwardRef(function Keyboard(_, ref) {
  return (
    <nav className="kb" ref={ref} role="navigation" aria-label="Portfolio keyboard">
      <div className="row">
        {keyboardKeys.slice(0, 5).map((key, index) => (
          <Key key={`${key[0]}-${index}`} letter={key[0]} label={key[1]} href={key[2]} color={key[3]} rotation={key[4]} />
        ))}
      </div>
      <div className="row">
        {keyboardKeys.slice(5).map((key, index) => (
          <Key key={`${key[0]}-${index + 5}`} letter={key[0]} label={key[1]} href={key[2]} color={key[3]} rotation={key[4]} />
        ))}
      </div>
      <a className="key space" href="#contact">
        <span className="face">
          <b aria-hidden="true">↵</b>
          <small>LET’S TALK</small>
        </span>
      </a>
    </nav>
  );
});
