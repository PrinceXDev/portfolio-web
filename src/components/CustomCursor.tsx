"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    if (window.matchMedia("(pointer: coarse)").matches) {
      dot.style.display = "none";
      ring.style.display = "none";
      return;
    }

    const pos = { x: -100, y: -100 };
    const mouse = { x: -100, y: -100 };
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.to(dot, { x: e.clientX - 5, y: e.clientY - 5, duration: 0.08 });
    };

    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.12;
      pos.y += (mouse.y - pos.y) * 0.12;
      gsap.set(ring, { x: pos.x - 22, y: pos.y - 22 });
      rafId = requestAnimationFrame(tick);
    };

    const addHoverListeners = () => {
      document
        .querySelectorAll('a, button, [data-cursor="pointer"]')
        .forEach((el) => {
          el.addEventListener("mouseenter", onHoverEnter);
          el.addEventListener("mouseleave", onHoverLeave);
        });
    };

    const onHoverEnter = () => {
      gsap.to(ring, {
        scale: 1.8,
        borderColor: "var(--accent-color)",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const onHoverLeave = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(255,255,255,0.15)",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(tick);

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    addHoverListeners();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[999] h-[10px] w-[10px] rounded-full bg-accent mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[998] h-[44px] w-[44px] rounded-full border mix-blend-difference"
        style={{ borderColor: "rgba(255,255,255,0.15)" }}
      />
    </>
  );
}
