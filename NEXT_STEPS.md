# NEXT_STEPS.md — Ishva AI

> Priority-ordered list of what to build or fix next.
> Written for any AI or developer picking this up — assume you have never seen this project before. Read PROJECT_CONTEXT.md first.

---

## Priority 1 — Must Do Next (Unblock Core Functionality)

### 1.1 Connect Real Google OAuth
**Why:** Currently login is mocked. Users cannot actually sign in.
**Files to change:**
- `backend/src/config/passport.js` — add real Google strategy with GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET
- `backend/src/routes/auth.js` — activate /api/auth/google and /api/auth/google/callback routes
- `frontend/src/services/authService.js` — replace mock login with real redirect to backend OAuth
- `frontend/src/contexts/AuthContext.jsx` — replace mock user with real session data from backend
**What you need:** A Google Cloud project with OAuth 2.0 credentials. Add to .env (see .env.example).

### 1.2 Connect Real AI API (at least one model)
**Why:** All responses are mocked. Pick one model to wire first as proof of concept.
**Recommended first:** OpenAI (GPT-4o) — most documented, easiest to start.
**Files to change:**
- `frontend/src/services/mockAI.js` — replace mock functions with real API calls (or create `realAI.js`)
- `backend/src/controllers/chatController.js` — add real API call logic here (keeps API key server-side)
- `backend/src/routes/chat.js` — activate /api/chat/send endpoint
- `frontend/src/contexts/ChatContext.jsx` — point to backend endpoint instead of mockAI
**What you need:** API key for chosen model. Add to .env.

---

## Priority 2 — Important (Polish & Complete UI)

### 2.1 Real Conversation Persistence
**Why:** Messages reset on page refresh. Users lose their history.
**Options:** localStorage (quick), or a database (proper). Recommended: start with localStorage, then add a DB.

### 2.2 Mobile Responsive Polish
**Why:** Layout has basic responsiveness but sidebar and controls need a mobile-first pass.
**Files:** All component CSS files, especially TopNav.css, Sidebar.css, AppPage.css.

### 2.3 Ishva Forge Mode — Builder UI
**Why:** Currently Forge mode uses the same chat interface. The actual builder experience needs design.
**What to build:** Step-by-step wizard, template selection grid, component preview panel, export/deploy button.

### 2.4 Make Utility Buttons Functional
**Why:** Deep Search, Image Generation, File Upload, Voice Input are visual-only placeholders.
**Priority order:** File Upload → Image Generation → Deep Search → Voice Input.

---

## Priority 3 — Manager AI (Core Intelligence)

### 3.1 Design the Manager AI Routing Logic
**Why:** This is the core differentiator of Ishva AI. Must be designed carefully.
**What it does:** Analyzes the user's message and routes it to the best model (GPT for writing, Gemini for analysis, etc.)
**Where to build:** `frontend/src/services/managerAI.js` (or backend equivalent)
**Depends on:** Priority 1.2 (real AI APIs) being done first.

### 3.2 Multi-Model Responses
**Why:** Manager AI may want to send a query to multiple models and synthesize results.
**Files:** ChatContext.jsx, ChatWindow.jsx, MessageBubble.jsx (add model attribution label).

---

## Priority 4 — Production Readiness

### 4.1 Error Boundaries
Add React error boundaries so one broken component doesn't crash the whole app.

### 4.2 Loading States & Skeleton Screens
Replace simple spinners with proper skeleton loading for a premium feel.

### 4.3 Accessibility (a11y)
Add proper ARIA labels, keyboard navigation, focus management.

### 4.4 Testing
- Unit tests for utility functions (helpers.js, constants.js)
- Integration tests for chat flow
- E2E tests for login → chat → mode switch flow

### 4.5 Backend Deployment
Deploy backend to Railway, Render, or Vercel serverless. Frontend to Vercel.

---

## Completed (Do Not Redo)
- [x] Project structure and documentation
- [x] Full UI with React + Vite
- [x] Design system (CSS variables, dark theme, Inter font)
- [x] Auth layer (mock Google OAuth + AuthGate)
- [x] TopNav with Ishva Chat / Ishva Forge tabs
- [x] Manager AI toggle (visual)
- [x] Model picker (5 models, disabled when Manager ON)
- [x] Utility bar (Deep Search, Image Gen, Upload, Voice, Code)
- [x] Chat interface (input, message history, mock AI responses, typing indicator)
- [x] Sidebar (conversation history)
- [x] Backend scaffold (Express, routes, controllers, passport config)

---

*Last updated: 2026-09-14 — Antigravity AI assistant (Session 1)*
