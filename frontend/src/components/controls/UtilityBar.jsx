// ============================================================
// UtilityBar.jsx — Ishva AI
// Action buttons: Deep Search, Image Gen, File Upload, Voice, Code.
// Placeholders for now — real actions wired in future sessions.
// ============================================================
import { useChat } from "../../contexts/ChatContext.jsx";
import { UTILITY_ACTIONS } from "../../utils/constants.js";
import "./UtilityBar.css";

const UTILITIES = [
  {
    id: UTILITY_ACTIONS.DEEP_SEARCH,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
    label: "Deep Search",
    tooltip: "Deep Search — AI-powered multi-source research",
    color: "var(--color-brand-secondary)",
  },
  {
    id: UTILITY_ACTIONS.IMAGE_GEN,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
    label: "Image Gen",
    tooltip: "Image Generation — create images from text",
    color: "var(--color-brand-accent)",
  },
  {
    id: UTILITY_ACTIONS.FILE_UPLOAD,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    label: "Upload",
    tooltip: "Upload a file, image, or document",
    color: "var(--color-success)",
  },
  {
    id: UTILITY_ACTIONS.VOICE_INPUT,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
    label: "Voice",
    tooltip: "Voice input — speak your message",
    color: "var(--color-warning)",
  },
  {
    id: UTILITY_ACTIONS.CODE_MODE,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    label: "Code",
    tooltip: "Code mode — optimized for programming help",
    color: "var(--color-brand-primary-light)",
  },
];

export default function UtilityBar() {
  const { handleUtilityAction } = useChat();

  return (
    <div className="utility-bar" role="toolbar" aria-label="Utility actions">
      {UTILITIES.map((u) => (
        <div key={u.id} className="utility-bar__item-wrapper">
          <button
            id={`utility-btn-${u.id}`}
            className="utility-bar__btn"
            onClick={() => handleUtilityAction(u.id)}
            aria-label={u.tooltip}
            title={u.tooltip}
            style={{ "--utility-color": u.color }}
          >
            <span className="utility-bar__btn-icon">{u.icon}</span>
            <span className="utility-bar__btn-label">{u.label}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
