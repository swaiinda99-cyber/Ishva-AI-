// ============================================================
// AUTH SERVICE — Ishva AI
// Google OAuth helpers.
// TODO: Replace mock login with real OAuth redirect to backend.
// ============================================================

/**
 * Mock Google login — simulates a successful OAuth login.
 * TODO: Replace with window.location.href = "/api/auth/google"
 * when backend OAuth is configured.
 */
export async function googleLogin() {
  // Simulate OAuth round-trip delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // TODO: Replace with real Google user data from OAuth callback
  return {
    id: "mock-user-001",
    name: "Demo User",
    email: "demo@example.com",
    picture: null, // Will use initials fallback
    provider: "google",
  };
}

/**
 * Mock logout — clears session.
 * TODO: Replace with POST /api/auth/logout
 */
export async function logout() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return { success: true };
}

/**
 * Check if user is currently authenticated.
 * TODO: Replace with GET /api/auth/me (checks session cookie)
 */
export async function checkAuthStatus() {
  // In mock mode, always returns null (not logged in on first load)
  return null;
}
