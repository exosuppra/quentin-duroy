# Onboarding — quentin-duroy.fr

> Read this first. Saves 30 minutes of re-asking the user.

## Who is Quentin

- **Quentin DUROY**, Référent IA & Chef de Projet Web
- **Employer**: Office de Tourisme et des Congrès du Pays de Manosque (full name — _not_ just "Pays de Manosque"). CDI, hybride.
- **Location**: Gréoux-les-Bains, Alpes-de-Haute-Provence (04800), PACA.
  - LinkedIn shows "Saint-Martin-de-Brômes" (residence); the site uses **Gréoux-les-Bains** (work). User correction.
- **Founder of**: LOGIQ IA (freelance company, janv. 2026).
- **LinkedIn**: <https://fr.linkedin.com/in/quentin-duroy>
- **GitHub org**: `exosuppra`
- **Email**: `quentin.duroy28@gmail.com`
- **Domain**: `quentin-duroy.fr` (registered on OVH, not yet deployed to Cloudflare)

## Identity & positioning

- **Tagline catchphrase**: « Moins de clic, plus de café » (title of his FROT webinar). The hero displays "moins / de clic." in huge type.
- **Languages**: FR natif, EN A2, ES A1. **Do not call him "trilingue"** — user corrected this.
- Pionnier IA en office de tourisme (first AI agent in a French OT).

## Key projects (as appearing on the site)

| Project | Status | Notes |
| --- | --- | --- |
| **Manga AI** (manga-ai.fr) | In production | Featured project. Generator up to 240 pages, FR/EN/ES. Tech: Web (not React/Vite specifically) + Supabase + Stripe + OpenAI + Gemini + Claude + APIs multiples + Serveur local + Cloudflare. |
| **Apidia** | In production at OT | Lovable platform + agent IA for tourism data qualification. Scrapes 6 000+ fiches/day. Also a virtual stay advisor. Worth 50 k€ market value. URL: <https://apidia.lovable.app/catalogue> |
| **OTO + OTO_Mail** | In production at OT | First custom AI agents in a French OT (mars 2025). Run ~60 metier tasks daily. Tags include MCP, Tool use. |
| **Catalogue de formation IA** | Live | FROT PACA partnership. URL: <https://formation-ot-paysdemanosque.lovable.app/> |
| **AEGIS** (NOT "GENESIS") | In dev | Autonomous AI game generator, Unreal Engine 5 + local models only. User-corrected name. |
| **Traducteur en surimpression** | Side project | OCR + DeepL desktop app. |
| **quentin-duroy.fr** | This site | Astro + Tailwind. |

## Awards / recognitions

1. **🏆 Lauréat international concours Make Grid** (juillet 2025) — must be prominent.
2. **🇫🇷 Lovable National Treasure** (top 1 % France creators) — show the 2 images `lovable-big-deal.png/webp` + `lovable-national-treasure.png/webp` (saved in `public/`).
3. **🎙️ Webinaire FROT « Œil de l'expert »** (13 nov. 2025) — 130 spectateurs en direct, 4,8/5, record YouTube FROT. Replay embedded: <https://www.youtube.com/embed/ntirnVcj9ko>. _Note explicitly: since Nov 2025, lots of evolutions; replay is an entry point but the field has advanced a lot._

## 19 certifications (real list, with IDs)

- **14 Anthropic** (avr-mai 2026): Claude 101, Claude Code 101, Claude Code in Action, Introduction to Claude Cowork, AI Fluency Framework & Foundations, Building with the Claude API, Introduction to Model Context Protocol, AI Fluency for Educators/Students/Nonprofits/Small Businesses, Teaching AI Fluency, AI Capabilities and Limitations, Claude with Google Vertex AI. (IDs in `Certifications.astro`.)
- **4 Make Academy** (nov. 2025) — full curriculum: Foundation, Basics, Intermediate, Advanced
- **1 Lovable Vibe Coding L5 Diamond** (mars 2026)

## Diplomas (no GPA, user request)

- Master 360° Digital, Computer Science — SUPDEWEB (2020–2022)
- Licence Gestion de Projet Digital — Aix-Marseille Université (2019–2020) — _do not show the 15,87 average._
- BTS Assistant de Gestion — Institution Notre Dame de Chartres (2017–2019)
- Baccalauréat STMG, spécialisation RH — Institution Notre Dame de Chartres (2015–2017)

## Key numbers (statistics)

- ~80 % of his **chef de projet web** tasks at the OT automated or assisted by AI
- **215 h hebdo** of automatable work identified from audit of 16 OT agents (pôles accueil, marketing, dev, com)
- **130 spectateurs** live on FROT webinar, **4,8/5** satisfaction, record YouTube FROT
- ~6 000 fiches Apidae scraped per day via Apidia

## Tech stack (frozen unless reason)

- **Astro 6** static site, output to `dist/`
- **Tailwind CSS v4** (via `@tailwindcss/vite`, _not_ tailwind.config.js — uses `@theme` block in `src/styles/global.css`)
- **React 19** (islands only, via `@astrojs/react`)
- **motion** (`motion/react`, ex-framer-motion) — _but_ entrance animations were stripped because of an SSR hydration bug. Use **CSS `@keyframes`** instead (`hero-fade-up`, `hero-fade-pop`, `aurora`). See `src/styles/global.css`.
- **lucide-react** for icons. **Linkedin and Github icons were removed** from the library — inline SVGs in `Hero.tsx`. Don't try to re-import them.
- **@paper-design/shaders-react** — installed but currently unused (was for previous hero versions)
- **three** + **gsap** — installed but unused (cosmic hero v8 was dropped). Could be removed but harmless for now.
- **@fontsource-variable/inter** — Inter Variable self-hosted
- **@astrojs/sitemap** — sitemap auto-generated at build
- **Hosting target**: Cloudflare Pages (account ID `5f14604285901a1249c12e1f5b47c4f7`). **Not deployed yet** — domain on OVH.

## Palette (strict — user feedback)

User explicitly rejected: warm Provence tones (terracotta, ocre, sunset). User wants **red / violet / gray / white / black ONLY**.

```
bg:         #ffffff
surface-2:  #f5f5f5
fg:         #0a0a0a   (text primary, near-black)
fg-muted:   #404040   (text secondary)
fg-dim:     #737373   (text tertiary, captions)
border:     #e5e5e5
violet-600: #7c3aed   (primary accent)
fuchsia-600:#c026d3   (midpoint for gradients only)
red-600:    #dc2626   (secondary accent)
```

Gradients are always **violet → fuchsia → red** (3 stops).

## Hero (current state — v11)

`src/components/Hero.tsx`

- **Minimalist editorial** layout inspired by 21st.dev `lovesickfromthe6ix/horizon-hero-section` (the cosmic version was dropped — user disliked).
- 3-col grid: pitch left, portrait+gradient circle center, big "moins / de clic." right.
- Portrait is `public/quentin-profile.png` (+ `.webp` 70 KB). **It is mirrored** (looks left). Bottom-anchored, touches bottom of section.
- Gradient circle behind head, conic-gradient halo blurred ring rotating 18s.
- In-hero header (logo + nav + CONTACT button) — the global `Header.astro` is hidden on hero and slides down after scroll > 70vh.
- Footer in-hero: LinkedIn + GitHub + Mail icons + "Gréoux-les-Bains, Provence" with a red dot.

## Site structure

```
src/
├── layouts/Layout.astro          ← <head>, schema.org, SEO (very rich)
├── pages/
│   ├── index.astro               ← Hero → About → Parcours → Skills → Certifications → Projects → Contact
│   └── mentions-legales.astro
├── components/
│   ├── Header.astro              ← sticky, hidden on hero
│   ├── Hero.tsx                  ← React island, client:load
│   ├── About.astro
│   ├── Parcours.tsx              ← React island, scroll-driven timeline
│   ├── Skills.astro
│   ├── Certifications.astro      ← 3 zones: 3 reconnaissances, replay YT, 16 certifs, diplomas
│   ├── Projects.tsx              ← React island, featured Manga AI
│   ├── Contact.astro
│   ├── Footer.astro
│   └── AuroraBackground.tsx      ← unused (legacy)
├── data/
│   ├── parcours.ts               ← timeline entries (7 roles)
│   └── projects.ts               ← 7 projects (Manga AI featured)
├── lib/cn.ts                     ← clsx + tailwind-merge helper
└── styles/global.css             ← @theme palette + @keyframes
```

## User preferences (rules learned)

1. **No em-dashes (`—`)** anywhere — "looks too AI-generated". Use `,` `:` `.` or `·`.
2. **No warm Provence colors** — strict red/violet/gray/white/black palette.
3. **Use real data** from LinkedIn + the OT strategic doc, not generic placeholders.
4. **No GPA on the Licence**.
5. **Don't say "trilingue"** — he's FR natif + bases EN/ES.
6. **Mention OT _et des Congrès_ du Pays de Manosque** — full name everywhere.
7. **AEGIS not GENESIS** — corrected project name.
8. **80 % is _tâches de chef de projet web_** automatisées/assistées, not "all tasks".
9. **September 2025 for Apidia delivery** (not January 2026 — earlier doc said Jan but user clarified Sept).
10. The user **doesn't always project well from descriptions** — better to ship and iterate visually than ask many questions.

## SEO strategy (active)

- Title keywords ciblé: "Référent IA Office de Tourisme Pays de Manosque", "Expert IA Gréoux-les-Bains", "Alpes-de-Haute-Provence"
- Goal: out-rank the OT itself on Manosque + IA queries.
- Schema.org: `Person` + `ProfessionalService` (LOGIQ IA) with `address`, `areaServed`, `knowsAbout` (25+ keywords), `hasCredential`, `award`.
- `geo.region=FR-04`, `geo.position=43.7567;5.8842`, `geo.placename=Gréoux-les-Bains`.
- OG image: `/og-image.png` 1200×630, generated via PIL.

## What's NOT done yet

- [ ] **Cloudflare Pages deployment** — domain on OVH, needs CNAME or DNS transfer.
- [ ] **LOGIQ IA site** (`logiq-ia.fr`) — the second site from the original brief, not started. Domain to be bought on Cloudflare Registrar.
- [ ] **Better Manga AI image** — currently using `manga-ai-hero.webp` scraped from manga-ai.fr. User would prefer something more curated.
- [ ] **Make Grid contest screenshot** — user wants to highlight this. Not yet provided.
- [ ] **Bio photo for About** — possibly a 3/4 shot. Currently we use the side profile in Hero only.
- [ ] **Make Foundation diploma view link** — if Make Academy provides one.
- [ ] **Mobile QA** — Lighthouse mobile audit. Three.js + GSAP are still installed (heavy) but unused.

## How to launch dev

```bash
cd "C:\\Users\\Quentin\\Projects\\quentin-duroy"
npm install      # if fresh clone
npm run dev      # http://localhost:4321
npm run build    # static output to dist/
```

The dev server crashes occasionally (likely OneDrive sync interference if path goes through OneDrive; this project lives **outside** OneDrive at `C:\Users\Quentin\Projects\`). If it dies, just relaunch.

## How to talk to the user

- **French**. Tutoiement.
- Direct, concise. He gives feedback in bursts of multiple points; address each one.
- Show, don't tell — ship the change, then explain.
- He validates visually, not by description.
- When he sends an image without text, he's usually showing you something he wants you to use or fix.
- **Always commit + push** after meaningful changes. `gh` is auth'd as `exosuppra`.

---

_Last update_: v11 — 16 real certifications, YouTube webinar embed, Lovable cards, Manga AI hero image, AEGIS rename. Site is light-mode, white bg, violet→red gradient accents, side-profile portrait flipped to look left, anchored at bottom of hero section.
