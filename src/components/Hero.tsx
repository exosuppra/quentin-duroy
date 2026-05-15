import { GrainGradient } from "@paper-design/shaders-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "../lib/cn";

/**
 * Hero v7:
 *  - Paper Shaders GrainGradient bg (subtle, paper-like, less busy than MeshGradient)
 *  - 2-column layout but portrait tightly framed + smaller
 *  - Floating tech badges around portrait (Make, Anthropic, Lovable, Manga AI)
 *  - No tilt animation (was making it look off)
 *  - object-position: top to keep face high in the frame
 */
export default function Hero() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const words = ["Quentin", "DUROY"];
  let globalIndex = 0;

  const badges = [
    { label: "Make.com", top: "8%", left: "-12%", delay: 0.4, accent: "#7c3aed" },
    { label: "Anthropic", top: "30%", right: "-14%", delay: 0.55, accent: "#dc2626" },
    { label: "Lovable Top 1%", top: "62%", left: "-16%", delay: 0.7, accent: "#c026d3" },
    { label: "Manga AI · 240 p.", top: "84%", right: "-10%", delay: 0.85, accent: "#7c3aed" },
  ];

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Paper Shaders bg: subtle grain gradient, paper-like */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <GrainGradient
          style={{ width: "100%", height: "100%" }}
          colorBack="#ffffff"
          colors={["#ede9fe", "#fbcfe8", "#fecaca", "#7c3aed", "#dc2626"]}
          softness={0.9}
          intensity={0.45}
          noise={0.6}
          shape="corners"
          speed={reduced ? 0 : 0.15}
        />
        {/* readability veil */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.30) 50%, rgba(255,255,255,0.65) 100%)",
          }}
        />
      </div>

      <div className="mx-auto grid min-h-[100svh] w-full max-w-6xl items-center gap-12 px-6 pb-24 pt-32 sm:pt-36 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:py-32">
        {/* TEXT COLUMN */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur"
            style={{
              borderColor: "rgba(124,58,237,0.30)",
              background: "rgba(255,255,255,0.80)",
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

          <h1 className="mb-6 text-balance text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl">
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
                    const isDuroy = wi === 1;
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
            className="mx-auto mb-4 max-w-2xl text-lg sm:text-xl lg:mx-0"
            style={{ color: "#404040" }}
          >
            <span style={{ color: "#0a0a0a", fontWeight: 600 }}>
              Référent IA &amp; Chef de Projet Web
            </span>{" "}
            à l'Office de Tourisme du Pays de Manosque, fondateur de LOGIQ IA.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82, duration: 0.6 }}
            className="mx-auto mb-10 max-w-2xl text-base sm:text-lg lg:mx-0"
            style={{ color: "#737373" }}
          >
            J'aide les entreprises à automatiser leurs workflows et lancer leurs
            produits IA, de l'idée à la production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
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
                background: "rgba(255,255,255,0.80)",
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

        {/* PORTRAIT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none lg:justify-self-end"
        >
          {/* Outer animated gradient ring */}
          <div className="relative mx-auto" style={{ width: "min(100%, 380px)" }}>
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-[2.2rem] opacity-70 blur-2xl"
              style={{
                background:
                  "conic-gradient(from 0deg, #7c3aed, #c026d3, #dc2626, #7c3aed)",
                animation: reduced ? "none" : "aurora 20s linear infinite",
              }}
            />

            {/* Frame card */}
            <div
              className="relative overflow-hidden rounded-[2rem] border"
              style={{
                background: "#ffffff",
                borderColor: "#e5e5e5",
                aspectRatio: "3 / 4",
                boxShadow:
                  "0 30px 60px -20px rgba(124,58,237,0.30), 0 18px 40px -15px rgba(220,38,38,0.20), 0 0 0 1px rgba(255,255,255,0.6) inset",
              }}
            >
              {/* Soft gradient halo inside the frame */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(124,58,237,0.16), transparent 65%), radial-gradient(ellipse 70% 40% at 50% 0%, rgba(220,38,38,0.10), transparent 65%)",
                }}
              />
              <img
                src="/quentin-bust.png"
                alt="Quentin DUROY"
                width={1024}
                height={1536}
                loading="eager"
                decoding="async"
                className="relative block h-full w-full select-none"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 18%",
                  filter:
                    "drop-shadow(0 8px 16px rgba(124,58,237,0.18)) drop-shadow(0 4px 8px rgba(220,38,38,0.12))",
                }}
                draggable={false}
              />
            </div>

            {/* Floating tech badges */}
            {badges.map((b) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, scale: 0.6, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: b.delay,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute hidden whitespace-nowrap rounded-full border bg-white px-3 py-1.5 text-xs font-semibold shadow-lg sm:block"
                style={{
                  top: b.top,
                  left: (b as { left?: string }).left,
                  right: (b as { right?: string }).right,
                  borderColor: `${b.accent}55`,
                  color: b.accent,
                  boxShadow: `0 10px 25px -10px ${b.accent}40, 0 4px 10px -4px rgba(0,0,0,0.08)`,
                  animation: reduced
                    ? "none"
                    : `float ${4 + (badges.indexOf(b) % 3)}s ease-in-out infinite`,
                  animationDelay: `${badges.indexOf(b) * 0.3}s`,
                }}
              >
                <span
                  className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                  style={{ background: b.accent }}
                />
                {b.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
