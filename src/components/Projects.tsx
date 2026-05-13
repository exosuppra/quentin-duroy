import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { projects, type Project } from "../data/projects";

const accentGradient: Record<Project["accent"], string> = {
  violet:
    "linear-gradient(135deg, rgba(124,58,237,0.14) 0%, rgba(124,58,237,0) 80%)",
  rose:
    "linear-gradient(135deg, rgba(194,65,12,0.16) 0%, rgba(217,119,6,0.10) 60%, transparent 100%)",
  fuchsia:
    "linear-gradient(135deg, rgba(192,38,211,0.14) 0%, rgba(192,38,211,0) 80%)",
};
const accentDot: Record<Project["accent"], string> = {
  violet: "#7c3aed",
  rose: "#f97316",
  fuchsia: "#c026d3",
};
const accentBorder: Record<Project["accent"], string> = {
  violet: "rgba(124,58,237,0.40)",
  rose: "rgba(194,65,12,0.42)",
  fuchsia: "rgba(192,38,211,0.40)",
};

function FeaturedCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.article
      ref={ref}
      style={{
        y,
        background:
          "linear-gradient(135deg, rgba(255,250,240,0.95) 0%, rgba(245,234,210,0.90) 100%)",
        borderColor: "rgba(31,16,6,0.10)",
        boxShadow:
          "0 20px 50px -20px rgba(124,58,237,0.15), 0 10px 30px -10px rgba(194,65,12,0.10)",
      }}
      className="group relative col-span-full overflow-hidden rounded-3xl border p-8 transition-all md:p-12"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentBorder[project.accent];
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(31,16,6,0.10)";
      }}
    >
      {/* Soft animated halo : lavande -> terracotta -> ocre */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1/4 opacity-30"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(124,58,237,0.25) 60deg, transparent 120deg, rgba(194,65,12,0.25) 240deg, rgba(217,119,6,0.18) 300deg, transparent 360deg)",
          animation: "aurora 18s linear infinite",
          filter: "blur(50px)",
        }}
      />

      <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
        <div>
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{
              borderColor: "rgba(194,65,12,0.35)",
              background: "rgba(194,65,12,0.10)",
              color: "#9a3412",
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: "#fb923c" }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ background: "#f97316" }}
              />
            </span>
            Projet en production
          </div>
          <h3
            className="mb-3 text-4xl font-bold tracking-tight md:text-5xl"
            style={{ color: "#1f1006" }}
          >
            {project.title}
          </h3>
          <p className="mb-2 text-lg" style={{ color: "#4a3527" }}>
            {project.tagline}
          </p>
          <p
            className="mb-6 max-w-xl text-base leading-relaxed"
            style={{ color: "#4a3527" }}
          >
            {project.description}
          </p>

          <div className="mb-8 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border px-2.5 py-1 text-xs font-medium"
                style={{
                  borderColor: "rgba(31,16,6,0.12)",
                  background: "rgba(255,255,255,0.6)",
                  color: "#4a3527",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener"
              className="group/cta inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(90deg, #7c3aed 0%, #c026d3 35%, #c2410c 70%, #d97706 100%)",
                boxShadow: "0 12px 30px -10px rgba(194,65,12,0.45)",
              }}
            >
              {project.hrefLabel ?? "Voir le projet"}
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden
                className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5"
              >
                <path d="M6 3l5 5-5 5V3z" />
              </svg>
            </a>
          )}
        </div>

        {/* Right side: animated visual */}
        <div className="relative">
          <a
            href={project.href}
            target="_blank"
            rel="noopener"
            aria-label="Visiter Manga AI"
            className="block aspect-[4/3] overflow-hidden rounded-2xl border shadow-2xl transition-transform hover:scale-[1.02]"
            style={{
              borderColor: "rgba(31,16,6,0.10)",
              background:
                "linear-gradient(135deg, #ede0c0 0%, #f5ead2 50%, #fffaf0 100%)",
              boxShadow: "0 25px 50px -15px rgba(124,58,237,0.20)",
            }}
          >
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(194,65,12,0.22) 0%, rgba(124,58,237,0.16) 50%, rgba(217,119,6,0.10) 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <div className="text-6xl font-bold tracking-tighter text-gradient md:text-7xl">
                  漫画
                </div>
                <div
                  className="text-xs uppercase tracking-[0.3em]"
                  style={{ color: "#8a7868" }}
                >
                  Manga · AI · 240 pages
                </div>
                <div
                  className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm backdrop-blur"
                  style={{
                    borderColor: "rgba(31,16,6,0.18)",
                    background: "rgba(255,255,255,0.78)",
                    color: "#1f1006",
                  }}
                >
                  <span>manga-ai.fr</span>
                  <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                    <path d="M5.5 3a.5.5 0 010-1h7a.5.5 0 01.5.5v7a.5.5 0 01-1 0V3.707l-8.146 8.147a.5.5 0 01-.708-.708L11.293 3H5.5z" />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function StandardCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border p-6 backdrop-blur transition-all hover:-translate-y-1"
      style={{
        borderColor: "rgba(31,16,6,0.10)",
        background: "rgba(255,255,255,0.65)",
        boxShadow:
          "0 6px 20px -10px rgba(31,16,6,0.10), 0 2px 6px -2px rgba(31,16,6,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentBorder[project.accent];
        e.currentTarget.style.background = "rgba(255,255,255,0.85)";
        e.currentTarget.style.boxShadow =
          "0 14px 35px -15px rgba(124,58,237,0.20), 0 4px 12px -4px rgba(31,16,6,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(31,16,6,0.10)";
        e.currentTarget.style.background = "rgba(255,255,255,0.65)";
        e.currentTarget.style.boxShadow =
          "0 6px 20px -10px rgba(31,16,6,0.10), 0 2px 6px -2px rgba(31,16,6,0.06)";
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: accentGradient[project.accent] }}
      />

      <div className="mb-4 flex items-center gap-2">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ background: accentDot[project.accent] }}
        />
        <span className="text-xs uppercase tracking-wider" style={{ color: "#8a7868" }}>
          {project.tagline}
        </span>
      </div>

      <h3
        className="mb-3 text-xl font-bold tracking-tight"
        style={{ color: "#1f1006" }}
      >
        {project.title}
      </h3>

      <p className="mb-5 flex-1 text-sm leading-relaxed" style={{ color: "#4a3527" }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-md border px-2 py-0.5 text-[11px] font-medium"
            style={{
              borderColor: "rgba(31,16,6,0.12)",
              background: "rgba(255,255,255,0.7)",
              color: "#8a7868",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section
      id="projets"
      className="relative mx-auto max-w-6xl px-6 py-32 sm:py-40"
    >
      <div className="mb-16 max-w-2xl">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.2em]"
          style={{
            borderColor: "rgba(194,65,12,0.28)",
            background: "rgba(194,65,12,0.07)",
            color: "#9a3412",
          }}
        >
          Projets
        </div>
        <h2
          className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ color: "#1f1006" }}
        >
          Quelques projets <span className="text-gradient">phares</span>.
        </h2>
        <p className="mt-4 text-lg" style={{ color: "#4a3527" }}>
          De l'idée au déploiement edge en quelques semaines. Voici une
          sélection de ce sur quoi je travaille en ce moment — dont{" "}
          <a
            href="https://manga-ai.fr"
            target="_blank"
            rel="noopener"
            style={{ color: "#c2410c" }}
            className="font-medium underline underline-offset-4 transition-colors hover:opacity-80"
          >
            Manga AI
          </a>
          , un générateur de manga par intelligence artificielle.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured && <FeaturedCard project={featured} />}
        {others.map((p, i) => (
          <StandardCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
