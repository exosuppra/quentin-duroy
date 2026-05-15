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
      "Extension du catalogue de services de l'OT pour les acteurs touristiques",
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
      "Création d'Apidia, plateforme IA d'auto-gestion des données touristiques (9 mois d'avance sur le planning, valeur estimée 50 k€)",
      "Création de 3 agents IA en production : OTO, OTO_Mail, Apidia",
      "Audit IA de 16 personnes, 112 tâches identifiées automatisables, 215 h hebdo de potentiel",
      "Webinaire FROT « Œil de l'expert » (13 nov. 2025) : 130 spectateurs en direct, note 4,8/5, record YouTube FROT",
      "Pilotage de la charte IA, du COPIL et de la feuille de route stratégique 2025-2027",
      "Remplacement de 5 sites Lovable, économies annuelles estimées 7 600 €",
    ],
  },
  {
    period: "Mars 2025 → Juin 2025",
    role: "Création d'OTO, premier Agent IA de l'OT",
    company: "Office de Tourisme du Pays de Manosque",
    location: "Gréoux-les-Bains",
    accent: "ocre",
    highlights: [
      "Premier agent IA en production dans un office de tourisme français",
      "Intervention imprévue au CM on the Beach 2025 : annonce des 80 % de tâches automatisées",
      "Déclencheur du changement de poste vers Référent IA",
    ],
  },
  {
    period: "Avr. 2024 → Juil. 2025",
    role: "Chef de projet Web",
    company: "Office de Tourisme du Pays de Manosque",
    location: "Gréoux-les-Bains · CDI",
    accent: "lavande",
    highlights: [
      "~80 % des tâches automatisées en moins d'un an (~1 925 €/mois économisés)",
      "Pipelines SEO, contenus, data orchestrés sous Make",
      "Refonte de l'écosystème digital de l'OT",
    ],
  },
  {
    period: "Nov. 2022 → Avr. 2024",
    role: "Rédacteur Web · Chargé de Webmarketing",
    company: "Office de Tourisme du Pays de Manosque",
    location: "Gréoux-les-Bains",
    accent: "terracotta",
    highlights: [
      "Administration des sites de la structure, SEO/VSEO, SEA",
      "Social Media Management & Community Management",
      "Premier usage interne de ChatGPT (30 nov. 2022, jour de sortie GPT-3.5)",
    ],
  },
  {
    period: "Sept. 2021 → Sept. 2022",
    role: "Manager en stratégie & développement digital",
    company: "Entre Lavandes et Verdon",
    location: "Gréoux-les-Bains · Alternance",
    accent: "ocre",
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
    accent: "lavande",
    highlights: [
      "Site web vitrine WordPress + animations réseaux sociaux",
      "Coordination des fournisseurs techniques",
      "Veille technologique et économique",
    ],
  },
];
