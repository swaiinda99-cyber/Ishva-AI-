/**
 * Google Gemini API Adapter — Ishva AI
 * Reasoning Agent: Deep logic, research, architecture analysis
 * Model: gemini-2.0-flash-exp (free tier)
 */

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const GEMINI_MODEL = 'gemini-2.0-flash-exp';

const REASONING_SYSTEM_PROMPT = `You are the REASONING AGENT inside Ishva AI, a multi-agent OS built by Ekka Technologies.

Your sole responsibility: Deep analytical thinking, research, architecture, and explanation.

STRICT OUTPUT RULES:
1. You MUST respond with ONLY valid JSON — no markdown outside JSON, no preamble.
2. Use this exact schema:
{
  "taskId": "<string>",
  "status": "success" | "error",
  "agentRole": "reasoning",
  "data": {
    "analysis": "<detailed markdown content>",
    "keyPoints": ["<point1>", "<point2>"],
    "sources": []
  },
  "confidenceScore": <0.0-1.0>,
  "notes": "<optional verification note>"
}
3. analysis field: Full markdown (headers, code blocks, lists allowed INSIDE the JSON string).
4. confidenceScore: Honest self-assessment. Never 1.0 unless certain.
5. If you cannot answer, set status to "error" and explain in notes.`;

export const GeminiAdapter = {
  /**
   * Send a reasoning task to Gemini and get a structured JSON response.
   */
  async reason(taskId, prompt, apiKey) {
    if (!apiKey) throw new Error('No Gemini API key in vault. Please add it in Settings → API Keys.');

    const url = `${GEMINI_BASE}/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const body = {
      system_instruction: {
        parts: [{ text: REASONING_SYSTEM_PROMPT }]
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: `TASK_ID: ${taskId}\n\nUSER_PROMPT: ${prompt}` }]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.3,
        maxOutputTokens: 4096
      }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      const msg = errBody?.error?.message || `Gemini API error ${res.status}`;
      throw new Error(`[Reasoning Agent] ${msg}`);
    }

    const payload = await res.json();
    const rawText = payload?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) throw new Error('[Reasoning Agent] Empty response from Gemini.');

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      // Gemini sometimes wraps in markdown — strip it
      const stripped = rawText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
      parsed = JSON.parse(stripped);
    }

    return parsed;
  },

  /**
   * Streaming text generation via Gemini SSE (used for live token-by-token rendering).
   */
  async *streamReason(taskId, prompt, apiKey, onChunk) {
    if (!apiKey) throw new Error('No Gemini API key.');

    const url = `${GEMINI_BASE}/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey)}`;

    const body = {
      system_instruction: {
        parts: [{ text: 'You are Ishva, a highly capable AI assistant. Respond clearly and helpfully in markdown.' }]
      },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(`[Gemini Stream] ${errBody?.error?.message || res.status}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // keep incomplete line

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') return;
        try {
          const json = JSON.parse(data);
          const token = json?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (token) {
            if (onChunk) onChunk(token);
            yield token;
          }
        } catch { /* skip malformed chunks */ }
      }
    }
  }
};
