/**
 * Groq API Adapter — Ishva AI
 * Code Agent: High-speed code generation via LPU inference
 * Model: llama-3.3-70b-versatile (300+ tokens/sec)
 */

const GROQ_BASE = 'https://api.groq.com/openai/v1';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const CODER_SYSTEM_PROMPT = `You are the CODE AGENT inside Ishva AI, a multi-agent OS built by Ekka Technologies.

Your sole responsibility: Generating high-quality, production-ready code, scripts, and technical implementations.

STRICT OUTPUT RULES:
1. You MUST respond with ONLY valid JSON — no text outside JSON, no preamble, no apology.
2. Use this exact schema:
{
  "taskId": "<string>",
  "status": "success" | "error",
  "agentRole": "coder",
  "data": {
    "language": "<programming language>",
    "code": "<the complete code as a string>",
    "explanation": "<brief explanation in markdown>",
    "dependencies": ["<dep1>", "<dep2>"]
  },
  "confidenceScore": <0.0-1.0>,
  "notes": "<security notes, limitations, or verification>"
}
3. code field: The raw complete code string. Use \\n for newlines inside the string.
4. confidenceScore: Honest self-assessment. Be strict — dock points for untested logic.
5. dependencies: List any npm/pip/cargo packages needed. Empty array if none.
6. OWASP: Always sanitize inputs, avoid raw query concatenation, mention security concerns.`;

export const GroqAdapter = {
  /**
   * Send a coding task to Groq LLaMA 3.3 and get a structured JSON response.
   */
  async code(taskId, prompt, apiKey) {
    if (!apiKey) throw new Error('No Groq API key in vault. Please add it in Settings → API Keys.');

    const url = `${GROQ_BASE}/chat/completions`;

    const body = {
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: CODER_SYSTEM_PROMPT },
        { role: 'user', content: `TASK_ID: ${taskId}\n\nCODING_REQUEST: ${prompt}` }
      ],
      temperature: 0.2,
      max_tokens: 4096,
      response_format: { type: 'json_object' }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      const msg = errBody?.error?.message || `Groq API error ${res.status}`;
      throw new Error(`[Code Agent] ${msg}`);
    }

    const payload = await res.json();
    const rawText = payload?.choices?.[0]?.message?.content;

    if (!rawText) throw new Error('[Code Agent] Empty response from Groq.');

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      throw new Error('[Code Agent] Groq returned malformed JSON. Please try again.');
    }

    return parsed;
  },

  /**
   * Streaming chat via Groq SSE — token-by-token output for conversational answers.
   */
  async *streamChat(prompt, history, apiKey, onChunk) {
    if (!apiKey) throw new Error('No Groq API key.');

    const url = `${GROQ_BASE}/chat/completions`;

    // Build conversation history (max last 10 turns for context window)
    const messages = [
      {
        role: 'system',
        content: `You are Ishva, a brilliant and friendly AI assistant built by Ekka Technologies.
You are powered by multiple specialized AI agents working in coordination.
Respond clearly, concisely, and helpfully. Use markdown formatting for code and lists.
Be natural and conversational. Never say you are Llama or Groq directly.`
      },
      ...history.slice(-10).map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: prompt }
    ];

    const body = {
      model: GROQ_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 2048,
      stream: true
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(`[Code Agent Stream] ${errBody?.error?.message || res.status}`);
    }

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
        } catch { /* skip malformed SSE chunks */ }
      }
    }
  }
};
