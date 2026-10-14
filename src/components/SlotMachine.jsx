import { useEffect, useRef } from "react";
import { portfolio } from "../data/portfolio";

const CHARACTERS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.:/+!?-&";
const CHAR_COUNT = CHARACTERS.length;
const DRUM_COUNT = 14;

export function SlotMachine({ paused }) {
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const machineRef = useRef(null);
  const tiltRef = useRef(null);
  const winRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const machine = machineRef.current;
    const tilt = tiltRef.current;
    const counter = counterRef.current;
    const knob = machine.querySelector(".knob");
    const drums = [...winRef.current.querySelectorAll(".drum")].map((element) => ({
      element,
      faces: [...element.querySelectorAll("i")],
      position: 0,
      from: 0,
      to: 0,
      startedAt: 0,
      duration: 0,
      delay: 0,
      spinning: false,
    }));

    let roleIndex = 0;
    let hovering = false;
    let letterHeight = 50;
    let frame = 0;
    const timeouts = new Set();

    const later = (fn, ms) => {
      const id = setTimeout(() => {
        timeouts.delete(id);
        fn();
      }, ms);
      timeouts.add(id);
    };

    const rad = Math.PI / 180;
    const easeOutBack = (t) => 1 + 2.35 * (t - 1) ** 3 + 1.35 * (t - 1) ** 2;

    function draw(drum) {
      const radius = letterHeight / (2 * Math.sin(17 * rad));
      const base = Math.floor(drum.position);
      const fraction = drum.position - base;
      drum.faces.forEach((face, index) => {
        const offset = index - 2;
        const angle = (offset - fraction) * 34 * rad;
        if (Math.abs(angle) >= Math.PI / 2) {
          face.style.visibility = "hidden";
          return;
        }
        face.style.visibility = "";
        face.style.transform = `translateY(${radius * Math.sin(angle)}px) scaleY(${Math.cos(angle)})`;
        const character = CHARACTERS[((base + offset) % CHAR_COUNT + CHAR_COUNT) % CHAR_COUNT];
        if (face.dataset.char !== character) {
          face.textContent = character === " " ? "\u00a0" : character;
          face.dataset.char = character;
        }
      });
    }

    function measure() {
      const height = drums[0].element.clientHeight / 1.62;
      if (height > 0) letterHeight = height;
      drums.forEach(draw);
    }

    function loop() {
      const now = performance.now();
      let spinning = false;
      drums.forEach((drum) => {
        if (!drum.spinning) return;
        spinning = true;
        const progress = (now - drum.startedAt - drum.delay) / (drum.duration * 1000);
        if (progress < 0) return;
        if (progress >= 1) {
          drum.position = drum.to;
          drum.spinning = false;
        } else {
          drum.position = drum.from + (drum.to - drum.from) * easeOutBack(progress);
        }
        draw(drum);
      });
      frame = spinning ? requestAnimationFrame(loop) : 0;
    }

    function spinTo(text, options = {}) {
      const pad = Math.floor((DRUM_COUNT - text.length) / 2);
      const line = `${" ".repeat(pad)}${text}${" ".repeat(DRUM_COUNT - text.length - pad)}`;
      const mode = options.mode ?? roleIndex % 3;
      const now = performance.now();

      drums.forEach((drum, index) => {
        const current = Math.ceil(drum.position - 1e-6);
        const target = CHARACTERS.indexOf(line[index]);
        const extraTurns = options.spins ? options.spins[index] : options.extra || 0;
        const delta = (((target - current) % CHAR_COUNT) + CHAR_COUNT) % CHAR_COUNT + extraTurns * CHAR_COUNT;
        const rank =
          mode === 0 ? index : mode === 1 ? DRUM_COUNT - 1 - index : Math.abs(index - (DRUM_COUNT - 1) / 2);
        drum.from = drum.position;
        drum.to = current + delta;
        drum.duration = Math.min(2.2, 0.6 + 0.022 * delta);
        drum.delay = rank * (options.gap || 75);
        drum.startedAt = now;
        if (reduced) {
          drum.position = drum.to;
          drum.spinning = false;
          draw(drum);
        } else {
          drum.spinning = true;
        }
      });

      if (!reduced && !frame) frame = requestAnimationFrame(loop);
      counter.setAttribute("aria-label", `Currently: ${text.toLowerCase()}. Press for the next role.`);
    }

    function showNext(extraTurns) {
      roleIndex = (roleIndex + 1) % portfolio.roles.length;
      spinTo(portfolio.roles[roleIndex], { extra: extraTurns });
    }

    function onCounterClick() {
      showNext(1);
    }

    function onKnobClick() {
      let next = roleIndex;
      do {
        next = Math.floor(Math.random() * portfolio.roles.length);
      } while (next === roleIndex);
      roleIndex = next;
      spinTo(portfolio.roles[roleIndex], {
        spins: drums.map(() => 1 + Math.floor(Math.random() * 3)),
        gap: 120,
      });
    }

    const nudgeHandlers = drums.map((drum) => {
      const onEnter = () => {
        if (reduced || drum.spinning) return;
        const resting = drum.position;
        drum.from = resting;
        drum.to = resting + 0.3;
        drum.duration = 0.15;
        drum.startedAt = performance.now();
        drum.delay = 0;
        drum.spinning = true;
        later(() => {
          drum.from = drum.position;
          drum.to = resting;
          drum.duration = 0.35;
          drum.startedAt = performance.now();
          drum.spinning = true;
          if (!frame) frame = requestAnimationFrame(loop);
        }, 160);
        if (!frame) frame = requestAnimationFrame(loop);
      };
      drum.element.addEventListener("mouseenter", onEnter);
      return onEnter;
    });

    const hold = () => {
      hovering = true;
    };
    const release = () => {
      hovering = false;
    };
    const tiltWithPointer = (event) => {
      const rect = machine.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      tilt.style.transform = `rotateX(${-y * 9}deg) rotateY(${x * 9}deg)`;
    };
    const resetTilt = () => {
      tilt.style.transform = "";
    };

    machine.addEventListener("mouseenter", hold);
    machine.addEventListener("focusin", hold);
    machine.addEventListener("mouseleave", release);
    machine.addEventListener("focusout", release);
    if (!reduced) {
      machine.addEventListener("mousemove", tiltWithPointer);
      machine.addEventListener("mouseleave", resetTilt);
    }
    counter.addEventListener("click", onCounterClick);
    knob.addEventListener("click", onKnobClick);
    window.addEventListener("resize", measure);

    const autoplay = setInterval(() => {
      if (!hovering && !document.hidden && !pausedRef.current && !reduced) showNext(0);
    }, 3800);

    measure();
    drums.forEach((drum) => {
      drum.position = Math.floor(Math.random() * CHAR_COUNT);
      draw(drum);
    });
    spinTo(portfolio.roles[0], { extra: 2 });

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(autoplay);
      timeouts.forEach((id) => clearTimeout(id));
      drums.forEach((drum, index) => drum.element.removeEventListener("mouseenter", nudgeHandlers[index]));
      machine.removeEventListener("mouseenter", hold);
      machine.removeEventListener("focusin", hold);
      machine.removeEventListener("mouseleave", release);
      machine.removeEventListener("focusout", release);
      machine.removeEventListener("mousemove", tiltWithPointer);
      machine.removeEventListener("mouseleave", resetTilt);
      counter.removeEventListener("click", onCounterClick);
      knob.removeEventListener("click", onKnobClick);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="machine" ref={machineRef}>
      <div className="mi" ref={tiltRef}>
        <p className="mlabel">I’m a</p>
        <div className="mbody">
          <button
            className="counter"
            ref={counterRef}
            type="button"
            aria-label="Role counter. Press for the next role."
          >
            <span className="win" ref={winRef} aria-hidden="true">
              {Array.from({ length: DRUM_COUNT }, (_, drum) => (
                <div className="drum" key={drum}>
                  {Array.from({ length: 6 }, (_, face) => (
                    <i key={face} />
                  ))}
                </div>
              ))}
            </span>
          </button>
          <button className="knob" type="button" aria-label="Pull for a random role">
            PULL
          </button>
        </div>
        <div className="slot">
          <a className="idcard" href="#contact" aria-label="Get in touch">
            <b>UX</b>
            <span>
              SAKSHI SHAH
              <br />
              OPEN TO WORK
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
