"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export function Hero({ isLoaded }: { isLoaded: boolean }) {
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    const lines = titleRef.current?.querySelectorAll(".hero-line");
    if (lines) {
      tl.fromTo(
        lines,
        { yPercent: 110, rotateX: -80 },
        { yPercent: 0, rotateX: 0, duration: 1.4, stagger: 0.12 },
      );
    }

    tl.fromTo(
      badgeRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.8",
    );

    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.3",
    );

    return () => {
      tl.kill();
    };
  }, [isLoaded]);

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      <Scene3D />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center px-6 text-center">
        <div
          ref={badgeRef}
          className="mb-8 flex items-center gap-2 rounded-full border border-line px-4 py-1.5 opacity-0"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Available for work
          </span>
        </div>

        <div ref={titleRef} className="w-full">
          <div className="overflow-hidden" style={{ perspective: "600px" }}>
            <div className="hero-line">
              <span className="block font-display text-[clamp(2.5rem,8.5vw,7.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
                CREATIVE
              </span>
            </div>
          </div>
          <div className="overflow-hidden" style={{ perspective: "600px" }}>
            <div className="hero-line">
              <span className="block font-display text-[clamp(2.5rem,8.5vw,7.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-accent">
                DEVELOPER
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
          Scroll
        </span>
        <div className="h-10 w-px bg-accent/40 animate-pulse-line" />
      </div>
    </section>
  );
}
