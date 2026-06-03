import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { projects, type Project } from "../data/projects";

const accentGradient: Record<Project["accent"], string> = {
  violet:
    "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(124,58,237,0) 80%)",
  rose:
    "linear-gradient(135deg, rgba(220,38,38,0.12) 0%, rgba(220,38,38,0) 80%)",
  fuchsia:
    "linear-gradient(135deg, rgba(192,38,211,0.12) 0%, rgba(192,38,211,0) 80%)",
};
const accentDot: Record<Project["accent"], string> = {
  violet: "#7c3aed",
  rose: "#dc2626",
  fuchsia: "#c026d3",
};
const accentBorder: Record<Project["accent"], string> = {
  violet: "rgba(124,58,237,0.40)",
  rose: "rgba(220,38,38,0.40)",
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
          "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
        borderColor: "#e5e5e5",
        boxShadow:
          "0 20px 50px -20px rgba(124,58,237,0.15), 0 10px 30px -10px rgba(220,38,38,0.10)",
      }}
      className="group relative col-span-full overflow-hidden rounded-3xl border p-8 transition-all md:p-12"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentBorder[project.accent];
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e5e5e5";
      }}
    >
      {/* Soft animated halo : lavande -> terracotta -> ocre */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1/4 opacity-30"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(124,58,237,0.22) 60deg, transparent 120deg, rgba(220,38,38,0.22) 240deg, rgba(192,38,211,0.16) 300deg, transparent 360deg)",
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
              color: "#b91c1c",
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: "#ef4444" }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ background: "#dc2626" }}
              />
            </span>
            Projet en production
          </div>
          <h3
            className="mb-3 text-4xl font-bold tracking-tight md:text-5xl"
            style={{ color: "#0a0a0a" }}
          >
            {project.title}
          </h3>
          <p className="mb-2 text-lg" style={{ color: "#404040" }}>
            {project.tagline}
          </p>
          <p
            className="mb-6 max-w-xl text-base leading-relaxed"
            style={{ color: "#404040" }}
          >
            {project.description}
          </p>

          <div className="mb-8 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border px-2.5 py-1 text-xs font-medium"
                style={{
                  borderColor: "#e5e5e5",
                  background: "#ffffff",
                  color: "#404040",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener"
                className="group/cta inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(90deg, #7c3aed 0%, #c026d3 50%, #dc2626 100%)",
                  boxShadow: "0 12px 30px -10px rgba(220,38,38,0.40)",
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
            {project.slug === "manga-ai" && (
              <a
                href="/projets/manga-ai/"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
                style={{
                  borderColor: "#d4d4d4",
                  color: "#0a0a0a",
                  background: "#ffffff",
                }}
              >
                Lire la fiche projet
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className="h-3.5 w-3.5">
                  <path d="M6 3l5 5-5 5V3z" />
                </svg>
              </a>
            )}
          </div>
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
              borderColor: "#e5e5e5",
              background:
                "linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #ffffff 100%)",
              boxShadow: "0 25px 50px -15px rgba(124,58,237,0.20)",
            }}
          >
            <div className="relative h-full w-full">
              {/* Manga AI hero background */}
              <picture>
                <source srcSet="/manga-ai-hero.webp" type="image/webp" />
                <img
                  src="/manga-ai-hero.webp"
                  alt="Manga AI, générateur de manga par IA"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </picture>
              {/* Tint overlay for color harmony */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(220,38,38,0.10) 0%, rgba(124,58,237,0.10) 100%)",
                }}
              />
              {/* Bottom badges: domain + tagline */}
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                <div
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium backdrop-blur"
                  style={{
                    borderColor: "rgba(255,255,255,0.30)",
                    background: "rgba(0,0,0,0.55)",
                    color: "#ffffff",
                  }}
                >
                  <img
                    src="/manga-ai-logo.png"
                    alt=""
                    width={20}
                    height={20}
                    loading="lazy"
                    className="h-5 w-5 rounded"
                  />
                  <span>manga-ai.fr</span>
                  <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                    <path d="M5.5 3a.5.5 0 010-1h7a.5.5 0 01.5.5v7a.5.5 0 01-1 0V3.707l-8.146 8.147a.5.5 0 01-.708-.708L11.293 3H5.5z" />
                  </svg>
                </div>
                <div
                  className="rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur"
                  style={{
                    borderColor: "rgba(255,255,255,0.30)",
                    background: "rgba(0,0,0,0.55)",
                    color: "#fed7aa",
                  }}
                >
                  240 pages · trilingue
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
        borderColor: "#e5e5e5",
        background: "#ffffff",
        boxShadow:
          "0 4px 12px -6px rgba(0,0,0,0.06), 0 2px 4px -2px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentBorder[project.accent];
        e.currentTarget.style.background = "#fafafa";
        e.currentTarget.style.boxShadow =
          "0 14px 35px -15px rgba(124,58,237,0.18), 0 4px 12px -4px rgba(220,38,38,0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e5e5e5";
        e.currentTarget.style.background = "#ffffff";
        e.currentTarget.style.boxShadow =
          "0 4px 12px -6px rgba(0,0,0,0.06), 0 2px 4px -2px rgba(0,0,0,0.04)";
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
        <span className="text-xs uppercase tracking-wider" style={{ color: "#737373" }}>
          {project.tagline}
        </span>
      </div>

      <h3
        className="mb-3 text-xl font-bold tracking-tight"
        style={{ color: "#0a0a0a" }}
      >
        {project.title}
      </h3>

      <p className="mb-5 flex-1 text-sm leading-relaxed" style={{ color: "#404040" }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-md border px-2 py-0.5 text-[11px] font-medium"
            style={{
              borderColor: "#e5e5e5",
              background: "#fafafa",
              color: "#737373",
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
            borderColor: "rgba(220,38,38,0.28)",
            background: "rgba(220,38,38,0.05)",
            color: "#b91c1c",
          }}
        >
          Projets
        </div>
        <h2
          className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ color: "#0a0a0a" }}
        >
          Quelques projets <span className="text-gradient">phares</span>.
        </h2>
        <p className="mt-4 text-lg" style={{ color: "#404040" }}>
          De l'idée au déploiement edge en quelques semaines. Voici une
          sélection de ce sur quoi je travaille en ce moment, dont{" "}
          <a
            href="https://manga-ai.fr"
            target="_blank"
            rel="noopener"
            style={{ color: "#dc2626" }}
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
