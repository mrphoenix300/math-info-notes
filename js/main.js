/* ============================================================
   main.js — Μαθηματικά Πληροφορικής ΕΚΠΑ
   1. MathJax config (πρέπει να είναι στο <head> πριν το CDN)
   2. Mermaid init
   3. Dark mode toggle + localStorage
   4. Progress tracker (checkboxes × 8 διαλέξεις × 3 κριτήρια)
   5. Sidebar TOC — IntersectionObserver highlight
   6. Mobile TOC toggle
   7. Auto anchor links σε headings
   ============================================================ */

/* ------------------------------------------------------------------
   MathJax global config — τρέχει ΠΡΙΝ το CDN script (inline στο head)
   Αυτό το block υπάρχει εδώ μόνο ως τεκμηρίωση.
   Η πραγματική config είναι inline στο <head> κάθε σελίδας.
------------------------------------------------------------------ */

/* ------------------------------------------------------------------
   1. Boot
------------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', init);

function init() {
  initMermaid();
  initTheme();
  initProgressTracker();
  initTOC();
  initMobileTOC();
  initAnchorLinks();
  initBackToTop();
}

/* ------------------------------------------------------------------
   Back-to-Top Button
------------------------------------------------------------------ */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.setAttribute('aria-label', 'Επιστροφή στην κορυφή');
  btn.setAttribute('title', 'Επιστροφή στην κορυφή');
  btn.innerHTML = '&#8679;';
  btn.style.cssText = [
    'position:fixed',
    'bottom:1.5rem',
    'right:1.5rem',
    'width:2.6rem',
    'height:2.6rem',
    'border-radius:50%',
    'border:none',
    'background:var(--color-primary,#3b6fd4)',
    'color:#fff',
    'font-size:1.4rem',
    'line-height:1',
    'cursor:pointer',
    'opacity:0',
    'transform:translateY(8px)',
    'transition:opacity 0.25s,transform 0.25s',
    'z-index:999',
    'box-shadow:0 2px 8px rgba(0,0,0,0.25)',
    'display:flex',
    'align-items:center',
    'justify-content:center'
  ].join(';');

  document.body.appendChild(btn);

  const toggle = () => {
    const visible = window.scrollY > 400;
    btn.style.opacity = visible ? '1' : '0';
    btn.style.transform = visible ? 'translateY(0)' : 'translateY(8px)';
    btn.style.pointerEvents = visible ? 'auto' : 'none';
  };

  window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  toggle();
}

/* ------------------------------------------------------------------
   2. Mermaid
------------------------------------------------------------------ */
function initMermaid() {
  if (typeof mermaid === 'undefined') return;
  mermaid.initialize({
    startOnLoad: true,
    theme: isDark() ? 'dark' : 'default',
    securityLevel: 'loose',
    fontFamily: 'Georgia, serif'
  });
}

/* ------------------------------------------------------------------
   3. Dark Mode
------------------------------------------------------------------ */
const THEME_KEY = 'math-plir-theme';

function isDark() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function applyTheme(dark) {
  if (dark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
}

function initTheme() {
  // Εφαρμογή αποθηκευμένου theme (αποφεύγει FOUC)
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  refreshThemeButton(btn);
  btn.addEventListener('click', () => {
    applyTheme(!isDark());
    refreshThemeButton(btn);
    // Επανεκκίνηση Mermaid με νέο theme
    if (typeof mermaid !== 'undefined') {
      mermaid.initialize({ startOnLoad: false, theme: isDark() ? 'dark' : 'default' });
    }
  });
}

function refreshThemeButton(btn) {
  if (isDark()) {
    btn.innerHTML = '&#9728;&#xFE0F; Φωτεινό';
    btn.setAttribute('aria-label', 'Εναλλαγή σε φωτεινή λειτουργία');
    btn.setAttribute('title', 'Φωτεινό mode');
  } else {
    btn.innerHTML = '&#127769; Σκοτεινό';
    btn.setAttribute('aria-label', 'Εναλλαγή σε σκοτεινή λειτουργία');
    btn.setAttribute('title', 'Dark mode');
  }
}

/* ------------------------------------------------------------------
   4. Progress Tracker
------------------------------------------------------------------ */
const PROGRESS_KEY = 'math-plir-progress';

const LECTURES_META = [
  { id: 'lecture1', label: 'Δ1', title: 'Υποθέσεις & Θεωρήματα' },
  { id: 'lecture2', label: 'Δ2', title: 'Αποδείξεις' },
  { id: 'lecture3', label: 'Δ3', title: 'Δομική Επαγωγή' },
  { id: 'lecture4', label: 'Δ4', title: 'Ύπαρξη & Περιστερεώνας' },
  { id: 'lecture5', label: 'Δ5', title: 'Διαγωνοποίηση' },
  { id: 'lecture6', label: 'Δ6', title: 'Γραφήματα & Δέντρα' },
  { id: 'lecture7', label: 'Δ7', title: 'Ταιριάσματα & Hall' },
  { id: 'lecture8', label: 'Δ8', title: 'Σχέσεις & Dilworth' }
];

const CHECKS = [
  { id: 'read',       label: 'Διάβασα',           icon: '📖' },
  { id: 'understood', label: 'Κατάλαβα',           icon: '🧠' },
  { id: 'exercises',  label: 'Έλυσα ασκήσεις',    icon: '✏️' }
];

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress(data) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

function countProgress(data) {
  const total = LECTURES_META.length * CHECKS.length;
  let done = 0;
  LECTURES_META.forEach(({ id }) => {
    CHECKS.forEach(({ id: chk }) => {
      if (data[id] && data[id][chk]) done++;
    });
  });
  return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
}

function initProgressTracker() {
  const container = document.getElementById('progress-tracker');
  if (!container) return;
  renderProgressTracker(container, loadProgress());
}

function renderProgressTracker(container, data) {
  const { done, total, pct } = countProgress(data);

  const barColor = pct >= 80 ? '#2a7a40' : pct >= 50 ? '#1a3a6e' : '#1a3a6e';

  container.innerHTML = `
    <div class="pt-header">
      <h3 class="pt-title">&#128202; Πρόοδος Μελέτης</h3>
      <span class="pt-count">${done}/${total} ολοκληρωθέντα &mdash; ${pct}%</span>
    </div>
    <div class="pt-bar-wrap" role="progressbar"
         aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"
         aria-label="Συνολική πρόοδος ${pct}%">
      <div class="pt-bar-fill" style="width:${pct}%; background:${barColor}"></div>
    </div>
    <div class="pt-legend">
      ${CHECKS.map(c => `<span class="pt-legend-item">${c.icon} ${c.label}</span>`).join('')}
    </div>
    <div class="pt-lectures">
      ${LECTURES_META.map(lec => {
        const d = data[lec.id] || {};
        const doneLec = CHECKS.filter(c => d[c.id]).length;
        return `
          <div class="pt-lec-row">
            <span class="pt-lec-label" title="${lec.title}">${lec.label}</span>
            <div class="pt-dots" role="group" aria-label="Πρόοδος ${lec.title}">
              ${CHECKS.map(chk => {
                const checked = !!d[chk.id];
                const uid = `pt-${lec.id}-${chk.id}`;
                return `
                  <label class="pt-dot-label" for="${uid}" title="${chk.icon} ${chk.label}">
                    <input
                      type="checkbox"
                      id="${uid}"
                      class="pt-checkbox"
                      data-lecture="${lec.id}"
                      data-check="${chk.id}"
                      ${checked ? 'checked' : ''}
                      aria-label="${chk.label} — ${lec.title}"
                    >
                    <span class="pt-dot${checked ? ' pt-dot--on' : ''}"></span>
                  </label>`;
              }).join('')}
            </div>
            <span class="pt-lec-score">${doneLec}/${CHECKS.length}</span>
          </div>`;
      }).join('')}
    </div>
    <p class="pt-hint">Κλικ στις τελείες για να ενημερώσεις την πρόοδό σου &mdash; αποθηκεύεται τοπικά στο browser.</p>
  `;

  // Bind checkboxes
  container.querySelectorAll('.pt-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const progress = loadProgress();
      const { lecture, check } = cb.dataset;
      if (!progress[lecture]) progress[lecture] = {};
      progress[lecture][check] = cb.checked;
      saveProgress(progress);
      renderProgressTracker(container, progress);
    });
  });
}

/* ------------------------------------------------------------------
   5. Sidebar TOC — IntersectionObserver
------------------------------------------------------------------ */
function initTOC() {
  const tocLinks = document.querySelectorAll('.sidebar-toc a[href^="#"]');
  if (!tocLinks.length) return;

  const headings = Array.from(
    document.querySelectorAll('main h2[id], main h3[id], main h4[id]')
  );
  if (!headings.length) return;

  const headerH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--header-h')
  ) || 56;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(
          `.sidebar-toc a[href="#${entry.target.id}"]`
        );
        if (active) {
          active.classList.add('active');
          // Scroll TOC into view if needed
          active.scrollIntoView({ block: 'nearest' });
        }
      });
    },
    { rootMargin: `-${headerH + 24}px 0px -55% 0px` }
  );

  headings.forEach(h => observer.observe(h));
}

/* ------------------------------------------------------------------
   6. Mobile TOC Toggle
------------------------------------------------------------------ */
function initMobileTOC() {
  const toggle = document.querySelector('.toc-toggle');
  const toc    = document.querySelector('.sidebar-toc');
  if (!toggle || !toc) return;

  // Αρχική κατάσταση σε mobile: κλειστό
  const isMobile = () => window.innerWidth <= 768;
  if (isMobile()) {
    toc.classList.add('is-collapsed');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '📋 Περιεχόμενα ▾';
  }

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isExpanded));
    toc.classList.toggle('is-collapsed', isExpanded);
    toggle.textContent = isExpanded
      ? '📋 Περιεχόμενα ▾'
      : '📋 Περιεχόμενα ▴';
  });

  window.addEventListener('resize', () => {
    if (!isMobile()) {
      toc.classList.remove('is-collapsed');
      toggle.setAttribute('aria-expanded', 'true');
    }
  }, { passive: true });
}

/* ------------------------------------------------------------------
   7. Auto Anchor Links σε headings
------------------------------------------------------------------ */
function initAnchorLinks() {
  document.querySelectorAll(
    'main h2[id], main h3[id], main h4[id]'
  ).forEach(heading => {
    if (heading.querySelector('.anchor-link')) return;
    const a = document.createElement('a');
    a.href       = `#${heading.id}`;
    a.className  = 'anchor-link';
    a.textContent = '#';
    a.setAttribute('aria-hidden', 'true');
    a.setAttribute('tabindex', '-1');
    heading.appendChild(a);
  });
}
