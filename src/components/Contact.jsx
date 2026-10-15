import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { portfolio } from "../data/portfolio";
import { SocialLinks } from "./SocialLinks";

gsap.registerPlugin(useGSAP);

export function Contact() {
  const printerRef = useRef(null);
  const sheetRef = useRef(null);
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [visible, setVisible] = useState(reduced);
  const [paused, setPaused] = useState(false);
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const { contextSafe } = useGSAP({ scope: printerRef });

  const tearOff = contextSafe(() => {
    const sheet = sheetRef.current;
    if (!sheet || reduced) return Promise.resolve();
    return new Promise((resolve) => {
      const timeline = gsap.timeline({ onComplete: resolve });
      timeline
        .set(sheet, { transformOrigin: "50% 0%" })
        .to(sheet, { duration: 0.18, rotate: -2.5, ease: "power1.out" })
        .to(sheet, {
          duration: 0.22,
          clipPath: "polygon(0% 0%, 16% 5%, 31% 0%, 48% 6%, 64% 1%, 79% 7%, 92% 0%, 100% 5%, 100% 100%, 0% 100%)",
          ease: "none",
        })
        .to(sheet, {
          duration: 0.72,
          y: 360,
          rotate: 16,
          scaleX: 0.62,
          scaleY: 0.48,
          opacity: 0,
          ease: "power3.in",
          transformOrigin: "50% 35%",
        })
        .set(sheet, { clearProps: "transform,clipPath,opacity,rotate,scale" });
    });
  });

  const printNext = contextSafe(() => {
    const sheet = sheetRef.current;
    if (!sheet || reduced) return Promise.resolve();
    return new Promise((resolve) => {
      gsap.fromTo(
        sheet,
        { yPercent: -112, opacity: 1 },
        { yPercent: 0, duration: 0.95, ease: "power2.out", clearProps: "transform,opacity", onComplete: resolve },
      );
    });
  });

  useEffect(() => {
    if (reduced) return undefined;
    const node = printerRef.current;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  async function onSubmit(event) {
    event.preventDefault();
    setSending(true);
    setStatus("Sending…");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${portfolio.contact.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email,
          message,
          _subject: "Hello from your portfolio",
          _captcha: "false",
          _template: "box",
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === "false") {
        const detail = String(result.message || "");
        if (!detail.toLowerCase().includes("activation")) throw new Error("send failed");
      }
      await tearOff();
      setEmail("");
      setMessage("");
      setStatus("Sent. I’ll get back to you.");
      await printNext();
    } catch {
      setStatus("Couldn’t send that. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const className = ["pr", paused ? "paused" : "", editing ? "edit" : "", !visible ? "off" : ""].filter(Boolean).join(" ");

  return (
    <section id="contact">
      <div className="wrap">
        <div className="contact">
          <div className="cl">
            <h2>Contact me.</h2>
            <p>Have an interesting idea, a project to build, or an opportunity to discuss? I'd love to hear from you.</p>
            <SocialLinks />
          </div>
          <div className="cr">
            <div className={className} ref={printerRef}>
              <div className="pbody">
                <span className="led" />
                <span className="plabel">SAKSHI SHAH / PORTFOLIO</span>
                <span className="slot2" />
              </div>
              <div className="feed">
                <form
                  className="sheet"
                  ref={sheetRef}
                  aria-label="Contact form"
                  onSubmit={onSubmit}
                  onFocus={() => {
                    setEditing(true);
                    setPaused(true);
                  }}
                >
                  <div className="fb">
                    <label htmlFor="cf-mail">FROM (EMAIL):</label>
                    <input
                      id="cf-mail"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="cf-msg">MESSAGE:</label>
                    <textarea
                      id="cf-msg"
                      rows={3}
                      required
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                    />
                    <p className="fstat" role="status">{status.startsWith("Check your Gmail") ? "" : status}</p>
                    <button className="note" type="submit" disabled={sending}>
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
              <span className="lip" />
            </div>
            <div className="pc">
              <p className="pstat" aria-live="polite">
                {reduced ? "Your portfolio, printed." : paused ? "Printing paused" : "Printing your portfolio..."}
              </p>
              {reduced ? null : (
                <button
                  className="pbtn"
                  type="button"
                  aria-pressed={paused}
                  onClick={() => {
                    setPaused((current) => !current);
                    setEditing(false);
                  }}
                >
                  {paused ? "Resume printing" : "Pause printing"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
