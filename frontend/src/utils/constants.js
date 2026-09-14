// ============================================================
// CONSTANTS — Ishva AI
// App-wide constants. Swap real values here without touching UI.
// ============================================================

export const APP_MODES = {
  CHAT: "chat",
  FORGE: "forge",
};

export const APP_MODE_LABELS = {
  [APP_MODES.CHAT]: "Ishva Chat",
  [APP_MODES.FORGE]: "Ishva Forge",
};

// 5 generic model slots — swap display name and description when real APIs are ready
export const MODELS = [
  {
    id: "model-a",
    name: "Model A",
    label: "GPT-style",
    description: "Best for writing, summarization, and general Q&A",
    icon: "⚡",
    color: "#74aa9c",
  },
  {
    id: "model-b",
    name: "Model B",
    label: "Claude-style",
    description: "Best for analysis, reasoning, and long documents",
    icon: "🧠",
    color: "#cc785c",
  },
  {
    id: "model-c",
    name: "Model C",
    label: "Gemini-style",
    description: "Best for research, coding, and multimodal tasks",
    icon: "✨",
    color: "#4285f4",
  },
  {
    id: "model-d",
    name: "Model D",
    label: "Llama-style",
    description: "Best for open-domain chat and creative tasks",
    icon: "🦙",
    color: "#0467df",
  },
  {
    id: "model-e",
    name: "Model E",
    label: "DeepSeek-style",
    description: "Best for deep reasoning and technical problems",
    icon: "🔍",
    color: "#9b59b6",
  },
];

export const UTILITY_ACTIONS = {
  DEEP_SEARCH: "deep_search",
  IMAGE_GEN: "image_gen",
  FILE_UPLOAD: "file_upload",
  VOICE_INPUT: "voice_input",
  CODE_MODE: "code_mode",
};

// TODO: Replace with real AI when APIs are connected
export const MOCK_CHAT_RESPONSES = [
  "That's a great question! I'm currently running in demo mode, but the full Ishva AI would provide a detailed, tailored response here using the best-suited AI model for your query.",
  "Interesting! In the full version, the Manager AI would analyze your message and route it to the most capable model — for now, here's a placeholder response to show the interface working.",
  "I understand what you're looking for. Ishva AI's Manager would coordinate multiple models to give you the most accurate and helpful answer. Stay tuned — real AI responses are coming soon!",
  "Great thinking! This is where the magic of Ishva AI will shine — the Manager AI selects the perfect model for your specific need. For now, the UI is fully functional with mock responses.",
  "Perfect! I can see you're exploring Ishva AI. The full platform will route your query intelligently across GPT-style, Claude-style, Gemini-style, and other models for the best result.",
];

export const MOCK_FORGE_RESPONSES = [
  "🔧 **Ishva Forge is analyzing your request...**\n\nGreat idea! In the full version, I'd break this down into components, suggest a tech stack, and start generating your website structure. For now, this is a demo of the Forge interface.",
  "🏗️ **Building plan created!**\n\nIshva Forge would now create:\n- A homepage with your requested sections\n- Navigation structure\n- Color scheme suggestions\n- Component layout\n\nReal generation coming in the next phase!",
  "🎨 **Design analysis complete!**\n\nBased on your description, the Manager AI would select specialized models for:\n1. Layout planning (Gemini-style)\n2. Content writing (GPT-style)\n3. Code generation (Claude-style)\n\nThis is a preview of the multi-model Forge workflow.",
  "✅ **Ishva Forge understood your requirement!**\n\nIn the full version, I would now guide you through a step-by-step builder:\n→ Choose a template\n→ Customize sections\n→ Add your content\n→ Preview & publish\n\nThe builder wizard is coming in the next development session!",
];

export const MANAGER_AI_STATUS_MESSAGES = [
  "Manager AI is analyzing your query...",
  "Routing to the best model for this task...",
  "Coordinating models for optimal response...",
  "Ishva AI Manager is on it...",
];
