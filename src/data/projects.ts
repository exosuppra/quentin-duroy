export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  href?: string;
  hrefLabel?: string;
  accent: "violet" | "rose" | "fuchsia";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "manga-ai",
    title: "Manga AI",
    tagline: "Générateur de manga par IA",
    description:
      "Application web qui transforme un scénario en manga complet (jusqu'à 240 pages) avec IA. Pipeline multi-modèles, génération d'images cohérentes, export PDF. Trilingue FR/EN/ES.",
    tech: ["React", "Vite", "Supabase", "Stripe", "OpenAI", "Cloudflare"],
    href: "https://manga-ai.fr",
    hrefLabel: "Visiter manga-ai.fr",
    accent: "rose",
    featured: true,
  },
  {
    slug: "traducteur-surimpression",
    title: "Traducteur en surimpression",
    tagline: "OCR + traduction temps réel",
    description:
      "Application desktop qui capture une zone d'écran, détecte le texte (OCR multilingue) et superpose la traduction en direct. Pensée pour les jeux et les médias étrangers.",
    tech: ["Electron", "Tesseract", "DeepL API", "TypeScript"],
    accent: "violet",
  },
  {
    slug: "generateur-jeux-video-ia",
    title: "Générateur de jeux vidéo IA",
    tagline: "Pipeline autonome de création",
    description:
      "Système qui orchestre plusieurs modèles d'IA pour générer game design, sprites, dialogues et code Godot/Unity à partir d'une idée de jeu.",
    tech: ["Python", "Anthropic", "Stable Diffusion", "Godot"],
    accent: "fuchsia",
  },
  {
    slug: "erp-crm",
    title: "ERP & CRM sur-mesure",
    tagline: "Solutions clients secteur retail & services",
    description:
      "Conception et déploiement d'outils internes (gestion stock, suivi commerciaux, pipeline ventes) adaptés aux PME. Intégration aux outils existants (Microsoft 365, Make).",
    tech: ["Next.js", "PostgreSQL", "Make", "Microsoft Graph"],
    accent: "violet",
  },
  {
    slug: "formations-ia",
    title: "Formations IA",
    tagline: "En partenariat avec SUPDEWEB",
    description:
      "Modules de formation destinés aux étudiants et professionnels sur l'intégration concrète de l'IA dans les workflows : prompt engineering, API, agents, automatisation.",
    tech: ["Pédagogie", "Anthropic", "OpenAI", "n8n", "Make"],
    accent: "rose",
  },
  {
    slug: "ce-site",
    title: "quentin-duroy.fr",
    tagline: "Méta-référence amusante",
    description:
      "Ce site lui-même. Astro statique + Tailwind 4 + motion design rouge/violet. Hébergé en edge sur Cloudflare Pages. 0 framework JS sur les pages, des îlots React pour les animations clés.",
    tech: ["Astro", "Tailwind", "Motion", "Cloudflare Pages"],
    accent: "fuchsia",
  },
];
