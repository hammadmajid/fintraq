# Fintraq — Design Direction: Cyberpunk

> **MANDATORY DESIGN LANGUAGE FOR THIS PROJECT**: **Cyberpunk**
> Read alongside `../.kryft-docs/MASTER-PROMPT.md`, `../.kryft-docs/SCOPE.md`, and `../.kryft-docs/SECURITY.md`.

---

## ⚡ Core Concept: The Cyber-Financial Terminal

Fintraq is an uncompromising financial operations terminal for digital freelancers and independent mercenaries. The design language is **pure Cyberpunk** — high-tech, razor-sharp, data-dense, and nocturnal.

### 🚫 Strictly Forbidden (Anti-AI Slop Rules)

- **NO pastel gradients** or blurry rainbow blobs.
- **NO generic, bubbly, rounded SaaS cards** (`rounded-3xl` or `rounded-2xl`).
- **NO bubbly glassmorphism** or muddy backdrop-blurs.
- **NO generic marketing corporate art** or cheerful cartoon characters.
- **NO fake, non-functional buttons**.

---

## 🎨 Visual Identity & Design Tokens

### 1. Palette & Atmosphere

- **Canvas / Background**:
  - Deep Obsidian Black (`#050508`) & Deep Cyber Noir (`#0a0b12`)
  - Subsurfaces: Tactical Charcoal (`#12131c`), Inset Panel (`#0e0f17`)
- **Neon Accents (High Voltage, Used with Precision)**:
  - **Electric Cyan** (`#00f0ff` / `#00e5ff`): Primary action states, data streams, active tabs.
  - **Neon Cyber Yellow** (`#fee715` / `#ffd700`): Warning indicators, income surges, highlight metrics.
  - **Acid Green** (`#39ff14` / `#00ff66`): Ledger credits, successful transaction states, online telemetry.
  - **Hot Magenta / Laser Pink** (`#ff007f` / `#ff2a85`): Outflows, critical threshold warnings, expense alerts.
- **Borders & Grid**:
  - Razor-sharp 1px technical borders (`#1e2235` or `#282e47`) with neon corner pips / chamfered 45° cut corners.
  - Matrix/mesh background line grids at 1–2% opacity.
  - Optional subtle scanline texture on preview consoles.

### 2. Typography & HUD Instrumentation

- **Headers & Display**: Sharp, industrial geometric sans or technical display face (e.g., `Orbitron`, `Rajdhani`, or bold technical `Geist`) with tight tracking and uppercase data prefixes (`SYSTEM // LEDGER_v2.4`).
- **Body & Data**: Clean readable sans (`Geist Sans` or `Inter`) paired with dense monospaced figures (`JetBrains Mono` or `Fira Code`) for currency, transaction IDs, timestamps, and hash fingerprints.
- **HUD Motifs**:
  - Brackets around active elements: `[ ACTIVE ACCOUNT ]`
  - Blinking status indicators: `● LIVE_TELEMETRY`
  - Crosshair corner markers on panels (`+` marks at intersections)
  - Chamfered cut corners (`clip-path: polygon(...)`) for buttons and badge tags.

---

## 🛠️ Interactive Product Previews & Slices

- **Freelance Cashflow HUD**: Realtime streaming-style ticker of income, expense, and tax allocations.
- **Interactive Invoicing Forge**: Holographic-style cyber invoice generator with line-item calculations, client selector, and encrypted PDF preview.
- **Tax Vault Terminal**: Visual percentage allocation dials (Federal, State, Self-Employment) with interactive tax estimation sliders.
- **Bank Account Matrix**: Tactical cards representing checking, crypto, offshore, or savings reserves with live simulated balance tickers.

---

## 🧩 Components from 21st.dev

- Actively pull and customize components from **https://21st.dev/** (terminal windows, animated numbers/counters, HUD docks, command palettes, matrix text decoders).
- Re-skin them to match the exact Cyberpunk palette (cyan/yellow/magenta on obsidian black with razor edges).
