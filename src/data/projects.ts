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
    tech: ["Web", "Supabase", "Stripe", "OpenAI", "Gemini", "Claude", "APIs multiples", "Serveur local", "Cloudflare"],
    href: "https://manga-ai.fr",
    hrefLabel: "Visiter manga-ai.fr",
    accent: "rose",
    featured: true,
  },
  {
    slug: "apidia",
    title: "Apidia",
    tagline: "Plateforme IA & conseiller en séjour virtuel",
    description:
      "Plateforme et agent IA chargé de la qualification de donnée touristique au sein de l'OT du Pays de Manosque. Également conseiller en séjour virtuel capable de répondre à la plupart des questions du public. Connecté en direct à une base touristique actualisée par l'IA toutes les 24 h (6 000+ fiches établissements scrapées par jour) et à l'ensemble des ressources de l'office de tourisme : outil incontournable pour les agents d'accueil. En parallèle, outil de travail métier (administratif, suivi RH, planning d'équipe, ordres de mission), planification éditoriale, suivi & analyse des KPI web/réseaux sociaux. Met également à disposition des acteurs touristiques locaux un catalogue de services IA.",
    tech: ["Lovable", "Make", "OpenAI", "Apidae API", "PostgreSQL", "Scraping IA", "MCP"],
    href: "https://apidia.lovable.app/catalogue",
    hrefLabel: "Voir le catalogue de services",
    accent: "violet",
  },
  {
    slug: "oto",
    title: "OTO & OTO_Mail · Agents IA",
    tagline: "Premier agent IA sur mesure en OT français",
    description:
      "Premier agent IA sur mesure déployé dans un office de tourisme français (mars 2025). OTO assiste la communication digitale, marketing et gestion des ordres de mission. Couplé à OTO_Mail (assistant email), ils interviennent dans l'exécution d'une soixantaine de tâches métier au quotidien.",
    tech: ["Make", "ChatGPT Team", "Anthropic", "MCP", "Tool use", "Webhooks"],
    accent: "fuchsia",
  },
  {
    slug: "catalogue-formation",
    title: "Catalogue de formation IA",
    tagline: "Partenariat FROT PACA",
    description:
      "Catalogue de formations IA pour les offices de tourisme et acteurs touristiques de PACA. Webinaire d'ouverture « Œil de l'expert » du 13 nov. 2025 : 130 spectateurs en direct, 4,8/5 de satisfaction, 300+ replays YouTube (record FROT).",
    tech: ["Lovable", "FROT PACA", "Pédagogie", "Anthropic"],
    href: "https://formation-ot-paysdemanosque.lovable.app/",
    hrefLabel: "Voir le catalogue",
    accent: "violet",
  },
  {
    slug: "aegis",
    title: "AEGIS",
    tagline: "Générateur autonome de jeux vidéo IA",
    description:
      "Système qui orchestre plusieurs modèles d'IA (hébergés en local) pour générer game design, sprites, dialogues et code pour Unreal Engine 5 à partir d'une simple idée de jeu. Architecture entièrement souveraine : pas d'API cloud, tout tourne sur ressources locales.",
    tech: ["Unreal Engine 5", "Python", "Modèles locaux", "Stable Diffusion local", "Ollama"],
    accent: "fuchsia",
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
    slug: "ce-site",
    title: "quentin-duroy.fr",
    tagline: "Méta-référence amusante",
    description:
      "Ce site lui-même. Astro statique + Tailwind 4 + Motion + GSAP. Hébergé en edge sur Cloudflare Pages. Quasi 0 framework JS sur les pages, des îlots React pour les animations clés.",
    tech: ["Astro", "Tailwind", "Motion", "TypeScript", "Cloudflare"],
    accent: "rose",
  },
];
