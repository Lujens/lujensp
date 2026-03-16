import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const [overLink, setOverLink] = useState(false);
  const [visible, setVisible] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Don't show on touch devices
    if ("ontouchstart" in window) return;

    setVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null;
      setOverLink(isLink);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    // Smooth follow loop
    let raf: number;
    const follow = () => {
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) / 6;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) / 6;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px)`;
      }
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={dotRef}
      className={`mouse-dot ${overLink ? "over-link" : ""}`}
      style={{ top: "-20px", left: "-20px" }}
    />
  );
};

export default CustomCursor;
