import { useEffect, useRef, useState } from "react";
import { portfolio } from "../data/portfolio";
import { SocialLinks } from "./SocialLinks";

export function Contact() {
  const printerRef = useRef(null);
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [visible, setVisible] = useState(reduced);
  const [paused, setPaused] = useState(false);
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (reduced) return undefined;
    const node = printerRef.current;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  function onSubmit(event) {
    event.preventDefault();
    const subject = encodeURIComponent("Hello from your portfolio");
    const body = encodeURIComponent(`${message}\n\nFrom: ${email}`);
    window.location.href = `mailto:${portfolio.contact.email}?subject=${subject}&body=${body}`;
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
                <form className="sheet" aria-label="Contact form" onSubmit={onSubmit} onFocus={() => {
                  setEditing(true);
                  setPaused(true);
                }}>
                  <div className="tb">
                    <span className="dots" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="ttl">CONTACT.SH</span>
                  </div>
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
                    <button className="note" type="submit">
                      HIT ME
                      <br />
                      UP!
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
