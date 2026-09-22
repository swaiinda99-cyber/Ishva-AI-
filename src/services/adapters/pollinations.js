/**
 * Pollinations.ai Adapter — Ishva AI
 * Visual Agent: Free image generation, no API key required
 * Endpoint: https://image.pollinations.ai/
 */

const POLLINATIONS_BASE = 'https://image.pollinations.ai/prompt';
const POLLINATIONS_TEXT = 'https://text.pollinations.ai';

export const PollinationsAdapter = {
  /**
   * Generate an image URL from a text prompt.
   * Returns a direct URL — no API key needed.
   */
  generateImageUrl(prompt, options = {}) {
    const {
      width = 1024,
      height = 768,
      model = 'flux',
      seed = Math.floor(Math.random() * 999999),
      nologo = true
    } = options;

    const encoded = encodeURIComponent(prompt);
    return `${POLLINATIONS_BASE}/${encoded}?width=${width}&height=${height}&model=${model}&seed=${seed}&nologo=${nologo}`;
  },

  /**
   * Generate an image and return both URL + a resolved blob URL for display.
   */
  async generateImage(prompt, options = {}) {
    const url = this.generateImageUrl(prompt, options);

    // Pre-fetch to validate it loaded
    const res = await fetch(url);
    if (!res.ok) throw new Error(`[Visual Agent] Image generation failed: ${res.status}`);

    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    return {
      taskId: options.taskId || 'img-' + Date.now(),
      status: 'success',
      agentRole: 'visual',
      data: {
        imageUrl: url,
        blobUrl,
        prompt,
        dimensions: `${options.width || 1024}x${options.height || 768}`
      },
      confidenceScore: 0.92,
      notes: 'Generated via Pollinations.ai (free, no key required)'
    };
  },

  /**
   * Free text generation from Pollinations (no API key needed).
   * Useful as a fallback when no BYOK keys are provided.
   */
  async *streamText(prompt, systemPrompt = '', onChunk) {
    const messages = systemPrompt
      ? [{ role: 'system', content: systemPrompt }, { role: 'user', content: prompt }]
      : [{ role: 'user', content: prompt }];

    const body = {
      messages,
      model: 'openai',
      stream: true,
      seed: 42,
      jsonMode: false
    };

    const res = await fetch(`${POLLINATIONS_TEXT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error(`[Visual Agent] Pollinations text error ${res.status}`);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') return;
        try {
          const json = JSON.parse(data);
          const token = json?.choices?.[0]?.delta?.content;
          if (token) {
            if (onChunk) onChunk(token);
            yield token;
          }
        } catch { /* skip */ }
      }
    }
  }
};
