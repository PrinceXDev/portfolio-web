"use client";

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8 md:px-12 lg:px-24">
      <div className="mx-auto flex justify-end max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-[11px] uppercase tracking-widest text-dim transition-colors duration-300 hover:text-accent"
          data-cursor="pointer"
        >
          Back to Top &uarr;
        </button>
      </div>
    </footer>
  );
}
