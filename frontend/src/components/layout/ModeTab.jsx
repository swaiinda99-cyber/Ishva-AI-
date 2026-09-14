// ModeTab.jsx — Single tab button for mode switching
export default function ModeTab({ mode, label, isActive, onClick, icon }) {
  return (
    <button
      id={`mode-tab-${mode}`}
      className={`mode-tab ${isActive ? "mode-tab--active" : ""}`}
      onClick={() => onClick(mode)}
      aria-pressed={isActive}
      aria-label={`Switch to ${label} mode`}
    >
      <span className="mode-tab__icon" aria-hidden="true">{icon}</span>
      <span className="mode-tab__label">{label}</span>
      {isActive && <span className="mode-tab__indicator" aria-hidden="true" />}
    </button>
  );
}
