export interface ContentBlock {
  type: "paragraph" | "heading" | "code" | "list";
  text?: string;
  language?: string;
  items?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  timeAgo: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  content: ContentBlock[];
}

export const blogs: BlogPost[] = [
  {
    slug: "building-3d-web-experiences-with-react-three-fiber",
    title: "Building Immersive 3D Web Experiences with React Three Fiber",
    date: "February 15, 2026",
    timeAgo: "1mo ago",
    readTime: "6 min read",
    excerpt:
      "Three.js is powerful but verbose. React Three Fiber lets you build complex 3D scenes declaratively — here's how to do it right without killing performance.",
    tags: ["Three.js", "React", "WebGL", "Performance"],
    content: [
      {
        type: "paragraph",
        text: "Three.js revolutionized 3D on the web, but writing imperative WebGL code inside a React app always felt like duct-taping two paradigms together. React Three Fiber (R3F) fixes that by letting you describe 3D scenes as JSX — the same mental model you already use for UI.",
      },
      {
        type: "heading",
        text: "Why R3F Over Vanilla Three.js?",
      },
      {
        type: "paragraph",
        text: "The biggest win isn't syntax sugar — it's lifecycle management. In vanilla Three.js you manually create objects, add them to scenes, update them in animation loops, and clean them up on unmount. Miss one disposal call and you've got a memory leak. R3F ties all of this to React's component lifecycle automatically.",
      },
      {
        type: "code",
        language: "tsx",
        text: `// Vanilla Three.js — imperative, manual cleanup
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 'orange' });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// React Three Fiber — declarative, auto-managed
function Box() {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}`,
      },
      {
        type: "heading",
        text: "Performance Patterns That Actually Matter",
      },
      {
        type: "list",
        items: [
          "Use `useFrame` for animations instead of `requestAnimationFrame` — it's synchronized with the R3F render loop and won't cause double-renders.",
          "Memoize geometries with `useMemo`. Creating geometry objects every render is the #1 performance killer in R3F apps.",
          "Set `dpr={[1, 2]}` on your Canvas to cap pixel ratio. A 4K retina screen at full DPR will render 4x the pixels for almost no visual gain.",
          "Use `<Instances>` from drei for repeated geometry. 1000 individual meshes = 1000 draw calls. Instancing drops that to 1.",
        ],
      },
      {
        type: "heading",
        text: "When NOT to Use 3D",
      },
      {
        type: "paragraph",
        text: "This is the part most articles skip. 3D on the web adds significant bundle size (~150KB+ for Three.js alone), increases GPU load, and can tank Core Web Vitals on mobile. Use 3D when it genuinely enhances understanding or engagement — product configurators, data visualization, interactive storytelling. Don't use it for a spinning logo that could be a CSS animation.",
      },
      {
        type: "paragraph",
        text: "The best 3D web experiences are the ones where the user doesn't think about the technology — they just feel immersed. Start simple, measure performance on real devices, and add complexity only when it serves the user.",
      },
    ],
  },
  {
    slug: "mastering-scroll-driven-animations",
    title: "Mastering Scroll-Driven Animations with GSAP",
    date: "January 8, 2026",
    timeAgo: "2mo ago",
    readTime: "5 min read",
    excerpt:
      "Scroll animations can feel magical or nauseating. The difference comes down to three principles most developers overlook.",
    tags: ["GSAP", "Animation", "ScrollTrigger", "UX"],
    content: [
      {
        type: "paragraph",
        text: "Scroll-driven animations are everywhere in modern web design, but most implementations fall into two camps: too subtle to notice, or so aggressive they make users reach for the close button. The sweet spot requires understanding not just the API, but the psychology of motion.",
      },
      {
        type: "heading",
        text: "The Three Rules of Scroll Animation",
      },
      {
        type: "list",
        items: [
          "**Scrub for content, trigger for UI.** Use `scrub: true` when the animation represents progress through content (like a text reveal). Use triggered animations for UI entrances (cards sliding in). Mixing these up is the most common mistake.",
          "**Never animate what the user is trying to read.** Moving text that the user is actively reading causes cognitive friction. Animate elements *into* their reading position, then leave them alone.",
          "**Match scroll speed to animation weight.** Heavy animations (large movements, scale changes) need longer scroll distances. A card sliding 200px shouldn't complete in 50px of scrolling — it feels jarring.",
        ],
      },
      {
        type: "heading",
        text: "GSAP ScrollTrigger: The Setup That Scales",
      },
      {
        type: "code",
        language: "typescript",
        text: `import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Smooth scroll + GSAP sync — this order matters
const lenis = new Lenis({ duration: 1.2 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Scrubbed text reveal — words fade in as you scroll
gsap.to('.word', {
  opacity: 1,
  y: 0,
  stagger: 0.05,
  scrollTrigger: {
    trigger: '.text-block',
    start: 'top 60%',
    end: 'bottom 40%',
    scrub: 1,        // ties animation to scroll position
  },
});`,
      },
      {
        type: "heading",
        text: "The Lenis + GSAP Integration",
      },
      {
        type: "paragraph",
        text: "Native browser scrolling has one problem: it's not smooth. Lenis intercepts scroll events and applies easing, creating that buttery feel you see on award-winning sites. The critical detail is syncing Lenis with GSAP's ticker rather than using a separate `requestAnimationFrame` loop — this prevents the two systems from fighting over scroll position and eliminates the jitter that plagues most implementations.",
      },
      {
        type: "heading",
        text: "Performance: The Part Everyone Ignores",
      },
      {
        type: "paragraph",
        text: "Every ScrollTrigger instance attaches a scroll listener. With 50+ triggers on a page, you'll start feeling the drag on low-end devices. The fix: use `gsap.context()` scoped to each section, and call `ctx.revert()` on unmount. This properly cleans up all triggers, timelines, and tweens in one call. Also, prefer `will-change: transform` on animated elements and avoid animating `width`, `height`, or `top` — stick to `transform` and `opacity` for GPU-accelerated performance.",
      },
    ],
  },
  {
    slug: "modern-css-features-you-should-use-in-2026",
    title: "Modern CSS Features That Changed How I Write Styles",
    date: "December 20, 2025",
    timeAgo: "3mo ago",
    readTime: "4 min read",
    excerpt:
      "CSS has evolved faster in the last two years than in the previous decade. These five features eliminated entire categories of JavaScript from my projects.",
    tags: ["CSS", "Frontend", "Web Standards", "Performance"],
    content: [
      {
        type: "paragraph",
        text: "Every year someone declares CSS is \"finally good,\" and every year there's more to learn. But the 2024-2025 feature wave was genuinely different — these aren't incremental improvements. They're paradigm shifts that made me delete JavaScript I thought I'd need forever.",
      },
      {
        type: "heading",
        text: "1. Container Queries: The End of Breakpoint Hell",
      },
      {
        type: "paragraph",
        text: "Media queries ask \"how wide is the viewport?\" Container queries ask \"how wide is my parent?\" This seemingly small difference eliminates the entire class of bugs where a component looks perfect on a page but breaks when you put it in a sidebar. Components can now be truly self-contained and responsive to their own context.",
      },
      {
        type: "code",
        language: "css",
        text: `.card-container {
  container-type: inline-size;
}

/* Card adapts to its container, not the viewport */
@container (min-width: 400px) {
  .card { flex-direction: row; }
}

@container (max-width: 399px) {
  .card { flex-direction: column; }
}`,
      },
      {
        type: "heading",
        text: "2. The :has() Selector: CSS Finally Gets Logic",
      },
      {
        type: "paragraph",
        text: "Before `:has()`, CSS could only select downward — parent to child. Now you can style a parent based on what it contains. I used to add JavaScript-managed classes like `.has-error` or `.is-empty`. Now it's pure CSS: `form:has(input:invalid)` selects any form containing an invalid input. This single feature eliminated dozens of `useEffect` hooks from my projects.",
      },
      {
        type: "code",
        language: "css",
        text: `/* Style a card differently when it contains an image */
.card:has(img) {
  grid-template-rows: 200px 1fr;
}

/* Highlight nav link when its section is in view */
.nav-link:has(+ .section:target) {
  color: var(--accent);
}

/* Disable submit when form has invalid fields */
form:has(:invalid) button[type="submit"] {
  opacity: 0.5;
  pointer-events: none;
}`,
      },
      {
        type: "heading",
        text: "3. View Transitions: Page Animations Without a Framework",
      },
      {
        type: "paragraph",
        text: "The View Transitions API lets you animate between page states — or even between pages in a multi-page app — with a few lines of CSS. No more importing Framer Motion just for a fade transition. The browser handles snapshotting the old state, rendering the new state, and crossfading between them. You just define the CSS animation.",
      },
      {
        type: "heading",
        text: "The Takeaway",
      },
      {
        type: "paragraph",
        text: "The best CSS isn't about knowing every property — it's about knowing when CSS alone is enough. Every feature above replaced JavaScript I was maintaining, testing, and shipping to users. Less JS means faster load times, fewer bugs, and code that works even when a script fails. The platform is catching up to our ambitions, and the developers who lean into it will ship faster and lighter than those who reach for a library first.",
      },
    ],
  },
];
