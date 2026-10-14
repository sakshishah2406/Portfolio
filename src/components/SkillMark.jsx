const MARKS = {
  Python: { bg: "#1F4E79", fg: "#FFD43B", text: "Py" },
  C: { bg: "#7C6BF2", fg: "#fff", text: "C" },
  JavaScript: { bg: "#F7DF1E", fg: "#1c2744", text: "JS" },
  CSS: { bg: "#1B3FBF", fg: "#fff", text: "{}" },
  "C++": { bg: "#163A5F", fg: "#7FDBFF", text: "++" },
  Java: { bg: "#E76F00", fg: "#fff", text: "Ja" },
  SQL: { bg: "#0E7C86", fg: "#fff", text: "DB" },
  React: { bg: "#149ECA", fg: "#fff", text: "Re" },
  "Next.js": { bg: "#111111", fg: "#fff", text: "Ne" },
  GSAP: { bg: "#88CE02", fg: "#1c2744", text: "GS" },
  "Three.js": { bg: "#049EF4", fg: "#fff", text: "3D" },
  "Framer Motion": { bg: "#0055FF", fg: "#fff", text: "FM" },
  HTML5: { bg: "#E34F26", fg: "#fff", text: "H5" },
  NumPy: { bg: "#013243", fg: "#fff", text: "Np" },
  Pandas: { bg: "#E70488", fg: "#fff", text: "Pd" },
  Matplotlib: { bg: "#11557C", fg: "#fff", text: "Mp" },
  Seaborn: { bg: "#4C72B0", fg: "#fff", text: "Sb" },
  Recharts: { bg: "#22B5BF", fg: "#fff", text: "Rc" },
  Git: { bg: "#F05032", fg: "#fff", text: "Gt" },
  GitHub: { bg: "#24292F", fg: "#fff", text: "GH" },
  Figma: { bg: "#F24E1E", fg: "#fff", text: "Fg" },
  Jupyter: { bg: "#F37626", fg: "#fff", text: "Jp" },
  Canva: { bg: "#00C4CC", fg: "#fff", text: "Cv" },
  MySQL: { bg: "#00758F", fg: "#fff", text: "My" },
  AutoCAD: { bg: "#E51050", fg: "#fff", text: "AC" },
  Stitch: { bg: "#7C5CBF", fg: "#fff", text: "St" },
  "AI Studio": { bg: "#4285F4", fg: "#fff", text: "AI" },
};

export function SkillMark({ name }) {
  const mark = MARKS[name] || { bg: "#1c2744", fg: "#fff", text: name.slice(0, 2) };
  return (
    <span className="mark" style={{ background: mark.bg, color: mark.fg }} aria-hidden="true">
      {mark.text}
    </span>
  );
}
