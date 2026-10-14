import { brickColors } from "../data/portfolio";

export function BrickStack({ title, items, side }) {
  return (
    <div className={`col ${side}`}>
      <h2>{title}</h2>
      <div className="stack">
        {items.map(([label, tone], index) => (
          <div
            key={label}
            className={`brick${tone === "navy" ? " navy" : ""}`}
            style={{ "--i": index, "--c": brickColors[tone] }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
