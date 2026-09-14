// ============================================================
// server.js — Ishva AI Backend
// Express app entry point.
// ============================================================
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";
import chatRoutes from "./src/routes/chat.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// --- Middleware ---
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "ishva-dev-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === "production" },
}));
app.use(passport.initialize());
app.use(passport.session());

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// --- Health check ---
app.get("/api/health", (req, res) => res.json({ status: "ok", service: "ishva-ai-backend" }));

// --- Error handler ---
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Ishva AI backend running on http://localhost:${PORT}`);
});
