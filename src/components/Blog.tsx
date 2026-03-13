"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { blogs } from "@/data/blogs";
import Link from "next/link";

function BlogCard({
  blog,
  index,
}: {
  blog: (typeof blogs)[0];
  index: number;
}) {
  return (
    <Link href={`/blog/${blog.slug}`} className="blog-card group block">
      <div className="flex items-start gap-6 border-b border-line py-8 transition-colors duration-500 group-hover:border-accent/30 md:gap-10 md:py-10">
        <span className="hidden font-mono text-5xl font-light leading-none text-dim transition-all duration-500 group-hover:text-accent group-hover:scale-110 md:block md:text-6xl shrink-0 w-20 text-right">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[11px] text-dim">
              {blog.date}
            </span>
            <span className="h-1 w-1 rounded-full bg-dim" />
            <span className="font-mono text-[11px] text-dim">
              {blog.readTime}
            </span>
          </div>

          <h3 className="font-display text-xl font-bold leading-snug transition-colors duration-300 group-hover:text-accent md:text-2xl lg:text-[1.7rem]">
            {blog.title}
          </h3>

          <p className="mt-3 leading-relaxed text-muted line-clamp-2 text-sm md:text-base">
            {blog.excerpt}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] text-dim transition-colors group-hover:border-accent/20 group-hover:text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden shrink-0 self-center md:block">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:scale-110">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-dim transition-all duration-500 group-hover:text-background group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Blog() {
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
        }
      );

      const cards = sectionRef.current?.querySelectorAll(".blog-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: cards[0], start: "top 88%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-5xl">
        <div ref={headingRef}>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            &#47;&#47; Blog
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
            Thoughts &amp;
            <br />
            <span className="text-muted">insights</span>
          </h2>
        </div>

        <div className="mt-12">
          {blogs.map((blog, i) => (
            <BlogCard key={blog.slug} blog={blog} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
