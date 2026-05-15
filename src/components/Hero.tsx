import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import AuroraBackground from "./AuroraBackground";
import { cn } from "../lib/cn";

/**
 * Hero:
 *  - Aurora bg (violet + red washes on white)
 *  - Spotlight follows cursor
 *  - Avatar with animated violet/red gradient ring
 *  - Name title with letter-by-letter motion, word-aware spacing
 *  - Scroll indicator positioned absolute to section (not content)
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

  // Animate WORD by WORD letter spans, with explicit word gaps so spaces never collapse
  const words = ["Quentin", "DUROY"];
  let globalIndex = 0;

  return (
    <section
      id="hero"
      ref={wrapRef}
      onMouseMove={onMove}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <AuroraBackground />

      {/* spotlight follows cursor — soft violet wash on white */}
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
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-block"
        >
          <div className="relative inline-block">
            <span
              aria-hidden
              className="absolute -inset-1 rounded-full blur-md"
              style={{
                background:
                  "conic-gradient(from 0deg, #7c3aed, #c026d3, #dc2626, #7c3aed)",
                animation: "aurora 16s linear infinite",
              }}
            />
            <span
              aria-hidden
              className="absolute -inset-[3px] rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, #7c3aed, #c026d3, #dc2626, #7c3aed)",
              }}
            />
            <img
              src="/quentin.jpg"
              alt="Quentin DUROY"
              width={96}
              height={96}
              loading="eager"
              className="relative h-24 w-24 rounded-full object-cover"
              style={{
                background: "#ffffff",
                boxShadow:
                  "0 0 0 4px #ffffff, 0 18px 40px -10px rgba(124,58,237,0.35), 0 8px 20px -8px rgba(220,38,38,0.30)",
              }}
            />
          </div>
        </motion.div>

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur"
          style={{
            borderColor: "rgba(124,58,237,0.30)",
            background: "rgba(255,255,255,0.85)",
            color: "#5b21b6",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ background: "#dc2626" }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: "#dc2626" }}
            />
          </span>
          <span>Disponible pour de nouveaux projets</span>
        </motion.div>

        {/* Title — word-aware so spaces never collapse */}
        <h1 className="mb-6 text-balance text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl">
          <span
            className="mb-3 block text-xs font-medium uppercase tracking-[0.3em] sm:text-sm"
            style={{ color: "#737373" }}
          >
            Bonjour, je suis
          </span>
          <span className="block">
            {words.map((word, wi) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {Array.from(word).map((c) => {
                  const i = globalIndex++;
                  const isDuroy = wi === 1; // 2nd word → gradient
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        delay: 0.15 + i * 0.035,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={cn("inline-block", isDuroy ? "text-gradient" : "")}
                      style={isDuroy ? undefined : { color: "#0a0a0a" }}
                    >
                      {c}
                    </motion.span>
                  );
                })}
                {wi < words.length - 1 && (
                  <span className="inline-block" style={{ width: "0.4em" }}>
                    &nbsp;
                  </span>
                )}
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-lg sm:text-xl"
          style={{ color: "#404040" }}
        >
          Chef de projet{" "}
          <span style={{ color: "#0a0a0a", fontWeight: 600 }}>
            IA &amp; développement web
          </span>
          , basé en Provence. J'aide les entreprises à{" "}
          <span style={{ color: "#0a0a0a", fontWeight: 600 }}>
            automatiser leurs workflows
          </span>{" "}
          et lancer leurs produits IA — de l'idée à la production.
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
                "linear-gradient(90deg, #7c3aed 0%, #c026d3 50%, #dc2626 100%)",
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
                  "linear-gradient(90deg, #dc2626 0%, #c026d3 50%, #7c3aed 100%)",
              }}
            />
          </a>

          <a
            href="#projets"
            className="inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-base font-semibold backdrop-blur transition-all hover:-translate-y-0.5"
            style={{
              borderColor: "#d4d4d4",
              background: "#ffffff",
              color: "#0a0a0a",
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
      </div>

      {/* Scroll indicator — positioned at bottom of section, NOT inside content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em]"
        style={{ color: "#a3a3a3" }}
      >
        <span
          className="inline-block animate-bounce"
          style={{ animationDuration: "2s" }}
        >
          ↓
        </span>{" "}
        Scroll
      </motion.div>
    </section>
  );
}
