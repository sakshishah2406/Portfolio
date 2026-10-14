import { portfolio } from "../data/portfolio";
import { IdCard } from "./IdCard";

export function About({ name }) {
  return (
    <section id="about">
      <div className="wrap">
        <div className="about">
          <IdCard />
          <div className="about-copy">
            <h2>About me</h2>
            {portfolio.about.map((paragraph) => (
              <p key={paragraph}>{paragraph.replaceAll("{name}", name)}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
