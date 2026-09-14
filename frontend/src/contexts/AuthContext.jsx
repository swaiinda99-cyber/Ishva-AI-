// ============================================================
// AUTH CONTEXT — Ishva AI
// Provides user authentication state throughout the app.
// ============================================================
import { createContext, useContext, useState, useCallback } from "react";
import { googleLogin, logout, checkAuthStatus } from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const handleGoogleLogin = useCallback(async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const userData = await googleLogin();
      setUser(userData);
    } catch (err) {
      setAuthError("Login failed. Please try again.");
      console.error("Auth error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    isLoading,
    authError,
    isAuthenticated: !!user,
    login: handleGoogleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
