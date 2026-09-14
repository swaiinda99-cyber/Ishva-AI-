// ============================================================
// MOCK AI SERVICE — Ishva AI
// TODO: Replace with real API calls when credentials are ready.
// Function signatures here must match what real services will use
// so this file is a drop-in replacement.
// ============================================================

import { delay, pickRandom } from "../utils/helpers.js";
import {
  MOCK_CHAT_RESPONSES,
  MOCK_FORGE_RESPONSES,
  MANAGER_AI_STATUS_MESSAGES,
  APP_MODES,
} from "../utils/constants.js";

/**
 * Send a message and get a mock AI response.
 * TODO: Replace with real API call to backend /api/chat/send
 *
 * @param {Object} params
 * @param {string} params.message - The user's message
 * @param {string} params.mode - APP_MODES.CHAT or APP_MODES.FORGE
 * @param {boolean} params.isManagerOn - Whether Manager AI is active
 * @param {string[]} params.selectedModelIds - Selected model IDs (when manager OFF)
 * @param {Object[]} params.history - Previous messages for context
 * @returns {Promise<{content: string, model: string, isManager: boolean}>}
 */
export async function sendMessage({ message, mode, isManagerOn, selectedModelIds, history }) {
  // Simulate network latency (800ms – 2.5s)
  const latency = 800 + Math.random() * 1700;
  await delay(latency);

  const responsePool =
    mode === APP_MODES.FORGE ? MOCK_FORGE_RESPONSES : MOCK_CHAT_RESPONSES;
  const content = pickRandom(responsePool);

  // Simulate manager AI picking a model
  const chosenModel = isManagerOn
    ? `Manager AI → ${pickRandom(["Model A", "Model B", "Model C", "Model D", "Model E"])}`
    : selectedModelIds.length > 0
    ? selectedModelIds[0]
    : "Model A";

  return {
    content,
    model: chosenModel,
    isManager: isManagerOn,
    timestamp: new Date(),
  };
}

/**
 * Get a status message while the Manager AI is "thinking"
 * TODO: Replace with real streaming status from backend
 */
export function getManagerStatusMessage() {
  return pickRandom(MANAGER_AI_STATUS_MESSAGES);
}

/**
 * Mock Deep Search action
 * TODO: Replace with real search API (Perplexity, Brave, etc.)
 */
export async function deepSearch(query) {
  await delay(1500);
  return {
    content: `🔍 **Deep Search Results for: "${query}"**\n\nDeep Search is not yet connected to a real search API. In the full version, this would search across multiple sources and synthesize findings.\n\n*Coming soon in a future session.*`,
    model: "Deep Search",
    timestamp: new Date(),
  };
}

/**
 * Mock Image Generation action
 * TODO: Replace with real image gen API (DALL-E, Stable Diffusion, etc.)
 */
export async function generateImage(prompt) {
  await delay(2000);
  return {
    content: `🎨 **Image Generation: "${prompt}"**\n\nImage generation is not yet connected to a real image API. In the full version, this would create images via DALL-E, Stable Diffusion, or similar.\n\n*Coming soon in a future session.*`,
    model: "Image Gen",
    timestamp: new Date(),
  };
}
