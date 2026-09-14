// ============================================================
// MessageBubble.jsx — Ishva AI
// Renders a single chat message (user or AI).
// ============================================================
import { formatTime } from "../../utils/helpers.js";
import "./MessageBubble.css";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const lines = message.content.split("\n");

  // Render content with basic markdown support (bold, code)
  function renderContent(text) {
    return text
      .split(/(\*\*.*?\*\*|`.*?`)/g)
      .map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={i} className="msg-bubble__inline-code">{part.slice(1, -1)}</code>;
        }
        return part;
      });
  }

  return (
    <div
      className={`msg-bubble ${isUser ? "msg-bubble--user" : "msg-bubble--ai"} anim-fade-in-up`}
      role="listitem"
    >
      {/* Avatar */}
      {!isUser && (
        <div className="msg-bubble__avatar" aria-hidden="true">
          <span>⚡</span>
        </div>
      )}

      <div className="msg-bubble__body">
        {/* Model tag (AI only) */}
        {!isUser && message.model && (
          <span className="msg-bubble__model-tag" aria-label={`Response from ${message.model}`}>
            {message.model}
          </span>
        )}

        {/* Message content */}
        <div className="msg-bubble__content">
          {lines.map((line, i) => (
            <p key={i} className="msg-bubble__line">
              {line ? renderContent(line) : <br />}
            </p>
          ))}
        </div>

        {/* Timestamp */}
        <span className="msg-bubble__time" aria-label={`Sent at ${formatTime(message.timestamp)}`}>
          {formatTime(message.timestamp)}
        </span>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="msg-bubble__avatar msg-bubble__avatar--user" aria-hidden="true">
          <span>👤</span>
        </div>
      )}
    </div>
  );
}
