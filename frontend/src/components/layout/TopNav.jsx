// ============================================================
// TopNav.jsx — Ishva AI
// Top navigation bar with mode tabs, logo, user menu.
// ============================================================
import { useState } from "react";
import { useApp } from "../../contexts/AppContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { APP_MODES, APP_MODE_LABELS } from "../../utils/constants.js";
import { getInitials } from "../../utils/helpers.js";
import ModeTab from "./ModeTab.jsx";
import "./TopNav.css";

const MODES = [
  { mode: APP_MODES.CHAT, icon: "💬" },
  { mode: APP_MODES.FORGE, icon: "🔧" },
];

export default function TopNav() {
  const { activeMode, selectMode, isSidebarOpen, setIsSidebarOpen } = useApp();
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="topnav glass" role="banner">
      {/* Left: Sidebar toggle + Logo */}
      <div className="topnav__left">
        <button
          id="sidebar-toggle-btn"
          className="topnav__icon-btn"
          onClick={() => setIsSidebarOpen((p) => !p)}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="topnav__brand" aria-label="Ishva AI">
          <span className="topnav__brand-icon" aria-hidden="true">⚡</span>
          <span className="topnav__brand-name gradient-text">Ishva AI</span>
        </div>
      </div>

      {/* Center: Mode tabs */}
      <nav className="topnav__tabs" aria-label="Application mode">
        {MODES.map(({ mode, icon }) => (
          <ModeTab
            key={mode}
            mode={mode}
            label={APP_MODE_LABELS[mode]}
            icon={icon}
            isActive={activeMode === mode}
            onClick={selectMode}
          />
        ))}
      </nav>

      {/* Right: User avatar */}
      <div className="topnav__right">
        <div className="topnav__user" style={{ position: "relative" }}>
          <button
            id="user-avatar-btn"
            className="topnav__avatar-btn"
            onClick={() => setIsUserMenuOpen((p) => !p)}
            aria-label="Open user menu"
            aria-expanded={isUserMenuOpen}
          >
            {user?.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                className="topnav__avatar-img"
              />
            ) : (
              <span className="topnav__avatar-initials">
                {getInitials(user?.name)}
              </span>
            )}
            <span className="topnav__avatar-status" aria-label="Online" />
          </button>

          {isUserMenuOpen && (
            <div className="topnav__user-menu glass anim-fade-in-down" role="menu">
              <div className="topnav__user-info">
                <strong>{user?.name}</strong>
                <span>{user?.email}</span>
              </div>
              <hr className="topnav__menu-divider" />
              <button
                id="logout-btn"
                className="topnav__menu-item"
                onClick={() => { logout(); setIsUserMenuOpen(false); }}
                role="menuitem"
              >
                <span aria-hidden="true">🚪</span> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
