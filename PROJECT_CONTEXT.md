# PROJECT_CONTEXT.md — Ishva AI by Ekaa Technologies

> **For any AI assistant or developer picking this up:** Read this file first. It contains everything you need to understand the project, make consistent decisions, and continue building without breaking anything.

---

## 1. What Is This Project?

**Ishva AI** is a web-first platform built by **Ekaa Technologies** that lets **non-technical users** (people who cannot code) describe a website or app they want in plain, conversational language, and then guides them step-by-step through building it.

Think of it as a supercharged AI chat interface — similar to ChatGPT or Claude — but purpose-built for:
- General AI Q&A ("Ishva Chat" mode)
- AI-assisted website/app creation ("Ishva Forge" mode)

A central "Manager AI" called **Ishva AI** coordinates multiple specialized AI models behind the scenes, routing tasks to the best model for the job. Users can let the Manager handle everything automatically, or manually pick which AI model responds.

**Target users:** Small business owners, entrepreneurs, students, and creatives who want to build digital products without writing code.

---

## 2. Tech Stack & Why We Chose It

| Layer | Technology | Reason |
|---|---|---|
| **Frontend** | React 18 + Vite | Industry-standard component system; Vite gives instant HMR for fast iteration |
| **Styling** | Vanilla CSS with CSS custom properties | Full control, no framework dependency, easy to theme |
| **Fonts** | Google Fonts — Inter | Clean, modern, highly readable — used by most top AI products |
| **Backend** | Node.js + Express | Lightweight, easy to extend, same language as frontend |
| **Auth** | Google OAuth 2.0 | Required by client; most users already have a Google account |
| **State Management** | React Context API + useState/useReducer | No Redux needed at this scale; keeps bundle small |
| **Mock Responses** | In-memory JS module (services/mockAI.js) | Lets the full UI be tested before real APIs are wired |
| **Version Control** | Git | Already initialized; commit frequently with clear messages |

> **Note for future AI:** Do NOT introduce Redux, Zustand, Tailwind, or other heavy dependencies without first checking with the project owner. Keep the stack lean and conventional.

---

## 3. Folder Structure

`
C:\The Master\Ishva AI\
|
+-- frontend/                         # All client-side code (React + Vite)
|   +-- public/                       # Static assets (favicon, og-image, etc.)
|   +-- src/
|   |   +-- components/               # Reusable UI building blocks
|   |   |   +-- auth/                 # GoogleLogin.jsx, AuthGate.jsx
|   |   |   +-- chat/                 # ChatWindow.jsx, MessageBubble.jsx, ChatInput.jsx
|   |   |   +-- controls/             # ManagerToggle.jsx, ModelPicker.jsx, UtilityBar.jsx
|   |   |   +-- layout/               # TopNav.jsx, Sidebar.jsx, ModeTab.jsx
|   |   |   +-- shared/               # Button.jsx, Modal.jsx, Icon.jsx, Tooltip.jsx
|   |   |
|   |   +-- contexts/                 # React Context providers
|   |   |   +-- AuthContext.jsx       # User session state
|   |   |   +-- ChatContext.jsx       # Message history, active conversation
|   |   |   +-- AppContext.jsx        # Global app state (mode, manager toggle, model)
|   |   |
|   |   +-- hooks/                    # Custom React hooks
|   |   +-- pages/                    # Top-level route pages
|   |   +-- services/                 # External service integrations
|   |   +-- styles/                   # Global CSS files
|   |   +-- utils/                    # Pure utility functions
|   |   +-- App.jsx                   # Root component
|   |   +-- main.jsx                  # Vite entry point
|   |
|   +-- index.html
|   +-- vite.config.js
|   +-- package.json
|
+-- backend/                          # All server-side code (Node.js + Express)
|   +-- src/
|   |   +-- routes/
|   |   +-- controllers/
|   |   +-- middleware/
|   |   +-- config/
|   +-- server.js
|   +-- package.json
|
+-- PROJECT_CONTEXT.md
+-- PROGRESS_LOG.md
+-- NEXT_STEPS.md
+-- README.md
`

---

## 4. Naming Conventions

### Files & Folders
- React components: PascalCase .jsx — e.g. ChatWindow.jsx, ModelPicker.jsx
- Hooks: camelCase, prefix use — e.g. useChat.js, useAuth.js
- Contexts: PascalCase, suffix Context — e.g. AppContext.jsx
- Services/utils: camelCase .js — e.g. mockAI.js, helpers.js
- CSS files: camelCase or kebab-case — e.g. variables.css
- CSS custom properties: --kebab-case with namespace — e.g. --color-brand-primary
- Folders: lowercase, kebab-case if multi-word

### Variables & Functions
- React state: camelCase — const [isManagerOn, setIsManagerOn]
- App-wide constants: UPPER_SNAKE_CASE — MODELS, APP_MODES
- Event handlers: prefix handle — handleSendMessage, handleLogin
- Boolean state/props: prefix is or has — isLoading, hasError, isOpen
- Async functions: prefix fetch or load — fetchResponse, loadUserProfile

---

## 5. Coding Style Rules

### React
- Functional components only — no class components
- One component per file
- Keep components under ~150 lines; split if needed
- No inline styles — all styles go in CSS files

### CSS
- All values must use CSS custom properties from variables.css
- Never hardcode hex colors or pixel values in component styles
- BEM-like class names: .chat-window, .chat-window__message, .chat-window__message--user

### State & Data Flow
- Context for global state (auth, app mode, manager toggle, model selection)
- Local useState for local state (input value, hover, modals)
- Never mutate state directly

### Mock vs Real Services
- All AI responses come from services/mockAI.js until real APIs are added
- Function signature in mockAI.js must match what real services will use
- Mark mock-only behavior with: // TODO: Replace with real API

### Commits
- Commit after each meaningful step
- Format: Add ChatWindow component, Fix ManagerToggle state bug
- Never commit broken code

---

## 6. The Two App Modes

### Ishva Chat
General-purpose AI assistant. Users ask questions; Manager AI or selected model responds.

### Ishva Forge
Guided website/app builder mode. Currently: same chat interface with different AI context. Future: multi-step wizard, template selection, component preview.

---

## 7. The Manager AI Toggle

- ON: Ishva AI Manager auto-selects the best model. Model picker is disabled/grayed out.
- OFF: User manually selects which model responds. Model picker is enabled.
- Real logic: NOT YET IMPLEMENTED. Toggle is visual-only. Future: services/managerAI.js

---

## 8. Model Placeholders

Five generic model slots in utils/constants.js. Swap real API names only in constants.js and services/ — UI components do not need rebuilding.

| ID | Display Name |
|---|---|
| model-a | Model A — GPT-style |
| model-b | Model B — Claude-style |
| model-c | Model C — Gemini-style |
| model-d | Model D — Llama-style |
| model-e | Model E — DeepSeek-style |

---

## 9. Google OAuth Notes

- OAuth configured via backend/src/config/passport.js
- Credentials (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET) must be in .env — never commit .env
- .env.example is provided with all required variable names
- In development: frontend proxies /api calls to backend via vite.config.js

---

*Last updated: 2026-09-14 — Antigravity AI assistant (Ekaa Technologies / Ishva AI project setup session)*
