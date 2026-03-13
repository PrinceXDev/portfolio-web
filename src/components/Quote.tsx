"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const QUOTE_TEXT =
  "Do so much work that it would be unreasonable for you to not be successful.";

export function Quote() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const leftMarkRef = useRef<SVGSVGElement>(null);
  const rightMarkRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lineLeftRef = useRef<HTMLSpanElement>(null);
  const lineRightRef = useRef<HTMLSpanElement>(null);
  const authorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const quote = quoteRef.current;
    if (!section || !quote) return;

    quote.innerHTML = QUOTE_TEXT.split(" ")
      .map(
        (word) =>
          `<span class="inline-block translate-y-[14px]" style="opacity:0.08">${word}&nbsp;</span>`,
      )
      .join("");

    const words = quote.querySelectorAll("span");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        glowRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "center 40%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        leftMarkRef.current,
        { x: 60, opacity: 0, scale: 0.6, rotate: -12 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 35%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        rightMarkRef.current,
        { x: -60, opacity: 0, scale: 0.6, rotate: 12 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 35%",
            scrub: 1,
          },
        },
      );

      gsap.to(words, {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "center 40%",
          scrub: 1,
        },
      });

      gsap.fromTo(
        lineLeftRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "center 55%",
            end: "center 35%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        lineRightRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "center 55%",
            end: "center 35%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        authorRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "center 55%",
            end: "center 35%",
            scrub: 1,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const markPath =
    "M0 32V19.2C0 15.467 0.667 12.067 2 9C3.4 5.867 5.533 3.2 8.4 1L14 5.6C12.067 7.133 10.567 8.833 9.5 10.7C8.5 12.5 8 14.4 8 16.4H16V32H0ZM24 32V19.2C24 15.467 24.667 12.067 26 9C27.4 5.867 29.533 3.2 32.4 1L38 5.6C36.067 7.133 34.567 8.833 33.5 10.7C32.5 12.5 32 14.4 32 16.4H40V32H24Z";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-36 md:px-12 md:py-48 lg:px-24"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{
          width: "min(700px, 90vw)",
          height: "min(700px, 90vw)",
          background:
            "radial-gradient(circle, rgba(196,243,70,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <svg
          ref={leftMarkRef}
          width="80"
          height="64"
          viewBox="0 0 40 32"
          fill="none"
          className="absolute -left-4 -top-8 text-accent opacity-0 md:-left-12 md:-top-10"
          style={{ width: "clamp(50px, 8vw, 80px)", height: "auto" }}
        >
          <path d={markPath} fill="currentColor" fillOpacity="0.15" />
        </svg>

        <svg
          ref={rightMarkRef}
          width="80"
          height="64"
          viewBox="0 0 40 32"
          fill="none"
          className="absolute -bottom-8 -right-4 rotate-180 text-accent opacity-0 md:-bottom-10 md:-right-12"
          style={{ width: "clamp(50px, 8vw, 80px)", height: "auto" }}
        >
          <path d={markPath} fill="currentColor" fillOpacity="0.15" />
        </svg>

        <blockquote
          ref={quoteRef}
          className="font-display text-[clamp(1.5rem,4vw,2.6rem)] font-bold leading-[1.3] italic tracking-[-0.01em]"
        >
          {QUOTE_TEXT}
        </blockquote>

        <div className="mt-10 flex items-center gap-5">
          <span
            ref={lineLeftRef}
            className="block h-px w-10 origin-right bg-accent/40"
            style={{ transform: "scaleX(0)" }}
          />
          <span
            ref={authorRef}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted opacity-0"
          >
            Alex Hormozi
          </span>
          <span
            ref={lineRightRef}
            className="block h-px w-10 origin-left bg-accent/40"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
