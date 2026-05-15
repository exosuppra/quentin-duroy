import { MeshGradient } from "@paper-design/shaders-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";

/**
 * Hero (v6):
 *  - Paper Shaders MeshGradient as background (violet/red/white WebGL)
 *  - 2-column layout: text left, portrait right
 *  - Portrait floats with subtle parallax / mouse tilt
 *  - Word-aware name animation
 */
export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Mouse for portrait parallax tilt
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const mxs = useSpring(mx, { stiffness: 60, damping: 18 });
  const mys = useSpring(my, { stiffness: 60, damping: 18 });
  const rotateY = useTransform(mxs, [0, 1], [6, -6]);
  const rotateX = useTransform(mys, [0, 1], [-4, 4]);
  const portraitY = useTransform(mys, [0, 1], [4, -4]);

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

  const words = ["Quentin", "DUROY"];
  let globalIndex = 0;

  return (
    <section
      id="hero"
      ref={wrapRef}
      onMouseMove={onMove}
      className="relative isolate overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* WebGL shader background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <MeshGradient
          style={{ width: "100%", height: "100%" }}
          colors={["#ffffff", "#ede9fe", "#fbcfe8", "#fecaca", "#7c3aed", "#dc2626"]}
          speed={reduced ? 0 : 0.18}
          distortion={1}
          swirl={0.55}
        />
        {/* White overlay to keep readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.65) 100%)",
          }}
        />
        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      <div className="mx-auto grid min-h-[100svh] w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-32 sm:pt-36 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-32">
        {/* TEXT COLUMN */}
        <div className="relative z-10 text-center lg:text-left">
          {/* Available badge */}
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

          {/* Title */}
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
            className="mx-auto mb-10 max-w-2xl text-lg sm:text-xl lg:mx-0"
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
            et lancer leurs produits IA, de l'idée à la production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
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
          style={{
            perspective: 1200,
          }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              y: portraitY,
              transformStyle: "preserve-3d",
            }}
            className="relative"
          >
            {/* Color halo behind the bust */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 scale-90 rounded-[50%] opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 30%, rgba(124,58,237,0.50), transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(220,38,38,0.40), transparent 60%)",
              }}
            />
            {/* Animated ring behind */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[110%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-2xl"
              style={{
                background:
                  "conic-gradient(from 0deg, #7c3aed, #c026d3, #dc2626, #7c3aed)",
                animation: "aurora 20s linear infinite",
              }}
            />

            {/* The bust itself */}
            <img
              src="/quentin-bust.png"
              alt="Quentin DUROY, chef de projet IA"
              width={1024}
              height={1536}
              loading="eager"
              decoding="async"
              className="relative mx-auto block h-auto w-full max-w-[480px] select-none"
              style={{
                filter:
                  "drop-shadow(0 30px 50px rgba(124,58,237,0.30)) drop-shadow(0 20px 30px rgba(220,38,38,0.22))",
              }}
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator at section bottom */}
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
