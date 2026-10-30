/**
 * DBMS Laboratory Experiments Portal - Interactive Application Logic
 * Supports dynamic rendering, syntax highlighting, search, filtering,
 * image lightbox with zoom/pan, copy-to-clipboard, view modes, and SQL Sandbox.
 */

// State Management
const state = {
  theme: localStorage.getItem('dbms_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  currentCategory: 'ALL',
  searchQuery: '',
  layoutView: localStorage.getItem('dbms_layout') || 'split', // 'split', 'stacked', 'code-only', 'output-only'
  lightbox: {
    isOpen: false,
    images: [],
    currentIndex: 0,
    zoom: 1
  }
};

// SQL Mock Database for Interactive Sandbox
const MOCK_DB = {
  STUDENT27: [
    { NAME: 'Gargi', EMAIL: 'gargi@dbms.edu', ADDRESS: 'Mumbai', DOB: '2004-05-18', PHONE_NO: '9876543210', ROLL_NO: '18' },
    { NAME: 'Pranali', EMAIL: 'pranali@dbms.edu', ADDRESS: 'Pune', DOB: '2004-03-12', PHONE_NO: '9876543211', ROLL_NO: '06' },
    { NAME: 'Riya', EMAIL: 'riya@dbms.edu', ADDRESS: 'Navi Mumbai', DOB: '2004-07-22', PHONE_NO: '9876543212', ROLL_NO: '12' },
    { NAME: 'Mansi', EMAIL: 'mansi@dbms.edu', ADDRESS: 'Thane', DOB: '2004-11-09', PHONE_NO: '9876543213', ROLL_NO: '24' }
  ],
  student2: [
    { NAME: 'gargi', EMAIL: 'gargi.com', ADDRESS: '-', PHONE_NO: '12345', DOB: '17' },
    { NAME: 'pranali', EMAIL: 'pranali.com', ADDRESS: '-', PHONE_NO: '15678', DOB: '3' },
    { NAME: 'mansi', EMAIL: 'mansi.com', ADDRESS: '-', PHONE_NO: '46789', DOB: '2.5' },
    { NAME: 'nishita', EMAIL: 'nishita.com', ADDRESS: '-', PHONE_NO: '14237', DOB: '2.75' },
    { NAME: 'aarya', EMAIL: 'aarya.com', ADDRESS: '-', PHONE_NO: '345', DOB: '1.25' },
    { NAME: 'hary', EMAIL: 'hary.com', ADDRESS: '-', PHONE_NO: '9865', DOB: '6.8' },
    { NAME: 'monu', EMAIL: 'monu.com', ADDRESS: '-', PHONE_NO: '7895', DOB: '4' }
  ],
  Employee: [
    { EMPID: '101', EMPNAME: 'Rahul', DEPARTMENT: 'HR', SALARY: 28000 },
    { EMPID: '102', EMPNAME: 'Priya', DEPARTMENT: 'IT', SALARY: 30000 },
    { EMPID: '103', EMPNAME: 'Sneha', DEPARTMENT: 'Sales', SALARY: 40000 },
    { EMPID: '104', EMPNAME: 'Karan', DEPARTMENT: 'HR', SALARY: 25000 },
    { EMPID: '105', EMPNAME: 'Amit', DEPARTMENT: 'IT', SALARY: 27000 },
    { EMPID: '106', EMPNAME: 'Neha', DEPARTMENT: 'Sales', SALARY: 32000 },
    { EMPID: '107', EMPNAME: 'Rohan', DEPARTMENT: 'HR', SALARY: 22000 }
  ],
  courses: [
    { COURSE_ID: 101, COURSE_NAME: 'Data_Structures' },
    { COURSE_ID: 102, COURSE_NAME: 'Web_Development' },
    { COURSE_ID: 103, COURSE_NAME: 'Machine_Learning' },
    { COURSE_ID: 104, COURSE_NAME: 'Cyber_security' }
  ],
  students: [
    { STUDENT_ID: 1, STUDENT_NAME: 'Liam', COURSE_ID: 101 },
    { STUDENT_ID: 2, STUDENT_NAME: 'Emma', COURSE_ID: 102 },
    { STUDENT_ID: 3, STUDENT_NAME: 'Noah', COURSE_ID: 103 },
    { STUDENT_ID: 4, STUDENT_NAME: 'Olivia', COURSE_ID: null }
  ],
  DEPARTMENT: [
    { DEPTNO: 10, DNAME: 'HR', LOCATION: 'MUMBAI' },
    { DEPTNO: 20, DNAME: 'IT', LOCATION: 'PUNE' },
    { DEPTNO: 30, DNAME: 'SALES', LOCATION: 'DELHI' },
    { DEPTNO: 40, DNAME: 'FINANCE', LOCATION: 'NAGPUR' }
  ],
  EMPLOYEE: [
    { EMPNO: 101, ENAME: 'AMIT', JOB: 'MANAGER', SALARY: 50000, DEPTNO: 10 },
    { EMPNO: 102, RAHUL: 'DEVELOPER', JOB: 'DEVELOPER', ENAME: 'RAHUL', SALARY: 44000, DEPTNO: 20 },
    { EMPNO: 103, ENAME: 'PRIYA', JOB: 'ANALYST', SALARY: 38500, DEPTNO: 20 },
    { EMPNO: 104, ENAME: 'NEHA', JOB: 'SALESMAN', SALARY: 30000, DEPTNO: 30 }
  ]
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
});

// Theme Management
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('dbms_theme', theme);
  const themeBtn = document.getElementById('btn-toggle-theme');
  if (themeBtn) {
    themeBtn.innerHTML = theme === 'dark' 
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
}

// Layout View Switcher
function applyLayoutView(view) {
  state.layoutView = view;
  document.body.setAttribute('data-view', view);
  localStorage.setItem('dbms_layout', view);
  document.querySelectorAll('.layout-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });
}

// Sidebar Navigation
function buildSidebarNav() {
  const navContainer = document.getElementById('sidebar-nav-list');
  if (!navContainer) return;

  navContainer.innerHTML = EXPERIMENTS_DATA.map(exp => `
    <li class="exp-nav-item" data-exp-id="${exp.id}">
      <a href="#${exp.id}" onclick="smoothScrollTo('${exp.id}', event)">
        <span class="exp-badge-pill">${exp.number}</span>
        <span class="exp-nav-text">${escapeHtml(exp.title)}</span>
        <span class="exp-nav-count">${exp.items ? exp.items.length : 0}</span>
      </a>
    </li>
  `).join('');
}

// Syntax Highlighting for SQL
function highlightSQL(sql) {
  const keywords = /\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|ADD|DROP|COLUMN|MODIFY|DESC|DESCRIBE|GROUP|BY|HAVING|ORDER|ASC|DESC|UNION|ALL|INTERSECT|MINUS|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|NATURAL|ON|AS|AND|OR|NOT|IN|PRIMARY|KEY|FOREIGN|REFERENCES|USER|IDENTIFIED|GRANT|TO|REVOKE|COMMIT|ROLLBACK|dual)\b/gi;
  const functions = /\b(MIN|MAX|AVG|SUM|COUNT|LENGTH|CONCAT|UPPER|LOWER|REPLACE|SUBSTR|INSTR|TRIM)\b/gi;
  const dataTypes = /\b(NUMBER|VARCHAR2|VARCHAR|CHAR|NCHAR|DATE)\b/gi;
  
  let formatted = escapeHtml(sql);
  
  // Highlight single-line comments
  formatted = formatted.replace(/(--.*$)/gm, '<span class="sql-comment">$1</span>');
  
  // Highlight strings
  formatted = formatted.replace(/('([^'\\]|\\.)*')/g, '<span class="sql-string">$1</span>');
  
  // Highlight keywords
  formatted = formatted.replace(keywords, match => `<span class="sql-keyword">${match.toUpperCase()}</span>`);
  
  // Highlight aggregate & scalar functions
  formatted = formatted.replace(functions, match => `<span class="sql-function">${match.toUpperCase()}</span>`);
  
  // Highlight data types
  formatted = formatted.replace(dataTypes, match => `<span class="sql-type">${match.toUpperCase()}</span>`);
  
  // Highlight numbers (standalone digits)
  formatted = formatted.replace(/\b(\d+)\b/g, '<span class="sql-number">$1</span>');

  return formatted;
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
    
    // Search query filter
    if (!query) return true;
    
    const expText = `${exp.number} ${exp.title} ${exp.subtitle} ${exp.category} ${exp.aim} ${exp.theory}`.toLowerCase();
    if (expText.includes(query)) return true;
    
    // Check inside items
    if (exp.items && exp.items.some(item => 
      `${item.title} ${item.type} ${item.sql} ${item.description} ${item.status}`.toLowerCase().includes(query)
    )) return true;
    
    return false;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1rem; color: var(--text-muted);"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">No matching experiments found</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Try modifying your search terms or clearing the active category filters.</p>
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
  const studentInfo = exp.student 
    ? `${exp.student.name} • Roll No: ${exp.student.rollNo} • Div/Batch: ${exp.student.division}/${exp.student.batch}`
    : 'DBMS Laboratory';

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
          <span class="student-tag">${studentInfo}</span>
          <span class="rdbms-badge">Oracle 21c XE</span>
        </div>
      </div>

      <div class="exp-body">
        <!-- Aim & Theory -->
        <div class="aim-theory-box">
          <div class="aim-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            Aim / Objective
          </div>
          <div class="aim-desc">${highlightSearchTerm(exp.aim, searchQuery)}</div>
          
          <details class="details-collapsible">
            <summary>View Concept, Theory & Key Learning Outcomes</summary>
            <div class="theory-content">
              <p>${exp.theory}</p>
              ${exp.learningOutcomes ? `
                <div style="font-weight: 700; margin-top: 0.75rem; color: var(--text-primary); font-size: 0.8rem;">Key Takeaways:</div>
                <ul class="learning-list">
                  ${exp.learningOutcomes.map(item => `<li>${item}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          </details>
        </div>

        <!-- Full PDF Lab Sheet Carousel (Exp 5 & Exp 7) -->
        ${exp.fullPages ? `
          <div class="full-pages-box">
            <div class="full-pages-header">
              <span class="full-pages-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                Original Lab Journal Document Pages (${exp.fullPages.length} Pages)
              </span>
              <span style="font-size: 0.7rem; color: var(--text-muted);">Click any page to zoom in full resolution</span>
            </div>
            <div class="pages-strip">
              ${exp.fullPages.map((pg, idx) => `
                <div class="page-thumb-card" onclick="openLightboxImage('${pg.image}', '${escapeHtml(pg.title)}')">
                  <img src="${pg.image}" alt="${pg.title}" loading="lazy">
                  <div class="page-thumb-label">Page ${pg.page}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Relational Table Schemas (if any) -->
        ${exp.schemas ? `
          <div style="margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 0.4rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              Base Relations Schema Definition
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
              ${exp.schemas.map(s => `
                <div style="background: var(--bg-surface-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.75rem;">
                  <div style="font-weight: 700; font-family: var(--font-mono); font-size: 0.8rem; color: var(--brand-primary); margin-bottom: 0.4rem;">${s.name}</div>
                  <pre style="font-family: var(--font-mono); font-size: 0.75rem; background: var(--code-bg); color: var(--code-text); padding: 0.5rem; border-radius: 4px; overflow-x: auto; margin: 0;">${escapeHtml(s.sql)}</pre>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Queries & Outputs List -->
        <div class="queries-container">
          ${exp.items ? exp.items.map(item => renderQueryCard(item, exp, searchQuery)).join('') : ''}
        </div>
      </div>
    </section>
  `;
}

// Render Single Query & Output Card
function renderQueryCard(item, exp, searchQuery) {
  const escapedSql = escapeHtml(item.sql);

  return `
    <div class="query-card" id="${item.id}">
      <!-- Card Header -->
      <div class="query-header">
        <div class="query-title-wrapper">
          <span class="query-title">${highlightSearchTerm(item.title, searchQuery)}</span>
          <span class="query-type-badge">${item.type}</span>
        </div>
        <div class="query-actions">
          <button class="btn-query-action btn-copy" onclick="copySqlToClipboard(this, \`${escapedSql}\`)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy SQL</span>
          </button>
          <button class="btn-query-action" onclick="openSandboxWithQuery(\`${escapedSql}\`)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>Try in Sandbox</span>
          </button>
        </div>
      </div>

      <!-- Split Layout: Code on Left, Output Screenshot on Right -->
      <div class="query-content-grid">
        <!-- Left: SQL Query Code Pane -->
        <div class="query-code-pane">
          <div class="code-header-bar">
            <div class="code-dots">
              <span class="code-dot dot-red"></span>
              <span class="code-dot dot-yellow"></span>
              <span class="code-dot dot-green"></span>
            </div>
            <span>Oracle SQL Command</span>
          </div>
          <pre class="query-code-pre"><code>${highlightSQL(item.sql)}</code></pre>
          <div class="query-desc-box">
            ${highlightSearchTerm(item.description, searchQuery)}
          </div>
        </div>

        <!-- Right: Execution Output & Real Screenshot Pane -->
        <div class="query-output-pane">
          <div class="output-header-bar">
            <div class="output-tabs">
              <button class="output-tab-btn active" onclick="switchOutputTab(this, 'screenshot')">Actual Screenshot</button>
              <button class="output-tab-btn" onclick="switchOutputTab(this, 'data')">Tabular Data</button>
            </div>
            <span class="output-status-pill">${escapeHtml(item.status || 'Statement processed')}</span>
          </div>

          <div class="output-body">
            <!-- Screenshot View -->
            <div class="tab-pane-screenshot active">
              <div class="screenshot-container" onclick="openLightboxImage('${item.image}', '${escapeHtml(item.title)} - ${escapeHtml(item.imageCaption)}')">
                <img src="${item.image}" alt="${item.title}" class="screenshot-img" loading="lazy">
                <div class="screenshot-overlay">
                  <span>${escapeHtml(item.imageCaption)}</span>
                  <span class="zoom-hint">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    Full View
                  </span>
                </div>
              </div>
            </div>

            <!-- Tabular View -->
            <div class="tab-pane-data" style="display: none;">
              ${renderTabularOutput(item.outputType, item.outputData)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render Structured Output (Tables or Messages)
function renderTabularOutput(type, data) {
  if (!data) {
    return `<div class="oracle-message-box">Statement executed successfully.</div>`;
  }

  if (type === 'message') {
    return `
      <div class="oracle-message-box">
        <strong>Oracle Result:</strong> ${escapeHtml(data.message)}
      </div>
    `;
  }

  if ((type === 'table' || type === 'schema') && data.headers && data.rows) {
    return `
      <div class="table-responsive">
        <table class="oracle-table">
          <thead>
            <tr>
              ${data.headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.rows.map(row => `
              <tr>
                ${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.5rem; text-align: right;">
        ${data.rows.length} rows returned
      </div>
    `;
  }

  return `<div class="oracle-message-box">Output rendered in screenshot.</div>`;
}

// Output Tab Switcher (Screenshot vs Data Table)
function switchOutputTab(btn, tabType) {
  const queryOutputPane = btn.closest('.query-output-pane');
  const tabs = queryOutputPane.querySelectorAll('.output-tab-btn');
  tabs.forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const screenshotPane = queryOutputPane.querySelector('.tab-pane-screenshot');
  const dataPane = queryOutputPane.querySelector('.tab-pane-data');

  if (tabType === 'screenshot') {
    screenshotPane.style.display = 'block';
    dataPane.style.display = 'none';
  } else {
    screenshotPane.style.display = 'none';
    dataPane.style.display = 'block';
  }
}

// Copy Code to Clipboard
function copySqlToClipboard(btn, text) {
  // Decode HTML entities if present
  const txtArea = document.createElement('textarea');
  txtArea.innerHTML = text;
  const decodedText = txtArea.value;

  navigator.clipboard.writeText(decodedText).then(() => {
    const span = btn.querySelector('span');
    const originalText = span.textContent;
    btn.classList.add('copied');
    span.textContent = 'Copied!';
    
    setTimeout(() => {
      btn.classList.remove('copied');
      span.textContent = originalText;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy SQL:', err);
  });
}

// Smooth Scroll with Header Offset
function smoothScrollTo(elementId, event) {
  if (event) event.preventDefault();
  const el = document.getElementById(elementId);
  if (!el) return;

  const headerOffset = 80;
  const elementPosition = el.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });

  // Close mobile sidebar if open
  document.getElementById('sidebar')?.classList.remove('open');
}

// Lightbox Modal Logic
function collectLightboxImages() {
  state.lightbox.images = [];
  EXPERIMENTS_DATA.forEach(exp => {
    if (exp.fullPages) {
      exp.fullPages.forEach(p => {
        state.lightbox.images.push({
          src: p.image,
          title: `Experiment ${exp.number}: ${exp.title} - Page ${p.page}`,
          caption: p.title
        });
      });
    }
    if (exp.items) {
      exp.items.forEach(item => {
        if (item.image) {
          state.lightbox.images.push({
            src: item.image,
            title: `Exp ${exp.number} • ${item.title}`,
            caption: item.imageCaption || item.description
          });
        }
      });
    }
  });
}

function openLightboxImage(src, caption) {
  const index = state.lightbox.images.findIndex(img => img.src === src);
  state.lightbox.currentIndex = index !== -1 ? index : 0;
  state.lightbox.zoom = 1;
  state.lightbox.isOpen = true;

  updateLightboxContent();
  document.getElementById('lightbox-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  state.lightbox.isOpen = false;
  document.getElementById('lightbox-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  const total = state.lightbox.images.length;
  if (total === 0) return;
  state.lightbox.currentIndex = (state.lightbox.currentIndex + direction + total) % total;
  state.lightbox.zoom = 1;
  updateLightboxContent();
}

function updateLightboxContent() {
  const current = state.lightbox.images[state.lightbox.currentIndex];
  if (!current) return;

  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const counter = document.getElementById('lightbox-counter');
  const caption = document.getElementById('lightbox-caption');

  img.src = current.src;
  img.style.transform = `scale(${state.lightbox.zoom})`;
  title.textContent = current.title;
  counter.textContent = `${state.lightbox.currentIndex + 1} / ${state.lightbox.images.length}`;
  caption.textContent = current.caption;
}

function zoomLightbox(delta) {
  state.lightbox.zoom = Math.max(0.5, Math.min(3, state.lightbox.zoom + delta));
  const img = document.getElementById('lightbox-img');
  if (img) img.style.transform = `scale(${state.lightbox.zoom})`;
}

function downloadCurrentLightboxImage() {
  const current = state.lightbox.images[state.lightbox.currentIndex];
  if (!current) return;
  const a = document.createElement('a');
  a.href = current.src;
  a.download = current.src.split('/').pop() || 'dbms_output.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// SQL Interactive Sandbox Engine
function openSandboxWithQuery(query) {
  const modal = document.getElementById('sandbox-modal-backdrop');
  const textarea = document.getElementById('sandbox-sql-input');
  if (textarea && query) {
    textarea.value = query;
  }
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (query) {
    executeSandboxQuery();
  }
}

function closeSandbox() {
  const modal = document.getElementById('sandbox-modal-backdrop');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function executeSandboxQuery() {
  const input = document.getElementById('sandbox-sql-input').value.trim();
  const resultArea = document.getElementById('sandbox-result-area');
  if (!input) {
    resultArea.innerHTML = `<div style="color: var(--text-muted); font-family: var(--font-mono);">Enter a SQL command to run.</div>`;
    return;
  }

  // Simple simulated client-side query evaluator for DBMS demo
  try {
    const upperInput = input.toUpperCase();
    
    // Check which table is referenced
    let targetTable = null;
    let tableName = '';
    for (const tbl in MOCK_DB) {
      if (upperInput.includes(tbl.toUpperCase())) {
        targetTable = MOCK_DB[tbl];
        tableName = tbl;
        break;
      }
    }

    if (!targetTable) {
      resultArea.innerHTML = `
        <div style="color: var(--success); font-family: var(--font-mono);">
          <strong>Statement processed.</strong><br>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Command executed in 0.01 seconds. In Oracle Live DB this creates/alters/grants objects as defined.</span>
        </div>
      `;
      return;
    }

    // Basic SELECT projection & filtering
    let rows = [...targetTable];
    
    // Simulate simple WHERE condition
    if (upperInput.includes('WHERE')) {
      const parts = input.split(/WHERE/i);
      const condition = parts[1].trim();
      
      if (condition.includes('=')) {
        const [col, val] = condition.split('=').map(s => s.trim().replace(/['";]/g, ''));
        rows = rows.filter(r => {
          const key = Object.keys(r).find(k => k.toUpperCase() === col.toUpperCase());
          return key && String(r[key]).toLowerCase() === val.toLowerCase();
        });
      } else if (condition.includes('>')) {
        const [col, val] = condition.split('>').map(s => s.trim().replace(/['";]/g, ''));
        const numVal = parseFloat(val);
        if (!isNaN(numVal)) {
          rows = rows.filter(r => {
            const key = Object.keys(r).find(k => k.toUpperCase() === col.toUpperCase());
            return key && parseFloat(r[key]) > numVal;
          });
        }
      }
    }

    // Render result table
    if (rows.length === 0) {
      resultArea.innerHTML = `<div style="font-family: var(--font-mono); color: var(--warning);">No rows selected (0 rows returned).</div>`;
      return;
    }

    const headers = Object.keys(rows[0]);
    resultArea.innerHTML = `
      <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem; font-family: var(--font-mono);">
        Table: <strong>${tableName}</strong> | ${rows.length} rows returned (Simulated Oracle Execution)
      </div>
      <div class="table-responsive">
        <table class="oracle-table">
          <thead>
            <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${rows.map(r => `<tr>${headers.map(h => `<td>${r[h] !== null ? escapeHtml(String(r[h])) : 'NULL'}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (err) {
    resultArea.innerHTML = `<div style="color: var(--danger); font-family: var(--font-mono);">ORA-00900: invalid SQL statement: ${err.message}</div>`;
  }
}

// Search and Filter Handlers
function setupEventListeners() {
  // Theme Toggle Button
  const themeBtn = document.getElementById('btn-toggle-theme');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    });
  }

  // Sidebar Toggle for Mobile
  const sidebarBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Search Input
  const searchInput = document.getElementById('global-search');
  const searchClear = document.getElementById('search-clear');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (searchClear) searchClear.style.display = state.searchQuery ? 'block' : 'none';
      renderExperiments();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      searchClear.style.display = 'none';
      renderExperiments();
    });
  }

  // Category Filter Chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.currentCategory = chip.dataset.category;
      renderExperiments();
    });
  });

  // Layout View Buttons
  document.querySelectorAll('.layout-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLayoutView(btn.dataset.view);
    });
  });

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // Focus search on '/'
    if (e.key === '/' && document.activeElement !== searchInput && !state.lightbox.isOpen) {
      e.preventDefault();
      searchInput?.focus();
    }
    
    // Lightbox Controls
    if (state.lightbox.isOpen) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === '+' || e.key === '=') zoomLightbox(0.25);
      if (e.key === '-') zoomLightbox(-0.25);
    }
  });
}

function resetFilters() {
  state.searchQuery = '';
  state.currentCategory = 'ALL';
  const searchInput = document.getElementById('global-search');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.filter-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.category === 'ALL');
  });
  renderExperiments();
}

// Scroll Spy to highlight active experiment in sidebar
function setupScrollSpy() {
  const sections = document.querySelectorAll('.experiment-section');
  const navItems = document.querySelectorAll('.exp-nav-item');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.dataset.expId === current) {
        item.classList.add('active');
      }
    });
  }, { passive: true });
}

// Utilities
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function highlightSearchTerm(text, term) {
  if (!term || !text) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
  return escaped.replace(regex, '<mark style="background: var(--text-primary); color: var(--bg-surface); padding: 0 3px; border-radius: 2px; font-weight: 700;">$1</mark>');
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Print Handler
function triggerPrintJournal() {
  window.print();
}

