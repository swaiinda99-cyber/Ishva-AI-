// ============================================================
// ManagerToggle.jsx — Ishva AI
// Toggle switch for enabling/disabling the Manager AI.
// Visual-only for now. Real routing logic added in a future session.
// ============================================================
import { useApp } from "../../contexts/AppContext.jsx";
import "./ManagerToggle.css";

export default function ManagerToggle() {
  const { isManagerOn, toggleManager } = useApp();

  return (
    <div className={`manager-toggle ${isManagerOn ? "manager-toggle--on" : "manager-toggle--off"}`}>
      <div className="manager-toggle__label-group">
        <span className="manager-toggle__icon" aria-hidden="true">
          {isManagerOn ? "🧠" : "🔧"}
        </span>
        <div className="manager-toggle__text">
          <span className="manager-toggle__name">Enable Manager — Ishva AI</span>
          <span className="manager-toggle__status">
            {isManagerOn
              ? "Auto-selecting best model for each query"
              : "Manual model selection active"}
          </span>
        </div>
      </div>

      <button
        id="manager-toggle-btn"
        className={`manager-toggle__switch ${isManagerOn ? "manager-toggle__switch--on" : ""}`}
        onClick={toggleManager}
        role="switch"
        aria-checked={isManagerOn}
        aria-label={`Manager AI is ${isManagerOn ? "enabled" : "disabled"}. Click to ${isManagerOn ? "disable" : "enable"}.`}
      >
        <span className="manager-toggle__thumb" aria-hidden="true" />
        <span className="visually-hidden">
          {isManagerOn ? "Turn off Manager AI" : "Turn on Manager AI"}
        </span>
      </button>
    </div>
  );
}
