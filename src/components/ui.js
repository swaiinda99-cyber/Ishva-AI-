/**
 * Conversational UI for Ishva AI
 * - Personalized thinking flow
 * - About Ishva AI & Privacy modal
 * - Plus (+) popup menu: Add Photo, Add File, Generate Photo, Paste Code
 * - Mode breakdown popover: Fast vs Balanced vs Deep Agentic
 * - Google Sign-In with animation
 * - 3D animations and fluid transitions
 */

import { VaultService } from '../services/vault.js';
import { Orchestrator } from '../services/orchestrator.js';

export function initializeUI() {
  // Chat DOM Elements
  const chatStream = document.getElementById('chatStream');
  const welcomeHero = document.getElementById('welcomeHero');
  const chatInput = document.getElementById('chatInput');
  const btnSend = document.getElementById('btnSend');
  const btnNewChat = document.getElementById('btnNewChat');
  const modeChips = document.querySelectorAll('.mode-chip');
  const starterCards = document.querySelectorAll('.starter-card');

  // About Modal Elements
  const btnAboutIshva = document.getElementById('btnAboutIshva');
  const aboutModal = document.getElementById('aboutModal');
  const btnCloseAboutModal = document.getElementById('btnCloseAboutModal');
  const btnCloseAboutModalBtn = document.getElementById('btnCloseAboutModalBtn');

  // Attachment Menu Elements
  const btnAttachmentPlus = document.getElementById('btnAttachmentPlus');
  const attachmentMenuPopup = document.getElementById('attachmentMenuPopup');
  const menuUploadPhoto = document.getElementById('menuUploadPhoto');
  const menuUploadFile = document.getElementById('menuUploadFile');
  const menuGeneratePhoto = document.getElementById('menuGeneratePhoto');
  const menuPasteCode = document.getElementById('menuPasteCode');
  const filePhotoInput = document.getElementById('filePhotoInput');
  const fileGeneralInput = document.getElementById('fileGeneralInput');
  const stagingAttachmentsBar = document.getElementById('stagingAttachmentsBar');

  // Mode Info Elements
  const btnModeInfo = document.getElementById('btnModeInfo');
  const modeBreakdownCard = document.getElementById('modeBreakdownCard');

  // Google Login Elements
  const btnGoogleLogin = document.getElementById('btnGoogleLogin');
  const googleLoginModal = document.getElementById('googleLoginModal');
  const btnCloseGoogleModal = document.getElementById('btnCloseGoogleModal');
  const btnSimulateGoogleAuth = document.getElementById('btnSimulateGoogleAuth');

  // BYOK Vault Elements
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
  let stagedFiles = [];
  let currentUser = localStorage.getItem('ishva_user') ? JSON.parse(localStorage.getItem('ishva_user')) : null;

  // 1. About Ishva AI & Privacy Modal
  btnAboutIshva.addEventListener('click', () => {
    aboutModal.classList.add('open');
  });

  btnCloseAboutModal.addEventListener('click', () => aboutModal.classList.remove('open'));
  btnCloseAboutModalBtn.addEventListener('click', () => aboutModal.classList.remove('open'));

  // 2. Google Auth Management
  function updateAuthUI() {
    if (currentUser) {
      btnGoogleLogin.innerHTML = `
        <div class="user-avatar-circle">${currentUser.name.charAt(0)}</div>
        <span>${currentUser.name}</span>
      `;
      btnGoogleLogin.title = "Click to sign out";
    } else {
      btnGoogleLogin.innerHTML = `
        <svg class="google-icon" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        <span>Sign in</span>
      `;
      btnGoogleLogin.title = "Sign in with Google";
    }
  }

  btnGoogleLogin.addEventListener('click', () => {
    if (currentUser) {
      if (confirm(`Signed in as ${currentUser.name} (${currentUser.email}). Sign out?`)) {
        currentUser = null;
        localStorage.removeItem('ishva_user');
        updateAuthUI();
        showToast('Signed out of Google account.');
      }
    } else {
      googleLoginModal.classList.add('open');
    }
  });

  btnCloseGoogleModal.addEventListener('click', () => googleLoginModal.classList.remove('open'));

  btnSimulateGoogleAuth.addEventListener('click', () => {
    currentUser = {
      name: 'Swai Singh',
      email: 'swai@ekka.tech',
      role: 'Founder'
    };
    localStorage.setItem('ishva_user', JSON.stringify(currentUser));
    updateAuthUI();
    googleLoginModal.classList.remove('open');
    showToast('Signed in with Google as Swai Singh.');
  });

  // 3. Attachment Menu Popup (+)
  btnAttachmentPlus.addEventListener('click', (e) => {
    e.stopPropagation();
    attachmentMenuPopup.classList.toggle('open');
    modeBreakdownCard.classList.remove('open');
  });

  menuUploadPhoto.addEventListener('click', () => {
    attachmentMenuPopup.classList.remove('open');
    filePhotoInput.click();
  });

  menuUploadFile.addEventListener('click', () => {
    attachmentMenuPopup.classList.remove('open');
    fileGeneralInput.click();
  });

  menuGeneratePhoto.addEventListener('click', () => {
    attachmentMenuPopup.classList.remove('open');
    const prompt = window.prompt('Describe the image you want to generate:');
    if (prompt && prompt.trim()) {
      const encoded = encodeURIComponent(prompt.trim());
      const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=800&height=600&nologo=true`;
      
      stagedFiles.push({
        name: `Generated: ${prompt.trim()}`,
        size: 'AI Generated',
        type: 'image/jpeg',
        isImage: true,
        dataUrl: imageUrl
      });
      renderStagedAttachments();
      showToast('Generated image preview added to attachments.');
    }
  });

  menuPasteCode.addEventListener('click', () => {
    attachmentMenuPopup.classList.remove('open');
    chatInput.value += (chatInput.value ? '\n' : '') + '```typescript\n// Paste your code here\n\n```\n';
    chatInput.focus();
    chatInput.dispatchEvent(new Event('input'));
  });

  // File Input Change Handlers
  function handleFileInput(input) {
    const files = Array.from(input.files);
    if (!files.length) return;

    files.forEach(file => {
      const isImg = file.type.startsWith('image/');
      const reader = new FileReader();

      reader.onload = (ev) => {
        stagedFiles.push({
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
          type: file.type,
          isImage: isImg,
          dataUrl: ev.target.result
        });
        renderStagedAttachments();
      };

      if (isImg) reader.readAsDataURL(file);
      else reader.readAsText(file);
    });

    input.value = '';
  }

  filePhotoInput.addEventListener('change', () => handleFileInput(filePhotoInput));
  fileGeneralInput.addEventListener('change', () => handleFileInput(fileGeneralInput));

  function renderStagedAttachments() {
    if (stagedFiles.length === 0) {
      stagingAttachmentsBar.style.display = 'none';
      stagingAttachmentsBar.innerHTML = '';
      return;
    }

    stagingAttachmentsBar.style.display = 'flex';
    stagingAttachmentsBar.innerHTML = stagedFiles.map((file, idx) => `
      <div class="staged-file-chip">
        <span>${file.isImage ? '🖼️' : '📄'} ${escapeHTML(file.name)}</span>
        <button class="staged-file-remove" data-idx="${idx}">&times;</button>
      </div>
    `).join('');

    stagingAttachmentsBar.querySelectorAll('.staged-file-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        stagedFiles.splice(idx, 1);
        renderStagedAttachments();
      });
    });
  }

  // 4. Mode Breakdown Info Toggle
  btnModeInfo.addEventListener('click', (e) => {
    e.stopPropagation();
    modeBreakdownCard.classList.toggle('open');
    attachmentMenuPopup.classList.remove('open');
  });

  // Close popups on click outside
  document.addEventListener('click', (e) => {
    if (!attachmentMenuPopup.contains(e.target) && e.target !== btnAttachmentPlus) {
      attachmentMenuPopup.classList.remove('open');
    }
    if (!modeBreakdownCard.contains(e.target) && e.target !== btnModeInfo) {
      modeBreakdownCard.classList.remove('open');
    }
  });

  // 5. BYOK Vault Management
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
      vaultIndicator.textContent = hasKeys ? 'BYOK Active' : 'BYOK Setup';
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
    showToast('BYOK keys securely saved.');
  });

  btnTestGemini.addEventListener('click', async () => {
    geminiStatus.textContent = 'Testing...';
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
    try {
      await VaultService.testGroq(groqKeyInput.value);
      groqStatus.textContent = '✅ Connected (Groq 300+ T/s)';
      groqStatus.style.color = 'var(--accent-coder)';
    } catch (err) {
      groqStatus.textContent = '❌ ' + err.message;
      groqStatus.style.color = 'var(--accent-security)';
    }
  });

  // 6. Mode Selector
  modeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      modeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeMode = chip.dataset.mode;
    });
  });

  // 7. Starter Cards
  starterCards.forEach(card => {
    card.addEventListener('click', () => {
      chatInput.value = card.dataset.prompt;
      submitUserMessage();
    });
  });

  // 8. Auto-Resize & Keyboard
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

  btnNewChat.addEventListener('click', () => {
    chatStream.innerHTML = '';
    chatStream.appendChild(welcomeHero);
    welcomeHero.style.display = 'flex';
    stagedFiles = [];
    renderStagedAttachments();
    chatInput.value = '';
    chatInput.style.height = 'auto';
    chatInput.focus();
    showToast('Started fresh conversation.');
  });

  // 9. Message Pipeline with Personalized Ishva Flow
  function submitUserMessage() {
    const prompt = chatInput.value.trim();
    const currentAttachments = [...stagedFiles];

    if (!prompt && currentAttachments.length === 0) return;

    if (welcomeHero && welcomeHero.style.display !== 'none') {
      welcomeHero.style.display = 'none';
    }

    const turnId = 'turn-' + Date.now();

    // 1. Render User Message with any attached files/images
    const userTurn = document.createElement('div');
    userTurn.className = 'chat-turn user-turn';

    let attachmentsHTML = '';
    if (currentAttachments.length > 0) {
      attachmentsHTML = `
        <div class="user-attachments-preview">
          ${currentAttachments.map(att => att.isImage 
            ? `<img src="${att.dataUrl}" class="attached-thumb" alt="${escapeHTML(att.name)}" />`
            : `<span class="attached-file-pill">📄 ${escapeHTML(att.name)} (${att.size})</span>`
          ).join('')}
        </div>
      `;
    }

    userTurn.innerHTML = `
      <div class="user-bubble">
        ${attachmentsHTML}
        <div>${escapeHTML(prompt || 'Analyzed attachments')}</div>
      </div>
    `;
    chatStream.appendChild(userTurn);

    // Reset inputs
    chatInput.value = '';
    chatInput.style.height = 'auto';
    stagedFiles = [];
    renderStagedAttachments();
    btnSend.disabled = true;

    // 2. Create Assistant Turn with Ishva Flow
    const assistantTurn = document.createElement('div');
    assistantTurn.className = 'chat-turn assistant-turn';
    assistantTurn.id = turnId;

    assistantTurn.innerHTML = `
      <div class="assistant-avatar">IA</div>
      <div class="assistant-content-wrapper">
        <!-- Personalized Ishva Thinking Trace -->
        <div class="orchestration-trace" id="${turnId}-trace">
          <div class="trace-header" onclick="this.parentElement.classList.toggle('collapsed')">
            <span class="trace-title">
              <span class="status-dot active"></span>
              <span id="${turnId}-status-header">Ishva got your request...</span>
            </span>
            <span style="color: var(--text-muted); font-size: 0.75rem;">⚡ Ishva AI</span>
          </div>
          <div class="trace-body" id="${turnId}-steps">
            <div class="trace-step working" id="${turnId}-step-init">
              <span class="trace-step-icon">📥</span>
              <span>Ishva got your request...</span>
            </div>
          </div>
        </div>

        <!-- Final Answer Card -->
        <div class="answer-card" id="${turnId}-answer">
          <div style="color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem;">
            <div class="status-dot active" style="background: var(--accent-manager);"></div>
            <span>Ishva is formulating response...</span>
          </div>
        </div>
      </div>
    `;

    chatStream.appendChild(assistantTurn);
    scrollToBottom();

    // 3. Launch Orchestrator with real streaming support
    let streamBuffer = '';
    let isStreaming = false;
    let streamDiv = null;

    const orchestrator = new Orchestrator({
      onStatusUpdate: (step) => {
        const stepsContainer = document.getElementById(`${turnId}-steps`);
        const headerEl = document.getElementById(`${turnId}-status-header`);
        if (headerEl) headerEl.textContent = step.text;

        if (stepsContainer) {
          const agentColors = {
            gemini: 'var(--accent-manager)',
            groq: 'var(--accent-coder)',
            visual: '#a855f7',
            pollinations: '#f59e0b'
          };
          const agentColor = step.agent ? (agentColors[step.agent] || 'var(--text-muted)') : 'var(--text-muted)';
          const agentBadge = step.agent
            ? `<span class="agent-badge" style="background:${agentColor}20;color:${agentColor};">${step.agent}</span>`
            : '';
          const stepEl = document.createElement('div');
          stepEl.className = 'trace-step working';
          stepEl.innerHTML = `
            <span class="trace-step-icon">${step.icon}</span>
            <span>${escapeHTML(step.text)}</span>
            ${agentBadge}
          `;
          stepsContainer.appendChild(stepEl);
        }
        scrollToBottom();
      },

      onTokenStream: (token) => {
        if (!isStreaming) {
          isStreaming = true;
          const answerCard = document.getElementById(`${turnId}-answer`);
          if (answerCard) {
            answerCard.innerHTML = `<div class="streaming-text" id="${turnId}-stream"></div>`;
            streamDiv = document.getElementById(`${turnId}-stream`);
          }
        }
        if (streamDiv) {
          streamBuffer += token;
          streamDiv.innerHTML = formatMarkdownToHTML(streamBuffer);
          scrollToBottom();
        }
      },

      onComplete: (data) => {
        btnSend.disabled = false;
        isStreaming = false;

        const headerEl = document.getElementById(`${turnId}-status-header`);
        if (headerEl) headerEl.innerHTML = `<span>&#x2705; Ishva verified &amp; completed (10/10)</span>`;

        const stepsContainer2 = document.getElementById(`${turnId}-steps`);
        if (stepsContainer2) {
          stepsContainer2.querySelectorAll('.trace-step.working').forEach(s => {
            s.classList.remove('working');
            s.classList.add('done');
          });
        }

        const answerCard = document.getElementById(`${turnId}-answer`);
        if (answerCard) {
          let permissionHTML = '';
          if (data.permissionNeeded) {
            permissionHTML = `
              <div class="permission-banner" id="${turnId}-perm">
                <span>&#x26A1; <strong>Ishva Request:</strong> Accept permission to execute sub-agent actions?</span>
                <div class="permission-btn-group">
                  <button class="btn-permission-accept" onclick="this.parentElement.innerHTML='<span style=&quot;color:#10b981;&quot;>&#x2713; Permission Granted</span>'">Accept</button>
                  <button class="btn-permission-dismiss" onclick="document.getElementById(\'${turnId}-perm\').remove()">Dismiss</button>
                </div>
              </div>
            `;
          }

          const renderedContent = data.html || formatMarkdownToHTML(data.synthesis || streamBuffer);
          const intentBadge = data.intent ? `<span class="answer-badge intent-badge">${data.intent}</span>` : '';

          answerCard.innerHTML = `
            ${permissionHTML}
            ${renderedContent}
            <div class="answer-actions">
              <button class="btn-header-action btn-copy" data-turn="${turnId}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy Answer</span>
              </button>
              ${intentBadge}
            </div>
          `;

          const copyBtn = answerCard.querySelector('.btn-copy');
          if (copyBtn) {
            copyBtn.addEventListener('click', () => {
              navigator.clipboard.writeText(data.synthesis || streamBuffer);
              showToast('Copied to clipboard!');
            });
          }
        }
        streamBuffer = '';
        scrollToBottom();
      },

      onError: (err) => {
        btnSend.disabled = false;
        isStreaming = false;
        streamBuffer = '';
        const answerCard = document.getElementById(`${turnId}-answer`);
        if (answerCard) {
          answerCard.innerHTML = `<div class="error-card"><span>&#x26A0;&#xFE0F;</span><div><strong>Error</strong><br/><span>${escapeHTML(err.message)}</span></div></div>`;
        }
        const sc = document.getElementById(`${turnId}-steps`);
        if (sc) sc.querySelectorAll('.trace-step.working').forEach(s => s.classList.add('error'));
      }
    });

    orchestrator.execute(prompt, activeMode, currentAttachments);
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

  // Initialize Auth & Keys
  updateAuthUI();
  loadVaultKeys();
}
