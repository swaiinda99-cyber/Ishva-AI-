// ============================================================
// CHAT CONTEXT — Ishva AI
// Message history, conversation management, sending messages.
// ============================================================
import { createContext, useContext, useState, useCallback } from "react";
import { sendMessage, deepSearch, generateImage } from "../services/mockAI.js";
import { generateId } from "../utils/helpers.js";
import { useApp } from "./AppContext.jsx";
import { UTILITY_ACTIONS } from "../utils/constants.js";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const { activeMode, isManagerOn, selectedModelIds } = useApp();
  const [conversations, setConversations] = useState([
    { id: "conv-default", title: "New Chat", messages: [], createdAt: new Date() },
  ]);
  const [activeConvId, setActiveConvId] = useState("conv-default");
  const [isTyping, setIsTyping] = useState(false);

  const activeConversation = conversations.find((c) => c.id === activeConvId);
  const messages = activeConversation?.messages ?? [];

  const addMessage = useCallback((convId, message) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id !== convId) return conv;
        const updatedMessages = [...conv.messages, message];
        // Auto-title from first user message
        const title =
          conv.title === "New Chat" && message.role === "user"
            ? message.content.slice(0, 40) + (message.content.length > 40 ? "..." : "")
            : conv.title;
        return { ...conv, messages: updatedMessages, title };
      })
    );
  }, []);

  const handleSendMessage = useCallback(
    async (content) => {
      if (!content.trim()) return;
      const convId = activeConvId;

      // Add user message
      const userMsg = {
        id: generateId(),
        role: "user",
        content,
        timestamp: new Date(),
      };
      addMessage(convId, userMsg);
      setIsTyping(true);

      try {
        const response = await sendMessage({
          message: content,
          mode: activeMode,
          isManagerOn,
          selectedModelIds,
          history: messages,
        });

        const aiMsg = {
          id: generateId(),
          role: "assistant",
          content: response.content,
          model: response.model,
          timestamp: response.timestamp,
        };
        addMessage(convId, aiMsg);
      } catch (err) {
        console.error("Send message error:", err);
        addMessage(convId, {
          id: generateId(),
          role: "assistant",
          content: "Something went wrong. Please try again.",
          model: "Error",
          timestamp: new Date(),
        });
      } finally {
        setIsTyping(false);
      }
    },
    [activeConvId, activeMode, isManagerOn, selectedModelIds, messages, addMessage]
  );

  const handleUtilityAction = useCallback(
    async (action, context = "") => {
      const convId = activeConvId;
      setIsTyping(true);
      try {
        let response;
        if (action === UTILITY_ACTIONS.DEEP_SEARCH) {
          response = await deepSearch(context || "your query");
        } else if (action === UTILITY_ACTIONS.IMAGE_GEN) {
          response = await generateImage(context || "your description");
        } else {
          response = {
            content: `✨ **${action.replace(/_/g, " ")} — Coming Soon**\n\nThis feature is on the roadmap for Ishva AI. Stay tuned for the full version!`,
            model: "System",
            timestamp: new Date(),
          };
        }
        addMessage(convId, {
          id: generateId(),
          role: "assistant",
          content: response.content,
          model: response.model,
          timestamp: response.timestamp,
        });
      } finally {
        setIsTyping(false);
      }
    },
    [activeConvId, addMessage]
  );

  const startNewConversation = useCallback(() => {
    const newConv = {
      id: generateId(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(newConv.id);
  }, []);

  const value = {
    conversations,
    activeConvId,
    activeConversation,
    messages,
    isTyping,
    sendMessage: handleSendMessage,
    handleUtilityAction,
    startNewConversation,
    setActiveConvId,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
