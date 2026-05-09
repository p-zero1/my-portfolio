# Portfolio — Visual Guide for Making Changes

Every section of this portfolio lives in a dedicated file. Find the section you want to change below, then go directly to that file.

---

## Page Overview

The full page is one long scroll through **7 sections** in this exact order:

```
┌─────────────────────────────────────────┐
│  01 · BOOT SEQUENCE  (hero / entry)     │  ← visitor lands here
├─────────────────────────────────────────┤
│  02 · CORE PRESENCE  (who I am)         │
├─────────────────────────────────────────┤
│  03 · PHILOSOPHY FIELD  (mindset)       │
├─────────────────────────────────────────┤
│  04 · ARCHITECTURE VIEW  (experience)   │
├─────────────────────────────────────────┤
│  05 · TERMINAL EXPLORER  (projects)     │
├─────────────────────────────────────────┤
│  06 · SIGNAL GRAPH  (exploring now)     │
├─────────────────────────────────────────┤
│  07 · EOF SECTION  (contact)            │  ← page ends here
└─────────────────────────────────────────┘
```

The file that assembles all 7 sections is `app/page.tsx`. You would only edit this file if you need to **reorder sections** or **add/remove a section entirely**.

---

## Bottom-Right Navigation Bar

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│                              ─────── ● ○ ○ ○ ○ ○ ○  │  ← fixed, bottom-right
│                              [===]           INIT    │
└──────────────────────────────────────────────────────┘
```

**What it is:** A fixed nav bar at the bottom-right of the screen. It shows 7 dots (one per section), a scroll progress bar, and the name of the section you're currently in. Clicking a dot scrolls to that section.

**File:** `components/layout/SystemStatusBar.tsx`

**To change section labels** (e.g. "INIT", "CORE", "LAB"):
```ts
// Line 6–14 in SystemStatusBar.tsx
const SECTIONS = [
  { id: 'boot',       label: 'INIT' },  // ← change 'INIT' to whatever you want
  { id: 'identity',   label: 'CORE' },
  { id: 'mindset',    label: 'ARCH' },
  { id: 'experience', label: 'SYS'  },
  { id: 'labs',       label: 'LAB'  },
  { id: 'signal',     label: 'NOW'  },
  { id: 'eof',        label: 'EOF'  },
]
```

---

## Section 01 — Boot Sequence

```
┌──────────────────────────────────────────────────────┐
│  ● ● ●  prasad.gundawar — bash — 80×24               │
│                                                      │
│  $ init prasad.gundawar --env=production [typing...] │
│  ✓  identity module loaded                           │
│  ✓  3 years of production systems compiled           │
│  ✓  distributed architecture runtime: online         │
│  ✓  barclays enterprise — 40M+ daily transactions    │
│  ⚡  backend core: fully operational                 │
│                                                      │
│  PRASAD GUNDAWAR                                     │
│  Backend Engineer & Systems Builder                  │
│  Building scalable systems...                        │
│                          ↓ scroll to explore         │
└──────────────────────────────────────────────────────┘
  (animated particle network in background)
```

**Content file:** `content/hero.ts`  ← **edit this file to change everything in this section**

**To change the terminal command line** (the typing animation):
```ts
// content/hero.ts
export const hero = {
  command: '$ init prasad.gundawar --env=production --build=backend-systems',
  //        ↑ change this entire string
```

**To change the boot log lines** (the ✓ and ⚡ messages):
```ts
// content/hero.ts
  bootLines: [
    { type: 'success', text: '✓  identity module loaded',          delay: 2400 },
    { type: 'success', text: '✓  3 years of production systems...', delay: 2650 },
    // ↑ change the 'text' values. 'delay' is milliseconds before it appears.
    { type: 'name',    text: 'PRASAD GUNDAWAR',                    delay: 4100 },
    // ↑ your name (displayed extra large)
    { type: 'role',    text: 'Backend Engineer & Systems Builder',  delay: 4500 },
    // ↑ your job title
    { type: 'tagline', text: 'Building scalable systems...',        delay: 4850 },
    // ↑ the one-line description below your title
  ],
```

**To change the terminal window title** (the "prasad.gundawar — bash — 80×24" line):
```ts
// content/hero.ts
  terminalTitle: 'prasad.gundawar — bash — 80×24',
  //              ↑ change this string
```

**The particle network in the background** is canvas-drawn in `components/sections/BootSequence.tsx` — unless you want to change the color (currently purple), you can leave it alone.

---

## Section 02 — Core Presence

```
┌──────────────────────────────────────────────────────┐
│  02 / CORE                                           │
│                                                      │
│  I build the systems        ┌─────────────────────┐  │
│  people never see.          │ ~/engineer.config   │  │
│                             │─────────────────────│  │
│  The infrastructure that    │ thinking_model      │  │
│  makes everything else      │   "systems-first"   │  │
│  possible.                  │ default_approach    │  │
│                             │   "design-for-scale"│  │
│  Backend, by choice —       │ location            │  │
│  because the foundation     │   "Pune, India"     │  │
│  matters more than          │ session_uptime      │  │
│  the facade.                │   00:47             │  │
│  ────────────────           │ status              │  │
│                             │   "AVAILABLE"       │  │
│  "Scalable systems          └─────────────────────┘  │
│   aren't built by accident" ← quote                  │
└──────────────────────────────────────────────────────┘
```

**Content file:** `content/identity.ts`  ← **edit this file to change everything in this section**

**To change the 3 big statements on the left:**
```ts
// content/identity.ts
export const identity = {
  statements: [
    'I build the systems people never see.',                      // ← line 1 (largest text)
    'The infrastructure that makes everything else possible.',    // ← line 2
    'Backend, by choice — because the foundation matters more than the facade.', // ← line 3 (smallest)
  ],
```

**To change the config panel values on the right:**
```ts
// content/identity.ts
  config: [
    { key: 'thinking_model',    value: 'systems-first' },
    { key: 'default_approach',  value: 'design-for-scale' },
    { key: 'engineering_style', value: 'calm-under-complexity' },
    { key: 'current_focus',     value: 'distributed-systems' },
    // ↑ change key or value strings to anything you want
  ],
```

**To change location and status in the config panel:**
```ts
// content/identity.ts
  location: 'Pune, India',      // ← your city
  availability: 'AVAILABLE',    // ← 'AVAILABLE' or 'EMPLOYED' or whatever
```

**To change the quote:**
```ts
// content/identity.ts
  quote: "Scalable systems aren't built by accident. They're the result of deliberate thinking about failure modes before they happen.",
  //      ↑ replace with your own quote
```

---

## Section 03 — Philosophy Field

```
┌──────────────────────────────────────────────────────┐
│  03 / MINDSET                                        │
│                                                      │
│  Engineering philosophy                              │
│  Principles that guide every architecture decision.  │
│                                                      │
│  ┌───────────────────────┬──────────────────────┐    │
│  │ 01               ⬡   │ 02              ◈    │    │
│  │ // systems_over_feat  │ // scale_is_a_first  │    │
│  │ Systems over features │ Scale is a first-    │    │
│  │                       │ class concern        │    │
│  │ The best engineering  │ Code that works at   │    │
│  │ is invisible...       │ 1 RPS rarely...      │    │
│  ├───────────────────────┼──────────────────────┤    │
│  │ 03               ◎   │ 04              ⟶    │    │
│  │ Reliability is the    │ Optimize the         │    │
│  │ product               │ critical path        │    │
│  └───────────────────────┴──────────────────────┘    │
└──────────────────────────────────────────────────────┘
```

**File:** `components/sections/PhilosophyField.tsx`  
**Content file:** `content/mindset.ts`  ← **edit this file to change the principles**

```ts
// content/mindset.ts — change anything here
export const principles = [
  {
    id: '01',
    title: 'Systems over features',       // ← card heading
    body: 'The best engineering is invisible...', // ← card description
    icon: '⬡',                           // ← icon top-right corner
  },
  {
    id: '02',
    title: 'Scale is a first-class concern',
    body: 'Code that works at 1 RPS rarely survives 10,000...',
    icon: '◈',
  },
  // add more objects to add more principles (grid will expand)
]
```

---

## Section 04 — Architecture View

```
┌──────────────────────────────────────────────────────┐
│  04 / SYSTEMS BUILT                                  │
│                                                      │
│  2023 — Present  ●                                   │
│  Barclays                  ┌────────────────────┐    │
│  Software Engineer         │ barclays-backend   │    │
│                            │────────────────────│    │
│  ┌──────┬──────┐           │  API Gateway       │    │
│  │ 40M+ │  3×  │           │  p50: 200ms        │    │
│  │ txns │ perf │           │         ↓          │    │
│  ├──────┼──────┤           │ Auth  Payment Notif│    │
│  │99.9% │ 15+  │           │         ↓          │    │
│  │uptime│ svcs │           │  Kafka 40M ev/day  │    │
│  └──────┴──────┘           │         ↓          │    │
│                            │ PostgreSQL  Redis  │    │
│  Java Spring Kafka Redis   └────────────────────┘    │
│                                                      │
│  → Modernized legacy monolith...                     │
│  → Built async Kafka pipeline...                     │
└──────────────────────────────────────────────────────┘
```

**File:** `components/sections/ArchitectureView.tsx`  
**Content file:** `content/experience.ts`  ← **edit this file to change experience data**

```ts
// content/experience.ts — change anything here
export const experiences: ExperienceEntry[] = [
  {
    company: 'Barclays',                   // ← company name (big heading)
    role: 'Software Engineer',             // ← your job title
    period: '2023 — Present',             // ← employment period
    location: 'Pune, India',              // ← location
    tagline: 'Enterprise-scale backend systems...', // ← one-line description
    showArchDiagram: true,                 // ← set to false to hide the architecture diagram

    impact: [                              // ← the metric cards
      { metric: '40M+', label: 'Daily Transactions' },
      { metric: '3×',   label: 'API Performance Gain' },
      { metric: '99.9%',label: 'System Uptime' },
      { metric: '15+',  label: 'Microservices' },
      // ↑ change metric (the big number) and label (the description below it)
    ],

    stack: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'PostgreSQL', 'Docker'],
    //       ↑ tech tags shown at the bottom

    highlights: [                          // ← bullet points shown in the panel
      'Modernized legacy monolith into distributed microservices — 3× throughput',
      'Built asynchronous Kafka-based event pipeline...',
      // ↑ add, remove or edit these lines
    ],
  },
  

  // ← ADD A SECOND JOB HERE — copy the block above and fill in new values.
  //   A tab bar will automatically appear at the top to switch between them.
]
```

**To change the architecture diagram boxes** (API Gateway, Kafka, etc.):
```tsx
// Around line 140–165 in ArchitectureView.tsx
<ArchNode label="API Gateway"    stat="p50: 200ms ↓ from 800ms" ... />
<ArchNode label="Kafka Event Bus" stat="40M+ events/day"        ... />
<ArchNode label="Redis Cache"    stat="↓ 60% DB load"           ... />
// ↑ change 'label' (box name) and 'stat' (small text below the name)
```

---

## Section 05 — Terminal Explorer

```
┌──────────────────────────────────────────────────────┐
│  05 / THE LAB                                        │
│                                                      │
│  Projects & Explorations                             │
│                                                      │
│  [all] [active] [building] [idea] [archived]        │
│                                                      │
│  ┌────────────────────┐  ┌─────────────────────────┐ │
│  │ ● ● ●  terminal    │  │ 📁 focus-tracker [active]│ │
│  │────────────────────│  │ Smart Pomodoro timer...  │ │
│  │ $ ls               │  │ React TypeScript Vite    │ │
│  │ drwxr-xr-- ...     │  ├─────────────────────────┤ │
│  │                    │  │ 📁 distributed-cache-..  │ │
│  │                    │  │ Redis-based caching...   │ │
│  │ prasad@lab:~/p$ _  │  └─────────────────────────┘ │
│  └────────────────────┘                              │
└──────────────────────────────────────────────────────┘
```

**File:** `components/sections/TerminalExplorer.tsx`  
**Content file:** `content/labs.ts`  ← **edit this file to add/remove projects**

```ts
// content/labs.ts — add a project by adding a new object
export const labs = [
  {
    slug: 'focus-tracker',          // ← unique ID, used in terminal commands
    name: 'focus-tracker',          // ← filename shown in the list (add / at end for folders)
    type: 'dir',                    // ← 'dir' (folder icon) or 'file' (file icon)
    description: 'Smart Pomodoro timer...', // ← one-line shown in card
    longDescription: 'Full detail shown when card is clicked...', // ← optional expanded detail
    tech: ['React', 'TypeScript'],  // ← tech badge tags
    status: 'active',               // ← 'active' | 'building' | 'idea' | 'archived'
    date: '2026-04',                // ← YYYY-MM format
    github: 'https://github.com/...',// ← optional GitHub link
  },
  // ← add another object here to add a new project
]
```

**Status colors:**
- `active` → green
- `building` → purple
- `idea` → fuchsia/pink
- `archived` → grey

**The terminal on the left** accepts commands: `ls`, `cat <name>`, `open <name>`, `clear`. These work automatically based on the `labs` data — nothing extra to configure.

---

## Section 06 — Signal Graph

```
┌──────────────────────────────────────────────────────┐
│  06 / SIGNAL                                         │
│                                                      │
│  Currently running          ┌────────────────────┐   │
│  Active threads...          │   active-threads   │   │
│                             │         ●          │   │
│  ████ Distributed Sys [arch]│      ●     ●       │   │
│  ███  System Design   [arch]│   ●    NOW    ●    │   │
│  ██   Kafka Patterns  [eng] │      ●     ●       │   │
│  █    Go Language     [tool]│         ●          │   │
│                             └────────────────────┘   │
│  ● architecture  ● engineering  ● ai  ● tools        │
└──────────────────────────────────────────────────────┘
```

**File:** `components/sections/SignalGraph.tsx`  
**Content file:** `content/exploring.ts`  ← **edit this file to change topics**

```ts
// content/exploring.ts
export const exploring: ExploringTopic[] = [
  {
    name: 'Distributed Systems',  // ← topic name shown in the list and on hover
    weight: 5,                    // ← 1–5: controls bar width + node size + dot count
    category: 'architecture',    // ← controls color (see categories below)
    description: 'CAP theorem, consensus algorithms...', // ← optional subtitle
  },
  {
    name: 'Go Language',
    weight: 2,
    category: 'tools',
  },
  // ← add a new object to add a new topic
]
```

**Category → color mapping:**
| Category | Color |
|---|---|
| `architecture` | purple |
| `engineering` | green |
| `ai` | fuchsia |
| `tools` | amber |
| `exploration` | blue |
| `frontend` | cyan |

**Weight guide:** `5` = most active/important (thick bar, big node), `1` = barely touching it (thin bar, tiny node).

---

## Section 07 — EOF / Contact

```
┌──────────────────────────────────────────────────────┐
│  07 / EOF                                            │
│                                                      │
│  Let's build                                         │
│  something real.                                     │
│                                                      │
│  Open to backend engineering roles...                │
│                                                      │
│  ┌──────────────────────────────────────┐            │
│  │ ● ● ●  contacts.sh                  │            │
│  │──────────────────────────────────────│            │
│  │ $ send-mail --target email@gmail.com │            │
│  │ $ open     --target github.com/...   │            │
│  │ $ connect  --target linkedin.com/... │            │
│  │ $ download --file resume.pdf         │            │
│  │ prasad@systems:~$ _                  │            │
│  └──────────────────────────────────────┘            │
│                                                      │
│  PRASAD GUNDAWAR — BACKEND ENGINEER  PUNE · 2026     │
└──────────────────────────────────────────────────────┘
```

**Content file:** `content/contact.ts`  ← **edit this file to change everything in this section**

**To change the main heading:**
```ts
// content/contact.ts
export const contact = {
  heading: {
    line1: "Let's build",         // ← first line (plain white text)
    line2: 'something real.',     // ← second line (purple gradient text)
  },
```

**To change the sub-description:**
```ts
// content/contact.ts
  description: 'Open to backend engineering roles, system design conversations, and interesting ideas at scale.',
  //             ↑ change this paragraph
```

**To change email, GitHub, LinkedIn links:**
```ts
// content/contact.ts
  links: [
    { label: 'email',    value: 'prasadgundawar2002@gmail.com',
      href: 'mailto:prasadgundawar2002@gmail.com', cmd: 'send-mail' },
    { label: 'github',   value: 'github.com/prasadgundawar',
      href: 'https://github.com/prasadgundawar',  cmd: 'open-profile' },
    { label: 'linkedin', value: 'linkedin.com/in/prasadgundawar',
      href: 'https://linkedin.com/in/prasadgundawar', cmd: 'connect' },
    // ↑ change 'value' (display text), 'href' (actual link), 'cmd' (terminal command label)
    // ← add more objects here to add more contact links
  ],
```

**To update the resume file:**  
1. Replace the file at `public/resume.pdf` with your updated resume.
2. Update the filename and display size in `content/contact.ts`:
```ts
// content/contact.ts
  resume: {
    filename: 'prasad_gundawar_resume.pdf',  // ← must match the file in public/
    displaySize: '2.4KB',                    // ← shown on hover (cosmetic only)
  },
```

**To change the footer text:**
```ts
// content/contact.ts
  footer: {
    name: 'PRASAD GUNDAWAR',    // ← your name (all caps)
    role: 'BACKEND ENGINEER',   // ← your role (all caps)
    location: 'PUNE, INDIA',    // ← your city
    year: '2026',               // ← current year
  },
```

---

## Global Design Settings

These control how the whole site looks.

**File:** `app/globals.css`

**To change the purple accent color** (used for glows, highlights):
```css
/* Line 12 in globals.css */
--color-purple: #7c3aed;  /* ← change this hex value */
```

**To change the terminal green color** (used for "active" and "online" indicators):
```css
/* Line 17 */
--color-terminal: #00ff88;  /* ← change this hex value */
```

**To change the page background:**
```css
/* Line 6 */
--color-base: #050508;  /* ← change this (near-black by default) */
```

**To change the scan line** (the thin horizontal line that sweeps across the screen):  
Delete or comment out this in `app/layout.tsx`:
```tsx
{/* Scan line effect */}
<div className="scan-line" aria-hidden />
// ↑ delete this block to remove the scan line
```

---

## SEO / Browser Tab

**Content file:** `content/site.ts`  ← **edit this file to change all SEO metadata**

```ts
// content/site.ts
export const site = {
  name: 'Prasad Gundawar',
  title: 'Prasad Gundawar — Backend Engineer & Systems Builder',
  //      ↑ browser tab title + default social share title

  description: 'Building scalable systems that power real-world applications.',
  //             ↑ shown in Google search results

  keywords: ['backend engineer', 'distributed systems', 'Java', 'Spring Boot', ...],
  //          ↑ SEO keywords (comma-separated)

  openGraph: {
    title: 'Prasad Gundawar — Backend Engineer',
    //      ↑ title when someone shares your link on LinkedIn, Twitter, etc.
    description: 'Building scalable systems...',
  },
}
```

---

## Quick Reference — Which file for what?

Everything personal lives in `content/`. You should rarely need to touch a component file.

| I want to change... | Edit this file |
|---|---|
| The typing command / boot log / your name / title | `content/hero.ts` |
| The "I build the systems" statements | `content/identity.ts` |
| The config panel (thinking model, focus, location, status) | `content/identity.ts` |
| The quote below the config panel | `content/identity.ts` |
| Engineering philosophy principles | `content/mindset.ts` |
| Work experience, company, metrics, stack | `content/experience.ts` |
| Architecture diagram boxes and stats | `components/sections/ArchitectureView.tsx` |
| Projects list | `content/labs.ts` |
| "Currently exploring" topics and weights | `content/exploring.ts` |
| Contact links (email, GitHub, LinkedIn) | `content/contact.ts` |
| Contact section heading and description | `content/contact.ts` |
| Resume filename and display size | `content/contact.ts` |
| Footer text (name, year, city) | `content/contact.ts` |
| Browser tab title / SEO / social sharing | `content/site.ts` |
| Colors, fonts, glow effects | `app/globals.css` |
| Section nav bar labels (INIT, CORE, LAB...) | `components/layout/SystemStatusBar.tsx` |
