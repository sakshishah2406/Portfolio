import { portfolio } from "../data/portfolio";

export function Marquee() {
  const copies = [0, 1, 2, 3, 4, 5];

  return (
    <div className="paper" aria-label={portfolio.marquee.join(", ")}>
      <div className="track" aria-hidden="true">
        {copies.map((copy) =>
          portfolio.marquee.map((phrase) => (
            <span key={`${copy}-${phrase}`}>
              {phrase} ✦
            </span>
          ))
        )}
      </div>
    </div>
  );
}
