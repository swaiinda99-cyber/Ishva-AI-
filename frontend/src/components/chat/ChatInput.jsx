// ============================================================
// ChatInput.jsx — Ishva AI
// Message input area with send button.
// ============================================================
import { useState, useRef, useCallback } from "react";
import { useChat } from "../../contexts/ChatContext.jsx";
import UtilityBar from "../controls/UtilityBar.jsx";
import "./ChatInput.css";

export default function ChatInput() {
  const { sendMessage, isTyping } = useChat();
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);

  const handleSend = useCallback(() => {
    const msg = inputValue.trim();
    if (!msg || isTyping) return;
    sendMessage(msg);
    setInputValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [inputValue, isTyping, sendMessage]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleTextareaChange = useCallback((e) => {
    setInputValue(e.target.value);
    // Auto-resize textarea
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, []);

  const canSend = inputValue.trim().length > 0 && !isTyping;

  return (
    <div className="chat-input">
      {/* Utility bar */}
      <div className="chat-input__utilities">
        <UtilityBar />
      </div>

      {/* Input area */}
      <div className="chat-input__area">
        <textarea
          id="chat-textarea"
          ref={textareaRef}
          className="chat-input__textarea"
          value={inputValue}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder="Message Ishva AI... (Enter to send, Shift+Enter for new line)"
          rows={1}
          disabled={isTyping}
          aria-label="Chat message input"
          aria-multiline="true"
        />

        <button
          id="send-message-btn"
          className={`chat-input__send-btn ${canSend ? "chat-input__send-btn--active" : ""}`}
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
        >
          {isTyping ? (
            <span className="chat-input__spinner anim-spin" aria-hidden="true" />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </div>

      <p className="chat-input__hint">
        Ishva AI may make mistakes. {" "}
        <a href="#" aria-label="Learn about Ishva AI">Learn more.</a>
      </p>
    </div>
  );
}
