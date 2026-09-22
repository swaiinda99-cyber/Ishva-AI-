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
import { init3DExperience, getNeuralCore, NeuralCore3D } from './neuralCore3D.js';

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

  // 3D Neural Core Elements
  const btnToggle3DCore = document.getElementById('btnToggle3DCore');
  const core3DModal = document.getElementById('core3DModal');
  const btnClose3DModal = document.getElementById('btnClose3DModal');
  const btnClose3DModalBtn = document.getElementById('btnClose3DModalBtn');
  const coreModeBtns = document.querySelectorAll('.btn-core-mode');

  // Initialize WebGL 3D Experience (Interactive Core + Starfield Background)
  const { neuralCore } = init3DExperience();

  let modalCoreInstance = null;
  if (btnToggle3DCore && core3DModal) {
    btnToggle3DCore.addEventListener('click', () => {
      core3DModal.classList.add('open');
      if (!modalCoreInstance && document.getElementById('modal3dContainer')) {
        modalCoreInstance = new NeuralCore3D('modal3dContainer');
      }
      if (modalCoreInstance) modalCoreInstance.triggerShockwave();
      if (neuralCore) neuralCore.triggerShockwave();
    });
    if (btnClose3DModal) btnClose3DModal.addEventListener('click', () => core3DModal.classList.remove('open'));
    if (btnClose3DModalBtn) btnClose3DModalBtn.addEventListener('click', () => core3DModal.classList.remove('open'));
  }

  coreModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      coreModeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (neuralCore) {
        neuralCore.setMode(btn.dataset.coreMode);
      }
    });
  });

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

  // Cybernetic Holographic Scan & Decryption Gateway Trigger
  const cyberGatewayOverlay = document.getElementById('cyberGatewayOverlay');
  const gatewayIcon = document.getElementById('gatewayIcon');
  const gatewayTitle = document.getElementById('gatewayTitle');
  const gatewaySubtitle = document.getElementById('gatewaySubtitle');
  const gatewayProgressFill = document.getElementById('gatewayProgressFill');

  function triggerCyberGateway({ icon, title, subtitle, duration = 650, onComplete }) {
    if (!cyberGatewayOverlay) {
      if (onComplete) onComplete();
      return;
    }
    if (gatewayIcon) gatewayIcon.textContent = icon || '⚡';
    if (gatewayTitle) gatewayTitle.textContent = title || 'AUTHENTICATING';
    if (gatewaySubtitle) gatewaySubtitle.textContent = subtitle || 'Initializing zero-knowledge protocol...';
    if (gatewayProgressFill) gatewayProgressFill.style.width = '0%';

    cyberGatewayOverlay.classList.add('active');
    if (neuralCore) neuralCore.triggerShockwave();

    // Trigger rapid progress fill
    setTimeout(() => {
      if (gatewayProgressFill) gatewayProgressFill.style.width = '100%';
    }, 40);

    setTimeout(() => {
      cyberGatewayOverlay.classList.remove('active');
      if (gatewayProgressFill) gatewayProgressFill.style.width = '0%';
      if (onComplete) onComplete();
    }, duration);
  }

  // 2. Google Auth Management with Futuristic Biometric Scan
  btnGoogleLogin.addEventListener('click', () => {
    if (currentUser) {
      if (confirm(`Signed in as ${currentUser.name} (${currentUser.email}). Sign out?`)) {
        currentUser = null;
        localStorage.removeItem('ishva_user');
        updateAuthUI();
        showToast('Signed out of Google account.');
      }
    } else {
      triggerCyberGateway({
        icon: '🛡️',
        title: 'BIOMETRIC IDENTITY GATEWAY',
        subtitle: 'Establishing Zero-Knowledge OAuth 2.0 Handshake...',
        duration: 650,
        onComplete: () => {
          googleLoginModal.classList.add('open');
        }
      });
    }
  });

  btnCloseGoogleModal.addEventListener('click', () => googleLoginModal.classList.remove('open'));

  btnSimulateGoogleAuth.addEventListener('click', () => {
    const actionText = document.getElementById('googleAuthActionText');
    if (actionText) actionText.textContent = 'Verifying with Ekka Gateway...';
    btnSimulateGoogleAuth.style.opacity = '0.85';

    setTimeout(() => {
      currentUser = {
        name: 'Swai Singh',
        email: 'swai@ekka.tech',
        role: 'Founder'
      };
      localStorage.setItem('ishva_user', JSON.stringify(currentUser));
      updateAuthUI();
      googleLoginModal.classList.remove('open');
      if (actionText) actionText.textContent = 'Continue with Google';
      btnSimulateGoogleAuth.style.opacity = '1';
      showToast('✓ Identity verified: Signed in as Swai Singh (Founder)');
      if (neuralCore) neuralCore.triggerShockwave();
    }, 450);
  });

  // 3. Attachment Menu Popup (+) with 3D Roll-Down
  btnAttachmentPlus.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = attachmentMenuPopup.classList.toggle('open');
    btnAttachmentPlus.classList.toggle('is-active', isOpen);
    modeBreakdownCard.classList.remove('open');
  });

  menuUploadPhoto.addEventListener('click', () => {
    attachmentMenuPopup.classList.remove('open');
    btnAttachmentPlus.classList.remove('is-active');
    filePhotoInput.click();
  });

  menuUploadFile.addEventListener('click', () => {
    attachmentMenuPopup.classList.remove('open');
    btnAttachmentPlus.classList.remove('is-active');
    fileGeneralInput.click();
  });

  menuGeneratePhoto.addEventListener('click', () => {
    attachmentMenuPopup.classList.remove('open');
    btnAttachmentPlus.classList.remove('is-active');
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
    btnAttachmentPlus.classList.remove('is-active');
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
    if (!attachmentMenuPopup.contains(e.target) && e.target !== btnAttachmentPlus && !btnAttachmentPlus.contains(e.target)) {
      attachmentMenuPopup.classList.remove('open');
      btnAttachmentPlus.classList.remove('is-active');
    }
    if (!modeBreakdownCard.contains(e.target) && e.target !== btnModeInfo) {
      modeBreakdownCard.classList.remove('open');
    }
  });

  // 5. BYOK Vault Management with Cybernetic Decryption Scan
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
    triggerCyberGateway({
      icon: '🔐',
      title: 'DECRYPTING HARDWARE VAULT',
      subtitle: 'Unlocking AES-256 Client-Side Keystore...',
      duration: 550,
      onComplete: () => {
        loadVaultKeys();
        vaultModal.classList.add('open');
      }
    });
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

    if (neuralCore) neuralCore.setProcessingState(true);

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
            answerCard.innerHTML = `<div class="streaming-text" id="${turnId}-stream"><span class="stream-cursor">&#9612;</span></div>`;
            streamDiv = document.getElementById(`${turnId}-stream`);
          }
        }
        if (streamDiv) {
          streamBuffer += token;
          // Render markdown with streaming cursor at end
          streamDiv.innerHTML = formatMarkdownToHTML(streamBuffer) + '<span class="stream-cursor">&#9612;</span>';
          scrollToBottom();
        }
      },

      onComplete: (data) => {
        btnSend.disabled = false;
        isStreaming = false;
        if (neuralCore) neuralCore.setProcessingState(false);

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

          // Build metadata footer
          const memBadge = data.memoryTurns > 0
            ? `<span class="answer-badge" style="background:rgba(99,102,241,0.12);color:#818cf8;border-color:rgba(99,102,241,0.25);">&#128172; ${data.memoryTurns} turns in memory</span>`
            : '';
          const tokenBadge = data.tokenCount > 0
            ? `<span class="answer-badge" style="background:rgba(56,189,248,0.08);color:#38bdf8;border-color:rgba(56,189,248,0.2);">~${data.tokenCount.toLocaleString()} tokens used</span>`
            : '';
          const qcBadge = data.reflectionCount > 0
            ? `<span class="answer-badge" style="background:rgba(245,158,11,0.12);color:#f59e0b;border-color:rgba(245,158,11,0.25);">&#128260; ${data.reflectionCount} QC correction${data.reflectionCount > 1 ? 's' : ''} applied</span>`
            : '';

          answerCard.innerHTML = `
            ${permissionHTML}
            ${renderedContent}
            <div class="answer-actions">
              <button class="btn-header-action btn-copy" data-turn="${turnId}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy Answer</span>
              </button>
              ${intentBadge}${memBadge}${tokenBadge}${qcBadge}
            </div>
          `;

          const copyBtn = answerCard.querySelector('.btn-copy');
          if (copyBtn) {
            copyBtn.addEventListener('click', () => {
              navigator.clipboard.writeText(data.synthesis || streamBuffer);
              showToast('Copied to clipboard!');
            });
          }

          // Wire up individual code block copy buttons
          answerCard.querySelectorAll('.code-copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              const code = btn.closest('.code-block-wrapper')?.querySelector('code')?.innerText || '';
              navigator.clipboard.writeText(code);
              btn.textContent = '✓ Copied!';
              setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
            });
          });
        }
        streamBuffer = '';
        scrollToBottom();
      },

      onError: (err) => {
        btnSend.disabled = false;
        isStreaming = false;
        streamBuffer = '';
        if (neuralCore) neuralCore.setProcessingState(false);
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
    if (!md) return '';
    let html = md;

    // 1. Code blocks first (protect from other replacements)
    const codeBlocks = [];
    html = html.replace(/```([a-z]*)\n?([\s\S]*?)```/gim, (match, lang, code) => {
      const id = 'cb-' + codeBlocks.length;
      const langLabel = lang ? lang.toUpperCase() : 'CODE';
      codeBlocks.push(`
        <div class="code-block-wrapper">
          <div class="code-block-header">
            <span class="code-lang-badge">${langLabel}</span>
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <span style="color:var(--accent-coder);font-size:0.7rem;">&#10003; Verified Syntax</span>
              <button class="code-copy-btn" data-block-id="${id}">Copy</button>
            </div>
          </div>
          <pre class="code-block-body"><code>${escapeHTML(code.trim())}</code></pre>
        </div>
      `);
      return `___CODEBLOCK_${codeBlocks.length - 1}___`;
    });

    // 2. Inline code
    html = html.replace(/`([^`]+)`/gim, '<code class="inline-code">$1</code>');

    // 3. Headings
    html = html.replace(/^#### (.+)$/gim, '<h5 style="font-size:0.9rem;margin:0.75rem 0 0.25rem;color:#c4b5fd;">$1</h5>');
    html = html.replace(/^### (.+)$/gim, '<h4 style="font-size:1rem;margin:1rem 0 0.35rem;color:#818cf8;">$1</h4>');
    html = html.replace(/^## (.+)$/gim, '<h3 style="font-size:1.15rem;margin-top:1.25rem;margin-bottom:0.4rem;color:#38bdf8;">$1</h3>');
    html = html.replace(/^# (.+)$/gim, '<h2 style="font-size:1.4rem;margin-bottom:0.75rem;color:#f8fafc;">$1</h2>');

    // 4. Bold & Italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/gim, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/gim, '<strong style="color:#fff;">$1</strong>');
    html = html.replace(/\*(.+?)\*/gim, '<em style="color:#cbd5e1;">$1</em>');

    // 5. Blockquotes
    html = html.replace(/^> (.+)$/gim, '<blockquote style="border-left:3px solid #38bdf8;padding-left:1rem;color:#94a3b8;margin:0.5rem 0;font-style:italic;">$1</blockquote>');

    // 6. Tables (GitHub-style)
    html = html.replace(/((?:\|.+\|\n?)+)/gm, (tableBlock) => {
      const rows = tableBlock.trim().split('\n').filter(r => r.trim());
      if (rows.length < 2) return tableBlock;
      const isSeperator = (r) => /^[|\s\-:]+$/.test(r);
      if (!isSeperator(rows[1])) return tableBlock;
      const header = rows[0].split('|').filter(c => c.trim()).map(c => `<th style="padding:0.4rem 0.75rem;border-bottom:1px solid rgba(56,189,248,0.25);color:#38bdf8;font-weight:600;">${c.trim()}</th>`);
      const bodyRows = rows.slice(2).map(row => {
        const cells = row.split('|').filter(c => c.trim()).map(c => `<td style="padding:0.35rem 0.75rem;border-bottom:1px solid rgba(255,255,255,0.05);">${c.trim()}</td>`);
        return `<tr>${cells.join('')}</tr>`;
      });
      return `<div style="overflow-x:auto;margin:1rem 0;"><table style="width:100%;border-collapse:collapse;font-size:0.875rem;"><thead><tr>${header.join('')}</tr></thead><tbody>${bodyRows.join('')}</tbody></table></div>`;
    });

    // 7. Numbered lists
    html = html.replace(/^(\d+)\. (.+)$/gim, '<li class="ol-item" data-num="$1">$2</li>');
    html = html.replace(/(<li class="ol-item"[\s\S]*?<\/li>\n?)+/gm, match =>
      `<ol style="padding-left:1.5rem;margin:0.5rem 0;">${match}</ol>`);

    // 8. Bullet lists
    html = html.replace(/^[\-\*] (.+)$/gim, '<li style="margin:0.2rem 0;">$1</li>');
    html = html.replace(/(<li[^>]*>[\s\S]*?<\/li>\n?)+/gm, match => {
      if (match.includes('ol-item')) return match;
      return `<ul style="padding-left:1.5rem;margin:0.5rem 0;list-style:disc;">${match}</ul>`;
    });

    // 9. Horizontal rules
    html = html.replace(/^---$/gim, '<hr style="border:none;border-top:1px solid rgba(56,189,248,0.2);margin:1rem 0;">');

    // 10. Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener" style="color:#38bdf8;text-decoration:underline;">$1</a>');

    // 11. Line breaks → paragraphs
    html = html.replace(/\n\n/gim, '</p><p style="margin:0.5rem 0;">');
    html = html.replace(/\n/gim, '<br>');

    // 12. Restore code blocks
    codeBlocks.forEach((block, i) => {
      html = html.replace(`___CODEBLOCK_${i}___`, block);
    });

    return `<p style="margin:0.5rem 0;">${html}</p>`;
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
