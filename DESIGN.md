# FinTraq — Design System

FinTraq is a financial terminal for freelancers and independent operators. The look is **nocturnal, editorial cyberpunk**: near-black olive surfaces, one acid-lime accent, oversized tight display type, monospaced HUD labels, and sharp 1px lines with chamfered corners.

This document describes what is built. Everything here lives in `app/globals.css` (unlayered CSS, so it wins over shadcn's Tailwind utilities) and in the components it names.

## Theme

**Dark only.** There is no light theme and no theme switcher.

- `<html>` always carries the `dark` class (set in `app/layout.tsx`) so shadcn components' `dark:` utilities apply.
- shadcn's tokens (`--background`, `--primary`, …) are defined once on `:root` with dark values. Do not reintroduce `.light` / `.dark` token blocks or `next-themes`.

## Color tokens

Name tokens by **role**, never by hue — the palette has changed before, and hue names (the old `--cyber-cyan` was lime) rot.

| Token             | Value     | Use                                                    |
| ----------------- | --------- | ------------------------------------------------------ |
| `--cyber-bg`      | `#080906` | Page canvas                                            |
| `--cyber-surface` | `#10120d` | Raised panels (auth console, header areas)             |
| `--cyber-panel`   | `#171a12` | Cards and dashboard tiles                              |
| `--cyber-inset`   | `#11130d` | Inputs, panel footers, recessed areas                  |
| `--cyber-line`    | `#303426` | Every 1px border and rule                              |
| `--cyber-text`    | `#f2f4e9` | Primary text                                           |
| `--cyber-muted`   | `#999b8e` | Secondary text, labels                                 |
| `--cyber-accent`  | `#b8ff2c` | The one accent: CTAs, kickers, live states, focus      |
| `--cyber-danger`  | `#ff6b54` | Errors, outflows, overdue                              |
| `--cyber-warn`    | `#ffd447` | Pending, targets, caution                              |

Rules:

- Lime is the only accent. Use it with precision — kickers, the period at the end of a headline, primary buttons, focus rings, live dots. Never as a large background behind body text.
- Shadcn's `--primary`, `--ring`, `--destructive` map to the same accent and danger values.

Helper classes: `.text-cyber-accent`, `.text-cyber-danger`, `.text-cyber-warn` (text color) and `.tone-accent`, `.tone-danger` (fills for bars and swatches). The landing page's interactive dashboard keeps its own literal hue classes (`.lime`, `.coral`, `.green`, `.muted`) because they are true to their color.

## Typography

- **Geist Sans** (`--font-sans`) — headlines and body.
- **JetBrains Mono** (`--font-mono`) — every label, kicker, button, nav item, ID, timestamp, and number in a HUD context.

| Role              | Spec                                                                      |
| ----------------- | ------------------------------------------------------------------------- |
| Wordmark          | Weight 800, `letter-spacing: -0.09em`, `line-height: 0.82`                |
| Display headline  | Weight 500, `clamp(56px, 7.4vw, 116px)`, `letter-spacing: -0.075em`       |
| Section headline  | Weight 500, `clamp(40px, 5vw, 74px)`, `letter-spacing: -0.07em`           |
| Body              | 15px, `line-height: 1.75`, `--cyber-muted`                                |
| Mono label/kicker | 10px, uppercase, `letter-spacing: 0.08em`                                 |

Headlines end with a lime period: `Resume session<span>.</span>`. Emphasised words inside section headlines use `<em>` (lime, not italic).

Kickers read like system addresses: `FINTRAQ ACCESS // 01`, `03 // TAX VAULT TERMINAL`, `001 // 005`.

## Shape and line

- **No rounded corners** on brand surfaces. No `rounded-2xl`/`rounded-3xl` cards, no pill buttons or inputs.
- **Chamfered corners** via `clip-path` on buttons and panels: top-right and bottom-left cut at 45°.
- **1px `--cyber-line` borders** and rules separate everything. No drop-shadow-defined cards.
- **Crosshair markers** (`+` in lime) can sit at the free corners of a featured panel.
- Background grid: 80px lime lines at ~5% alpha, masked to fade out. Keep it barely visible.

## Components

| Component              | Class / file                                       | Notes                                                                                     |
| ---------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Primary button         | `.cyber-button`                                    | Lime fill, mono 10px uppercase, chamfered, white on hover. On a shadcn `Button`, also set `border-radius: 0`. |
| Outline button         | `.cyber-outline-button`                            | Transparent with lime border and text                                                     |
| Text link              | `.cyber-text-link`                                 | Mono uppercase with a 1px underline rule; lime on hover                                   |
| Status line            | `.hero-status` + `.pulse-dot`                      | Glowing lime dot + mono kicker                                                            |
| Auth shell             | `features/auth/components/auth-shell.tsx`          | `AuthShell` (split screen: editorial intro + console), `AuthPanel`, `AuthError`, `AuthNotice` |
| Input                  | `.cyber-input` on shadcn `Input`                   | 46px, square, inset fill, line border; lime border + 1px ring on focus; danger when `aria-invalid` |
| Password input         | `features/auth/components/password-input.tsx`      | `.cyber-input` with a mono SHOW/HIDE toggle (`aria-pressed`)                              |
| Field label            | `.cyber-label` on shadcn `FieldLabel`              | Mono uppercase with a lime index: `<span>01</span> EMAIL`                                 |
| Field error            | `.cyber-field-error` on shadcn `FieldError`        | Danger mono line prefixed `ERR //`                                                        |
| Message line           | `.auth-message` / `.auth-message-error`            | 2px left rule; `OK // …` in lime or `ERR // …` in danger. Replaces shadcn `Alert` on brand pages |

Keep shadcn primitives (`Field`, `Controller`, `Input`, `Button`) underneath for accessibility and form wiring; restyle them with the classes above rather than forking them.

## Copy voice

Headlines and kickers speak in the operator voice ("Resume session.", "Initialize workspace.", "Rotate credentials."). **Buttons stay literal** — `SIGN IN`, `CREATE ACCOUNT`, `SEND RESET LINK` — with an arrow glyph (`↗` / `↘` / `→`) marked `aria-hidden`.

## Motion

Restrained and purposeful:

- Live indicators blink (`steps()` timing, not a soft pulse).
- Page content may rise in once on load (≤ 0.6s, ~12px).
- No typewriter text, glitch effects, or scanlines.
- Every animation is disabled under `prefers-reduced-motion: reduce`.

## Layout

- Content width: `.section-wrap` — `min(1400px, 100%)` with 64px gutters (30px ≤ 900px, 20px ≤ 640px).
- The fixed header is 86px tall; pages offset their content by that amount.
- Auth pages are split-screen above 1000px. Below that the intro collapses to kicker + headline and the console sits underneath, so the form is visible without scrolling on a phone.

## Avoid

- Pastel gradients, rainbow blobs, glassmorphism, backdrop blur.
- Rounded, bubbly SaaS cards and pill-shaped controls.
- Additional accent colors competing with lime.
- Cartoon or stock marketing illustration.
- Buttons that do nothing.
