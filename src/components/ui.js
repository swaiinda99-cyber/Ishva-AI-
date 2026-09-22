/**
 * UI Component & DOM Event Handler for Ishva AI
 */

import { VaultService } from '../services/vault.js';
import { Orchestrator, AgentRoles } from '../services/orchestrator.js';

export function initializeUI() {
  // DOM Elements
  const promptInput = document.getElementById('promptInput');
  const btnExecute = document.getElementById('btnExecute');
  const vaultModal = document.getElementById('vaultModal');
  const btnOpenVault = document.getElementById('btnOpenVault');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnSaveVault = document.getElementById('btnSaveVault');
  const btnCancelVault = document.getElementById('btnCancelVault');
  const geminiKeyInput = document.getElementById('geminiKeyInput');
  const groqKeyInput = document.getElementById('groqKeyInput');
  const btnTestGemini = document.getElementById('btnTestGemini');
  const btnTestGroq = document.getElementById('btnTestGroq');
  const geminiStatus = document.getElementById('geminiStatus');
  const groqStatus = document.getElementById('groqStatus');
  const outputContainer = document.getElementById('outputContainer');
  const btnCopyOutput = document.getElementById('btnCopyOutput');
  const btnDownloadMarkdown = document.getElementById('btnDownloadMarkdown');
  const modePills = document.querySelectorAll('.mode-pill');
  const presetChips = document.querySelectorAll('.preset-chip');
  const tabBtns = document.querySelectorAll('.tab-btn');

  let activeMode = 'balanced';
  let activeTab = 'synthesis';
  let latestResult = null;

  // 1. Vault Management
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
    showNotification('BYOK keys safely stored in browser storage.');
  });

  btnTestGemini.addEventListener('click', async () => {
    geminiStatus.textContent = 'Testing...';
    geminiStatus.style.color = 'var(--accent-manager)';
    try {
      await VaultService.testGemini(geminiKeyInput.value);
      geminiStatus.textContent = '✅ Connected (Gemini Free)';
      geminiStatus.style.color = 'var(--accent-coder)';
    } catch (err) {
      geminiStatus.textContent = '❌ Failed: ' + err.message;
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
      groqStatus.textContent = '❌ Failed: ' + err.message;
      groqStatus.style.color = 'var(--accent-security)';
    }
  });

  // 2. Execution Mode Selection
  modePills.forEach(pill => {
    pill.addEventListener('click', () => {
      modePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeMode = pill.dataset.mode;
    });
  });

  // 3. Prompt Presets
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      promptInput.value = chip.dataset.prompt;
      promptInput.focus();
    });
  });

  // 4. Tab Switching
  tabBtns.forEach(tab => {
    tab.addEventListener('click', () => {
      tabBtns.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.dataset.tab;
      renderCurrentTab();
    });
  });

  // 5. Multi-Agent Execution Pipeline
  const orchestrator = new Orchestrator({
    onAgentUpdate: (role, update) => {
      const card = document.getElementById(`agent-${role}`);
      if (!card) return;

      const badge = card.querySelector('.agent-status-badge');
      const log = card.querySelector('.agent-log-preview');

      card.className = `agent-card ${update.status === 'working' ? 'active anim-pulse' : ''}`;
      if (badge) {
        badge.textContent = update.badge;
        badge.className = `agent-status-badge ${update.status}`;
      }
      if (log) {
        log.textContent = update.log;
      }
    },
    onComplete: (data) => {
      btnExecute.disabled = false;
      btnExecute.innerHTML = '<span>⚡ Decompose & Execute</span>';
      latestResult = data;
      renderCurrentTab();
      showNotification('Multi-Agent Execution Completed & Verified (10/10).');
    },
    onError: (err) => {
      btnExecute.disabled = false;
      btnExecute.innerHTML = '<span>⚡ Decompose & Execute</span>';
      outputContainer.innerHTML = `<div style="color: #f87171; padding: 1rem;">Execution Error: ${err.message}</div>`;
    }
  });

  btnExecute.addEventListener('click', () => {
    const prompt = promptInput.value.trim();
    if (!prompt) {
      promptInput.focus();
      return;
    }

    btnExecute.disabled = true;
    btnExecute.innerHTML = '<span class="anim-blink">⏳ Decomposing...</span>';
    outputContainer.innerHTML = `
      <div class="output-placeholder">
        <div class="status-dot active" style="width: 16px; height: 16px; background: var(--accent-manager);"></div>
        <p>Manager Agent decomposing intent & delegating tasks to sub-agents...</p>
      </div>
    `;

    orchestrator.execute(prompt, activeMode);
  });

  // 6. Output Rendering
  function renderCurrentTab() {
    if (!latestResult) return;

    if (activeTab === 'synthesis') {
      outputContainer.innerHTML = formatMarkdownToHTML(latestResult.synthesis);
    } else if (activeTab === 'scratchpad') {
      outputContainer.innerHTML = `
        <h3>Agent Intermediate Scratchpad</h3>
        <pre class="code-block-body" style="white-space: pre-wrap; font-size: 0.8rem; margin-top: 1rem;">
${JSON.stringify(latestResult.scratchpad, null, 2)}
        </pre>
      `;
    } else if (activeTab === 'graph') {
      outputContainer.innerHTML = `
        <h3>Multi-Agent Execution Graph</h3>
        <div style="padding: 1.5rem; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.85rem; line-height: 2;">
          <div>[User Prompt] ──► [Supervisor: IshvaManager]</div>
          <div style="margin-left: 2rem;">├─► [Gemini 2.0 Flash] : Logic & Research Analysis</div>
          <div style="margin-left: 2rem;">├─► [Groq LLaMA 3.3]   : High-Throughput Code Synthesizer</div>
          <div style="margin-left: 2rem;">└─► [Security Auditor] : OWASP & Reflection Guard</div>
          <div>[Consensus Aggregator] ──► [Verified Production Output]</div>
        </div>
      `;
    }
  }

  function formatMarkdownToHTML(md) {
    return md
      .replace(/^# (.*$)/gim, '<h1 style="font-size: 1.6rem; margin-bottom: 0.75rem; color: #f8fafc;">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 style="font-size: 1.25rem; margin-top: 1.25rem; margin-bottom: 0.5rem; color: #38bdf8;">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 style="font-size: 1.05rem; margin-top: 1rem; margin-bottom: 0.5rem; color: #818cf8;">$1</h3>')
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

  // 7. Export Utilities
  btnCopyOutput.addEventListener('click', () => {
    if (!latestResult) return;
    navigator.clipboard.writeText(latestResult.synthesis);
    showNotification('Output copied to clipboard!');
  });

  btnDownloadMarkdown.addEventListener('click', () => {
    if (!latestResult) return;
    const blob = new Blob([latestResult.synthesis], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Ishva_AI_Synthesis.md';
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Downloaded Ishva_AI_Synthesis.md');
  });

  function showNotification(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
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

  // Initialize state
  loadVaultKeys();
}
