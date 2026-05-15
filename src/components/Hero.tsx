import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

/**
 * Hero v9.1 — Minimalist editorial (no framer-motion entrance animations).
 * Layout: 3-column grid
 *   • Left  : short pitch + Read More
 *   • Center: gradient circle + side-profile portrait
 *   • Right : huge overlay text "moins / de clic."
 *
 * Note: entrance animations dropped to avoid the motion/react + Astro SSR
 * hydration bug (elements stuck at initial opacity: 0). Effects kept:
 *   - CSS @keyframes aurora on the conic ring (rotates slowly)
 *   - CSS @keyframes fade-up applied via class (purely CSS, no JS)
 */
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const LinkedinSvg: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.337 17.43V10.21H6V17.43h2.337Zm-1.169-8.27a1.354 1.354 0 1 0 .001-2.708 1.354 1.354 0 0 0 0 2.708Zm10.665 8.27v-4.16c0-2.247-1.205-3.292-2.811-3.292-1.297 0-1.878.713-2.202 1.213V10.21h-2.337c.031.661 0 7.22 0 7.22h2.337v-4.035c0-.21.015-.42.077-.57.169-.42.553-.855 1.198-.855.846 0 1.183.645 1.183 1.59v3.87h2.555Z" />
  </svg>
);
const GithubSvg: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M12 .5C5.65.5.5 5.78.5 12.27c0 5.19 3.29 9.59 7.86 11.14.57.11.78-.25.78-.56v-2.16c-3.2.71-3.87-1.39-3.87-1.39-.52-1.36-1.28-1.72-1.28-1.72-1.05-.73.08-.72.08-.72 1.16.08 1.77 1.22 1.77 1.22 1.03 1.81 2.7 1.29 3.36.99.1-.77.4-1.3.72-1.6-2.55-.3-5.24-1.31-5.24-5.81 0-1.28.45-2.33 1.18-3.15-.12-.3-.51-1.5.11-3.13 0 0 .96-.32 3.15 1.2.91-.26 1.89-.39 2.86-.39.97 0 1.96.13 2.87.39 2.19-1.52 3.15-1.2 3.15-1.2.62 1.63.23 2.83.11 3.13.73.82 1.18 1.87 1.18 3.15 0 4.51-2.69 5.5-5.26 5.8.41.36.78 1.07.78 2.17v3.21c0 .32.21.68.79.56C20.21 21.85 23.5 17.46 23.5 12.27 23.5 5.78 18.35.5 12 .5Z" />
  </svg>
);

const navLinks = [
  { label: "À PROPOS", href: "#about" },
  { label: "PARCOURS", href: "#parcours" },
  { label: "PROJETS", href: "#projets" },
  { label: "CONTACT", href: "#contact" },
];
const socialLinks: { icon: IconComponent; href: string; label: string }[] = [
  { icon: LinkedinSvg, href: "https://fr.linkedin.com/in/quentin-duroy", label: "LinkedIn" },
  { icon: GithubSvg, href: "https://github.com/exosuppra", label: "GitHub" },
  { icon: Mail as IconComponent, href: "mailto:quentin.duroy28@gmail.com", label: "Email" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex w-full flex-col items-center justify-between overflow-hidden bg-white p-6 font-sans md:p-12"
      style={{ minHeight: "100svh" }}
    >
      {/* Subtle 80px grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* HEADER */}
      <header className="hero-fade z-30 flex w-full max-w-7xl items-center justify-between">
        <a href="#hero" className="text-xl font-bold tracking-tight text-neutral-900">
          quentin-duroy<span className="text-violet-600">.</span>
        </a>

        <nav className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium tracking-[0.2em] text-neutral-500 transition-colors hover:text-neutral-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full px-4 py-2 text-xs font-medium tracking-wider text-white transition-all hover:-translate-y-0.5 md:inline-block"
          style={{
            background: "linear-gradient(90deg, #7c3aed 0%, #c026d3 50%, #dc2626 100%)",
            boxShadow: "0 8px 20px -8px rgba(124,58,237,0.4)",
          }}
        >
          CONTACT
        </a>
        <button className="flex flex-col space-y-1.5 md:hidden" aria-label="Ouvrir le menu">
          <span className="block h-0.5 w-6 bg-neutral-900" />
          <span className="block h-0.5 w-6 bg-neutral-900" />
          <span className="block h-0.5 w-5 bg-neutral-900" />
        </button>
      </header>

      {/* MAIN GRID */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center gap-8 md:grid-cols-3">
        {/* LEFT — short pitch */}
        <div className="hero-fade hero-fade-1 z-20 order-2 text-center md:order-1 md:text-left">
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-neutral-700 md:mx-0">
            Référent IA &amp; Chef de Projet Web à l'Office de Tourisme du Pays
            de Manosque. Fondateur de LOGIQ IA. J'automatise les workflows pour
            que les équipes se concentrent sur ce qui compte vraiment.
          </p>
          <a
            href="#about"
            className="mt-4 inline-block text-sm font-medium text-neutral-900 underline decoration-from-font underline-offset-4"
          >
            En savoir plus
          </a>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-neutral-500 md:justify-start">
            <div>
              <div className="text-base font-bold text-neutral-900">~80 %</div>
              <div className="tracking-wider">automatisés</div>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div>
              <div className="text-base font-bold text-neutral-900">60+</div>
              <div className="tracking-wider">scénarios make</div>
            </div>
          </div>
        </div>

        {/* CENTER — gradient circle + portrait */}
        <div className="relative order-1 flex h-full items-center justify-center md:order-2">
          {/* Soft glow ring (always-on aurora animation) */}
          <div
            aria-hidden
            className="absolute z-0 h-[320px] w-[320px] rounded-full opacity-50 blur-2xl md:h-[440px] md:w-[440px] lg:h-[540px] lg:w-[540px]"
            style={{
              background:
                "conic-gradient(from 0deg, #7c3aed, #c026d3, #dc2626, #7c3aed)",
              animation: "aurora 18s linear infinite",
            }}
          />
          {/* Main solid gradient circle */}
          <div
            className="hero-fade hero-fade-pop absolute z-0 h-[300px] w-[300px] rounded-full md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
            style={{
              background:
                "linear-gradient(135deg, #7c3aed 0%, #c026d3 50%, #dc2626 100%)",
            }}
          />
          {/* Portrait */}
          <img
            src="/quentin-profile.png"
            alt="Quentin DUROY, profil de côté"
            className="hero-fade hero-fade-up relative z-10 h-auto w-56 scale-[1.45] object-cover md:w-64 lg:w-72"
            style={{ objectPosition: "center bottom" }}
            draggable={false}
          />
        </div>

        {/* RIGHT — huge overlay text */}
        <div className="hero-fade hero-fade-2 z-20 order-3 flex items-center justify-center text-center md:justify-end md:text-right">
          <h1 className="text-6xl font-black leading-none tracking-tighter text-neutral-900 sm:text-7xl md:text-7xl lg:text-8xl xl:text-[9rem]">
            moins
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-red-600 bg-clip-text text-transparent">
              de clic.
            </span>
          </h1>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="hero-fade hero-fade-3 z-30 flex w-full max-w-7xl items-center justify-between">
        <div className="flex items-center space-x-5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-neutral-500 transition-colors hover:text-neutral-900"
            >
              <link.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-neutral-500">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
          Gréoux-les-Bains, Provence
        </div>
      </footer>
    </section>
  );
}
