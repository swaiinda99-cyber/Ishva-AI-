/**
 * Zero-Knowledge BYOK API Vault for Ishva AI
 * Keys reside exclusively in client localStorage / memory.
 * No proxy servers, zero external telemetry.
 */

const STORAGE_KEYS = {
  GEMINI: 'ishva_byok_gemini_key',
  GROQ: 'ishva_byok_groq_key'
};

export const VaultService = {
  /**
   * Retrieve active keys from client storage
   */
  getKeys() {
    return {
      gemini: localStorage.getItem(STORAGE_KEYS.GEMINI) || '',
      groq: localStorage.getItem(STORAGE_KEYS.GROQ) || ''
    };
  },

  /**
   * Save keys to local browser storage
   */
  saveKeys(geminiKey, groqKey) {
    if (geminiKey) localStorage.setItem(STORAGE_KEYS.GEMINI, geminiKey.trim());
    else localStorage.removeItem(STORAGE_KEYS.GEMINI);

    if (groqKey) localStorage.setItem(STORAGE_KEYS.GROQ, groqKey.trim());
    else localStorage.removeItem(STORAGE_KEYS.GROQ);
  },

  /**
   * Check if any valid keys are configured
   */
  hasKeys() {
    const keys = this.getKeys();
    return Boolean(keys.gemini || keys.groq);
  },

  /**
   * Test Google Gemini API connection
   */
  async testGemini(apiKey) {
    if (!apiKey) throw new Error('Gemini API key is required');
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(endpoint);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${res.status}: Failed to authenticate with Gemini API`);
    }
    return true;
  },

  /**
   * Test Groq API connection
   */
  async testGroq(apiKey) {
    if (!apiKey) throw new Error('Groq API key is required');
    const endpoint = 'https://api.groq.com/openai/v1/models';
    const res = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${res.status}: Failed to authenticate with Groq API`);
    }
    return true;
  },

  /**
   * Clear all stored BYOK keys
   */
  clearKeys() {
    localStorage.removeItem(STORAGE_KEYS.GEMINI);
    localStorage.removeItem(STORAGE_KEYS.GROQ);
  }
};
