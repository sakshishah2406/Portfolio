import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { portfolio } from "../data/portfolio";

export function Projects({ onOpenChange }) {
  const dialogRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const project = portfolio.projects.find((item) => item.id === activeId);

  useEffect(() => () => {
    document.body.style.overflow = "";
  }, []);

  function openProject(id) {
    flushSync(() => {
      setActiveId(id);
      onOpenChange(true);
    });
    document.body.style.overflow = "hidden";
    dialogRef.current?.showModal();
  }

  function onDialogClose() {
    document.body.style.overflow = "";
    onOpenChange(false);
  }

  return (
    <section id="work">
      <div className="wrap">
        <h2>Projects I’ve built</h2>
        <p className="lead">
          Five projects I’d walk a recruiter through. Open a folder for the write-up, or go straight to the repo.
        </p>
        <div className="projects">
          {portfolio.projects.map((item, index) => (
            <article
              key={item.id}
              className={`folder${item.featured ? " featured" : ""}`}
              style={{ "--fc": item.color }}
              data-tab={`${item.featured ? "Featured" : `0${index + 1}`} / ${item.title.toUpperCase()}`}
            >
              <button
                className="folder-open"
                type="button"
                aria-label={`Open ${item.title} project details`}
                onClick={() => openProject(item.id)}
              >
                <span>
                  <h3>{item.title}</h3>
                  <p>{item.what}</p>
                </span>
                <em>OPEN FILE ↗</em>
              </button>
              <a className="repo" href={item.repo} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </article>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="dt"
        onClose={onDialogClose}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        <button className="x" aria-label="Close" type="button" onClick={() => dialogRef.current?.close()}>
          ×
        </button>
        {project && (
          <div>
            <h2 id="dt">{project.title}</h2>
            <p>{project.type}</p>
            <div className="chips">
              {project.stack.map((item) => (
                <span className="chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <h3>Problem</h3>
            <p>{project.problem}</p>
            <h3>How I solved it</h3>
            <p>{project.solution}</p>
            <p>
              The code is on{" "}
              <a className="repo" href={project.repo} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              .
              {project.live ? (
                <>
                  {" "}
                  The app is live at{" "}
                  <a className="repo" href={project.live} target="_blank" rel="noopener noreferrer">
                    attendance-risk-calculator.vercel.app
                  </a>
                  .
                </>
              ) : null}
            </p>
          </div>
        )}
      </dialog>
    </section>
  );
}
