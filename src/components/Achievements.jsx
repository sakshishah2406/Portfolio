import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import digihunt from "../assets/certificates/digihunt.jpg";
import pythonData from "../assets/certificates/python-data-structures.jpg";
import pythonStart from "../assets/certificates/programming-for-everybody.jpg";
import visharad from "../assets/certificates/sangeet-visharad.jpg";

gsap.registerPlugin(useGSAP);

const CERTS = [
  {
    src: digihunt,
    title: "DIGIHUNT 7.0",
    detail: "3rd place · DJ Sanghvi · 8 Oct 2026",
    alt: "DIGIHUNT 7.0 certificate of achievement, third place, awarded to Sakshi Shah",
  },
  {
    src: pythonData,
    title: "Python Data Structures",
    detail: "University of Michigan · Coursera",
    alt: "Coursera certificate for Python Data Structures from the University of Michigan, awarded to Sakshi Sachin Shah",
  },
  {
    src: pythonStart,
    title: "Programming for Everybody",
    detail: "University of Michigan · Coursera",
    alt: "Coursera certificate for Programming for Everybody from the University of Michigan, awarded to Sakshi Sachin Shah",
  },
  {
    src: visharad,
    title: "Sangeet Visharad",
    detail: "Vocal Classical · First division · 2024",
    alt: "Pracheen Kala Kendra diploma, Sangeet Visharad Part-1 in Vocal Classical, first division, awarded to Sakshi Sachin Shah in 2024",
  },
];

const COPIES = 2;
const CARDS = Array.from({ length: CERTS.length * COPIES }, (_, index) => ({
  ...CERTS[index % CERTS.length],
  index,
  copy: index >= CERTS.length,
}));
const STEP = 360 / CARDS.length;

export function Achievements() {
  const root = useRef(null);
  const stage = useRef(null);
  const ring = useRef(null);
  const rot = useRef({ y: 0 });
  const hold = useRef(false);
  const drag = useRef(null);
  const shown = useRef(0);
  const [active, setActive] = useState(0);

  const { contextSafe } = useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = () => {
      const ringEl = ring.current;
      const stageEl = stage.current;
      if (!ringEl || !stageEl) return;
      ringEl.style.transform = "none";
      const radius = Number.parseFloat(getComputedStyle(stageEl).getPropertyValue("--radius")) || 360;
      let slot = Math.round(-rot.current.y / STEP);
      slot = ((slot % CARDS.length) + CARDS.length) % CARDS.length;
      const cert = slot % CERTS.length;
      if (cert !== shown.current) {
        shown.current = cert;
        setActive(cert);
      }
      [...ringEl.children].forEach((card, index) => {
        let angle = index * STEP + rot.current.y;
        angle = ((angle % 360) + 360) % 360;
        if (angle > 180) angle -= 360;
        const rad = (angle * Math.PI) / 180;
        const facing = Math.cos(rad);
        const x = Math.sin(rad) * radius * 0.9;
        const z = (facing - 1) * radius * 0.22;
        const turn = -angle * 0.55;
        const fade = Math.min(1, Math.max(0, (facing - 0.05) / 0.8));
        card.style.transform = `translate(-50%, -50%) translate3d(${x}px, 0px, ${z}px) rotateY(${turn}deg)`;
        card.style.zIndex = String(Math.round(100 + facing * 100));
        card.style.opacity = String(fade);
        card.style.visibility = fade < 0.04 ? "hidden" : "visible";
        card.style.pointerEvents = fade < 0.35 ? "none" : "auto";
      });
    };

    const measure = () => {
      const card = ring.current?.querySelector(".ach-card");
      if (!card || !stage.current) return;
      const radius = ((card.offsetWidth + 36) * CARDS.length) / (2 * Math.PI);
      stage.current.style.setProperty("--radius", `${radius}px`);
      paint();
    };

    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(stage.current);

    let frame = 0;
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduced && !hold.current) rot.current.y -= 10 * dt;
      paint();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      gsap.killTweensOf(rot.current);
    };
  }, { scope: root });

  const turnTo = contextSafe((target) => {
    hold.current = true;
    gsap.killTweensOf(rot.current);
    gsap.to(rot.current, {
      y: target,
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: () => {
        hold.current = false;
      },
    });
  });

  const nearest = () => Math.round(rot.current.y / STEP) * STEP;

  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    hold.current = true;
    gsap.killTweensOf(rot.current);
    drag.current = { x: event.clientX, y: rot.current.y, pointer: event.pointerId };
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* pointer capture is optional; dragging still follows the pointer */
    }
  };

  const onPointerMove = (event) => {
    if (!drag.current || drag.current.pointer !== event.pointerId) return;
    rot.current.y = drag.current.y + (event.clientX - drag.current.x) * 0.28;
  };

  const onPointerUp = (event) => {
    if (!drag.current || drag.current.pointer !== event.pointerId) return;
    const dx = event.clientX - drag.current.x;
    drag.current = null;
    if (Math.abs(dx) < 6) {
      const card = event.target.closest(".ach-card");
      if (card && card.style.visibility !== "hidden") {
        const index = Number(card.dataset.index);
        const base = -index * STEP;
        const turns = Math.round((rot.current.y - base) / 360);
        turnTo(base + turns * 360);
        return;
      }
    }
    hold.current = false;
  };

  const current = CERTS[active];

  return (
    <section id="achievements">
      <div className="wrap">
        <h2>Achievements</h2>
        <p className="lead">Certificates from courses and competitions.</p>
      </div>
      <div className="ach" ref={root}>
        <div
          className="ach-stage"
          ref={stage}
          style={{ "--count": CARDS.length, "--step": `${STEP}deg` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="ach-ring" ref={ring}>
            {CARDS.map((card) => (
              <figure
                className="ach-card"
                key={card.index}
                data-index={card.index}
                style={{ "--i": card.index }}
                aria-hidden={card.copy ? "true" : undefined}
              >
                <img src={card.src} alt={card.copy ? "" : card.alt} draggable="false" />
              </figure>
            ))}
          </div>
        </div>
        <div className="ach-bar">
          <button type="button" onClick={() => turnTo(nearest() + STEP)}>
            Previous
          </button>
          <p aria-live="polite">
            <strong>{current.title}</strong>
            <span>{current.detail}</span>
          </p>
          <button type="button" onClick={() => turnTo(nearest() - STEP)}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
