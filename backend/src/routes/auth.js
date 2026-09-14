// auth.js — Google OAuth routes
// TODO: Activate when real OAuth credentials are set up
import { Router } from "express";
import passport from "passport";

const router = Router();

// GET /api/auth/google — redirect to Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// GET /api/auth/google/callback — handle OAuth callback
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login?error=auth_failed" }),
  (req, res) => res.redirect(process.env.FRONTEND_URL || "http://localhost:5173")
);

// GET /api/auth/me — return current user session
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) return res.json(req.user);
  return res.status(401).json({ error: "Not authenticated" });
});

// POST /api/auth/logout — destroy session
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.json({ success: true });
  });
});

export default router;
