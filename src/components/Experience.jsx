import { useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import { portfolio } from "../data/portfolio";

gsap.registerPlugin(useGSAP, MotionPathPlugin);

function Plane() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#1c1c1c"
        transform="rotate(90 12 12)"
        d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
      />
    </svg>
  );
}

export function Experience() {
  const stageRef = useRef(null);
  const planeRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useGSAP(() => {
    const stage = stageRef.current;
    const tickets = [...stage.querySelectorAll(".tix")];
    const mores = tickets.map((ticket) => ticket.querySelector(".tix-more"));
    const plane = planeRef.current;
    const path = pathRef.current;
    const svg = svgRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      tickets.forEach((ticket) => ticket.classList.add("open"));
      mores.forEach((more) => {
        more.style.height = "auto";
      });
      return undefined;
    }

    gsap.set(mores, { height: 0 });
    gsap.set(plane, { opacity: 0 });

    let alive = true;
    let started = false;
    let flight;

    const measure = () => {
      const bounds = stage.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
      return tickets.map((ticket) => {
        const rect = ticket.getBoundingClientRect();
        return {
          x: rect.right - bounds.left - 36,
          y: rect.top - bounds.top + 34,
        };
      });
    };

    const curve = (from, to) => {
      const rise = to.y - from.y;
      const lane = stage.clientWidth - 18;
      return `M ${from.x} ${from.y} C ${lane} ${from.y + rise * 0.2}, ${lane} ${to.y - rise * 0.28}, ${to.x} ${to.y}`;
    };

    const arm = (d) => {
      path.setAttribute("d", d);
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
    };

    const hop = (index, from) => {
      if (!alive) return;
      const spots = measure();
      const to = spots[index];
      const start = from || { x: to.x + 48, y: Math.max(12, to.y - 130) };
      arm(curve(start, to));
      flight = gsap.timeline();
      flight.set(plane, { opacity: 1 });
      flight.to(
        plane,
        {
          duration: 2.4,
          ease: "power1.inOut",
          motionPath: {
            path,
            align: path,
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
        },
        0
      );
      flight.to(path, { strokeDashoffset: 0, duration: 2.4, ease: "power1.inOut" }, 0);
      flight.add(() => tickets[index].classList.add("open"));
      flight.to(mores[index], { height: "auto", duration: 0.55, ease: "power2.out" });
      flight.to({}, { duration: 2.6 });
      flight.to(mores[index], { height: 0, duration: 0.4, ease: "power2.inOut" });
      flight.add(() => tickets[index].classList.remove("open"));
      flight.to(path, { opacity: 0, duration: 0.25 });
      flight.add(() => {
        if (!alive) return;
        hop((index + 1) % tickets.length, to);
      });
    };

    const watcher = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          flight?.pause();
          return;
        }
        if (!started) {
          started = true;
          hop(0);
          return;
        }
        flight?.play();
      },
      { threshold: 0.25 }
    );
    watcher.observe(stage);

    return () => {
      alive = false;
      flight?.kill();
      watcher.disconnect();
    };
  }, { scope: stageRef });

  return (
    <section id="experience">
      <div className="wrap">
        <h2>Experience</h2>
        <div className="flight" ref={stageRef}>
          <div className="passes">
            {portfolio.experience.map((job, index) => (
              <article className="tix" key={job.role} style={{ "--paper": job.paper }}>
                <div className="tix-no">{String(index + 1).padStart(2, "0")}</div>
                <div className="tix-main">
                  <div className="tix-top">
                    <span>{job.kicker}</span>
                    <span>{job.when}</span>
                  </div>
                  <h3>{job.role}</h3>
                  <p className="tix-blurb">{job.blurb}</p>
                  <div className="tix-more">
                    <small>{job.meta}</small>
                    <ul>
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="tix-stub">
                  <span>{job.stub}</span>
                  <i className="barcode" />
                </div>
              </article>
            ))}
          </div>
          <svg className="route" ref={svgRef} aria-hidden="true">
            <path ref={pathRef} />
          </svg>
          <div className="plane" ref={planeRef}>
            <Plane />
          </div>
        </div>
      </div>
    </section>
  );
}
