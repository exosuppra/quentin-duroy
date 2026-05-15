import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { parcours, type ParcoursEntry } from "../data/parcours";

const accentColor: Record<ParcoursEntry["accent"], string> = {
  lavande: "#7c3aed",
  terracotta: "#c2410c",
  ocre: "#d97706",
};
const accentBg: Record<ParcoursEntry["accent"], string> = {
  lavande: "rgba(124,58,237,0.08)",
  terracotta: "rgba(194,65,12,0.08)",
  ocre: "rgba(217,119,6,0.08)",
};
const accentBorder: Record<ParcoursEntry["accent"], string> = {
  lavande: "rgba(124,58,237,0.28)",
  terracotta: "rgba(194,65,12,0.30)",
  ocre: "rgba(217,119,6,0.32)",
};

function TimelineItem({ entry, index }: { entry: ParcoursEntry; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className="relative pl-10 pb-10 last:pb-0"
    >
      {/* Dot */}
      <span
        className="absolute left-[10px] top-[6px] flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full"
        style={{ background: "#faf5e8" }}
      >
        <span
          className="absolute inline-flex h-4 w-4 rounded-full"
          style={{
            background: accentColor[entry.accent],
            opacity: 0.25,
          }}
        />
        <span
          className="relative inline-flex h-2.5 w-2.5 rounded-full"
          style={{
            background: accentColor[entry.accent],
            boxShadow: `0 0 0 3px #faf5e8, 0 0 0 5px ${accentColor[entry.accent]}33`,
          }}
        />
        {entry.type === "current" && (
          <span
            className="absolute inline-flex h-4 w-4 animate-ping rounded-full"
            style={{ background: accentColor[entry.accent], opacity: 0.45 }}
          />
        )}
      </span>

      <div
        className="rounded-2xl border p-5 backdrop-blur transition-all sm:p-6"
        style={{
          borderColor: "rgba(31,16,6,0.10)",
          background: "rgba(255,255,255,0.70)",
        }}
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className="rounded-full border px-2.5 py-0.5 text-xs font-semibold"
            style={{
              borderColor: accentBorder[entry.accent],
              background: accentBg[entry.accent],
              color: accentColor[entry.accent],
            }}
          >
            {entry.period}
          </span>
          {entry.type === "current" && (
            <span
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: "#8a7868" }}
            >
              ● en cours
            </span>
          )}
        </div>

        <h3
          className="mt-3 text-xl font-bold tracking-tight sm:text-2xl"
          style={{ color: "#1f1006" }}
        >
          {entry.role}
        </h3>
        <p
          className="mt-1 text-sm font-medium"
          style={{ color: accentColor[entry.accent] }}
        >
          {entry.company}
          {entry.location && (
            <span style={{ color: "#8a7868", fontWeight: 400 }}>
              {" · "}
              {entry.location}
            </span>
          )}
        </p>

        <ul className="mt-3 space-y-1.5">
          {entry.highlights.map((h) => (
            <li
              key={h}
              className="flex gap-2 text-sm leading-relaxed"
              style={{ color: "#4a3527" }}
            >
              <span
                aria-hidden
                className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full"
                style={{ background: accentColor[entry.accent] }}
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}

export default function Parcours() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="parcours"
      className="relative mx-auto max-w-4xl px-6 py-32 sm:py-40"
    >
      <div className="mb-16 text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.2em]"
          style={{
            borderColor: "rgba(124,58,237,0.25)",
            background: "rgba(124,58,237,0.07)",
            color: "#6d28d9",
          }}
        >
          Parcours
        </div>
        <h2
          className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ color: "#1f1006" }}
        >
          Du <span className="text-gradient">Verdon</span> à l'IA.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: "#4a3527" }}>
          Six rôles en sept ans, tous tournés autour de la même boussole :
          livrer des produits digitaux qui simplifient la vie de ceux qui les
          utilisent.
        </p>
      </div>

      <div ref={ref} className="relative">
        {/* Static vertical line — background */}
        <div
          aria-hidden
          className="absolute left-[10px] top-2 h-full w-[2px] -translate-x-1/2"
          style={{ background: "rgba(31,16,6,0.10)" }}
        />
        {/* Animated gradient line — fills on scroll */}
        <motion.div
          aria-hidden
          className="absolute left-[10px] top-2 h-full w-[2px] origin-top -translate-x-1/2"
          style={{
            scaleY: lineScale,
            background:
              "linear-gradient(to bottom, #7c3aed 0%, #c026d3 35%, #c2410c 70%, #d97706 100%)",
          }}
        />

        <ol className="relative space-y-0">
          {parcours.map((entry, i) => (
            <TimelineItem key={i} entry={entry} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
