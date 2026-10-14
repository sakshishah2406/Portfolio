import { useEffect } from "react";

/** Gently presses the name badge and keyboard keys while the page is idle. */
export function useIdlePress(nameRef, keyboardRef, paused) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    let wait = 0;
    let index = 0;
    let hold = false;
    const pressTimers = new Set();

    const elements = () => {
      const name = nameRef.current;
      const keys = keyboardRef.current ? [...keyboardRef.current.querySelectorAll(".key")] : [];
      return name ? [name, ...keys] : keys;
    };

    const clearPress = () => {
      elements().forEach((el) => el.classList.remove("press"));
    };

    const stop = () => {
      hold = true;
      clearInterval(timer);
      clearTimeout(wait);
      pressTimers.forEach((id) => clearTimeout(id));
      pressTimers.clear();
      clearPress();
    };

    const start = () => {
      if (reduced || paused) return;
      hold = false;
      clearInterval(timer);
      timer = setInterval(tick, 520);
    };

    const tick = () => {
      if (hold || document.hidden) return;
      const list = elements();
      if (!list.length) return;
      clearPress();
      const el = list[index % list.length];
      el.classList.add("press");
      const id = setTimeout(() => {
        pressTimers.delete(id);
        el.classList.remove("press");
      }, 380);
      pressTimers.add(id);
      index += 1;
      if (index % list.length === 0) {
        clearInterval(timer);
        wait = setTimeout(() => {
          if (!hold) start();
        }, 3000);
      }
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const keyboard = keyboardRef.current;
    const name = nameRef.current;

    keyboard?.addEventListener("mouseenter", stop);
    keyboard?.addEventListener("focusin", stop);
    keyboard?.addEventListener("mouseleave", start);
    keyboard?.addEventListener("focusout", start);
    name?.addEventListener("focus", stop);
    name?.addEventListener("blur", start);
    document.addEventListener("visibilitychange", onVisibility);

    if (paused) stop();
    else start();

    return () => {
      stop();
      keyboard?.removeEventListener("mouseenter", stop);
      keyboard?.removeEventListener("focusin", stop);
      keyboard?.removeEventListener("mouseleave", start);
      keyboard?.removeEventListener("focusout", start);
      name?.removeEventListener("focus", stop);
      name?.removeEventListener("blur", start);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [nameRef, keyboardRef, paused]);
}
