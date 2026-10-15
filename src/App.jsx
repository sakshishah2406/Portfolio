import { useState } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Projects } from "./components/Projects";
import { Achievements } from "./components/Achievements";
import { Skills } from "./components/Skills";
import { usePortfolioName } from "./hooks/usePortfolioName";

export default function App() {
  const [name, saveName] = usePortfolioName();
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <main id="top">
        <Hero name={name} saveName={saveName} detailsOpen={detailsOpen} />
        <Marquee />
        <Projects onOpenChange={setDetailsOpen} />
        <About name={name} />
        <Experience />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer name={name} />
    </>
  );
}
