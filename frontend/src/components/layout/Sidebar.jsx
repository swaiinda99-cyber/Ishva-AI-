// ============================================================
// Sidebar.jsx — Ishva AI
// Conversation history, new chat button.
// ============================================================
import { useChat } from "../../contexts/ChatContext.jsx";
import { useApp } from "../../contexts/AppContext.jsx";
import { formatDate, truncate } from "../../utils/helpers.js";
import "./Sidebar.css";

export default function Sidebar() {
  const { conversations, activeConvId, setActiveConvId, startNewConversation } = useChat();
  const { isSidebarOpen } = useApp();

  return (
    <aside
      className={`sidebar glass ${isSidebarOpen ? "sidebar--open" : "sidebar--closed"}`}
      aria-label="Conversation history"
      aria-hidden={!isSidebarOpen}
    >
      {/* New chat */}
      <div className="sidebar__header">
        <button
          id="new-chat-btn"
          className="sidebar__new-btn"
          onClick={startNewConversation}
          aria-label="Start new conversation"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Chat
        </button>
      </div>

      {/* Conversation list */}
      <nav className="sidebar__conversations" aria-label="Previous conversations">
        <p className="sidebar__section-label">Recent</p>
        {conversations.length === 0 && (
          <p className="sidebar__empty">No conversations yet.</p>
        )}
        {conversations.map((conv) => (
          <button
            key={conv.id}
            className={`sidebar__conv-item ${conv.id === activeConvId ? "sidebar__conv-item--active" : ""}`}
            onClick={() => setActiveConvId(conv.id)}
            aria-label={`Open conversation: ${conv.title}`}
            aria-current={conv.id === activeConvId ? "true" : undefined}
          >
            <span className="sidebar__conv-icon" aria-hidden="true">💬</span>
            <span className="sidebar__conv-info">
              <span className="sidebar__conv-title truncate">{truncate(conv.title, 30)}</span>
              <span className="sidebar__conv-date">
                {conv.messages.length > 0
                  ? `${conv.messages.length} message${conv.messages.length !== 1 ? "s" : ""}`
                  : formatDate(conv.createdAt)}
              </span>
            </span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar__footer">
        <div className="sidebar__powered">
          <span className="sidebar__powered-badge">⚡ Ekaa Technologies</span>
        </div>
      </div>
    </aside>
  );
}
