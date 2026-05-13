import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import AuroraBackground from "./AuroraBackground";
import { cn } from "../lib/cn";

/**
 * Hero with:
 *  - Aurora background (CSS animated conic-gradient)
 *  - Spotlight that follows the cursor (Hero Highlight inspired)
 *  - Title with letter-by-letter motion entrance
 *  - Floating CTA buttons
 */
export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const mxs = useSpring(mx, { stiffness: 80, damping: 20 });
  const mys = useSpring(my, { stiffness: 80, damping: 20 });
  const bgX = useTransform(mxs, (v) => `${v * 100}%`);
  const bgY = useTransform(mys, (v) => `${v * 100}%`);

  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  const title = "Quentin DUROY";
  const titleLetters = Array.from(title);

  return (
    <section
      id="hero"
      ref={wrapRef}
      onMouseMove={onMove}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <AuroraBackground />

      {/* spotlight follows cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: useTransform(
            [bgX, bgY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x} ${y}, rgba(225,29,72,0.18), transparent 55%)`,
          ),
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-200 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
          </span>
          Disponible pour de nouveaux projets
        </motion.div>

        <h1 className="mb-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block text-fg-muted/70">Bonjour, je suis</span>
          <span className="block">
            {titleLetters.map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.15 + i * 0.035,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "inline-block",
                  i >= 8 ? "text-gradient" : "text-white",
                )}
              >
                {c === " " ? " " : c}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-fg-muted sm:text-xl"
        >
          Chef de projet <span className="text-white">IA & développement web</span>.
          J'aide les entreprises à automatiser leurs workflows et lancer leurs
          produits IA.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-600/30 transition-all hover:shadow-rose-600/40 hover:-translate-y-0.5"
          >
            <span className="relative z-10">Discuter d'un projet</span>
            <svg
              className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden
            >
              <path d="M6 3l5 5-5 5V3z" />
            </svg>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-rose-600 via-fuchsia-600 to-violet-600 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
          </a>

          <a
            href="#projets"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-8 py-3.5 text-base font-semibold text-white backdrop-blur transition-all hover:border-violet-400/50 hover:bg-violet-500/10"
          >
            Voir mes projets
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden
            >
              <path d="M3 6l5 5 5-5H3z" />
            </svg>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-fg-dim"
        >
          <span className="inline-block animate-bounce" style={{ animationDuration: "2s" }}>
            ↓
          </span>{" "}
          Scroll
        </motion.div>
      </div>
    </section>
  );
}
