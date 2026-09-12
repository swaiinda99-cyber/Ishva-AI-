# Ishva AI — Multi-Agent Architecture Plan

Ishva AI (The Master Stroke) is co-developed by **Google Antigravity** and **Cursor AI**. This document records ownership so we do not duplicate work.

## Agent split

| Agent | Owns | Do not touch |
|-------|------|----------------|
| **Antigravity** | App routing and landing composition: `src/app/page.tsx`, section modules under `src/components/` (`Navbar`, `Hero`, `Architecture`, `SandboxDemo`, `Features`, `Pricing`, `Footer`) | Cursor UI primitives in `src/components/ui/` |
| **Cursor (UI/UX Frontend)** | Reusable modular UI in `src/components/ui/` | `src/app/page.tsx` and Antigravity section files unless coordinated |

The Next.js `src/` layout maps `components/ui/` → `src/components/ui/` and `app/page.tsx` → `src/app/page.tsx`. Imports use the `@/` alias.

## Cursor UI kit (`src/components/ui/`)

- `card.tsx` — glassmorphism surface for features, pricing, and dashboard tiles
- `button.tsx` — primary / secondary / ghost CTAs with gradient hover motion
- `terminal.tsx` — dark sandbox chrome with simulated agent code output

These primitives are designed to match existing theme tokens in `src/app/globals.css` (`.glass-panel`, `.gradient-text-emerald`). Antigravity can import them into landing sections when ready; Cursor will not rewire `src/app/page.tsx`.

## Product backlog (shared)

1. Backend Agent Swarm Orchestrator API (`/api/agents/...`)
2. Real-time sandbox WebSockets and streaming AST engine
3. Authentication and project dashboard UI

## Git

- Cursor UI work lives on branch `cursor-ui-components`.
- Prefix Cursor commits with `feat(cursor):` or `fix(cursor):`.
- Never overwrite files marked `IN_PROGRESS` by the other agent.
