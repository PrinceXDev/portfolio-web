"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barTrackRef = useRef<HTMLDivElement>(null);

  const stableOnComplete = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        stableOnComplete();
      },
    });

    const counter = { value: 0 };

    tl.to(counter, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(
            Math.floor(counter.value)
          ).padStart(3, "0");
        }
      },
    });

    tl.to(
      barRef.current,
      {
        scaleX: 1,
        duration: 2,
        ease: "power2.inOut",
      },
      0
    );

    tl.to(
      [counterRef.current, barTrackRef.current],
      {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
      },
      "+=0.2"
    );

    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power4.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [stableOnComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "var(--bg)" }}
    >
      <div className="relative flex flex-col items-center gap-8">
        <span
          ref={counterRef}
          className="font-mono text-[clamp(3rem,10vw,8rem)] font-light leading-none text-accent tabular-nums tracking-tighter"
        >
          000
        </span>
        <div
          ref={barTrackRef}
          className="h-[1px] w-[200px] overflow-hidden"
          style={{ background: "var(--border-color)" }}
        >
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
