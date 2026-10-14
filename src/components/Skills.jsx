import { useEffect, useMemo, useState } from "react";
import { crosswordLayout, portfolio } from "../data/portfolio";

import { SkillMark } from "./SkillMark";

const WORD_ORDER = Object.keys(crosswordLayout);
const CYCLE_MS = 4000;

function buildBoard() {
  const filled = new Map();
  let cols = 0;
  let rows = 0;

  Object.entries(crosswordLayout).forEach(([word, [column, row, across, down]], wordIndex) => {
    [...word].forEach((letter, index) => {
      const x = column + across * index;
      const y = row + down * index;
      cols = Math.max(cols, x + 1);
      rows = Math.max(rows, y + 1);
      const key = `${x},${y}`;
      const cell = filled.get(key) || { letter, x, y, words: [] };
      cell.words.push(word);
      if (index === 0) cell.number = wordIndex + 1;
      filled.set(key, cell);
    });
  });

  const cells = [];
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      cells.push(filled.get(`${x},${y}`) || { x, y, empty: true });
    }
  }

  return { cells, cols, rows };
}

function wordsFrom(event) {
  const cell = event.target.closest(".cell");
  if (!cell?.dataset.words) return null;
  return cell.dataset.words.split(" ");
}

export function Skills() {
  const board = useMemo(buildBoard, []);
  const [view, setView] = useState(WORD_ORDER[0]);
  const [hovering, setHovering] = useState(false);
  const skill = portfolio.skills[view];

  useEffect(() => {
    if (hovering) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = setInterval(() => {
      setView((current) => WORD_ORDER[(WORD_ORDER.indexOf(current) + 1) % WORD_ORDER.length]);
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, [hovering, view]);

  function show(words, toggle = false) {
    setView((current) => {
      if (toggle && words.length > 1 && words.includes(current)) {
        return words.find((word) => word !== current);
      }
      return words.includes(current) ? current : words[0];
    });
  }

  return (
    <section id="skills">
      <div className="wrap">
        <h2>Skills and tools</h2>
        <p className="lead"> </p>
        <div className="sk">
          <div className="skp" style={{ "--hl": skill.hue }} aria-live="polite">
            <h3>{skill.title}</h3>
            <div className="chips">
              {skill.items.map((item) => (
                <span className="chip" key={item}>
                  <SkillMark name={item} />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
          <div
            className="cw"
            style={{ "--hl": skill.hue, "--cols": board.cols, "--rows": board.rows }}
            aria-label="Crossword of skill categories. Hover or click a word to see its skills."
            onMouseOver={(event) => {
              const words = wordsFrom(event);
              if (words) show(words);
            }}
            onFocus={() => setHovering(true)}
            onBlur={() => setHovering(false)}
            onClick={(event) => {
              const words = wordsFrom(event);
              if (words) show(words, true);
            }}
            onKeyDown={(event) => {
              if (event.key !== "Enter" && event.key !== " ") return;
              const words = wordsFrom(event);
              if (!words) return;
              event.preventDefault();
              show(words, true);
            }}
          >
            {board.cells.map((cell) =>
              cell.empty ? (
                <div key={`${cell.x}-${cell.y}`} className="cell empty" aria-hidden="true" />
              ) : (
                <div
                  key={`${cell.x}-${cell.y}`}
                  className={`cell${cell.words.includes(view) ? " on" : ""}`}
                  data-words={cell.words.join(" ")}
                  tabIndex={cell.number ? 0 : undefined}
                  role={cell.number ? "button" : undefined}
                  aria-label={cell.number ? portfolio.skills[cell.words[0]].title : undefined}
                >
                  {cell.number ? <sup>{cell.number}</sup> : null}
                  {cell.letter}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
