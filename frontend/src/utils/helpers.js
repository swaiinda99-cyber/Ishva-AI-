// ============================================================
// HELPERS — Ishva AI
// Pure utility functions — no side effects, no imports from app
// ============================================================

/**
 * Format a timestamp as a readable time string (e.g., "9:43 AM")
 */
export function formatTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date instanceof Date ? date : new Date(date));
}

/**
 * Format a date as a short date string (e.g., "Sep 14")
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date instanceof Date ? date : new Date(date));
}

/**
 * Generate a random ID for messages/conversations
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Pick a random item from an array
 */
export function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Simulate an async delay (for mock AI responses)
 * @param {number} ms - milliseconds to delay
 */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Truncate a string to a max length with ellipsis
 */
export function truncate(str, maxLen = 60) {
  if (!str || str.length <= maxLen) return str;
  return str.slice(0, maxLen).trim() + "...";
}

/**
 * Get user initials from a name string
 */
export function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((word) => word[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
}

/**
 * Check if a string is blank/empty
 */
export function isBlank(str) {
  return !str || str.trim().length === 0;
}

/**
 * Group messages by date for display in chat history
 */
export function groupByDate(messages) {
  const groups = {};
  messages.forEach((msg) => {
    const dateKey = formatDate(msg.timestamp);
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(msg);
  });
  return groups;
}
