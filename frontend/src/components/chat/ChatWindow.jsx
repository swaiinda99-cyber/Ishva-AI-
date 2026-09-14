// ============================================================
// ChatWindow.jsx — Ishva AI
// Scrollable message history with typing indicator.
// ============================================================
import { useEffect, useRef } from "react";
import { useChat } from "../../contexts/ChatContext.jsx";
import { useApp } from "../../contexts/AppContext.jsx";
import { APP_MODES, APP_MODE_LABELS } from "../../utils/constants.js";
import MessageBubble from "./MessageBubble.jsx";
import "./ChatWindow.css";

function TypingIndicator() {
  return (
    <div className="typing-indicator anim-fade-in" role="status" aria-label="Ishva AI is thinking">
      <div className="typing-indicator__avatar" aria-hidden="true">⚡</div>
      <div className="typing-indicator__dots" aria-hidden="true">
        <span className="typing-indicator__dot" style={{ animationDelay: "0ms" }} />
        <span className="typing-indicator__dot" style={{ animationDelay: "160ms" }} />
        <span className="typing-indicator__dot" style={{ animationDelay: "320ms" }} />
      </div>
      <span className="typing-indicator__text">Ishva AI is thinking...</span>
    </div>
  );
}

function EmptyState({ mode }) {
  const suggestions = mode === APP_MODES.FORGE
    ? [
        "Build me a portfolio website for a photographer",
        "Create a landing page for my coffee shop",
        "Make a simple blog about travel",
        "Design an e-commerce page for handmade jewelry",
      ]
    : [
        "Explain quantum computing in simple terms",
        "Write a professional email template",
        "Help me brainstorm startup ideas",
        "What are the best practices for React?",
      ];

  return (
    <div className="chat-empty anim-fade-in">
      <div className="chat-empty__logo" aria-hidden="true">
        <span>⚡</span>
      </div>
      <h2 className="chat-empty__title">
        {mode === APP_MODES.FORGE ? (
          <>What do you want to <span className="gradient-text">build</span> today?</>
        ) : (
          <>How can <span className="gradient-text">Ishva AI</span> help you?</>
        )}
      </h2>
      <p className="chat-empty__subtitle">
        {mode === APP_MODES.FORGE
          ? "Describe your website or app in plain language — I'll guide you through building it."
          : "Ask me anything. I'll route your question to the best AI model for the job."}
      </p>

      <div className="chat-empty__suggestions" aria-label="Suggested messages">
        {suggestions.map((s, i) => (
          <button
            key={i}
            className="chat-empty__suggestion-btn"
            aria-label={`Use suggested message: ${s}`}
          >
            {s} →
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ChatWindow() {
  const { messages, isTyping } = useChat();
  const { activeMode } = useApp();
  const bottomRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div
      className="chat-window"
      role="log"
      aria-label={`${APP_MODE_LABELS[activeMode]} conversation`}
      aria-live="polite"
    >
      {messages.length === 0 ? (
        <EmptyState mode={activeMode} />
      ) : (
        <div className="chat-window__messages" role="list">
          {messages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              style={{ animationDelay: `${i * 30}ms` }}
            />
          ))}
        </div>
      )}

      {isTyping && (
        <div className="chat-window__typing">
          <TypingIndicator />
        </div>
      )}

      <div ref={bottomRef} aria-hidden="true" />
    </div>
  );
}
