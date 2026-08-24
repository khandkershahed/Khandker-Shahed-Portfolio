"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, [role='button']";

export function SiteEffects() {
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    const trails = trailRefs.current.filter((item): item is HTMLSpanElement => Boolean(item));
    if (!ring || !dot) return;

    document.body.classList.add("custom-cursor-active");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    const trailPositions = trails.map(() => ({ x: targetX, y: targetY }));
    let frame = 0;

    const animate = () => {
      ringX += (targetX - ringX) * 0.2;
      ringY += (targetY - ringY) * 0.2;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      trails.forEach((trail, index) => {
        const source = index === 0 ? { x: ringX, y: ringY } : trailPositions[index - 1];
        const current = trailPositions[index];
        current.x += (source.x - current.x) * 0.26;
        current.y += (source.y - current.y) * 0.26;
        trail.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      });

      frame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      ring.classList.add("is-visible");
      dot.classList.add("is-visible");
      trails.forEach((trail) => trail.classList.add("is-visible"));

      const target = event.target as Element | null;
      ring.classList.toggle("is-hovering", Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };

    const handlePointerDown = () => ring.classList.add("is-clicking");
    const handlePointerUp = () => ring.classList.remove("is-clicking");
    const handlePointerLeave = () => {
      ring.classList.remove("is-visible");
      dot.classList.remove("is-visible");
      trails.forEach((trail) => trail.classList.remove("is-visible"));
    };

    frame = window.requestAnimationFrame(animate);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <div className="scroll-progress-track" aria-hidden="true">
        <div className="scroll-progress-bar" ref={progressRef} />
      </div>

      <div className="custom-cursor-ring" ref={cursorRingRef} aria-hidden="true" />
      <div className="custom-cursor-dot" ref={cursorDotRef} aria-hidden="true" />
      <div className="custom-cursor-trail" aria-hidden="true">
        {[0, 1, 2, 3].map((index) => (
          <span key={index} ref={(element) => { trailRefs.current[index] = element; }} />
        ))}
      </div>
    </>
  );
}
