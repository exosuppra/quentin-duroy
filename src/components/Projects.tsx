import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  Code2,
  Compass,
  Gamepad2,
  Ghost,
  GraduationCap,
  Languages,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  projects,
  type Project,
  type ProjectIcon,
} from "../data/projects";

const iconMap: Record<ProjectIcon, LucideIcon> = {
  compass: Compass,
  bot: Bot,
  "graduation-cap": GraduationCap,
  gamepad: Gamepad2,
  ghost: Ghost,
  languages: Languages,
  code: Code2,
};

// Soft tinted wash for the card cover, per accent.
const accentCover: Record<Project["accent"], string> = {
  violet: "linear-gradient(135deg, #ede9fe 0%, #f5f3ff 55%, #ffffff 100%)",
  rose: "linear-gradient(135deg, #fee2e2 0%, #fef2f2 55%, #ffffff 100%)",
  fuchsia: "linear-gradient(135deg, #fae8ff 0%, #fdf4ff 55%, #ffffff 100%)",
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

function ProjectCover({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const Icon = project.icon ? iconMap[project.icon] : null;
  const dot = accentDot[project.accent];

  return (
    <div className={`relative shrink-0 overflow-hidden ${className ?? ""}`}>
      {project.image ? (
        <>
          <img
            src={project.image}
            alt={project.imageAlt ?? project.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(135deg, ${dot}26 0%, rgba(255,255,255,0) 55%)`,
            }}
          />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{ background: accentCover[project.accent] }}
          />
          {/* dotted texture */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: `radial-gradient(${dot}33 1px, transparent 1px)`,
              backgroundSize: "14px 14px",
              maskImage:
                "radial-gradient(ellipse at 72% 40%, black 0%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 72% 40%, black 0%, transparent 75%)",
            }}
          />
          {/* large faint watermark icon */}
          {Icon && (
            <Icon
              aria-hidden
              className="absolute -bottom-6 -right-5 h-36 w-36 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
              style={{ color: dot, opacity: 0.14 }}
              strokeWidth={1.25}
            />
          )}
        </>
      )}

      {/* solid icon badge */}
      {Icon && (
        <div
          className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ background: dot, boxShadow: `0 8px 18px -6px ${dot}80` }}
        >
          <Icon className="h-5 w-5" style={{ color: "#ffffff" }} strokeWidth={2} />
        </div>
      )}

      {/* category chip */}
      <span
        className="absolute bottom-4 left-5 inline-flex max-w-[82%] items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur"
        style={{
          borderColor: `${dot}40`,
          background: "rgba(255,255,255,0.82)",
          color: dot,
        }}
      >
        <span className="truncate">{project.tagline}</span>
      </span>
    </div>
  );
}

function StandardCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const dot = accentDot[project.accent];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border outline-none transition-all hover:-translate-y-1 focus-visible:ring-2"
      style={{
        borderColor: "#e5e5e5",
        background: "#ffffff",
        boxShadow:
          "0 4px 12px -6px rgba(0,0,0,0.06), 0 2px 4px -2px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentBorder[project.accent];
        e.currentTarget.style.boxShadow =
          "0 18px 40px -18px rgba(124,58,237,0.22), 0 6px 16px -6px rgba(220,38,38,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e5e5e5";
        e.currentTarget.style.boxShadow =
          "0 4px 12px -6px rgba(0,0,0,0.06), 0 2px 4px -2px rgba(0,0,0,0.04)";
      }}
    >
      <ProjectCover project={project} className="h-28" />

      {/* open indicator (on hover) */}
      <span
        aria-hidden
        className="absolute right-4 top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100"
        style={{ background: "rgba(255,255,255,0.9)", color: dot }}
      >
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
      </span>

      {/* BODY */}
      <div className="flex flex-1 flex-col p-6">
        <h3
          className="text-lg font-bold tracking-tight"
          style={{ color: "#0a0a0a" }}
        >
          {project.title}
        </h3>
        <p
          className="mt-2 line-clamp-3 text-sm leading-relaxed"
          style={{ color: "#404040" }}
        >
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
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
          {project.tech.length > 4 && (
            <span
              className="px-1 py-0.5 text-[11px] font-semibold"
              style={{ color: dot }}
            >
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dot = accentDot[project.accent];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10,10,10,0.55)", backdropFilter: "blur(4px)" }}
      />

      {/* panel */}
      <motion.div
        className="group relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border bg-white shadow-2xl"
        style={{ borderColor: "#e5e5e5" }}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border bg-white/90 text-neutral-600 backdrop-blur transition-colors hover:text-neutral-900"
          style={{ borderColor: "#e5e5e5" }}
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <ProjectCover project={project} className="h-44" />

        <div className="flex flex-col gap-4 overflow-y-auto p-7 sm:p-8">
          <div>
            <h3
              className="text-2xl font-bold tracking-tight"
              style={{ color: "#0a0a0a" }}
            >
              {project.title}
            </h3>
            <p className="mt-1 text-base font-medium" style={{ color: dot }}>
              {project.tagline}
            </p>
          </div>

          <p className="text-[15px] leading-relaxed" style={{ color: "#404040" }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border px-2 py-0.5 text-xs font-medium"
                style={{
                  borderColor: "#e5e5e5",
                  background: "#fafafa",
                  color: "#525252",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {project.href && (
            <div className="pt-1">
              <a
                href={project.href}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(90deg, #7c3aed 0%, #c026d3 50%, #dc2626 100%)",
                  boxShadow: "0 12px 30px -12px rgba(220,38,38,0.40)",
                }}
              >
                {project.hrefLabel ?? "Voir le projet"}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const [active, setActive] = useState<Project | null>(null);

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
          <StandardCard
            key={p.slug}
            project={p}
            index={i}
            onOpen={() => setActive(p)}
          />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <ProjectModal
            key={active.slug}
            project={active}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
