import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import AuroraBackground from "./AuroraBackground";
import { cn } from "../lib/cn";

/**
 * Hero with:
 *  - Soft Aurora background (light Provence palette)
 *  - Spotlight that follows the cursor (lavender wash)
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

      {/* spotlight follows cursor — soft lavender wash on light bg */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: useTransform(
            [bgX, bgY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x} ${y}, rgba(124,58,237,0.10), transparent 55%)`,
          ),
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur"
          style={{
            borderColor: "rgba(124,58,237,0.30)",
            background: "rgba(255,255,255,0.65)",
            color: "#5b21b6",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ background: "#f97316" }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: "#f97316" }}
            />
          </span>
          <span>☀️ Disponible pour de nouveaux projets</span>
        </motion.div>

        <h1 className="mb-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          <span
            className="mb-3 block text-xs font-medium uppercase tracking-[0.3em] sm:text-sm"
            style={{ color: "#8a7868" }}
          >
            Bonjour, je suis
          </span>
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
                className={cn("inline-block", i >= 8 ? "text-gradient" : "")}
                style={i < 8 ? { color: "#1f1006" } : undefined}
              >
                {c === " " ? " " : c}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-lg sm:text-xl"
          style={{ color: "#4a3527" }}
        >
          Chef de projet <span style={{ color: "#1f1006", fontWeight: 600 }}>IA &amp; développement web</span>,
          basé en Provence. J'aide les entreprises à{" "}
          <span style={{ color: "#1f1006", fontWeight: 600 }}>automatiser leurs workflows</span> et
          lancer leurs produits IA — de l'idée à la production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(90deg, #7c3aed 0%, #c026d3 35%, #c2410c 70%, #d97706 100%)",
              boxShadow:
                "0 10px 30px -10px rgba(124,58,237,0.45), 0 0 0 1px rgba(255,255,255,0.10) inset",
            }}
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
            <span
              className="absolute inset-0 -translate-x-full opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(90deg, #d97706 0%, #c2410c 35%, #c026d3 70%, #7c3aed 100%)",
              }}
            />
          </a>

          <a
            href="#projets"
            className="inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-base font-semibold backdrop-blur transition-all hover:-translate-y-0.5"
            style={{
              borderColor: "rgba(31,16,6,0.18)",
              background: "rgba(255,255,255,0.55)",
              color: "#1f1006",
            }}
          >
            Voir mes projets
            <svg
              className="h-4 w-4 transition-transform"
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em]"
          style={{ color: "#8a7868" }}
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
