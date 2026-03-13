"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { projects } from "@/constants";

function ProjectCard({
  project,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const { title, category, description, tags, color, year } = project;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -12,
      y: (x - 0.5) * 12,
    });
    if (glowRef.current) {
      glowRef.current.style.left = `${x * 100}%`;
      glowRef.current.style.top = `${y * 100}%`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card group relative overflow-hidden rounded-2xl border border-line bg-surface p-8 transition-colors duration-500 hover:border-accent/20 md:p-10"
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="pointer"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${color}12, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="mb-8 flex items-center justify-between">
          <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-dim">
            {category}
          </span>
          <span className="font-mono text-xs text-dim">{year}</span>
        </div>

        <h3 className="font-display text-4xl font-extrabold transition-colors duration-300 group-hover:text-accent md:text-5xl">
          {title}
        </h3>

        <p className="mt-4 leading-relaxed text-muted">{description}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-dim transition-colors group-hover:border-accent/20 group-hover:text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2 font-mono text-sm text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
          View Project
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
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

      const cards = sectionRef.current?.querySelectorAll(".project-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: cards[0], start: "top 85%" },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={headingRef}>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            &#47;&#47; Selected Work
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
            Projects that
            <br />
            <span className="text-muted">speak for themselves</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
