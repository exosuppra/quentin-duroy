export type ParcoursEntry = {
  period: string;
  role: string;
  company: string;
  location?: string;
  type?: "current" | "past" | "milestone";
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
      "Cabinet d'ingénierie IA & automatisation pour entreprises et acteurs touristiques",
      "Conception et déploiement de produits IA en propre",
      "Accompagnement stratégique IA des dirigeants",
      "Extension du catalogue de services IA de l'OT du Pays de Manosque",
    ],
  },
  {
    period: "Juil. 2025 → aujourd'hui",
    role: "Référent IA & Chef de Projet Web",
    company: "Office de Tourisme et des Congrès du Pays de Manosque",
    location: "Gréoux-les-Bains · CDI · Hybride",
    type: "current",
    accent: "terracotta",
    highlights: [
      "Apidia : plateforme IA & agent conseiller en séjour, qualification automatique de la donnée touristique (6 000 fiches scrapées/jour, valeur marché ~50 k€), livrée septembre 2025",
      "Pilotage stratégique IA, charte d'utilisation, COPIL et feuille de route 2025-2027",
      "3 agents IA en production : OTO, OTO_Mail, Apidia · une soixantaine de tâches métier exécutées",
      "Webinaire FROT « Œil de l'expert » (13 nov. 2025) : 130 spectateurs en direct, 4,8/5, record YouTube FROT",
      "Audit IA de 16 agents OT (accueil, marketing, dev, com) : 112 tâches identifiées, 215 h hebdo automatisables",
      "Remplacement de 5 sites Lovable, économies annuelles estimées 7 600 €",
    ],
  },
  {
    period: "Juil. 2025",
    role: "Lauréat international Concours Make Grid",
    company: "Make.com",
    type: "milestone",
    accent: "ocre",
    highlights: [
      "Vainqueur d'un concours international Make sur l'outil Make Grid",
      "Reconnaissance officielle de Make sur LinkedIn",
      "60+ scénarios actifs supervisés sur un seul tableau de bord",
    ],
  },
  {
    period: "Mars 2025",
    role: "Création d'OTO, premier agent IA sur mesure en OT français",
    company: "Office de Tourisme et des Congrès du Pays de Manosque",
    location: "Gréoux-les-Bains",
    type: "milestone",
    accent: "lavande",
    highlights: [
      "Premier agent IA sur mesure déployé dans un office de tourisme français",
      "Intervention imprévue au CM on the Beach 2025 : annonce des 80 % de tâches CdP web automatisées",
      "Déclencheur du changement de poste vers Référent IA",
    ],
  },
  {
    period: "Avr. 2024 → Juil. 2025",
    role: "Chef de projet Web",
    company: "Office de Tourisme et des Congrès du Pays de Manosque",
    location: "Gréoux-les-Bains · CDI",
    accent: "terracotta",
    highlights: [
      "~80 % des tâches CdP web automatisées en moins d'un an (~1 925 €/mois économisés)",
      "Pipelines SEO, contenus, data orchestrés sous Make et Lovable",
      "Refonte de l'écosystème digital de l'OT",
    ],
  },
  {
    period: "Nov. 2022 → Avr. 2024",
    role: "Rédacteur Web · Chargé de Webmarketing",
    company: "Office de Tourisme et des Congrès du Pays de Manosque",
    location: "Gréoux-les-Bains",
    accent: "ocre",
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
    accent: "lavande",
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
    accent: "terracotta",
    highlights: [
      "Site web vitrine WordPress + animations réseaux sociaux",
      "Coordination des fournisseurs techniques",
      "Veille technologique et économique",
    ],
  },
];
