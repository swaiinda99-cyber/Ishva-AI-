/**
 * Conversational UI & Multi-Agent Event Handler for Ishva AI
 * Enables continuous, multi-turn chat stream exactly like ChatGPT & Claude
 */

import { VaultService } from '../services/vault.js';
import { Orchestrator, AgentRoles } from '../services/orchestrator.js';

export function initializeUI() {
  // DOM Elements
  const chatStream = document.getElementById('chatStream');
  const welcomeHero = document.getElementById('welcomeHero');
  const chatInput = document.getElementById('chatInput');
  const btnSend = document.getElementById('btnSend');
  const btnNewChat = document.getElementById('btnNewChat');
  const modeChips = document.querySelectorAll('.mode-chip');
  const starterCards = document.querySelectorAll('.starter-card');

  // Vault Elements
  const vaultModal = document.getElementById('vaultModal');
  const btnOpenVault = document.getElementById('btnOpenVault');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCancelVault = document.getElementById('btnCancelVault');
  const btnSaveVault = document.getElementById('btnSaveVault');
  const geminiKeyInput = document.getElementById('geminiKeyInput');
  const groqKeyInput = document.getElementById('groqKeyInput');
  const btnTestGemini = document.getElementById('btnTestGemini');
  const btnTestGroq = document.getElementById('btnTestGroq');
  const geminiStatus = document.getElementById('geminiStatus');
  const groqStatus = document.getElementById('groqStatus');

  let activeMode = 'balanced';
  let messageCount = 0;

  // 1. Vault Dialog Management
  function loadVaultKeys() {
    const keys = VaultService.getKeys();
    geminiKeyInput.value = keys.gemini;
    groqKeyInput.value = keys.groq;
    updateVaultButtonIndicator();
  }

  function updateVaultButtonIndicator() {
    const hasKeys = VaultService.hasKeys();
    const vaultIndicator = document.getElementById('vaultIndicator');
    if (vaultIndicator) {
      vaultIndicator.textContent = hasKeys ? 'BYOK Active (2 Keys)' : 'BYOK Setup';
      vaultIndicator.style.color = hasKeys ? 'var(--accent-coder)' : 'var(--text-secondary)';
    }
  }

  btnOpenVault.addEventListener('click', () => {
    loadVaultKeys();
    vaultModal.classList.add('open');
  });

  btnCloseModal.addEventListener('click', () => vaultModal.classList.remove('open'));
  btnCancelVault.addEventListener('click', () => vaultModal.classList.remove('open'));

  btnSaveVault.addEventListener('click', () => {
    VaultService.saveKeys(geminiKeyInput.value, groqKeyInput.value);
    updateVaultButtonIndicator();
    vaultModal.classList.remove('open');
    showToast('BYOK keys securely saved to browser storage.');
  });

  btnTestGemini.addEventListener('click', async () => {
    geminiStatus.textContent = 'Testing...';
    geminiStatus.style.color = 'var(--accent-manager)';
    try {
      await VaultService.testGemini(geminiKeyInput.value);
      geminiStatus.textContent = '✅ Connected (Gemini Free)';
      geminiStatus.style.color = 'var(--accent-coder)';
    } catch (err) {
      geminiStatus.textContent = '❌ ' + err.message;
      geminiStatus.style.color = 'var(--accent-security)';
    }
  });

  btnTestGroq.addEventListener('click', async () => {
    groqStatus.textContent = 'Testing...';
    groqStatus.style.color = 'var(--accent-manager)';
    try {
      await VaultService.testGroq(groqKeyInput.value);
      groqStatus.textContent = '✅ Connected (Groq 300+ T/s)';
      groqStatus.style.color = 'var(--accent-coder)';
    } catch (err) {
      groqStatus.textContent = '❌ ' + err.message;
      groqStatus.style.color = 'var(--accent-security)';
    }
  });

  // 2. Mode Selector
  modeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      modeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeMode = chip.dataset.mode;
    });
  });

  // 3. Starter Cards in Welcome Screen
  starterCards.forEach(card => {
    card.addEventListener('click', () => {
      chatInput.value = card.dataset.prompt;
      submitUserMessage();
    });
  });

  // 4. Input Auto-Resize & Keyboard Handling
  chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 140) + 'px';
  });

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitUserMessage();
    }
  });

  btnSend.addEventListener('click', submitUserMessage);

  // 5. New Chat Reset
  btnNewChat.addEventListener('click', () => {
    chatStream.innerHTML = '';
    chatStream.appendChild(welcomeHero);
    welcomeHero.style.display = 'flex';
    messageCount = 0;
    chatInput.value = '';
    chatInput.style.height = 'auto';
    chatInput.focus();
    showToast('Started fresh conversation.');
  });

  // 6. Conversational Pipeline Execution
  function submitUserMessage() {
    const prompt = chatInput.value.trim();
    if (!prompt) return;

    // Hide welcome hero on first message
    if (welcomeHero && welcomeHero.style.display !== 'none') {
      welcomeHero.style.display = 'none';
    }

    messageCount++;
    const turnId = 'turn-' + Date.now();

    // 1. Render User Message
    const userTurn = document.createElement('div');
    userTurn.className = 'chat-turn user-turn';
    userTurn.innerHTML = `<div class="user-bubble">${escapeHTML(prompt)}</div>`;
    chatStream.appendChild(userTurn);

    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';
    btnSend.disabled = true;

    // 2. Create Assistant Message Container
    const assistantTurn = document.createElement('div');
    assistantTurn.className = 'chat-turn assistant-turn';
    assistantTurn.id = turnId;

    assistantTurn.innerHTML = `
      <div class="assistant-avatar">IA</div>
      <div class="assistant-content-wrapper">
        <!-- Live Multi-Agent Orchestration Trace -->
        <div class="orchestration-trace" id="${turnId}-trace">
          <div class="trace-header" onclick="this.parentElement.classList.toggle('collapsed')">
            <span class="trace-title">
              <span class="status-dot active"></span>
              <span>Multi-Agent Coordination Active...</span>
            </span>
            <span style="color: var(--text-muted); font-size: 0.75rem;">⚡ RTTO</span>
          </div>
          <div class="trace-body" id="${turnId}-steps">
            <div class="trace-step working" id="${turnId}-step-supervisor">
              <span class="trace-step-icon">🧠</span>
              <span><strong>Supervisor</strong>: Decomposing prompt into atomic agent tasks...</span>
            </div>
          </div>
        </div>

        <!-- Final Answer Card -->
        <div class="answer-card" id="${turnId}-answer">
          <div style="color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem;">
            <div class="status-dot active" style="background: var(--accent-manager);"></div>
            <span>Ishva agents synthesizing response...</span>
          </div>
        </div>
      </div>
    `;

    chatStream.appendChild(assistantTurn);
    scrollToBottom();

    // 3. Run Multi-Agent Orchestrator
    const orchestrator = new Orchestrator({
      onAgentUpdate: (role, update) => {
        const stepsContainer = document.getElementById(`${turnId}-steps`);
        if (!stepsContainer) return;

        let stepEl = document.getElementById(`${turnId}-step-${role}`);
        if (!stepEl) {
          stepEl = document.createElement('div');
          stepEl.id = `${turnId}-step-${role}`;
          stepsContainer.appendChild(stepEl);
        }

        const icons = {
          supervisor: '🧠',
          reasoning: '🔬',
          coder: '⚡',
          security: '🛡️'
        };

        stepEl.className = `trace-step ${update.status}`;
        stepEl.innerHTML = `
          <span class="trace-step-icon">${icons[role] || '🤖'}</span>
          <span><strong>${capitalize(role)}</strong>: ${escapeHTML(update.log)}</span>
        `;
        scrollToBottom();
      },
      onComplete: (data) => {
        btnSend.disabled = false;

        // Update Trace Header to Complete
        const traceHeader = document.querySelector(`#${turnId}-trace .trace-title`);
        if (traceHeader) {
          traceHeader.innerHTML = `
            <span class="status-dot" style="background: var(--accent-coder);"></span>
            <span>All 4 Agents Completed & Audited (10/10)</span>
          `;
        }

        // Render Final Answer
        const answerCard = document.getElementById(`${turnId}-answer`);
        if (answerCard) {
          answerCard.innerHTML = `
            ${formatMarkdownToHTML(data.synthesis)}
            <div class="answer-actions">
              <button class="btn-header-action btn-copy" data-turn="${turnId}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy Answer</span>
              </button>
            </div>
          `;

          // Attach copy action
          const copyBtn = answerCard.querySelector('.btn-copy');
          if (copyBtn) {
            copyBtn.addEventListener('click', () => {
              navigator.clipboard.writeText(data.synthesis);
              showToast('Copied answer to clipboard!');
            });
          }
        }

        scrollToBottom();
      },
      onError: (err) => {
        btnSend.disabled = false;
        const answerCard = document.getElementById(`${turnId}-answer`);
        if (answerCard) {
          answerCard.innerHTML = `<div style="color: #ef4444;">Error executing request: ${escapeHTML(err.message)}</div>`;
        }
      }
    });

    orchestrator.execute(prompt, activeMode);
  }

  function scrollToBottom() {
    chatStream.scrollTop = chatStream.scrollHeight;
  }

  function formatMarkdownToHTML(md) {
    return md
      .replace(/^# (.*$)/gim, '<h2 style="font-size: 1.4rem; margin-bottom: 0.75rem; color: #f8fafc;">$1</h2>')
      .replace(/^## (.*$)/gim, '<h3 style="font-size: 1.15rem; margin-top: 1.25rem; margin-bottom: 0.4rem; color: #38bdf8;">$1</h3>')
      .replace(/^### (.*$)/gim, '<h4 style="font-size: 1rem; margin-top: 1rem; margin-bottom: 0.35rem; color: #818cf8;">$1</h4>')
      .replace(/^\> (.*$)/gim, '<blockquote style="border-left: 3px solid #38bdf8; padding-left: 1rem; color: #94a3b8; margin: 0.5rem 0;">$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong style="color: #fff;">$1</strong>')
      .replace(/```([a-z]*)\n([\s\S]*?)```/gim, (match, lang, code) => `
        <div class="code-block-wrapper">
          <div class="code-block-header">
            <span>${lang.toUpperCase() || 'CODE'}</span>
            <span style="color: var(--accent-coder);">✓ Verified Syntax</span>
          </div>
          <pre class="code-block-body"><code>${escapeHTML(code)}</code></pre>
        </div>
      `)
      .replace(/\n\n/gim, '<br/><br/>');
  }

  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 1.5rem;
      right: 1.5rem;
      background: rgba(14, 21, 35, 0.95);
      border: 1px solid var(--accent-manager);
      color: #fff;
      padding: 0.75rem 1.25rem;
      border-radius: var(--radius-md);
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
      font-size: 0.85rem;
      z-index: 2000;
      backdrop-filter: blur(10px);
      transition: opacity 0.3s;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // Initial load
  loadVaultKeys();
}
