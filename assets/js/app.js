/**
 * Full Stack Java Programming & Web Technologies Practicals Portal
 * Interactive Application Engine
 * Supports dynamic rendering, Java & JavaScript syntax highlighting, category filtering,
 * instant search, zoomable lightbox, accessible 1-click copy-to-clipboard, view modes,
 * embedded live interactive web widgets (Stopwatch, Email Validator, DOM Color Changer),
 * and a full in-browser interactive Java & Web Technologies Playground / Simulator.
 */

// Application State
const state = {
  theme: localStorage.getItem('java_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  currentCategory: 'ALL',
  searchQuery: '',
  layoutView: localStorage.getItem('java_layout') || 'split', // 'split', 'stacked', 'code-only', 'output-only'
  lightbox: {
    isOpen: false,
    images: [],
    currentIndex: 0,
    zoom: 1
  },
  simulator: {
    selectedAlgorithm: 'exp-1'
  },
  // Live widget states
  stopwatch: {
    elapsedTime: 0,
    startTime: 0,
    timerInterval: null,
    isRunning: false
  },
  domColorChanger: {
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6'],
    currentIndex: 0,
    intervalId: null,
    progressIntervalId: null,
    remainingSeconds: 5.0,
    isPaused: false
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(state.theme);
  applyLayoutView(state.layoutView);
  buildSidebarNav();
  renderExperiments();
  setupEventListeners();
  collectLightboxImages();
  setupScrollSpy();
  initSimulatorControls();
  initLiveWidgets();
});

// Theme Management
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('java_theme', theme);
  const themeBtn = document.getElementById('btn-toggle-theme');
  if (themeBtn) {
    themeBtn.innerHTML = theme === 'dark' 
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
}

// Layout Switcher (Split, Stacked, Code Only, Output Only)
function applyLayoutView(view) {
  state.layoutView = view;
  document.body.setAttribute('data-view', view);
  localStorage.setItem('java_layout', view);
  document.querySelectorAll('.layout-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });
}

// Build Sidebar Table of Contents with Direct 1-Click Copy Action
function buildSidebarNav() {
  const navContainer = document.getElementById('sidebar-nav-list');
  if (!navContainer) return;

  navContainer.innerHTML = EXPERIMENTS_DATA.map(exp => `
    <li class="exp-nav-item" data-exp-id="${exp.id}">
      <a href="#${exp.id}" onclick="smoothScrollTo('${exp.id}', event)">
        <span class="exp-badge-pill">${exp.number}</span>
        <span class="exp-nav-text">${escapeHtml(exp.title)}</span>
        <button class="sidebar-quick-copy" onclick="copyExpCodeById('${exp.id}', event, this)" title="Quick Copy Program Code (1-Click)" aria-label="Copy code for ${escapeHtml(exp.title)}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
      </a>
    </li>
  `).join('');
}

// High-Contrast Syntax Highlighting for Java and JavaScript Source Code
function highlightJavaAndJS(code) {
  let formatted = escapeHtml(code);

  // Annotations & Preprocessor (@Override, #include, <!DOCTYPE>)
  formatted = formatted.replace(/(@[a-zA-Z_]\w*)/g, '<span class="syntax-annotation">$1</span>');

  // String literals (Double quoted & Single quoted & template literals)
  formatted = formatted.replace(/(&quot;[\s\S]*?&quot;)/g, '<span class="syntax-string">$1</span>');
  formatted = formatted.replace(/(&#039;[\s\S]*?&#039;)/g, '<span class="syntax-string">$1</span>');
  formatted = formatted.replace(/(`[\s\S]*?`)/g, '<span class="syntax-string">$1</span>');

  // Comments (Multi-line and Single-line)
  formatted = formatted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="syntax-comment">$1</span>');
  formatted = formatted.replace(/(\/\/.*$)/gm, '<span class="syntax-comment">$1</span>');
  formatted = formatted.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="syntax-comment">$1</span>');

  // Core Java & JS Keywords
  const keywords = /\b(class|public|private|protected|static|final|abstract|interface|extends|implements|new|this|super|return|if|else|for|while|do|switch|case|break|continue|default|try|catch|finally|throw|throws|import|package|null|true|false|void|const|let|var|function|async|await|typeof|instanceof)\b/g;
  formatted = formatted.replace(keywords, '<span class="syntax-keyword">$1</span>');

  // Core Types & Built-in Objects
  const types = /\b(int|double|float|char|boolean|byte|short|long|String|System|Scanner|Math|Exception|ArithmeticException|InvalidAgeException|Student|Box|ShapeCalculator|Employee|Manager|Document|Window|Object|Array|Date|Number)\b/g;
  formatted = formatted.replace(types, '<span class="syntax-type">$1</span>');

  // Core Methods, Built-in APIs, and Functions
  const functions = /\b(println|print|printf|out|main|calculateTotal|calculatePercentage|getGrade|displayReport|calculateVolume|area|displayManagerInfo|displayEmployee|checkAge|getElementById|querySelector|querySelectorAll|addEventListener|setInterval|clearInterval|setTimeout|clearTimeout|alert|prompt|padZero|changeColor|validateEmail|trim|indexOf|lastIndexOf|toUpperCase|toLowerCase|slice|substring|push|pop|toFixed)\b/g;
  formatted = formatted.replace(functions, '<span class="syntax-function">$1</span>');

  // Numeric Literals
  formatted = formatted.replace(/\b(\d+(?:\.\d+)?f?d?)\b/g, '<span class="syntax-number">$1</span>');

  return formatted;
}

// Render Code with Line Numbers for IDE-like Readability
function renderCodeWithLineNumbers(rawCode) {
  const lines = rawCode.trim().split('\n');
  return lines.map((line, idx) => {
    const lineNum = idx + 1;
    const highlighted = highlightJavaAndJS(line);
    return `<div class="code-line"><span class="line-number">${lineNum}</span><span class="line-content">${highlighted || '&nbsp;'}</span></div>`;
  }).join('');
}

// Render All Experiments
function renderExperiments() {
  const container = document.getElementById('experiments-root');
  if (!container) return;

  const query = state.searchQuery.toLowerCase().trim();
  const category = state.currentCategory;

  let filtered = EXPERIMENTS_DATA.filter(exp => {
    // Category filter
    if (category !== 'ALL' && exp.category !== category) return false;

    // Search filter
    if (!query) return true;

    const expText = `${exp.number} ${exp.title} ${exp.subtitle} ${exp.category} ${exp.paradigm} ${exp.aim} ${exp.theory} ${exp.complexities.bestTime} ${exp.complexities.worstTime}`.toLowerCase();
    if (expText.includes(query)) return true;

    if (exp.items && exp.items.some(item => 
      `${item.title} ${item.type} ${item.code} ${item.description} ${item.status} ${item.terminalOutput}`.toLowerCase().includes(query)
    )) return true;

    return false;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1rem; color: var(--text-muted);"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">No matching experiments found</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Try modifying your search query or reset category filter.</p>
        <button class="btn-nav-primary" onclick="resetFilters()" style="margin: 0 auto;">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(exp => renderExperimentSection(exp, query)).join('');
  collectLightboxImages();
}

// Render Single Experiment Section
function renderExperimentSection(exp, searchQuery) {
  return `
    <section class="experiment-section" id="${exp.id}">
      <!-- Header -->
      <div class="exp-header">
        <div class="exp-title-block">
          <div class="exp-big-number">${exp.number}</div>
          <div class="exp-heading-text">
            <h3>${highlightSearchTerm(exp.title, searchQuery)}</h3>
            <p class="exp-subtitle">${highlightSearchTerm(exp.subtitle, searchQuery)}</p>
          </div>
        </div>
        <div class="exp-meta-tags">
          <span class="tag-badge tag-${exp.badgeColor}">${exp.category}</span>
          <span class="student-tag">${exp.paradigm}</span>
          <span class="algo-badge">${exp.environment}</span>
        </div>
      </div>

      <div class="exp-body">
        <!-- Aim, Theory & Technical Specifications -->
        <div class="aim-theory-box">
          <div class="aim-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            Aim / Objective
          </div>
          <div class="aim-desc">${highlightSearchTerm(exp.aim, searchQuery)}</div>

          <!-- Complexity & Execution Profile Cards Grid -->
          <div class="complexity-grid">
            <div class="complexity-card card-best">
              <span class="complexity-label">Execution Time / Speed</span>
              <span class="complexity-value">${exp.complexities.bestTime}</span>
            </div>
            <div class="complexity-card card-avg">
              <span class="complexity-label">Runtime Paradigm</span>
              <span class="complexity-value">${exp.complexities.avgTime}</span>
            </div>
            <div class="complexity-card card-worst">
              <span class="complexity-label">Invocation Dispatch</span>
              <span class="complexity-value">${exp.complexities.worstTime}</span>
            </div>
            <div class="complexity-card card-space">
              <span class="complexity-label">Memory Allocation</span>
              <span class="complexity-value">${exp.complexities.space}</span>
            </div>
          </div>
          
          <details class="details-collapsible">
            <summary>View Theoretical Background, Key Concepts & Learning Outcomes</summary>
            <div class="theory-content">
              <p>${exp.theory}</p>
              ${exp.complexities.recurrence ? `
                <div style="margin-top: 0.75rem; font-size: 0.825rem; font-family: var(--font-mono); color: var(--text-primary); background: var(--bg-surface-secondary); padding: 0.5rem 0.75rem; border-radius: 4px; border: 1px solid var(--border-color);">
                  <strong>Architectural Focus:</strong> ${exp.complexities.recurrence}
                </div>
              ` : ''}
              ${exp.learningOutcomes ? `
                <div style="font-weight: 700; margin-top: 0.75rem; color: var(--text-primary); font-size: 0.8rem;">Key Takeaways & Learning Outcomes:</div>
                <ul class="learning-list">
                  ${exp.learningOutcomes.map(item => `<li>${item}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          </details>
        </div>

        <!-- Program Code, Interactive Live Apps & Terminal Execution Outputs -->
        <div class="queries-container">
          ${exp.items ? exp.items.map(item => renderProgramCard(item, exp, searchQuery)).join('') : ''}
        </div>
      </div>
    </section>
  `;
}

// Render Single Program Card (with Sticky Copy Bar, Live Interactive App & Line Numbers)
function renderProgramCard(item, exp, searchQuery) {
  const rawCode = item.code || '';
  const lineCount = rawCode.trim().split('\n').length;
  const isWebInteractive = (exp.id === 'exp-4' || exp.id === 'exp-5' || exp.id === 'exp-6');
  const langLabel = exp.id.startsWith('exp-1') || exp.id.startsWith('exp-2') || exp.id.startsWith('exp-3') 
    ? 'Java SE (JDK 21+)' 
    : 'HTML5 & JS (ES6+)';

  return `
    <div class="query-card" id="${item.id}">
      <!-- Card Header -->
      <div class="query-header">
        <div class="query-title-wrapper">
          <span class="query-title">${highlightSearchTerm(item.title, searchQuery)}</span>
          <span class="query-type-badge">${item.type}</span>
        </div>
        <div class="query-actions">
          <button class="btn-query-action btn-copy" onclick="copyCodeByItemId('${item.id}', this)" aria-label="Copy Program Source Code" title="Copy full source code to clipboard">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy Code</span>
          </button>
          <button class="btn-query-action" onclick="openSimulatorWithExp('${exp.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>Run in Playground</span>
          </button>
        </div>
      </div>

      <!-- Split Layout: Code on Left, Real Screenshot / Live Output on Right -->
      <div class="query-content-grid">
        <!-- Left: Code Pane with Sticky Header -->
        <div class="query-code-pane">
          <div class="code-header-bar">
            <div class="code-dots">
              <span class="code-dot dot-red"></span>
              <span class="code-dot dot-yellow"></span>
              <span class="code-dot dot-green"></span>
            </div>
            <span>${exp.title} • ${item.type}</span>
          </div>

          <!-- Sticky Code Toolbar: Always Visible While Scrolling! -->
          <div class="code-sticky-toolbar">
            <div class="code-lang-info">
              <span>${langLabel}</span>
              <span class="code-line-badge">${lineCount} lines</span>
            </div>
            <div class="code-toolbar-actions">
              <button class="btn-sticky-copy" onclick="copyCodeByItemId('${item.id}', this)" aria-label="Quick Copy Source Code" title="Copy full program to clipboard">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span>Copy Code</span>
              </button>
              <button class="btn-sticky-run" onclick="openSimulatorWithExp('${exp.id}')" title="Test in interactive playground">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                <span>Run</span>
              </button>
            </div>
          </div>

          <!-- Line-numbered Code Pre -->
          <pre class="query-code-pre"><code>${renderCodeWithLineNumbers(rawCode)}</code></pre>

          <div class="query-desc-box">
            ${highlightSearchTerm(item.description, searchQuery)}
          </div>
        </div>

        <!-- Right: Execution Output Pane -->
        <div class="query-output-pane">
          <div class="output-header-bar">
            <div class="output-tabs">
              <button class="output-tab-btn active" onclick="switchOutputTab(this, 'screenshot')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                Actual Screenshot
              </button>
              <button class="output-tab-btn" onclick="switchOutputTab(this, 'terminal')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                Console View
              </button>
              ${isWebInteractive ? `
                <button class="output-tab-btn" onclick="switchOutputTab(this, 'interactive')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Live Interactive App
                </button>
              ` : ''}
            </div>
            <span class="output-status-pill">${escapeHtml(item.status || 'Execution verified')}</span>
          </div>

          <div class="output-body">
            <!-- Screenshot View (Enlarged & Sharp) -->
            <div class="tab-pane-screenshot active">
              <div class="screenshot-container" onclick="openLightboxImage('${item.image}', '${escapeHtml(item.title)} - ${escapeHtml(item.imageCaption)}')">
                <div class="screenshot-overlay">
                  <span>${escapeHtml(item.imageCaption)}</span>
                  <span class="zoom-hint">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    Full Resolution
                  </span>
                </div>
                <img src="${item.image}" alt="${item.title}" class="screenshot-img" loading="lazy">
                <div class="screenshot-zoom-banner">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                  <span>Click screenshot to inspect fullscreen (zoom & pan)</span>
                </div>
              </div>
            </div>

            <!-- Formatted Terminal Console View -->
            <div class="tab-pane-terminal" style="display: none;">
              <div class="terminal-console-box">
                <div class="terminal-header">
                  <span>OpenJDK 24 / Node.js Runtime Console</span>
                  <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <button class="btn-terminal-copy" onclick="copyTerminalByItemId('${item.id}', this)" title="Copy terminal output text">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      <span>Copy Output</span>
                    </button>
                    <span class="terminal-tag">Exit Code: 0</span>
                  </div>
                </div>
                <div class="terminal-content">${renderFormattedTerminal(item.terminalOutput)}</div>
              </div>
            </div>

            <!-- Embedded Live Interactive App Tab (For Exp 4, 5, 6) -->
            ${isWebInteractive ? `
              <div class="tab-pane-interactive" style="display: none;">
                ${renderLiveEmbeddedWidget(exp.id)}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render Embedded Live Interactive Widgets for Web Tech Experiments
function renderLiveEmbeddedWidget(expId) {
  if (expId === 'exp-4') {
    return `
      <div class="live-widget-wrapper">
        <div class="live-widget-header">
          <div class="live-widget-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Interactive Stopwatch Web Application (Live JS Timer)
          </div>
          <span class="live-badge-active">Active DOM</span>
        </div>
        <div class="stopwatch-container">
          <div class="stopwatch-display" id="card-sw-display">00:00:00:00</div>
          <div class="stopwatch-controls">
            <button class="btn-sw btn-sw-start" onclick="startCardStopwatch()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Start
            </button>
            <button class="btn-sw btn-sw-stop" onclick="stopCardStopwatch()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              Stop
            </button>
            <button class="btn-sw btn-sw-reset" onclick="resetCardStopwatch()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
              Reset
            </button>
          </div>
          <p style="font-size: 0.75rem; color: #94a3b8; text-align: center; margin: 0;">
            Real-time timer using <code>setInterval(updateTime, 10)</code> with millisecond precision.
          </p>
        </div>
      </div>
    `;
  } else if (expId === 'exp-5') {
    return `
      <div class="live-widget-wrapper">
        <div class="live-widget-header">
          <div class="live-widget-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email Address Validator with Alert Dialog
          </div>
          <span class="live-badge-active">Input Verification</span>
        </div>
        <div class="email-validator-box">
          <div class="email-form-row">
            <input type="text" id="card-email-input" class="email-input-field" value="pushkarmhatre@gmail.com" placeholder="Enter email to validate...">
            <button class="btn-validate-email" onclick="validateCardEmail()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Validate
            </button>
          </div>
          <div class="email-diagnostics" id="card-email-diagnostics">
            <div class="diag-item diag-valid">✓ Has '@' symbol at index 13</div>
            <div class="diag-item diag-valid">✓ Has '.' symbol after '@' at index 19</div>
            <div class="diag-item diag-valid">✓ Valid email syntax verified</div>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button class="filter-chip" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;" onclick="setCardEmailTest('invalid-email-no-at.com')">Test: Missing '@'</button>
            <button class="filter-chip" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;" onclick="setCardEmailTest('user@nodotcom')">Test: Missing '.'</button>
            <button class="filter-chip" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;" onclick="setCardEmailTest('pushkarmhatre@gmail.com')">Test: Valid Email</button>
          </div>
        </div>
      </div>
    `;
  } else if (expId === 'exp-6') {
    return `
      <div class="live-widget-wrapper">
        <div class="live-widget-header">
          <div class="live-widget-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
            Automated DOM Background Color Transition (Every 5s)
          </div>
          <span class="live-badge-active">5s Timer Active</span>
        </div>
        <div class="dom-color-box">
          <div class="dom-color-preview" id="card-dom-preview" style="background-color: #3b82f6;">
            <div style="font-size: 1.1rem; font-weight: 800;" id="card-dom-color-name">Dodger Blue (#3b82f6)</div>
            <div style="font-size: 0.75rem; opacity: 0.9; font-family: var(--font-mono);" id="card-dom-cycle-info">Cycle Step: 1 of 8</div>
            <div class="dom-timer-progress" id="card-dom-progress"></div>
          </div>
          <div class="dom-color-controls">
            <span class="dom-countdown-text" id="card-dom-countdown">Next color transition in: 5.0s</span>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn-dom-toggle" onclick="toggleCardDomTimer(this)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                <span>Pause</span>
              </button>
              <button class="btn-dom-toggle" onclick="cycleCardDomColorNow()">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                Next Color
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  return '';
}

// Format Terminal Output
function renderFormattedTerminal(output) {
  if (!output) return 'No console output logged.';
  return escapeHtml(output);
}

// Switch between Screenshot, Terminal, and Live Interactive Tab
function switchOutputTab(btn, tabType) {
  const queryOutputPane = btn.closest('.query-output-pane');
  const tabs = queryOutputPane.querySelectorAll('.output-tab-btn');
  tabs.forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const screenshotPane = queryOutputPane.querySelector('.tab-pane-screenshot');
  const terminalPane = queryOutputPane.querySelector('.tab-pane-terminal');
  const interactivePane = queryOutputPane.querySelector('.tab-pane-interactive');

  if (screenshotPane) screenshotPane.style.display = 'none';
  if (terminalPane) terminalPane.style.display = 'none';
  if (interactivePane) interactivePane.style.display = 'none';

  if (tabType === 'screenshot' && screenshotPane) {
    screenshotPane.style.display = 'block';
  } else if (tabType === 'terminal' && terminalPane) {
    terminalPane.style.display = 'block';
  } else if (tabType === 'interactive' && interactivePane) {
    interactivePane.style.display = 'flex';
  }
}

// Global Floating Toast Notification
function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'global-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;
  toast.classList.add('active');
  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toast.classList.remove('active');
  }, 2500);
}

// Unified, Robust Clipboard Engine (Works in HTTP, HTTPS, and file:/// Contexts)
function copyTextToClipboard(text, btn, title) {
  if (!text) {
    showToast('⚠️ No content available to copy.');
    return;
  }

  // Attempt Modern Async Clipboard API first
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(text).then(() => {
      onCopySuccess(btn, title);
    }).catch(err => {
      console.warn('Async Clipboard API failed, attempting textarea fallback...', err);
      fallbackCopyText(text, btn, title);
    });
  } else {
    // Textarea fallback for file:// or restricted environments
    fallbackCopyText(text, btn, title);
  }
}

// Reliable Textarea Copy Fallback
function fallbackCopyText(text, btn, title) {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999);

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (successful) {
      onCopySuccess(btn, title);
    } else {
      showToast('⚠️ Copy failed. Please select code manually and press Ctrl+C.');
    }
  } catch (err) {
    console.error('ExecCommand copy failed:', err);
    showToast('⚠️ Copy failed. Please select code manually.');
  }
}

// Visual & Haptic Success Handler
function onCopySuccess(btn, title) {
  if (btn) {
    const span = btn.querySelector('span');
    const originalText = span ? span.textContent : '';
    btn.classList.add('copied');
    if (span) span.textContent = 'Copied!';

    setTimeout(() => {
      btn.classList.remove('copied');
      if (span) span.textContent = originalText;
    }, 2000);
  }
  showToast(`✓ ${title || 'Code'} copied to clipboard!`);
}

// Copy Code by Program Item ID
function copyCodeByItemId(itemId, btn) {
  for (const exp of EXPERIMENTS_DATA) {
    if (exp.items) {
      const item = exp.items.find(it => it.id === itemId);
      if (item && item.code) {
        copyTextToClipboard(item.code, btn, `${exp.title} Source Code`);
        return;
      }
    }
  }
}

// Copy Terminal Output by Program Item ID
function copyTerminalByItemId(itemId, btn) {
  for (const exp of EXPERIMENTS_DATA) {
    if (exp.items) {
      const item = exp.items.find(it => it.id === itemId);
      if (item && item.terminalOutput) {
        copyTextToClipboard(item.terminalOutput, btn, `${exp.title} Terminal Output`);
        return;
      }
    }
  }
}

// Quick Copy direct from Sidebar TOC
function copyExpCodeById(expId, event, btn) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const exp = EXPERIMENTS_DATA.find(e => e.id === expId);
  if (!exp || !exp.items || exp.items.length === 0) return;
  const targetBtn = btn || (event ? event.currentTarget : null);
  copyTextToClipboard(exp.items[0].code, targetBtn, exp.title);
}

// Lightbox Modal Controls
function collectLightboxImages() {
  state.lightbox.images = [];
  document.querySelectorAll('.screenshot-container').forEach(el => {
    const img = el.querySelector('img');
    if (img && img.src) {
      const caption = el.getAttribute('onclick')?.match(/openLightboxImage\('([^']+)',\s*'([^']+)'\)/);
      state.lightbox.images.push({
        src: img.src,
        title: caption ? caption[2] : img.alt || 'Document Image'
      });
    }
  });
}

function openLightboxImage(src, title) {
  const modal = document.getElementById('lightbox-modal');
  const imgEl = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const captionEl = document.getElementById('lightbox-caption');
  const counterEl = document.getElementById('lightbox-counter');

  state.lightbox.zoom = 1;
  state.lightbox.isOpen = true;

  const idx = state.lightbox.images.findIndex(item => item.src.endsWith(src) || src.endsWith(item.src));
  state.lightbox.currentIndex = idx >= 0 ? idx : 0;

  imgEl.src = src;
  imgEl.style.transform = `scale(${state.lightbox.zoom})`;
  titleEl.textContent = title || 'Lab Document Image';
  captionEl.textContent = title || '';
  counterEl.textContent = `${state.lightbox.currentIndex + 1} / ${state.lightbox.images.length}`;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  modal.classList.remove('active');
  state.lightbox.isOpen = false;
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  if (state.lightbox.images.length === 0) return;
  state.lightbox.currentIndex = (state.lightbox.currentIndex + dir + state.lightbox.images.length) % state.lightbox.images.length;
  const current = state.lightbox.images[state.lightbox.currentIndex];
  openLightboxImage(current.src, current.title);
}

function zoomLightbox(delta) {
  state.lightbox.zoom = Math.max(0.5, Math.min(3, state.lightbox.zoom + delta));
  const imgEl = document.getElementById('lightbox-img');
  if (imgEl) {
    imgEl.style.transform = `scale(${state.lightbox.zoom})`;
  }
}

function downloadCurrentLightboxImage() {
  if (state.lightbox.images.length === 0) return;
  const current = state.lightbox.images[state.lightbox.currentIndex];
  const a = document.createElement('a');
  a.href = current.src;
  a.download = current.title.replace(/[^a-zA-Z0-9_-]/g, '_') + '.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Smooth Scroll to Experiment
function smoothScrollTo(elementId, event) {
  if (event) event.preventDefault();
  const el = document.getElementById(elementId);
  if (el) {
    const yOffset = -90;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    history.replaceState(null, null, `#${elementId}`);
  }
}

// Setup ScrollSpy for TOC
function setupScrollSpy() {
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.experiment-section');
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.id;

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.exp-nav-item').forEach(item => {
          item.classList.toggle('active', item.dataset.expId === id);
        });
      }
    });
  }, { passive: true });
}

// Event Listeners Initialization
function setupEventListeners() {
  // Theme Toggle
  const themeBtn = document.getElementById('btn-toggle-theme');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    });
  }

  // Layout View Buttons
  document.querySelectorAll('.layout-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLayoutView(btn.dataset.view);
    });
  });

  // Category Filter Chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.currentCategory = chip.dataset.category;
      renderExperiments();
    });
  });

  // Search Input
  const searchInput = document.getElementById('global-search');
  const clearBtn = document.getElementById('search-clear');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (clearBtn) clearBtn.style.display = state.searchQuery ? 'block' : 'none';
      renderExperiments();
    });

    // Keyboard shortcut: '/' to focus search
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput && !state.lightbox.isOpen) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      } else if (e.key === 'Escape') {
        if (state.lightbox.isOpen) {
          closeLightbox();
        } else if (document.getElementById('simulator-modal-backdrop')?.classList.contains('active')) {
          closeSimulator();
        } else if (document.activeElement === searchInput) {
          searchInput.blur();
        }
      } else if (state.lightbox.isOpen) {
        if (e.key === 'ArrowRight') navigateLightbox(1);
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === '+' || e.key === '=') zoomLightbox(0.25);
        if (e.key === '-') zoomLightbox(-0.25);
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.searchQuery = '';
      clearBtn.style.display = 'none';
      renderExperiments();
    });
  }

  // Sidebar Mobile Toggle
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
}

// Reset All Filters
function resetFilters() {
  state.currentCategory = 'ALL';
  state.searchQuery = '';
  const searchInput = document.getElementById('global-search');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('search-clear');
  if (clearBtn) clearBtn.style.display = 'none';

  document.querySelectorAll('.filter-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.category === 'ALL');
  });

  renderExperiments();
}

// Print Journal Function
function triggerPrintJournal() {
  window.print();
}

// Helper: Escape HTML
function escapeHtml(text) {
  if (!text) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

// Helper: Highlight Search Terms
function highlightSearchTerm(text, query) {
  if (!query || !text) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escaped.replace(regex, '<mark class="search-highlight">$1</mark>');
}

/* ===================================================================
   Live Interactive Widgets Logic (Exp 4, 5, 6 in Cards)
   =================================================================== */

function initLiveWidgets() {
  // Start the 5-second automatic DOM background color changer loop
  startDomColorChangerLoop();
}

// Exp 4: Stopwatch Controller
function formatStopwatchTime(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);

  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
}

function startCardStopwatch() {
  if (state.stopwatch.isRunning) return;
  state.stopwatch.isRunning = true;
  state.stopwatch.startTime = Date.now() - state.stopwatch.elapsedTime;
  state.stopwatch.timerInterval = setInterval(() => {
    state.stopwatch.elapsedTime = Date.now() - state.stopwatch.startTime;
    const formatted = formatStopwatchTime(state.stopwatch.elapsedTime);
    const display = document.getElementById('card-sw-display');
    if (display) display.textContent = formatted;
    const modalDisplay = document.getElementById('sim-sw-display');
    if (modalDisplay) modalDisplay.textContent = formatted;
  }, 10);
}

function stopCardStopwatch() {
  if (!state.stopwatch.isRunning) return;
  state.stopwatch.isRunning = false;
  clearInterval(state.stopwatch.timerInterval);
}

function resetCardStopwatch() {
  stopCardStopwatch();
  state.stopwatch.elapsedTime = 0;
  const display = document.getElementById('card-sw-display');
  if (display) display.textContent = '00:00:00:00';
  const modalDisplay = document.getElementById('sim-sw-display');
  if (modalDisplay) modalDisplay.textContent = '00:00:00:00';
}

// Exp 5: Email Validation Controller
function validateCardEmail() {
  const input = document.getElementById('card-email-input');
  const diagnostics = document.getElementById('card-email-diagnostics');
  if (!input || !diagnostics) return;

  const email = input.value.trim();
  const atPos = email.indexOf('@');
  const dotPos = email.lastIndexOf('.');

  let hasAt = (atPos > 0);
  let hasDot = (dotPos > atPos + 1 && dotPos < email.length - 1);
  let isValid = hasAt && hasDot;

  let diagHtml = '';
  if (hasAt) {
    diagHtml += `<div class="diag-item diag-valid">✓ Has '@' symbol at index ${atPos}</div>`;
  } else {
    diagHtml += `<div class="diag-item diag-invalid">✗ Missing or misplaced '@' character (Requirement 1 failed)</div>`;
  }

  if (hasDot) {
    diagHtml += `<div class="diag-item diag-valid">✓ Has '.' dot symbol after '@' at index ${dotPos}</div>`;
  } else {
    diagHtml += `<div class="diag-item diag-invalid">✗ Missing or misplaced '.' character after '@' (Requirement 2 failed)</div>`;
  }

  if (isValid) {
    diagHtml += `<div class="diag-item diag-valid" style="margin-top:0.35rem; font-weight:800;">✓ Email address is valid and accepted!</div>`;
    showToast('✓ Valid email address accepted!');
  } else {
    diagHtml += `<div class="diag-item diag-invalid" style="margin-top:0.35rem; font-weight:800;">✗ Validation failed: Prompting user to re-enter.</div>`;
    // Trigger the exact alert dialog required by syllabus
    setTimeout(() => {
      alert(`Invalid Email Address!\n\nReason: Email must contain both '@' and '.' characters in valid positions.\n\nPlease re-enter a valid email address.`);
      input.focus();
      input.select();
    }, 50);
  }

  diagnostics.innerHTML = diagHtml;
}

function setCardEmailTest(val) {
  const input = document.getElementById('card-email-input');
  if (input) {
    input.value = val;
    validateCardEmail();
  }
}

// Exp 6: DOM 5-Second Background Color Controller
function startDomColorChangerLoop() {
  const colors = [
    { name: 'Dodger Blue', hex: '#3b82f6' },
    { name: 'Emerald Green', hex: '#10b981' },
    { name: 'Amber Orange', hex: '#f59e0b' },
    { name: 'Ruby Crimson', hex: '#ef4444' },
    { name: 'Amethyst Violet', hex: '#8b5cf6' },
    { name: 'Rose Coral', hex: '#ec4899' },
    { name: 'Cyan Aqua', hex: '#06b6d4' },
    { name: 'Deep Teal', hex: '#14b8a6' }
  ];

  let currentIndex = 0;
  let remainingMs = 5000;
  const intervalMs = 100;

  setInterval(() => {
    if (state.domColorChanger.isPaused) return;

    remainingMs -= intervalMs;
    if (remainingMs <= 0) {
      remainingMs = 5000;
      currentIndex = (currentIndex + 1) % colors.length;
      applyDomColor(colors[currentIndex], currentIndex, colors.length);
    }

    // Update progress bar and countdown text
    const progressPct = (remainingMs / 5000) * 100;
    const countdownSec = (remainingMs / 1000).toFixed(1);

    const cardProgress = document.getElementById('card-dom-progress');
    const cardCountdown = document.getElementById('card-dom-countdown');
    if (cardProgress) cardProgress.style.width = `${progressPct}%`;
    if (cardCountdown) cardCountdown.textContent = `Next color transition in: ${countdownSec}s`;

    const simProgress = document.getElementById('sim-dom-progress');
    const simCountdown = document.getElementById('sim-dom-countdown');
    if (simProgress) simProgress.style.width = `${progressPct}%`;
    if (simCountdown) simCountdown.textContent = `Next color transition in: ${countdownSec}s`;
  }, intervalMs);
}

function applyDomColor(colorObj, index, total) {
  const cardPreview = document.getElementById('card-dom-preview');
  const cardColorName = document.getElementById('card-dom-color-name');
  const cardCycleInfo = document.getElementById('card-dom-cycle-info');

  if (cardPreview) cardPreview.style.backgroundColor = colorObj.hex;
  if (cardColorName) cardColorName.textContent = `${colorObj.name} (${colorObj.hex})`;
  if (cardCycleInfo) cardCycleInfo.textContent = `Cycle Step: ${index + 1} of ${total}`;

  const simPreview = document.getElementById('sim-dom-preview');
  const simColorName = document.getElementById('sim-dom-color-name');
  if (simPreview) simPreview.style.backgroundColor = colorObj.hex;
  if (simColorName) simColorName.textContent = `${colorObj.name} (${colorObj.hex})`;
}

function toggleCardDomTimer(btn) {
  state.domColorChanger.isPaused = !state.domColorChanger.isPaused;
  const span = btn ? btn.querySelector('span') : null;
  if (span) {
    span.textContent = state.domColorChanger.isPaused ? 'Resume' : 'Pause';
  }
  showToast(state.domColorChanger.isPaused ? '⏸ DOM color changer paused' : '▶ DOM color changer resumed');
}

function cycleCardDomColorNow() {
  const colors = [
    { name: 'Dodger Blue', hex: '#3b82f6' },
    { name: 'Emerald Green', hex: '#10b981' },
    { name: 'Amber Orange', hex: '#f59e0b' },
    { name: 'Ruby Crimson', hex: '#ef4444' },
    { name: 'Amethyst Violet', hex: '#8b5cf6' },
    { name: 'Rose Coral', hex: '#ec4899' },
    { name: 'Cyan Aqua', hex: '#06b6d4' },
    { name: 'Deep Teal', hex: '#14b8a6' }
  ];
  state.domColorChanger.currentIndex = (state.domColorChanger.currentIndex + 1) % colors.length;
  applyDomColor(colors[state.domColorChanger.currentIndex], state.domColorChanger.currentIndex, colors.length);
}

/* ===================================================================
   Interactive Playground / Simulator Engine (Modal)
   Simulates all 6 Java & Web Technologies practicals in-browser
   =================================================================== */

function initSimulatorControls() {
  selectSimulatorAlgorithm('exp-1');
}

function openSimulatorWithExp(expId) {
  const modal = document.getElementById('simulator-modal-backdrop');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    selectSimulatorAlgorithm(expId);
  }
}

function closeSimulator() {
  const modal = document.getElementById('simulator-modal-backdrop');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function selectSimulatorAlgorithm(expId) {
  state.simulator.selectedAlgorithm = expId;

  // Update preset chips
  document.querySelectorAll('.sandbox-preset-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.exp === expId);
  });

  const config = ALGORITHM_PRESETS[expId];
  const inputContainer = document.getElementById('simulator-inputs');
  if (!inputContainer || !config) return;

  let html = `
    <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); margin-bottom: 0.25rem;">
      ${config.name}
    </div>
    <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.75rem;">
      ${config.description}
    </div>
  `;

  if (expId === 'exp-1') {
    html += `
      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 0.75rem;">
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Student ID (s1.id):</label>
          <input type="number" id="sim-student-id" class="sandbox-textarea" style="height: 40px; padding: 0.5rem 0.75rem;" value="${config.defaultId || 10}">
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Student Name (s1.n):</label>
          <input type="text" id="sim-student-name" class="sandbox-textarea" style="height: 40px; padding: 0.5rem 0.75rem;" value="${config.defaultName || 'Alice'}">
        </div>
      </div>
    `;
  } else if (expId === 'exp-2') {
    html += `
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem;">
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Circle Radius (r):</label>
          <input type="number" id="sim-circle-radius" class="sandbox-textarea" style="height: 40px; padding: 0.5rem 0.75rem;" value="10">
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Rectangle Length (l):</label>
          <input type="number" id="sim-rect-l" class="sandbox-textarea" style="height: 40px; padding: 0.5rem 0.75rem;" value="10">
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Rectangle Breadth (b):</label>
          <input type="number" id="sim-rect-b" class="sandbox-textarea" style="height: 40px; padding: 0.5rem 0.75rem;" value="20">
        </div>
      </div>
    `;
  } else if (expId === 'exp-3') {
    html += `
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem;">
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Voter Age (InvalidAgeException):</label>
          <input type="number" id="sim-test-age" class="sandbox-textarea" style="height: 40px; padding: 0.5rem 0.75rem;" value="${config.testAge}">
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Numerator (Division):</label>
          <input type="number" id="sim-num-a" class="sandbox-textarea" style="height: 40px; padding: 0.5rem 0.75rem;" value="${config.divideNumerator}">
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Denominator (Test Div by 0):</label>
          <input type="number" id="sim-num-b" class="sandbox-textarea" style="height: 40px; padding: 0.5rem 0.75rem;" value="${config.divideDenominator}">
        </div>
      </div>
    `;
  } else if (expId === 'exp-4') {
    html += `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 1rem; background: #090a0f; border-radius: 6px;">
        <div class="stopwatch-display" id="sim-sw-display" style="font-size: 2.5rem; min-width: 260px;">00:00:00:00</div>
        <div class="stopwatch-controls">
          <button class="btn-sw btn-sw-start" onclick="startCardStopwatch()">Start</button>
          <button class="btn-sw btn-sw-stop" onclick="stopCardStopwatch()">Stop</button>
          <button class="btn-sw btn-sw-reset" onclick="resetCardStopwatch()">Reset</button>
        </div>
      </div>
    `;
  } else if (expId === 'exp-5') {
    html += `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="display: flex; gap: 0.75rem;">
          <input type="text" id="sim-email-input" class="email-input-field" value="${config.defaultEmail}" placeholder="Enter email to validate...">
          <button class="btn-validate-email" onclick="validateSimulatorEmail()">Validate Email</button>
        </div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">
          Rule: Must contain both '@' and '.' characters with '.' appearing after '@'.
        </div>
      </div>
    `;
  } else if (expId === 'exp-6') {
    html += `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <div class="dom-color-preview" id="sim-dom-preview" style="height: 100px; background-color: #3b82f6;">
          <div style="font-size: 1rem; font-weight: 800;" id="sim-dom-color-name">Dodger Blue (#3b82f6)</div>
          <div class="dom-timer-progress" id="sim-dom-progress"></div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="dom-countdown-text" id="sim-dom-countdown">Next color transition in: 5.0s</span>
          <button class="btn-dom-toggle" onclick="cycleCardDomColorNow()">Cycle Next Color</button>
        </div>
      </div>
    `;
  }

  inputContainer.innerHTML = html;
  executeSimulatorAlgorithm();
}

function validateSimulatorEmail() {
  const input = document.getElementById('sim-email-input');
  if (!input) return;
  const email = input.value.trim();
  const atPos = email.indexOf('@');
  const dotPos = email.lastIndexOf('.');

  let hasAt = (atPos > 0);
  let hasDot = (dotPos > atPos + 1 && dotPos < email.length - 1);
  let isValid = hasAt && hasDot;

  if (isValid) {
    showToast('✓ Email validation passed!');
  } else {
    alert(`Invalid Email Address!\n\nReason: Email must contain both '@' and '.' characters in valid positions.\n\nPlease re-enter a valid email address.`);
  }

  executeSimulatorAlgorithm();
}

// Execute the chosen experiment in JS and print realistic Java / JS console output
function executeSimulatorAlgorithm() {
  const expId = state.simulator.selectedAlgorithm;
  const resultArea = document.getElementById('simulator-result-area');
  if (!resultArea) return;

  let log = '';

  try {
    switch (expId) {
      case 'exp-1': {
        const id = Number(document.getElementById('sim-student-id')?.value || 10);
        const name = document.getElementById('sim-student-name')?.value || 'Alice';

        log += `==================================================\n`;
        log += `   PROGRAM ON CLASSES AND OBJECTS (g1.docx)       \n`;
        log += `==================================================\n`;
        log += `javac Main.java\n`;
        log += `java Main\n\n`;
        log += `[Program Execution Output]\n`;
        log += `${id}\n`;
        log += `${name}\n\n`;
        log += `Field values initialized via Student(int id, String n) constructor.\n`;
        log += `s1.id = ${id}, s1.n = ${name}\n`;
        log += `JVM execution finished with exit code 0.`;
        break;
      }

      case 'exp-2': {
        const radius = Number(document.getElementById('sim-circle-radius')?.value || 10);
        const rectL = Number(document.getElementById('sim-rect-l')?.value || 10);
        const rectB = Number(document.getElementById('sim-rect-b')?.value || 20);

        const circleArea = 3.14 * radius * radius;
        const rectArea = rectL * rectB;

        log += `==================================================\n`;
        log += `  METHOD & CONSTRUCTOR OVERLOADING (java 2.pdf)   \n`;
        log += `==================================================\n\n`;
        log += `[Part 1: Constructor Overloading in Class Student]\n`;
        log += `Invoking Student():\n`;
        log += `Default Constructor invoked\n`;
        log += `Default values: Name = null, Roll No = 0\n\n`;
        log += `Invoking Student("akshay", 1):\n`;
        log += `2-Param Constructor: Name = akshay, Roll No = 1\n\n`;
        log += `Invoking Student("nilesh", 2, 90.2):\n`;
        log += `3-Param Constructor: Name = nilesh, Roll No = 2, Marks = 90.2\n\n`;
        log += `[Part 2: Method Overloading in Class B]\n`;
        log += `Invoking b1.area(${radius}):\n`;
        log += `Area of circle (r=${radius}): ${circleArea.toFixed(1)}\n\n`;
        log += `Invoking b1.area(${rectL}, ${rectB}):\n`;
        log += `Area of rectangle (l=${rectL}, b=${rectB}): ${rectArea}\n\n`;
        log += `[Part 3: Command-Line Argument Simulation (Integer.parseInt)]\n`;
        log += `Simulating args = ["${radius}", "${rectL}", "${rectB}"]:\n`;
        log += `Area of circle: ${circleArea.toFixed(1)}\n`;
        log += `Area of rectangle: ${rectArea}\n\n`;
        log += `Compile-Time (Static) Polymorphism verified with exit code 0.`;
        break;
      }

      case 'exp-3': {
        const testAge = Number(document.getElementById('sim-test-age')?.value || 16);
        const numA = Number(document.getElementById('sim-num-a')?.value || 100);
        const numB = Number(document.getElementById('sim-num-b')?.value || 0);

        log += `==================================================\n`;
        log += `  INHERITANCE TYPES & EXCEPTION HANDLING (Java 3.pdf)\n`;
        log += `==================================================\n\n`;
        log += `[Section 1: Constructor Chaining Across Hierarchy]\n`;
        log += `Calling constructor of A:\n`;
        log += `Inside Default Constructor of A\n\n`;
        log += `Calling constructor of B (Single Inheritance: B extends A):\n`;
        log += `Inside Default Constructor of A\n`;
        log += `Inside Default Constructor of B\n\n`;
        log += `Calling constructor of C (Multilevel Inheritance: C extends B):\n`;
        log += `Inside Default Constructor of A\n`;
        log += `Inside Default Constructor of B\n`;
        log += `Inside constructor of C\n\n`;
        log += `Calling constructor of D (Multiple Inheritance via Interfaces D1, D2):\n`;
        log += `Inside Default Constructor of A\n`;
        log += `display function Inside class A [i=0, s=null]\n`;
        log += `display1 of interface D1 implemented in class D\n`;
        log += `display2 of interface D2 implemented in class D\n\n`;
        log += `[Section 2: Method Overriding & State Access]\n`;
        log += `a.setS("Pushkar Mhatre"); a.setI(64);\n`;
        log += `display function Inside class A [i=64, s=Pushkar Mhatre]\n`;
        log += `display function Inside class B\n`;
        log += `display function Inside class C\n\n`;
        log += `[Section 3: Exception Handling (try-catch-finally)]\n`;
        log += `Attempting division: ${numA} / ${numB}...\n`;
        if (numB === 0) {
          log += `[CAUGHT ArithmeticException]: / by zero\n`;
          log += `[Finally Block 1]: Division cleanup complete.\n\n`;
        } else {
          log += `Result = ${(numA / numB).toFixed(2)}\n`;
          log += `[Finally Block 1]: Division completed cleanly.\n\n`;
        }
        log += `Verifying voter registration for candidate age: ${testAge}...\n`;
        if (testAge < 18) {
          log += `[CAUGHT InvalidAgeException]: Age ${testAge} is ineligible! Minimum required age is 18.\n`;
          log += `[Finally Block 2]: Age verification transaction logged.\n`;
        } else {
          log += `[SUCCESS]: Candidate age ${testAge} is verified and eligible to vote.\n`;
          log += `[Finally Block 2]: Age verification transaction logged.\n`;
        }
        break;
      }

      case 'exp-4': {
        log += `==================================================\n`;
        log += `   JAVASCRIPT STOPWATCH APPLICATION STATE ENGINE   \n`;
        log += `==================================================\n`;
        log += `Current Elapsed Time: ${formatStopwatchTime(state.stopwatch.elapsedTime)}\n`;
        log += `Timer Status: ${state.stopwatch.isRunning ? 'RUNNING (Tick: 10ms)' : 'STOPPED / PAUSED'}\n\n`;
        log += `DOM Event Handlers:\n`;
        log += `- btnStart.addEventListener('click', startTimer)\n`;
        log += `- btnStop.addEventListener('click', stopTimer)\n`;
        log += `- btnReset.addEventListener('click', resetTimer)\n\n`;
        log += `Timing Mechanism: window.setInterval() millisecond precision timestamp difference.`;
        break;
      }

      case 'exp-5': {
        const email = document.getElementById('sim-email-input')?.value || 'pushkarmhatre@gmail.com';
        const atPos = email.indexOf('@');
        const dotPos = email.lastIndexOf('.');
        let hasAt = (atPos > 0);
        let hasDot = (dotPos > atPos + 1 && dotPos < email.length - 1);
        let isValid = hasAt && hasDot;

        log += `==================================================\n`;
        log += `     JAVASCRIPT EMAIL ADDRESS VALIDATOR ENGINE    \n`;
        log += `==================================================\n`;
        log += `Input String : "${email}"\n`;
        log += `Length       : ${email.length} characters\n`;
        log += `Index of '@' : ${atPos} ${hasAt ? '(Valid: present after index 0)' : '(INVALID: missing or at start)'}\n`;
        log += `Index of '.' : ${dotPos} ${hasDot ? '(Valid: present after @)' : '(INVALID: missing or misplaced)'}\n\n`;
        if (isValid) {
          log += `[VALIDATION SUCCESS]\n`;
          log += `✓ Email address satisfies standard syntactic structure.\n`;
          log += `✓ Form submission authorized.`;
        } else {
          log += `[VALIDATION FAILED]\n`;
          log += `✗ Displaying window.alert("Please enter a valid email address with '@' and '.'");\n`;
          log += `✗ document.getElementById('email').focus(); invoked to re-enter input.`;
        }
        break;
      }

      case 'exp-6': {
        log += `==================================================\n`;
        log += `   DOM AUTOMATED BACKGROUND COLOR CHANGER ENGINE  \n`;
        log += `==================================================\n`;
        log += `Interval: 5000 milliseconds (5.0 seconds)\n`;
        log += `DOM Target: document.body.style.backgroundColor\n\n`;
        log += `Color Palette Array:\n`;
        log += `[0] #3b82f6 (Dodger Blue)\n[1] #10b981 (Emerald Green)\n[2] #f59e0b (Amber Orange)\n[3] #ef4444 (Ruby Crimson)\n[4] #8b5cf6 (Amethyst Violet)\n[5] #ec4899 (Rose Coral)\n[6] #06b6d4 (Cyan Aqua)\n[7] #14b8a6 (Deep Teal)\n\n`;
        log += `Current Status: Active cyclic transitions triggered by window.setInterval().`;
        break;
      }
    }
  } catch (err) {
    log = `Error executing algorithm: ${err.message}`;
  }

  resultArea.innerHTML = `
    <div class="terminal-console-box">
      <div class="terminal-header">
        <span>Runtime Standard Output (stdout)</span>
        <span class="terminal-tag">Status: 200 OK</span>
      </div>
      <div style="font-family: var(--font-mono); font-size: 0.825rem; white-space: pre-wrap;">${escapeHtml(log)}</div>
    </div>
  `;
}
