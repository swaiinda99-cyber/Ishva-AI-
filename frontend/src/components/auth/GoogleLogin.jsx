// ============================================================
// GoogleLogin.jsx — Ishva AI
// Login page with Google OAuth button and branding.
// ============================================================
import { useAuth } from "../../contexts/AuthContext.jsx";
import "./GoogleLogin.css";

export default function GoogleLogin() {
  const { login, isLoading, authError } = useAuth();

  return (
    <div className="login-page">
      {/* Background gradient orbs */}
      <div className="login-page__orb login-page__orb--1" aria-hidden="true" />
      <div className="login-page__orb login-page__orb--2" aria-hidden="true" />
      <div className="login-page__orb login-page__orb--3" aria-hidden="true" />

      <div className="login-page__card anim-scale-in glass">
        {/* Logo / Brand */}
        <div className="login-page__brand">
          <div className="login-page__logo" aria-label="Ishva AI logo">
            <span className="login-page__logo-icon">⚡</span>
          </div>
          <h1 className="login-page__title">
            <span className="gradient-text">Ishva AI</span>
          </h1>
          <p className="login-page__company">by Ekaa Technologies</p>
          <p className="login-page__tagline">
            Build websites and apps — just by describing them.
          </p>
        </div>

        {/* Features list */}
        <ul className="login-page__features" aria-label="Key features">
          {[
            { icon: "💬", text: "Chat with the Manager AI — Ishva" },
            { icon: "🔧", text: "Build apps with Ishva Forge" },
            { icon: "🤖", text: "Powered by multiple AI models" },
            { icon: "🚀", text: "No coding experience needed" },
          ].map((f) => (
            <li key={f.text} className="login-page__feature-item">
              <span className="login-page__feature-icon" aria-hidden="true">{f.icon}</span>
              <span>{f.text}</span>
            </li>
          ))}
        </ul>

        {/* Error message */}
        {authError && (
          <div className="login-page__error" role="alert">
            {authError}
          </div>
        )}

        {/* Google Login Button */}
        <button
          id="google-login-btn"
          className="login-page__google-btn"
          onClick={login}
          disabled={isLoading}
          aria-label="Sign in with Google"
        >
          {isLoading ? (
            <span className="login-page__spinner anim-spin" aria-hidden="true" />
          ) : (
            <svg className="login-page__google-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          <span>{isLoading ? "Signing in..." : "Continue with Google"}</span>
        </button>

        <p className="login-page__terms">
          By signing in, you agree to Ekaa Technologies'{" "}
          <a href="#" aria-label="Terms of Service">Terms of Service</a> and{" "}
          <a href="#" aria-label="Privacy Policy">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
