"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ show }: { show: boolean }) {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (show && navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
      );
    }
  }, [show]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-5 opacity-0 transition-all duration-500 md:px-10 ${
          scrolled ? "bg-background/70 py-4 backdrop-blur-2xl" : ""
        }`}
      >
        <a
          href="#"
          className="font-display text-xl font-extrabold tracking-tight text-accent"
        >
          JD<span className="text-foreground">.</span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="group relative font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => scrollTo(e, "#contact")}
          className="hidden items-center gap-2 rounded-full border border-accent/40 px-5 py-2 font-mono text-xs uppercase tracking-widest text-accent transition-all duration-300 hover:border-accent hover:bg-accent hover:text-background md:inline-flex"
        >
          Let&apos;s Talk
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-[60] flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-px w-6 bg-foreground transition-all duration-300 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-all duration-300 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background transition-all duration-500 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => scrollTo(e, link.href)}
            className="font-display text-3xl font-bold text-foreground transition-colors hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
