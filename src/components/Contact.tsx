"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { socials } from "@/constants";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = contentRef.current?.children;
      if (!els) return;

      gsap.fromTo(
        Array.from(els),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="px-6 py-40 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-5xl text-center">
        <div ref={contentRef} className="flex flex-col items-center gap-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            &#47;&#47; Get in Touch
          </span>

          <h2 className="font-display text-5xl font-extrabold leading-[0.95] md:text-7xl lg:text-8xl">
            Let&apos;s create
            <br />
            <span className="text-accent">something great</span>
          </h2>

          <p className="mt-2 max-w-md leading-relaxed text-muted">
            Have a project in mind or just want to chat? I&apos;d love to hear
            about it. Let&apos;s discuss how we can bring your vision to life.
          </p>

          <a
            href="mailto:princepanchani890@gmail.com"
            className="group mt-6 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-display text-lg font-bold text-background transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(196,243,70,0.25)]"
            data-cursor="pointer"
          >
            Say Hello
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-8">
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative font-mono text-sm text-dim transition-colors duration-300 hover:text-accent"
                data-cursor="pointer"
              >
                {label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
