"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { setOfSkills } from "@/constants";

function MarqueeRow({
  items,
  reverse = false,
  duration = 35,
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="flex overflow-hidden py-2">
      <div
        className={reverse ? "marquee-reverse" : "marquee"}
        style={
          {
            "--duration": `${duration}s`,
            display: "flex",
            gap: "0.75rem",
            whiteSpace: "nowrap",
          } as React.CSSProperties
        }
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex shrink-0 items-center rounded-full border border-line px-6 py-3 font-mono text-sm text-dim transition-all duration-300 hover:border-accent/40 hover:text-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="overflow-hidden py-32">
      <div className="mx-auto mb-16 max-w-6xl px-6 md:px-12 lg:px-24">
        <div ref={headingRef}>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            &#47;&#47; Tech Stack
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
            Tools I use to
            <br />
            <span className="text-muted">bring ideas to life</span>
          </h2>
        </div>
      </div>

      <div className="space-y-3">
        <MarqueeRow items={setOfSkills[0]} duration={38} />
        <MarqueeRow items={setOfSkills[1]} reverse duration={42} />
        <MarqueeRow items={setOfSkills[2]} duration={46} />
      </div>
    </section>
  );
}
