export type ParcoursEntry = {
  period: string;
  role: string;
  company: string;
  location?: string;
  type?: "current" | "past";
  accent: "lavande" | "terracotta" | "ocre";
  highlights: string[];
};

export const parcours: ParcoursEntry[] = [
  {
    period: "Janv. 2026 → aujourd'hui",
    role: "Fondateur",
    company: "LOGIQ IA",
    location: "Alpes-de-Haute-Provence · Hybride",
    type: "current",
    accent: "lavande",
    highlights: [
      "Cabinet d'ingénierie IA & automatisation pour entreprises",
      "Conception et déploiement de produits IA en propre",
      "Accompagnement stratégique IA des dirigeants",
    ],
  },
  {
    period: "Juil. 2025 → aujourd'hui",
    role: "Référent IA & Chef de Projet Web",
    company: "Office de Tourisme du Pays de Manosque",
    location: "Gréoux-les-Bains · CDI · Hybride",
    type: "current",
    accent: "terracotta",
    highlights: [
      "Pilotage de la stratégie IA et de la charte d'utilisation",
      "Déploiement d'agents IA et de MCP pour les acteurs touristiques",
      "Montée en compétences des équipes et partenaires",
      "Veille technique IA × tourisme",
    ],
  },
  {
    period: "Avr. 2024 → Juil. 2025",
    role: "Chef de projet Web",
    company: "Office de Tourisme du Pays de Manosque",
    location: "Gréoux-les-Bains · CDI",
    accent: "ocre",
    highlights: [
      "~80 % des tâches automatisées en moins d'un an",
      "Pipelines SEO, contenus, data orchestrés sous Make",
      "Refonte de l'écosystème digital de l'OT",
    ],
  },
  {
    period: "Nov. 2022 → Avr. 2024",
    role: "Rédacteur Web · Chargé de Webmarketing",
    company: "Office de Tourisme du Pays de Manosque",
    location: "Gréoux-les-Bains",
    accent: "lavande",
    highlights: [
      "Administration des sites de la structure, SEO/VSEO, SEA",
      "Social Media Management & Community Management",
      "Campagnes d'emailing, automation, reporting mensuel",
    ],
  },
  {
    period: "Sept. 2021 → Sept. 2022",
    role: "Manager en stratégie & développement digital",
    company: "Entre Lavandes et Verdon",
    location: "Gréoux-les-Bains · Alternance",
    accent: "terracotta",
    highlights: [
      "Conception & pilotage d'un site e-commerce dédié aux produits provençaux",
      "Optimisation SEO et campagnes SEA",
      "Gestion de projets digitaux de bout en bout",
    ],
  },
  {
    period: "Juin 2019 → Sept. 2021",
    role: "Chef de Projet Digital & Marketing",
    company: "Entre Lavandes et Verdon",
    location: "Gréoux-les-Bains",
    accent: "ocre",
    highlights: [
      "Site web vitrine WordPress + animations réseaux sociaux",
      "Coordination des fournisseurs techniques",
      "Veille technologique et économique",
    ],
  },
];
