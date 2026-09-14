// ============================================================
// AuthGate.jsx — Ishva AI
// Wraps the app — shows login page if not authenticated.
// ============================================================
import { useAuth } from "../../contexts/AuthContext.jsx";
import GoogleLogin from "./GoogleLogin.jsx";

export default function AuthGate({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <GoogleLogin />;
}
