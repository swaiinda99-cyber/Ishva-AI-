// ============================================================
// App.jsx — Ishva AI
// Root component: auth gate → app shell.
// ============================================================
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { AppProvider } from "./contexts/AppContext.jsx";
import { ChatProvider } from "./contexts/ChatContext.jsx";
import AuthGate from "./components/auth/AuthGate.jsx";
import AppPage from "./pages/AppPage.jsx";
import "./styles/global.css";

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AuthGate>
          <ChatProvider>
            <AppPage />
          </ChatProvider>
        </AuthGate>
      </AppProvider>
    </AuthProvider>
  );
}
