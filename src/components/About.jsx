import { portfolio } from "../data/portfolio";
import { IdCard } from "./IdCard";

export function About({ name }) {
  return (
    <section id="about">
      <div className="wrap">
        <div className="about">
          <IdCard />
          <div className="about-copy">
            {portfolio.about.map((block, index) => {
              if (block.title) {
                const title = block.title.replaceAll("{name}", name);
                const Tag = index === 0 ? "h2" : "h3";
                return <Tag key={title}>{title}</Tag>;
              }
              const text = block.body.replaceAll("{name}", name);
              if (!block.emphasis || !text.includes(block.emphasis)) {
                return <p key={text}>{text}</p>;
              }
              const [before, after] = text.split(block.emphasis);
              return (
                <p key={text}>
                  {before}
                  <em>{block.emphasis}</em>
                  {after}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
