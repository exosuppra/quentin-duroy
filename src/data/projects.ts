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
    slug: "apidia",
    title: "Apidia",
    tagline: "Plateforme IA d'auto-gestion des données touristiques",
    description:
      "Plateforme IA livrée à l'Office de Tourisme de Manosque qui copie, enrichit et resynchronise les fiches Apidae automatiquement. Automatisation de 120 modules Make. Livrée le 14 janvier 2026, soit 9 mois d'avance sur le planning. Valeur marché estimée : 50 000 €.",
    tech: ["Make", "Lovable", "OpenAI", "Apidae API", "Postgres"],
    accent: "violet",
  },
  {
    slug: "oto",
    title: "OTO · Agent IA",
    tagline: "Premier agent IA en OT français",
    description:
      "Premier agent IA déployé dans un office de tourisme français (mars 2025). OTO assiste la communication digitale et marketing, gère les ordres de mission via Make et orchestre les pipelines internes. Suivi de OTO_Mail (assistant email).",
    tech: ["Make", "ChatGPT Team", "Anthropic", "Webhooks"],
    accent: "fuchsia",
  },
  {
    slug: "catalogue-formation",
    title: "Catalogue de formation IA",
    tagline: "Construit en partenariat avec la FROT PACA",
    description:
      "Catalogue de formations IA pour les offices de tourisme et acteurs touristiques de PACA. Webinaire d'ouverture « Œil de l'expert » du 13 nov. 2025 : 130 spectateurs en direct, 4,8/5 de satisfaction, plus de 300 replays YouTube (record FROT).",
    tech: ["Lovable", "FROT PACA", "Format pédagogique"],
    href: "https://formation-ot-paysdemanosque.lovable.app/",
    hrefLabel: "Voir le catalogue",
    accent: "violet",
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
    slug: "ce-site",
    title: "quentin-duroy.fr",
    tagline: "Méta-référence amusante",
    description:
      "Ce site lui-même. Astro statique + Tailwind 4 + Motion + Paper Shaders. Hébergé en edge sur Cloudflare Pages. Quasi 0 framework JS sur les pages, des îlots React pour les animations clés.",
    tech: ["Astro", "Tailwind", "Motion", "Paper Shaders", "Cloudflare"],
    accent: "rose",
  },
];
