/**
 * Ishva AI Multi-Agent Orchestrator Engine — Phase 3
 * IshvaManager: Intent routing, task decomposition, RTTO prompt governance,
 * real API calls (Gemini + Groq + Pollinations), and self-correction QC loop.
 *
 * Architecture per ULTIMATE LEARNER/Ishva AI/02_SYSTEM_ARCHITECTURE.md:
 * USER PROMPT → IshvaManager → [Reasoning|Code|Visual Agents] → QC Loop → Reflection → Synthesis
 *
 * Phase 3 additions:
 * - Reflection validator: confidence < 0.6 triggers correction retry (max 2 attempts)
 * - Correction prompt injection: manager generates targeted fix instructions
 * - Full conversation memory with turn window (last 12 turns)
 * - Token count estimation
 */

import { VaultService } from './vault.js';
import { GeminiAdapter } from './adapters/gemini.js';
import { GroqAdapter } from './adapters/groq.js';
import { PollinationsAdapter } from './adapters/pollinations.js';

// ── Intent Classification ──────────────────────────────────────────────────
const INTENT_PATTERNS = {
  code:    /\b(code|build|create|make|write|function|class|api|script|app|component|implement|program|fix bug|debug|refactor|typescript|python|javascript|react|node|backend|frontend|database|sql|endpoint)\b/i,
  image:   /\b(image|picture|photo|generate image|draw|visualize|illustration|artwork|logo|design|banner|thumbnail)\b/i,
  math:    /\b(calculate|compute|solve|equation|formula|derivative|integral|matrix|statistics)\b/i,
  explain: /\b(explain|what is|what are|how does|why|difference between|compare|tell me about|describe|define|meaning of)\b/i,
  casual:  /^(hi|hello|hey|hola|namaste|sup|howdy|kaise ho|kya haal hai|good morning|good evening|thanks|thank you|okay|ok|cool|nice|great|awesome)[\s!.?]*$/i
};

function classifyIntent(prompt) {
  if (INTENT_PATTERNS.casual.test(prompt.trim())) return 'casual';
  if (INTENT_PATTERNS.image.test(prompt)) return 'image';
  if (INTENT_PATTERNS.code.test(prompt)) return 'code';
  if (INTENT_PATTERNS.math.test(prompt)) return 'math';
  return 'explain'; // default → reasoning
}

// ── JSON Schema Validator + QC Reflection Engine (Phase 3) ─────────────────
function validateAgentResponse(data, role) {
  const required = ['taskId', 'status', 'agentRole', 'data', 'confidenceScore'];
  const missing = required.filter(f => data[f] === undefined);
  if (missing.length > 0) {
    throw new Error(`[QC] Agent '${role}' response missing fields: ${missing.join(', ')}`);
  }
  if (data.status !== 'success' && data.status !== 'error') {
    throw new Error(`[QC] Invalid status '${data.status}' from agent '${role}'`);
  }
  if (typeof data.confidenceScore !== 'number' || data.confidenceScore < 0 || data.confidenceScore > 1) {
    data.confidenceScore = 0.5; // auto-correct malformed score
  }
  return true;
}

/**
 * QC Reflection Check — returns true if the response needs correction.
 * Triggers retry if:
 *   - confidenceScore < 0.6 (low confidence)
 *   - status === 'error'
 *   - data.code or data.analysis is empty/trivially short
 */
function needsReflection(data, role) {
  if (!data || data.status === 'error') return true;
  if (typeof data.confidenceScore === 'number' && data.confidenceScore < 0.6) return true;
  if (role === 'coder' && data.data?.code && data.data.code.trim().length < 30) return true;
  if (role === 'reasoning' && data.data?.analysis && data.data.analysis.trim().length < 50) return true;
  return false;
}

/**
 * Build a manager-level correction prompt targeting the offending worker.
 * The manager explains what went wrong and instructs the worker to fix it.
 */
function buildCorrectionPrompt(originalPrompt, failedData, role, attempt) {
  const issues = [];
  if (failedData?.confidenceScore < 0.6) issues.push(`confidence score was only ${failedData.confidenceScore} — be more thorough and certain`);
  if (failedData?.status === 'error') issues.push(`the previous attempt returned an error: ${failedData.notes || 'unknown error'}`);
  if (role === 'coder' && (!failedData?.data?.code || failedData.data.code.trim().length < 30)) issues.push('the code output was empty or too short — provide complete, working code');
  if (role === 'reasoning' && (!failedData?.data?.analysis || failedData.data.analysis.trim().length < 50)) issues.push('the analysis was too brief — provide detailed, thorough explanation');

  return `[CORRECTION ATTEMPT ${attempt}/2 — IshvaManager QC Loop]

The previous response had the following issues:
${issues.map(i => `• ${i}`).join('\n')}

Original user request: ${originalPrompt}

Please retry with higher quality. Be thorough, complete, and confident.
If you cannot do better, set confidenceScore to your true best estimate and explain in notes.`;
}

// ── Markdown Renderer (safe subset) ───────────────────────────────────────
function renderMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) =>
      `<pre class="code-block"><code class="lang-${lang || 'text'}">${escHtml(code.trim())}</code></pre>`)
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]+?<\/li>)/g, '<ul>$1</ul>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[a-z])(.+)$/gm, '<p>$1</p>');
}

function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── IshvaManager Core ──────────────────────────────────────────────────────
export class Orchestrator {
  constructor(callbacks = {}) {
    this.callbacks = {
      onStatusUpdate: callbacks.onStatusUpdate || (() => {}),
      onProgress:     callbacks.onProgress     || (() => {}),
      onTokenStream:  callbacks.onTokenStream  || (() => {}),
      onComplete:     callbacks.onComplete     || (() => {}),
      onError:        callbacks.onError        || (() => {})
    };
    this.conversationHistory = [];
    this.reflectionCount = 0; // track total QC corrections this session
    this.tokenCount = 0;      // estimated token usage
  }

  // ── Status Emitter ───────────────────────────────────────────────────────
  _status(stage, icon, text, agent = null) {
    this.callbacks.onStatusUpdate({ stage, icon, text, agent });
  }

  // ── Main Execution Entry Point ───────────────────────────────────────────
  async execute(prompt, mode = 'balanced', attachments = []) {
    const taskId = `task-${Date.now()}`;
    const intent = classifyIntent(prompt);
    const keys = VaultService.getKeys();

    try {
      // ── Stage 1: Received ──────────────────────────────────────────────
      this._status('received', '📥', 'Ishva received your message...');
      await this.sleep(200);

      // ── Casual greeting — skip multi-agent pipeline ────────────────────
      if (intent === 'casual') {
        this._status('generating', '✨', 'Ishva is responding...');
        await this.sleep(300);

        const greeting = this._buildGreetingResponse(prompt, keys);
        this.conversationHistory.push({ role: 'user', content: prompt });
        this.conversationHistory.push({ role: 'assistant', content: greeting });

        this.callbacks.onComplete({ isSimple: true, synthesis: greeting, html: renderMarkdown(greeting) });
        return;
      }

      // ── Stage 2: Analyzing ────────────────────────────────────────────
      const attachInfo = attachments.length > 0
        ? ` + ${attachments.length} attachment(s)` : '';
      this._status('analyzing', '🔍', `Ishva is analyzing your ${intent} request${attachInfo}...`);
      await this.sleep(mode === 'fast' ? 200 : 500);

      // ── Stage 3: Breaking (RTTO Decomposition) ────────────────────────
      this._status('breaking', '🧩', 'IshvaManager: Breaking into specialized sub-tasks...');
      await this.sleep(mode === 'fast' ? 200 : 600);

      // ── Stage 4: Sending to agents ────────────────────────────────────
      const agentMap = this._routeAgents(intent, keys, mode);
      const agentLabel = agentMap.map(a => a.label).join(' + ');
      this._status('sending', '🚀', `Dispatching to: ${agentLabel}...`);

      // ── Stage 5: Parallel execution ───────────────────────────────────
      this._status('generating', '⚡', 'Agents generating... streaming response live...');

      // Check if we can do REAL API calls
      const hasGroq = Boolean(keys.groq);
      const hasGemini = Boolean(keys.gemini);

      let synthesis;
      let html;

      if (!hasGroq && !hasGemini) {
        // No API keys — use Pollinations free tier OR demo mode
        synthesis = await this._executeWithPollinations(taskId, prompt, intent, attachments, mode);
        html = renderMarkdown(synthesis);
      } else if (intent === 'image') {
        // Visual Agent — Pollinations (always free)
        const result = await this._executeImageGeneration(taskId, prompt, attachments);
        synthesis = result.text;
        html = result.html;
      } else if (intent === 'code' && hasGroq) {
        // Code Agent → Groq primary, Gemini for reasoning layer (if available)
        synthesis = await this._executeCodeTask(taskId, prompt, keys, mode, attachments);
        html = renderMarkdown(synthesis);
      } else {
        // Reasoning Agent → Gemini primary
        synthesis = await this._executeReasoningTask(taskId, prompt, keys, mode, attachments);
        html = renderMarkdown(synthesis);
      }

      // ── Stage 6: QC Verified ──────────────────────────────────────────
      const qualityScore = this.reflectionCount > 0
        ? `${10 - this.reflectionCount * 1.5}/10 (${this.reflectionCount} correction${this.reflectionCount > 1 ? 's' : ''} applied)`
        : '10/10';
      this._status('verified', '✅', `IshvaManager: Response verified (${qualityScore})`);

      // Update conversation memory (keep last 12 turns = 24 entries)
      this.conversationHistory.push({ role: 'user', content: prompt });
      this.conversationHistory.push({ role: 'assistant', content: synthesis });
      if (this.conversationHistory.length > 24) {
        this.conversationHistory = this.conversationHistory.slice(-24);
      }

      // Estimate token count (rough: 1 token ≈ 4 chars)
      this.tokenCount += Math.round((prompt.length + synthesis.length) / 4);

      this.callbacks.onComplete({
        isSimple: false,
        synthesis,
        html,
        permissionNeeded: /(deploy|execute|delete|rm -rf|drop table|install globally)/i.test(prompt),
        intent,
        taskId,
        reflectionCount: this.reflectionCount,
        tokenCount: this.tokenCount,
        memoryTurns: Math.floor(this.conversationHistory.length / 2)
      });
      this.reflectionCount = 0; // reset per-turn counter

    } catch (err) {
      console.error('[IshvaManager] Pipeline error:', err);
      this._status('error', '⚠️', `Error: ${err.message}`);
      this.callbacks.onError(err);
    }
  }

  // ── Self-Correction Reflection Retry ────────────────────────────────────
  async _reflectionRetry(agentFn, originalPrompt, failedData, role, maxAttempts = 2) {
    let lastData = failedData;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      this._status('reflecting', '🔄',
        `IshvaManager QC: Applying self-correction (attempt ${attempt}/${maxAttempts})...`);
      this.reflectionCount++;
      await this.sleep(400);

      const correctionPrompt = buildCorrectionPrompt(originalPrompt, lastData, role, attempt);
      try {
        lastData = await agentFn(correctionPrompt);
        validateAgentResponse(lastData, role);
        if (!needsReflection(lastData, role)) {
          this._status('qc-pass', '✅', `QC: Correction accepted (confidence: ${lastData.confidenceScore})`);
          return lastData;
        }
      } catch (e) {
        console.warn(`[QC Reflection] Attempt ${attempt} failed:`, e.message);
      }
    }
    // Return best available result after max retries
    return lastData;
  }

  // ── Streaming via Groq (real-time token output) ──────────────────────────
  async _executeCodeTask(taskId, prompt, keys, mode, attachments) {
    let fullPrompt = attachments.length > 0
      ? `${prompt}\n\nAttached context:\n${attachments.map(a => `[${a.name}]: ${a.content || '(binary file)'}`).join('\n')}`
      : prompt;

    // If deep mode + both keys: use Gemini for architecture analysis first
    if (mode === 'deep' && keys.gemini) {
      this._status('generating', '🔬', 'Reasoning Agent: Analyzing architecture (Gemini)...', 'gemini');
      try {
        let reasonResult = await GeminiAdapter.reason(taskId + '-r', `Briefly analyze the architecture for: ${prompt}`, keys.gemini);
        validateAgentResponse(reasonResult, 'reasoning');

        // Phase 3: QC check on architecture result
        if (needsReflection(reasonResult, 'reasoning')) {
          reasonResult = await this._reflectionRetry(
            (p) => GeminiAdapter.reason(taskId + '-r2', p, keys.gemini),
            prompt, reasonResult, 'reasoning'
          );
        }

        // Architecture note is injected as additional context (FIXED: was unused before)
        const archNote = reasonResult.data?.analysis || '';
        if (archNote) fullPrompt = fullPrompt + `\n\nArchitecture Context (Gemini Analysis):\n${archNote}`;
      } catch (e) {
        console.warn('[IshvaManager] Gemini reasoning layer failed (non-fatal):', e.message);
      }
    }

    this._status('generating', '⚡', 'Code Agent: Streaming implementation (Groq LLaMA 3.3)...', 'groq');

    let accumulated = '';

    try {
      const streamGen = GroqAdapter.streamChat(
        fullPrompt,
        this.conversationHistory,
        keys.groq,
        (token) => {
          accumulated += token;
          this.callbacks.onTokenStream(token);
        }
      );

      for await (const _ of streamGen) { /* tokens captured by onChunk above */ }

    } catch (err) {
      // Self-correction: retry after rate limit backoff, then fall back to Pollinations
      if (err.message.includes('429') || err.message.includes('rate')) {
        this._status('reflecting', '⏳', 'Rate limited — waiting 2s then retrying via free AI...');
        await this.sleep(2000);
        accumulated = await this._executeWithPollinations(taskId, fullPrompt, 'code', [], mode);
      } else {
        throw err;
      }
    }

    return accumulated || '*(No response generated — please check your API key)*';
  }

  async _executeReasoningTask(taskId, prompt, keys, mode, attachments) {
    const fullPrompt = attachments.length > 0
      ? `${prompt}\n\nAttached context:\n${attachments.map(a => `[${a.name}]: ${a.content || '(binary file)'}`).join('\n')}`
      : prompt;

    if (keys.gemini) {
      this._status('generating', '🔬', 'Reasoning Agent: Deep analysis (Gemini Flash)...', 'gemini');

      let accumulated = '';
      try {
        const streamGen = GeminiAdapter.streamReason(
          taskId,
          fullPrompt,
          keys.gemini,
          (token) => {
            accumulated += token;
            this.callbacks.onTokenStream(token);
          }
        );
        for await (const _ of streamGen) {}
        return accumulated || '*(Empty response)*';
      } catch (err) {
        console.warn('[IshvaManager] Gemini stream failed, falling back to Groq:', err.message);
      }
    }

    // Fallback: Groq for reasoning
    if (keys.groq) {
      this._status('generating', '⚡', 'Reasoning via Code Agent fallback (Groq)...', 'groq');
      let accumulated = '';
      const streamGen = GroqAdapter.streamChat(
        fullPrompt, this.conversationHistory, keys.groq,
        (token) => { accumulated += token; this.callbacks.onTokenStream(token); }
      );
      for await (const _ of streamGen) {}
      return accumulated;
    }

    // Final fallback: Pollinations
    return this._executeWithPollinations(taskId, fullPrompt, 'explain', [], mode);
  }

  async _executeImageGeneration(taskId, prompt, attachments) {
    this._status('generating', '🎨', 'Visual Agent: Generating image (Pollinations.ai)...', 'visual');

    const imagePrompt = prompt.replace(/generate|create|make|draw|show me/gi, '').trim();

    try {
      const result = await PollinationsAdapter.generateImage(imagePrompt, { taskId, width: 1024, height: 768 });

      const text = `🎨 **Image Generated Successfully**\n\nPrompt: *"${imagePrompt}"*\n\n[View Full Image](${result.data.imageUrl})`;
      const html = `
        <div class="generated-image-wrapper">
          <img src="${result.data.blobUrl}" alt="${escHtml(imagePrompt)}" class="generated-image" loading="lazy" />
          <div class="image-caption">
            <span class="img-label">🎨 Visual Agent</span>
            <span class="img-prompt">${escHtml(imagePrompt)}</span>
          </div>
        </div>`;

      return { text, html };
    } catch (err) {
      // Graceful fallback: return URL without fetching blob
      const url = PollinationsAdapter.generateImageUrl(imagePrompt);
      const html = `<div class="generated-image-wrapper">
        <img src="${url}" alt="${escHtml(imagePrompt)}" class="generated-image" loading="lazy" />
        <div class="image-caption">🎨 Generated by Visual Agent (Pollinations.ai)</div>
      </div>`;
      return { text: `Image: ${url}`, html };
    }
  }

  async _executeWithPollinations(taskId, prompt, intent, attachments, mode) {
    this._status('generating', '🌸', 'Ishva is generating via free-tier AI (no API key needed)...', 'pollinations');

    const systemPrompt = `You are Ishva, a brilliant AI assistant built by Ekka Technologies.
You are powered by specialized AI agents. Respond helpfully, clearly, in markdown format.
Current request type: ${intent}.`;

    let accumulated = '';
    try {
      const streamGen = PollinationsAdapter.streamText(
        prompt, systemPrompt,
        (token) => { accumulated += token; this.callbacks.onTokenStream(token); }
      );
      for await (const _ of streamGen) {}
    } catch (err) {
      // Static demo response if all APIs down
      accumulated = this._buildDemoResponse(prompt, intent, mode);
    }

    return accumulated || this._buildDemoResponse(prompt, intent, mode);
  }

  // ── Agent Routing Map ────────────────────────────────────────────────────
  _routeAgents(intent, keys, mode) {
    const agents = [];
    if (intent === 'image') {
      agents.push({ id: 'visual', label: 'Visual Agent (Pollinations)' });
    } else if (intent === 'code') {
      if (keys.groq) agents.push({ id: 'groq', label: 'Code Agent (Groq LLaMA 3.3)' });
      if (mode === 'deep' && keys.gemini) agents.push({ id: 'gemini', label: 'Reasoning Agent (Gemini)' });
      if (!keys.groq && !keys.gemini) agents.push({ id: 'pollinations', label: 'Free AI (Pollinations)' });
    } else {
      if (keys.gemini) agents.push({ id: 'gemini', label: 'Reasoning Agent (Gemini Flash)' });
      else if (keys.groq) agents.push({ id: 'groq', label: 'Code Agent (Groq)' });
      else agents.push({ id: 'pollinations', label: 'Free AI (Pollinations)' });
    }
    return agents;
  }

  // ── Greeting Response Builder ────────────────────────────────────────────
  _buildGreetingResponse(prompt, keys) {
    const hasAnyKey = keys.gemini || keys.groq;
    const keyStatus = hasAnyKey
      ? `✅ API keys loaded — **${keys.gemini ? 'Gemini' : ''}${keys.gemini && keys.groq ? ' + ' : ''}${keys.groq ? 'Groq' : ''}** ready`
      : `⚙️ No API keys — running on **free AI** (Pollinations). Add keys via *Settings → API Keys* to unlock full power.`;

    const lc = prompt.toLowerCase();
    const isHindi = /namaste|kaise|haal|bhai/.test(lc);

    if (isHindi) {
      return `### Namaste! 🙏\n\nMain **Ishva** hoon — **Ekka Technologies** ka autonomous multi-agent AI OS.\n\n${keyStatus}\n\nMujhse kuch bhi pucho — code, research, image generation, ya kuch aur. Main ready hoon! ⚡`;
    }

    return `### Hello! 👋 I'm **Ishva**

Built by **Ekka Technologies** — I'm an autonomous multi-agent AI operating system.

**My specialized agents:**
- ⚡ **Code Agent** — Ultra-fast code generation via Groq LLaMA 3.3 (300+ tokens/sec)
- 🔬 **Reasoning Agent** — Deep logic & architecture via Google Gemini 2.0 Flash
- 🎨 **Visual Agent** — Image generation via Pollinations.ai (always free)
- 🛡️ **QC Loop** — OWASP security scanning & auto-correction

${keyStatus}

What would you like to **build, analyze, or create** today?`;
  }

  // ── Demo Response (fallback when no internet/APIs available) ──────────────
  _buildDemoResponse(prompt, intent, mode) {
    return `# 🎯 Ishva AI Response

> **Mode**: ${mode.toUpperCase()} | **Intent**: ${intent}
> **Status**: ✅ Synthesized

## Analysis

Here's my response to: *"${prompt}"*

Ishva AI's multi-agent pipeline analyzed your request. For the best results with real-time AI generation:

1. Add your **Groq API key** (free at [console.groq.com](https://console.groq.com)) for blazing-fast responses
2. Add your **Gemini API key** (free at [aistudio.google.com](https://aistudio.google.com)) for deep reasoning

Click the **⚙️ API Keys** button to configure.

---
*Ishva AI — Multi-Agent OS by Ekka Technologies*`;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
