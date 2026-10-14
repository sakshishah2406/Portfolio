import { useEffect, useState } from "react";
import { portfolio } from "../data/portfolio";

const STORAGE_KEY = "pf-name";

export function usePortfolioName() {
  const [name, setName] = useState(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) || portfolio.name).slice(0, 24);
    } catch {
      return portfolio.name;
    }
  });

  useEffect(() => {
    document.title = `${name} — Portfolio`;
  }, [name]);

  function saveName(next) {
    const value = next.trim().slice(0, 24) || portfolio.name;
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* private browsing can block storage */
    }
    setName(value);
    return value;
  }

  return [name, saveName];
}
