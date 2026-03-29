"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const raw = text.textContent || "";
    text.innerHTML = raw
      .split(" ")
      .map(
        (word) =>
          `<span class="inline-block" style="opacity:0.15">${word}&nbsp;</span>`
      )
      .join("");

    const wordSpans = text.querySelectorAll("span");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      gsap.to(wordSpans, {
        opacity: 1,
        stagger: 0.04,
        scrollTrigger: {
          trigger: section,
          start: "top 55%",
          end: "center 35%",
          scrub: 1,
        },
      });

      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      if (statItems) {
        gsap.fromTo(
          statItems,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        <span
          ref={labelRef}
          className="inline-block font-mono text-xs uppercase tracking-[0.25em] text-accent opacity-0"
        >
          &#47;&#47; About
        </span>

        <div className="mt-14 grid grid-cols-1 items-start gap-16 lg:grid-cols-5">
          <p
            ref={textRef}
            className="font-display text-2xl font-medium leading-snug md:text-3xl lg:col-span-3 lg:text-[2.1rem]"
          >
            I&apos;m a creative developer passionate about building beautiful,
            interactive web experiences that push the boundaries of what&apos;s
            possible on the web. With expertise in modern web technologies, 3D
            graphics, and animation, I bring designs to life with meticulous
            attention to detail and performance.
          </p>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <p className="leading-relaxed text-muted">
              I specialize in creating immersive digital experiences that blend
              cutting-edge technology with thoughtful design. From interactive 3D
              visualizations to smooth, performant animations, I craft every
              pixel with purpose.
            </p>
            <p className="leading-relaxed text-muted">
              When I&apos;m not coding, you&apos;ll find me exploring new
              creative tools, sketching ideas for the next project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
