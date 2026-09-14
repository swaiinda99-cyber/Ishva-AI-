// ============================================================
// AppPage.jsx — Ishva AI
// Main app shell: sidebar + main content area (nav + chat).
// ============================================================
import { useApp } from "../contexts/AppContext.jsx";
import { APP_MODES } from "../utils/constants.js";
import TopNav from "../components/layout/TopNav.jsx";
import Sidebar from "../components/layout/Sidebar.jsx";
import ManagerToggle from "../components/controls/ManagerToggle.jsx";
import ModelPicker from "../components/controls/ModelPicker.jsx";
import ChatWindow from "../components/chat/ChatWindow.jsx";
import ChatInput from "../components/chat/ChatInput.jsx";
import "./AppPage.css";

export default function AppPage() {
  const { activeMode, isSidebarOpen } = useApp();

  return (
    <div className="app-page">
      <TopNav />

      <div className="app-page__body">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main
          className={`app-page__main ${isSidebarOpen ? "app-page__main--sidebar-open" : ""}`}
          aria-label="Main content"
        >
          {/* Controls panel */}
          <div className="app-page__controls">
            <div className="app-page__controls-inner">
              <ManagerToggle />
              <ModelPicker />
            </div>

            {/* Forge badge */}
            {activeMode === APP_MODES.FORGE && (
              <div className="app-page__forge-badge anim-fade-in">
                <span className="app-page__forge-icon" aria-hidden="true">🔧</span>
                <span>
                  <strong>Ishva Forge</strong> — Describe what you want to build. I'll guide you through creating it.
                </span>
              </div>
            )}
          </div>

          {/* Chat area */}
          <div className="app-page__chat-area">
            <ChatWindow />
            <ChatInput />
          </div>
        </main>
      </div>
    </div>
  );
}
