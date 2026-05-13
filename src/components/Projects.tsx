import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { projects, type Project } from "../data/projects";
import { cn } from "../lib/cn";

const accentClass: Record<Project["accent"], string> = {
  violet: "from-violet-600/30 to-violet-900/0",
  rose: "from-rose-600/30 to-rose-900/0",
  fuchsia: "from-fuchsia-600/30 to-fuchsia-900/0",
};
const accentBorder: Record<Project["accent"], string> = {
  violet: "hover:border-violet-500/40",
  rose: "hover:border-rose-500/40",
  fuchsia: "hover:border-fuchsia-500/40",
};
const accentDot: Record<Project["accent"], string> = {
  violet: "bg-violet-500",
  rose: "bg-rose-500",
  fuchsia: "bg-fuchsia-500",
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
      style={{ y }}
      className={cn(
        "group relative col-span-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-rose-950/40 via-violet-950/40 to-black p-8 transition-all md:p-12",
        accentBorder[project.accent],
      )}
    >
      {/* Bloodline-inspired animated red glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1/4 opacity-50"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(225,29,72,0.25) 60deg, transparent 120deg, rgba(124,58,237,0.25) 240deg, transparent 300deg)",
          animation: "aurora 18s linear infinite",
          filter: "blur(40px)",
        }}
      />

      <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
            </span>
            Projet en production
          </div>
          <h3 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">
            {project.title}
          </h3>
          <p className="mb-2 text-lg text-fg-muted">{project.tagline}</p>
          <p className="mb-6 max-w-xl text-base leading-relaxed text-fg-muted">
            {project.description}
          </p>

          <div className="mb-8 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-fg-muted"
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
              className="group/cta inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-600 via-fuchsia-600 to-violet-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-rose-600/30 transition-all hover:-translate-y-0.5 hover:shadow-violet-600/40"
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
            className="block aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-rose-950 via-violet-950 to-black shadow-2xl shadow-rose-900/30 transition-transform hover:scale-[1.02]"
          >
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(225,29,72,0.3) 0%, rgba(124,58,237,0.2) 50%, rgba(0,0,0,0) 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <div className="text-6xl font-bold tracking-tighter text-gradient md:text-7xl">
                  漫画
                </div>
                <div className="text-xs uppercase tracking-[0.3em] text-fg-dim">
                  Manga · AI · 240 pages
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-sm text-white backdrop-blur">
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
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/[0.04]",
        accentBorder[project.accent],
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          accentClass[project.accent],
        )}
      />

      <div className="mb-4 flex items-center gap-2">
        <span
          className={cn(
            "inline-block h-2 w-2 rounded-full",
            accentDot[project.accent],
          )}
        />
        <span className="text-xs uppercase tracking-wider text-fg-dim">
          {project.tagline}
        </span>
      </div>

      <h3 className="mb-3 text-xl font-bold tracking-tight transition-colors group-hover:text-white">
        {project.title}
      </h3>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-fg-muted">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] font-medium text-fg-dim"
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
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-rose-300">
          Projets
        </div>
        <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Quelques projets <span className="text-gradient">phares</span>.
        </h2>
        <p className="mt-4 text-lg text-fg-muted">
          De l'idée au déploiement edge en quelques semaines. Voici une sélection
          de ce sur quoi je travaille en ce moment — dont{" "}
          <a
            href="https://manga-ai.fr"
            target="_blank"
            rel="noopener"
            className="text-rose-400 underline decoration-rose-400/40 underline-offset-4 transition-colors hover:text-rose-300 hover:decoration-rose-400"
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
