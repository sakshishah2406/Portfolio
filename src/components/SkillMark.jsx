import aiStudio from "../assets/logos/AI-Studio.svg";
import autocad from "../assets/logos/AutoCAD.svg";
import c from "../assets/logos/C.svg";
import cpp from "../assets/logos/C-.svg";
import canva from "../assets/logos/Canva.svg";
import css from "../assets/logos/CSS.svg";
import figma from "../assets/logos/Figma.svg";
import framer from "../assets/logos/Framer-Motion.svg";
import git from "../assets/logos/Git.svg";
import github from "../assets/logos/GitHub.svg";
import gsap from "../assets/logos/GSAP.svg";
import html5 from "../assets/logos/HTML5.svg";
import java from "../assets/logos/Java.svg";
import javascript from "../assets/logos/JavaScript.svg";
import jupyter from "../assets/logos/Jupyter.svg";
import matplotlib from "../assets/logos/Matplotlib.svg";
import mysql from "../assets/logos/MySQL.svg";
import nextjs from "../assets/logos/Next-js.svg";
import numpy from "../assets/logos/NumPy.svg";
import pandas from "../assets/logos/Pandas.svg";
import python from "../assets/logos/Python.svg";
import react from "../assets/logos/React.svg";
import scikit from "../assets/logos/Scikit-learn.svg";
import scipy from "../assets/logos/SciPy.svg";
import sql from "../assets/logos/SQL.svg";
import stitch from "../assets/logos/Stitch.svg";
import three from "../assets/logos/Three-js.svg";

const LOGOS = {
  Python: python,
  C: c,
  JavaScript: javascript,
  CSS: css,
  "C++": cpp,
  Java: java,
  SQL: sql,
  React: react,
  "Next.js": nextjs,
  GSAP: gsap,
  "Three.js": three,
  "Framer Motion": framer,
  HTML5: html5,
  NumPy: numpy,
  Pandas: pandas,
  Matplotlib: matplotlib,
  SciPy: scipy,
  "Scikit-learn": scikit,
  Git: git,
  GitHub: github,
  Figma: figma,
  Jupyter: jupyter,
  Canva: canva,
  MySQL: mysql,
  AutoCAD: autocad,
  Stitch: stitch,
  "AI Studio": aiStudio,
};

export function SkillMark({ name }) {
  const src = LOGOS[name];
  return (
    <span className="mark" aria-hidden="true">
      {src ? <img src={src} alt="" /> : name.slice(0, 2)}
    </span>
  );
}
