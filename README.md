# Ishva AI — by Ekaa Technologies

> A web-first AI platform that lets non-coders build websites and apps through conversation.

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:5173
```

### Backend (optional for UI development)
```bash
cd backend
npm install
cp .env.example .env
# Fill in your credentials in .env
npm run dev
```

## What This Is
Ishva AI lets users describe what they want to build in plain language. A "Manager AI" coordinates multiple AI models to help them create it. Two modes:
- **Ishva Chat** — General AI Q&A
- **Ishva Forge** — AI-guided website/app builder

## Key Files
- `PROJECT_CONTEXT.md` — Full tech stack, folder structure, naming conventions
- `PROGRESS_LOG.md` — What was built each session
- `NEXT_STEPS.md` — Priority-ordered next tasks

## Tech Stack
- Frontend: React 18 + Vite
- Styling: Vanilla CSS with custom properties
- Backend: Node.js + Express
- Auth: Google OAuth 2.0

## Environment Variables
Copy `.env.example` to `.env` and fill in your values. Never commit `.env`.
