// ============================================================
// APP CONTEXT — Ishva AI
// Global app state: active mode, Manager AI toggle, model selection.
// ============================================================
import { createContext, useContext, useState, useCallback } from "react";
import { APP_MODES, MODELS } from "../utils/constants.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [activeMode, setActiveMode] = useState(APP_MODES.CHAT);
  const [isManagerOn, setIsManagerOn] = useState(true);
  const [selectedModelIds, setSelectedModelIds] = useState([MODELS[0].id]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleManager = useCallback(() => {
    setIsManagerOn((prev) => !prev);
  }, []);

  const toggleModel = useCallback((modelId) => {
    setSelectedModelIds((prev) =>
      prev.includes(modelId)
        ? prev.filter((id) => id !== modelId)
        : [...prev, modelId]
    );
  }, []);

  const selectMode = useCallback((mode) => {
    setActiveMode(mode);
  }, []);

  const value = {
    activeMode,
    selectMode,
    isManagerOn,
    toggleManager,
    selectedModelIds,
    toggleModel,
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
