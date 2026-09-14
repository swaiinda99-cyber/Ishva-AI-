# PROGRESS_LOG.md — Ishva AI

> Dated log of what was built each session. Newest entries at the top.
> Written for any AI or developer picking this up next — assume they have never seen this project.

---

## 2026-09-14 — Session 1 (Antigravity AI)

### What Was Built
- [x] Initialized project documentation: PROJECT_CONTEXT.md, PROGRESS_LOG.md, NEXT_STEPS.md, README.md
- [x] Created clean folder structure: frontend (React+Vite) + backend (Node+Express), fully separated
- [x] Scaffolded entire frontend with Vite + React 18
- [x] Built design system: CSS custom properties (variables.css), global reset, Inter font, dark theme
- [x] Built animations.css with keyframes for fade-in, slide-up, pulse, typing indicator
- [x] Created utils/constants.js — all app-wide constants (models, modes, mock responses)
- [x] Created utils/helpers.js — date formatting, string utilities
- [x] Built AuthContext.jsx — Google OAuth state management (mock login for now)
- [x] Built AppContext.jsx — global state: active mode (Chat/Forge), Manager toggle, selected models
- [x] Built ChatContext.jsx — message history, conversation management
- [x] Built GoogleLogin.jsx — full login page with Google button and Ekaa Technologies branding
- [x] Built AuthGate.jsx — wraps the app, shows login page if not authenticated
- [x] Built TopNav.jsx — mode tabs (Ishva Chat / Ishva Forge), logo, user avatar/menu
- [x] Built ModeTab.jsx — animated tab component for mode switching
- [x] Built ManagerToggle.jsx — labeled switch "Enable Manager — Ishva AI" with visual on/off state
- [x] Built ModelPicker.jsx — 5 model options with icons, enabled only when Manager is OFF
- [x] Built UtilityBar.jsx — Deep Search, Image Generation, File Upload, Voice Input, Code buttons
- [x] Built MessageBubble.jsx — user and AI message styling with avatars and timestamps
- [x] Built ChatInput.jsx — textarea with send button, keyboard shortcut (Enter to send)
- [x] Built ChatWindow.jsx — scrollable message history, auto-scroll on new message, typing indicator
- [x] Built Sidebar.jsx — conversation history list, new chat button
- [x] Built AppPage.jsx — main app shell combining all components
- [x] Built LoginPage.jsx — standalone login page with branding
- [x] Built services/mockAI.js — realistic mock AI responses for Chat and Forge modes
- [x] Built services/authService.js — mock Google OAuth (real credentials hookup point)
- [x] Scaffolded backend: server.js, routes (auth, chat), controllers, middleware, config/passport.js
- [x] Created .env.example with all required environment variables
- [x] Created .gitignore
- [x] App runs end-to-end: login → chat → mode switch → manager toggle → model picker → mock AI response

### Decisions Made
- Used Vite + React (not Next.js) — lighter, faster dev experience for a UI-first chat app
- Vanilla CSS with CSS variables — no Tailwind, full design control, as per project rules
- Mock Google OAuth — real OAuth requires registered credentials; UI is fully wired for drop-in replacement
- Manager AI toggle is visual-only — real routing logic is a separate future step
- Model names are generic placeholders — real names swapped in constants.js only when APIs are ready
- Dark theme by default — matches modern AI chat product aesthetics

### Known Issues / Left Unfinished
- Google OAuth is mock only — requires real GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET in .env
- No real AI API calls — all responses are from services/mockAI.js
- Backend is scaffolded but not running (not needed for UI-only step)
- Ishva Forge mode uses same chat UI — wizard/builder step not yet designed
- No real conversation persistence — history resets on page refresh
- No mobile responsive polish (basic responsiveness works, full mobile optimization later)

---

*Log maintained by: Antigravity AI assistant. Continue adding dated entries above this line.*
