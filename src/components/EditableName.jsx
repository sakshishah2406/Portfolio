import { useLayoutEffect, forwardRef } from "react";
import { portfolio } from "../data/portfolio";

export const EditableName = forwardRef(function EditableName({ name, saveName }, ref) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || document.activeElement === el) return;
    if (el.textContent !== name) el.textContent = name;
  }, [name, ref]);

  function onFocus(event) {
    const selection = window.getSelection();
    selection?.selectAllChildren(event.currentTarget);
  }

  function onKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.blur();
      return;
    }
    const el = event.currentTarget;
    const collapsed = window.getSelection()?.isCollapsed;
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && el.textContent.length >= 24 && collapsed) {
      event.preventDefault();
    }
  }

  function onBlur(event) {
    const value = saveName(event.currentTarget.textContent || "");
    event.currentTarget.textContent = value;
  }

  return (
    <span
      ref={ref}
      className="name"
      contentEditable="plaintext-only"
      role="textbox"
      spellCheck={false}
      aria-label="Your name. Click to edit, press Enter to finish."
      data-default={portfolio.name}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      suppressContentEditableWarning
    />
  );
});
