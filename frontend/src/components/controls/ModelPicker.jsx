// ============================================================
// ModelPicker.jsx — Ishva AI
// Shows 5 AI model options. Enabled only when Manager is OFF.
// ============================================================
import { useApp } from "../../contexts/AppContext.jsx";
import { MODELS } from "../../utils/constants.js";
import "./ModelPicker.css";

export default function ModelPicker() {
  const { isManagerOn, selectedModelIds, toggleModel } = useApp();
  const isDisabled = isManagerOn;

  return (
    <div
      className={`model-picker ${isDisabled ? "model-picker--disabled" : ""}`}
      aria-label="AI model selection"
    >
      <div className="model-picker__header">
        <span className="model-picker__title">
          {isDisabled ? "🧠 Manager AI Active" : "🔧 Select Models"}
        </span>
        {isDisabled && (
          <span className="model-picker__hint">Manager is choosing for you</span>
        )}
      </div>

      <div className="model-picker__grid" role="group" aria-label="Available AI models">
        {MODELS.map((model) => {
          const isSelected = selectedModelIds.includes(model.id);
          return (
            <button
              key={model.id}
              id={`model-btn-${model.id}`}
              className={`model-picker__item ${isSelected && !isDisabled ? "model-picker__item--selected" : ""} ${isDisabled ? "model-picker__item--locked" : ""}`}
              onClick={() => !isDisabled && toggleModel(model.id)}
              disabled={isDisabled}
              aria-pressed={isSelected}
              aria-label={`${model.name} — ${model.label}: ${model.description}`}
            >
              <span className="model-picker__model-icon" aria-hidden="true" style={{ color: model.color }}>
                {model.icon}
              </span>
              <span className="model-picker__model-info">
                <span className="model-picker__model-name">{model.name}</span>
                <span className="model-picker__model-label">{model.label}</span>
              </span>
              {isSelected && !isDisabled && (
                <span className="model-picker__check" aria-hidden="true">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
