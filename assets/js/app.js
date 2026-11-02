/**
 * Analysis of Algorithms (AOA) Laboratory Practicals Portal
 * Interactive Application Engine
 * Supports dynamic rendering, C syntax highlighting, category filtering,
 * instant search, zoomable lightbox, copy-to-clipboard, view modes,
 * and a full in-browser interactive Algorithm Simulator.
 */

// Application State
const state = {
  theme: localStorage.getItem('aoa_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  currentCategory: 'ALL',
  searchQuery: '',
  layoutView: localStorage.getItem('aoa_layout') || 'split', // 'split', 'stacked', 'code-only', 'output-only'
  lightbox: {
    isOpen: false,
    images: [],
    currentIndex: 0,
    zoom: 1
  },
  simulator: {
    selectedAlgorithm: 'exp-1'
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
});

// Theme Management
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('aoa_theme', theme);
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
  localStorage.setItem('aoa_layout', view);
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
        <button class="sidebar-quick-copy" onclick="copyExpCodeById('${exp.id}', event)" title="Quick Copy C Code (1-Click)" aria-label="Copy code for ${escapeHtml(exp.title)}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
      </a>
    </li>
  `).join('');
}

// High-Contrast Syntax Highlighting for C Code
function highlightCCode(code) {
  let formatted = escapeHtml(code);

  // Preprocessor directives (#include, #define)
  formatted = formatted.replace(/(#(?:include|define|ifdef|ifndef|endif)[^\n\r]*)/g, '<span class="c-preprocessor">$1</span>');

  // String literals
  formatted = formatted.replace(/(&quot;[\s\S]*?&quot;)/g, '<span class="c-string">$1</span>');

  // Multi-line and single-line comments
  formatted = formatted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="c-comment">$1</span>');
  formatted = formatted.replace(/(\/\/.*$)/gm, '<span class="c-comment">$1</span>');

  // C Data Types
  const types = /\b(void|int|char|float|double|struct|typedef|size_t)\b/g;
  formatted = formatted.replace(types, '<span class="c-type">$1</span>');

  // Control Flow Keywords
  const keywords = /\b(for|while|if|else|return|break|continue|switch|case|default|static|const|sizeof)\b/g;
  formatted = formatted.replace(keywords, '<span class="c-keyword">$1</span>');

  // Standard Library & Core Functions
  const functions = /\b(printf|scanf|clrscr|getch|abs|strlen|quicksort|mergeSort|merge|nqueen|place|display|find|uni|graphColoring|isSafe|main)\b/g;
  formatted = formatted.replace(functions, '<span class="c-function">$1</span>');

  // Numbers
  formatted = formatted.replace(/\b(\d+)\b/g, '<span class="c-number">$1</span>');

  return formatted;
}

// Render Code with Line Numbers for IDE-like Readability
function renderCodeWithLineNumbers(rawCode) {
  const lines = rawCode.trim().split('\n');
  return lines.map((line, idx) => {
    const lineNum = idx + 1;
    const highlighted = highlightCCode(line);
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
        <!-- Aim, Theory & Complexities -->
        <div class="aim-theory-box">
          <div class="aim-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            Aim / Objective
          </div>
          <div class="aim-desc">${highlightSearchTerm(exp.aim, searchQuery)}</div>

          <!-- Time & Space Complexity Cards Grid (Color Coded & Accessible) -->
          <div class="complexity-grid">
            <div class="complexity-card card-best">
              <span class="complexity-label">Best Case Time</span>
              <span class="complexity-value">${exp.complexities.bestTime}</span>
            </div>
            <div class="complexity-card card-avg">
              <span class="complexity-label">Average Case Time</span>
              <span class="complexity-value">${exp.complexities.avgTime}</span>
            </div>
            <div class="complexity-card card-worst">
              <span class="complexity-label">Worst Case Time</span>
              <span class="complexity-value">${exp.complexities.worstTime}</span>
            </div>
            <div class="complexity-card card-space">
              <span class="complexity-label">Space Complexity</span>
              <span class="complexity-value">${exp.complexities.space}</span>
            </div>
          </div>
          
          <details class="details-collapsible">
            <summary>View Theoretical Background, Recurrence & Learning Outcomes</summary>
            <div class="theory-content">
              <p>${exp.theory}</p>
              ${exp.complexities.recurrence ? `
                <div style="margin-top: 0.75rem; font-size: 0.825rem; font-family: var(--font-mono); color: var(--text-primary); background: var(--bg-surface-secondary); padding: 0.5rem 0.75rem; border-radius: 4px; border: 1px solid var(--border-color);">
                  <strong>Recurrence Relation:</strong> ${exp.complexities.recurrence}
                </div>
              ` : ''}
              ${exp.learningOutcomes ? `
                <div style="font-weight: 700; margin-top: 0.75rem; color: var(--text-primary); font-size: 0.8rem;">Key Takeaways & Outcomes:</div>
                <ul class="learning-list">
                  ${exp.learningOutcomes.map(item => `<li>${item}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          </details>
        </div>

        <!-- Full PDF Lab Manual Pages Strip -->
        ${exp.fullPages && exp.fullPages.length > 0 ? `
          <div class="full-pages-box">
            <div class="full-pages-header">
              <span class="full-pages-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                Original Lab Manual Document Pages (${exp.fullPages.length} Pages)
              </span>
              <span style="font-size: 0.7rem; color: var(--text-muted);">Click any page to zoom in high-resolution lightbox</span>
            </div>
            <div class="pages-strip">
              ${exp.fullPages.map(pg => `
                <div class="page-thumb-card" onclick="openLightboxImage('${pg.image}', '${escapeHtml(pg.title)}')">
                  <img src="${pg.image}" alt="${pg.title}" loading="lazy">
                  <div class="page-thumb-label">Page ${pg.page}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Program Code & Terminal Execution Outputs -->
        <div class="queries-container">
          ${exp.items ? exp.items.map(item => renderProgramCard(item, exp, searchQuery)).join('') : ''}
        </div>
      </div>
    </section>
  `;
}

// Render Single Program Card (with Sticky Copy Bar & Line Numbers)
function renderProgramCard(item, exp, searchQuery) {
  const rawCode = item.code || '';
  const escapedCode = escapeJsString(rawCode);
  const lineCount = rawCode.trim().split('\n').length;
  const programTitle = exp.title;

  return `
    <div class="query-card" id="${item.id}">
      <!-- Card Header -->
      <div class="query-header">
        <div class="query-title-wrapper">
          <span class="query-title">${highlightSearchTerm(item.title, searchQuery)}</span>
          <span class="query-type-badge">${item.type}</span>
        </div>
        <div class="query-actions">
          <button class="btn-query-action btn-copy" onclick="copyCodeToClipboard(this, \`${escapedCode}\`, '${escapeJsString(programTitle)}')" aria-label="Copy C Source Code">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy C Code</span>
          </button>
          <button class="btn-query-action" onclick="openSimulatorWithExp('${exp.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>Run in Simulator</span>
          </button>
        </div>
      </div>

      <!-- Split Layout: Code on Left, Real Screenshot / Terminal on Right -->
      <div class="query-content-grid">
        <!-- Left: C Code Pane with Sticky Header -->
        <div class="query-code-pane">
          <div class="code-header-bar">
            <div class="code-dots">
              <span class="code-dot dot-red"></span>
              <span class="code-dot dot-yellow"></span>
              <span class="code-dot dot-green"></span>
            </div>
            <span>${exp.title} • C Source Code (ANSI C)</span>
          </div>

          <!-- Sticky Code Toolbar: Always Visible While Scrolling! -->
          <div class="code-sticky-toolbar">
            <div class="code-lang-info">
              <span>C99 / Turbo C</span>
              <span class="code-line-badge">${lineCount} lines</span>
            </div>
            <div class="code-toolbar-actions">
              <button class="btn-sticky-copy" onclick="copyCodeToClipboard(this, \`${escapedCode}\`, '${escapeJsString(programTitle)}')" aria-label="Quick Copy C Code" title="Copy full C program (1-Click)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span>Copy Code</span>
              </button>
              <button class="btn-sticky-run" onclick="openSimulatorWithExp('${exp.id}')" title="Test in interactive simulator">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                <span>Run</span>
              </button>
            </div>
          </div>

          <!-- Line-numbered C Code Pre -->
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

            <!-- Formatted Terminal View -->
            <div class="tab-pane-terminal" style="display: none;">
              <div class="terminal-console-box">
                <div class="terminal-header">
                  <span>Turbo C++ / GCC Terminal Console</span>
                  <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <button class="btn-terminal-copy" onclick="copyCodeToClipboard(this, \`${escapeJsString(item.terminalOutput || '')}\`, 'Console Output')" title="Copy terminal output text">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      <span>Copy Output</span>
                    </button>
                    <span class="terminal-tag">Execution Log</span>
                  </div>
                </div>
                <div class="terminal-content">${renderFormattedTerminal(item.terminalOutput)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Format Terminal Output with Input Highlights
function renderFormattedTerminal(output) {
  if (!output) return 'No console output logged.';
  return escapeHtml(output);
}

// Switch between Screenshot and Terminal Tab
function switchOutputTab(btn, tabType) {
  const queryOutputPane = btn.closest('.query-output-pane');
  const tabs = queryOutputPane.querySelectorAll('.output-tab-btn');
  tabs.forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const screenshotPane = queryOutputPane.querySelector('.tab-pane-screenshot');
  const terminalPane = queryOutputPane.querySelector('.tab-pane-terminal');

  if (tabType === 'screenshot') {
    screenshotPane.style.display = 'block';
    terminalPane.style.display = 'none';
  } else {
    screenshotPane.style.display = 'none';
    terminalPane.style.display = 'block';
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

// Copy Code to Clipboard with Instant Visual & Toast Feedback
function copyCodeToClipboard(btn, text, title) {
  navigator.clipboard.writeText(text).then(() => {
    const span = btn ? btn.querySelector('span') : null;
    const originalText = span ? span.textContent : '';
    if (btn) {
      btn.classList.add('copied');
      if (span) span.textContent = 'Copied!';
    }
    showToast(`✓ ${title || 'Code'} copied to clipboard!`);
    
    if (btn) {
      setTimeout(() => {
        btn.classList.remove('copied');
        if (span) span.textContent = originalText;
      }, 2000);
    }
  }).catch(err => {
    console.error('Failed to copy code:', err);
    showToast('Failed to copy. Please allow clipboard permissions.');
  });
}

// Quick Copy direct from Sidebar TOC
function copyExpCodeById(expId, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const exp = EXPERIMENTS_DATA.find(e => e.id === expId);
  if (!exp || !exp.items || exp.items.length === 0) return;
  const targetBtn = event ? event.currentTarget : null;
  copyCodeToClipboard(targetBtn, exp.items[0].code, exp.title);
}

// Helper to escape raw string into JS attribute string
function escapeJsString(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

// Lightbox Modal Controls
function collectLightboxImages() {
  state.lightbox.images = [];
  document.querySelectorAll('.screenshot-container, .page-thumb-card').forEach(el => {
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
  titleEl.textContent = title || 'Lab Journal Document';
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
        } else if (document.getElementById('simulator-modal-backdrop').classList.contains('active')) {
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
   Interactive Algorithm Simulator & Visualizer
   Replaces SQL sandbox with comprehensive in-browser algorithm execution
   =================================================================== */

function initSimulatorControls() {
  selectSimulatorAlgorithm('exp-1');
}

function openSimulatorWithExp(expId) {
  const modal = document.getElementById('simulator-modal-backdrop');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  selectSimulatorAlgorithm(expId);
}

function closeSimulator() {
  const modal = document.getElementById('simulator-modal-backdrop');
  modal.classList.remove('active');
  document.body.style.overflow = '';
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

  if (expId === 'exp-1' || expId === 'exp-3' || expId === 'exp-4') {
    html += `
      <div style="display: flex; flex-direction: column; gap: 0.4rem;">
        <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">${config.inputLabel}</label>
        <input type="text" id="sim-array-input" class="sandbox-textarea" style="height: 42px; padding: 0.5rem 0.75rem;" value="${config.defaultInput}">
      </div>
    `;
  } else if (expId === 'exp-2') {
    html += `
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 0.75rem;">
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">${config.inputLabel}</label>
          <input type="text" id="sim-array-input" class="sandbox-textarea" style="height: 42px; padding: 0.5rem 0.75rem;" value="${config.defaultInput}">
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">${config.keyLabel}</label>
          <input type="text" id="sim-key-input" class="sandbox-textarea" style="height: 42px; padding: 0.5rem 0.75rem;" value="${config.defaultKey}">
        </div>
      </div>
    `;
  } else if (expId === 'exp-5') {
    html += `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Items [Profit, Weight] pairs:</label>
          <input type="text" id="sim-knapsack-items" class="sandbox-textarea" style="height: 42px; padding: 0.5rem 0.75rem;" value="20:30, 10:100, 50:90">
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Knapsack Capacity:</label>
          <input type="number" id="sim-knapsack-capacity" class="sandbox-textarea" style="height: 42px; padding: 0.5rem 0.75rem;" value="${config.capacity}">
        </div>
      </div>
    `;
  } else if (expId === 'exp-6') {
    html += `
      <div style="display: flex; flex-direction: column; gap: 0.4rem;">
        <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Cost Adjacency Matrix (${config.vertices} vertices, 0 = no edge):</label>
        <textarea id="sim-kruskal-matrix" class="sandbox-textarea" style="height: 90px; padding: 0.5rem 0.75rem;">0 12 5 10
9 10 0 0
6 0 5 7
10 5 16 15</textarea>
      </div>
    `;
  } else if (expId === 'exp-7') {
    html += `
      <div style="font-size: 0.8rem; color: var(--text-secondary);">
        Solves the classic <strong>4-Queen Problem</strong> on a 4x4 chessboard using recursive backtracking. Displays all complete non-attacking solutions with ASCII chessboard drawings.
      </div>
    `;
  } else if (expId === 'exp-8') {
    html += `
      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 0.75rem;">
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Max Colors (m):</label>
          <input type="number" id="sim-color-m" class="sandbox-textarea" style="height: 42px; padding: 0.5rem 0.75rem;" value="3">
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Adjacency Matrix (4 vertices):</label>
          <textarea id="sim-color-matrix" class="sandbox-textarea" style="height: 90px; padding: 0.5rem 0.75rem;">0 1 1 1
1 0 1 0
1 1 0 1
1 0 1 0</textarea>
        </div>
      </div>
    `;
  } else if (expId === 'exp-9') {
    html += `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">First String (X):</label>
          <input type="text" id="sim-lcs-x" class="sandbox-textarea" style="height: 42px; padding: 0.5rem 0.75rem;" value="${config.str1}">
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Second String (Y):</label>
          <input type="text" id="sim-lcs-y" class="sandbox-textarea" style="height: 42px; padding: 0.5rem 0.75rem;" value="${config.str2}">
        </div>
      </div>
    `;
  }

  inputContainer.innerHTML = html;
  executeSimulatorAlgorithm();
}

// Execute the chosen algorithm in JS and print realistic Turbo C console output
function executeSimulatorAlgorithm() {
  const expId = state.simulator.selectedAlgorithm;
  const resultArea = document.getElementById('simulator-result-area');
  if (!resultArea) return;

  let log = '';

  try {
    switch (expId) {
      case 'exp-1': {
        const inputStr = document.getElementById('sim-array-input')?.value || '9, 3, 6, 1, 7, 2';
        const arr = inputStr.split(/[\s,]+/).filter(x => x.length > 0).map(Number);
        const n = arr.length;
        log += `Enter the number of elements: ${n}\n`;
        log += `Enter ${n} elements:\n` + arr.join('\n') + '\n\n';

        // Insertion Sort
        for (let i = 1; i < n; i++) {
          let key = arr[i];
          let j = i - 1;
          while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
          }
          arr[j + 1] = key;
        }

        log += `Sorted array in ascending order:\n${arr.join(' ')}\n\nProcess completed in O(n²) worst-case time.`;
        break;
      }

      case 'exp-2': {
        const inputStr = document.getElementById('sim-array-input')?.value || '10, 20, 30, 50, 60, 80';
        const key = Number(document.getElementById('sim-key-input')?.value ?? 50);
        const arr = inputStr.split(/[\s,]+/).filter(x => x.length > 0).map(Number);
        const n = arr.length;

        log += `Enter the number of elements: ${n}\n`;
        log += `Enter ${n} elements in sorted order:\n` + arr.join('\n') + '\n';
        log += `Enter the element to search: ${key}\n\n`;

        let low = 0, high = n - 1, mid = -1, found = false;
        while (low <= high) {
          mid = Math.floor((low + high) / 2);
          if (arr[mid] === key) {
            found = true;
            break;
          } else if (key < arr[mid]) {
            high = mid - 1;
          } else {
            low = mid + 1;
          }
        }

        if (found) {
          log += `Element found at position ${mid + 1}\n(0-based index: ${mid})`;
        } else {
          log += `Element not found.`;
        }
        break;
      }

      case 'exp-3': {
        const inputStr = document.getElementById('sim-array-input')?.value || '13, 24, 56, 76, 45, 56';
        const arr = inputStr.split(/[\s,]+/).filter(x => x.length > 0).map(Number);
        const n = arr.length;

        log += `Enter the number of elements: ${n}\n`;
        log += `Enter ${n} elements:\n` + arr.join('\n') + '\n\n';

        function merge(a, low, mid, high) {
          let temp = [];
          let i = low, j = mid + 1;
          while (i <= mid && j <= high) {
            if (a[i] < a[j]) temp.push(a[i++]);
            else temp.push(a[j++]);
          }
          while (i <= mid) temp.push(a[i++]);
          while (j <= high) temp.push(a[j++]);
          for (let k = 0; k < temp.length; k++) {
            a[low + k] = temp[k];
          }
        }

        function mergeSort(a, low, high) {
          if (low < high) {
            let mid = Math.floor((low + high) / 2);
            mergeSort(a, low, mid);
            mergeSort(a, mid + 1, high);
            merge(a, low, mid, high);
          }
        }

        mergeSort(arr, 0, n - 1);
        log += `Sorted array using Merge Sort:\n${arr.join(' ')}\n\nGuaranteed O(n log n) divide-and-conquer execution.`;
        break;
      }

      case 'exp-4': {
        const inputStr = document.getElementById('sim-array-input')?.value || '23, 443, 12, 4, 56, 78';
        const arr = inputStr.split(/[\s,]+/).filter(x => x.length > 0).map(Number);
        const n = arr.length;

        log += `Enter the number of elements: ${n}\n`;
        log += `Enter ${n} elements:\n` + arr.join('\n') + '\n\n';

        function quicksort(a, low, high) {
          if (low < high) {
            let pivot = a[low];
            let i = low + 1;
            let j = high;
            while (i <= j) {
              while (i <= high && a[i] <= pivot) i++;
              while (a[j] > pivot) j--;
              if (i < j) {
                let temp = a[i]; a[i] = a[j]; a[j] = temp;
              }
            }
            a[low] = a[j];
            a[j] = pivot;
            quicksort(a, low, j - 1);
            quicksort(a, j + 1, high);
          }
        }

        quicksort(arr, 0, n - 1);
        log += `Sorted array using Quick Sort:\n${arr.join(' ')}\n\nIn-place partition-exchange completed.`;
        break;
      }

      case 'exp-5': {
        const itemsStr = document.getElementById('sim-knapsack-items')?.value || '20:30, 10:100, 50:90';
        let capacity = Number(document.getElementById('sim-knapsack-capacity')?.value || 60);

        const items = itemsStr.split(',').map((pair, idx) => {
          const [p, w] = pair.trim().split(':').map(Number);
          return { id: idx + 1, profit: p, weight: w, ratio: p / w };
        });

        const n = items.length;
        log += `Enter number of items: ${n}\n`;
        items.forEach(it => {
          log += `\nEnter Profit and Weight of item ${it.id}: ${it.profit} ${it.weight} (Ratio = ${it.ratio.toFixed(2)})`;
        });
        log += `\n\nEnter Knapsack Capacity: ${capacity}\n\n`;

        // Sort descending by ratio
        items.sort((a, b) => b.ratio - a.ratio);

        let totalProfit = 0;
        log += `Selected Items:\n`;
        for (let i = 0; i < n; i++) {
          if (capacity >= items[i].weight) {
            log += `Take Item ${i + 1} completely\n`;
            capacity -= items[i].weight;
            totalProfit += items[i].profit;
          } else {
            let frac = capacity / items[i].weight;
            log += `Take ${frac.toFixed(2)} fraction of Item ${i + 1}\n`;
            totalProfit += items[i].profit * frac;
            break;
          }
        }
        log += `\nMaximum Profit = ${totalProfit.toFixed(2)}`;
        break;
      }

      case 'exp-6': {
        const matrixStr = document.getElementById('sim-kruskal-matrix')?.value || '0 12 5 10\n9 10 0 0\n6 0 5 7\n10 5 16 15';
        const lines = matrixStr.trim().split('\n');
        const n = lines.length;
        let cost = [];
        for (let i = 0; i < n; i++) {
          cost[i + 1] = [];
          let row = lines[i].trim().split(/\s+/).map(Number);
          for (let j = 0; j < n; j++) {
            let val = row[j];
            cost[i + 1][j + 1] = (val === 0) ? 999 : val;
          }
        }

        let parent = [];
        for (let i = 1; i <= n; i++) parent[i] = i;

        function find(i) {
          while (parent[i] !== i) i = parent[i];
          return i;
        }
        function uni(i, j) {
          parent[i] = j;
        }

        log += `Enter the number of vertices: ${n}\n`;
        log += `Enter the cost adjacency matrix:\n${matrixStr}\n\n`;
        log += `Edges in the Minimum Spanning Tree:\n`;

        let ne = 1, mincost = 0;
        while (ne < n) {
          let min = 999, a = 0, b = 0, u = 0, v = 0;
          for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
              if (cost[i][j] < min) {
                min = cost[i][j];
                a = u = i;
                b = v = j;
              }
            }
          }
          u = find(u);
          v = find(v);
          if (u !== v) {
            log += `${ne++} Edge (${a},${b}) = ${min}\n`;
            mincost += min;
            uni(u, v);
          }
          cost[a][b] = cost[b][a] = 999;
        }
        log += `\nMinimum Cost = ${mincost}`;
        break;
      }

      case 'exp-7': {
        log += `4-QUEEN PROBLEM\n================\n`;
        let x = [];
        let count = 0;

        function place(k, i) {
          for (let j = 0; j < k; j++) {
            if (x[j] === i || Math.abs(x[j] - i) === Math.abs(j - k)) {
              return false;
            }
          }
          return true;
        }

        function display() {
          log += `\nSolution ${count}:\n`;
          for (let i = 0; i < 4; i++) {
            log += `+---+---+---+---+\n`;
            for (let j = 0; j < 4; j++) {
              if (x[i] === j) log += `| Q `;
              else log += `|   `;
            }
            log += `|\n`;
          }
          log += `+---+---+---+---+\n`;
        }

        function nqueen(k) {
          for (let i = 0; i < 4; i++) {
            if (place(k, i)) {
              x[k] = i;
              if (k === 3) {
                count++;
                display();
              } else {
                nqueen(k + 1);
              }
            }
          }
        }

        nqueen(0);
        log += `\nTotal Solutions = ${count}`;
        break;
      }

      case 'exp-8': {
        const m = Number(document.getElementById('sim-color-m')?.value || 3);
        const matrixStr = document.getElementById('sim-color-matrix')?.value || '0 1 1 1\n1 0 1 0\n1 1 0 1\n1 0 1 0';
        const lines = matrixStr.trim().split('\n');
        const n = lines.length;
        let graph = [];
        for (let i = 0; i < n; i++) {
          graph[i] = lines[i].trim().split(/\s+/).map(Number);
        }
        let color = new Array(n).fill(0);

        function isSafe(v, c) {
          for (let i = 0; i < n; i++) {
            if (graph[v][i] === 1 && color[i] === c) return false;
          }
          return true;
        }

        function graphColoring(v) {
          if (v === n) return true;
          for (let c = 1; c <= m; c++) {
            if (isSafe(v, c)) {
              color[v] = c;
              if (graphColoring(v + 1)) return true;
              color[v] = 0;
            }
          }
          return false;
        }

        log += `Enter number of vertices: ${n}\nEnter number of colors: ${m}\n\nEnter the adjacency matrix:\n${matrixStr}\n\n`;
        if (graphColoring(0)) {
          log += `Graph can be colored using ${m} colors.\n\nVertex\tColor\n`;
          for (let i = 0; i < n; i++) {
            log += `${i + 1}\t${color[i]}\n`;
          }
        } else {
          log += `Graph cannot be colored using ${m} colors.`;
        }
        break;
      }

      case 'exp-9': {
        const X = document.getElementById('sim-lcs-x')?.value || 'ABCDEF';
        const Y = document.getElementById('sim-lcs-y')?.value || 'ACEAF';
        const m = X.length;
        const n = Y.length;

        log += `Enter first string: ${X}\nEnter second string: ${Y}\n\n`;

        // 2D DP table
        let L = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) {
          for (let j = 0; j <= n; j++) {
            if (i === 0 || j === 0) L[i][j] = 0;
            else if (X[i - 1] === Y[j - 1]) L[i][j] = L[i - 1][j - 1] + 1;
            else L[i][j] = Math.max(L[i - 1][j], L[i][j - 1]);
          }
        }

        log += `Length of LCS = ${L[m][n]}\n`;

        // Backtrack LCS
        let lcsArr = [];
        let i = m, j = n;
        while (i > 0 && j > 0) {
          if (X[i - 1] === Y[j - 1]) {
            lcsArr.unshift(X[i - 1]);
            i--; j--;
          } else if (L[i - 1][j] > L[i][j - 1]) {
            i--;
          } else {
            j--;
          }
        }
        log += `LCS = ${lcsArr.join('')}\n\n...Program finished with exit code 255\nPress ENTER to exit console.`;
        break;
      }
    }
  } catch (err) {
    log = `Error executing algorithm: ${err.message}`;
  }

  resultArea.innerHTML = `
    <div class="terminal-console-box">
      <div class="terminal-header">
        <span>C Runtime Standard Output (stdout)</span>
        <span class="terminal-tag">Status: 200 OK</span>
      </div>
      <div style="font-family: var(--font-mono); font-size: 0.825rem; white-space: pre-wrap;">${escapeHtml(log)}</div>
    </div>
  `;
}
