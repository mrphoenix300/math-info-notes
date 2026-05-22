/* ============================================================
   search.js — Client-side search με Fuse.js
   Fuse.js φορτώνεται μέσω CDN (πριν αυτό το script).
   ============================================================ */

/* ------------------------------------------------------------------
   Search Index — όλες οι σελίδες του site
   url: σχετικά από root (χωρίς ./ — το getBasePath() το προσθέτει)
------------------------------------------------------------------ */
const SEARCH_INDEX = [
  {
    id:          'index',
    title:       'Αρχική Σελίδα',
    description: 'Επισκόπηση μαθήματος, roadmap εξεταστικής, γρήγοροι σύνδεσμοι και πρόοδος μελέτης.',
    tags:        ['αρχική', 'επισκόπηση', 'roadmap', 'διαλέξεις'],
    category:    'Γενικά',
    url:         'index.html'
  },
  {
    id:          'lecture1',
    title:       'Διάλεξη 1 — Υποθέσεις, Εικασίες, Θεωρήματα',
    description: 'Τυπική γλώσσα μαθηματικών: αξιώματα, ορισμοί, λήμματα, θεωρήματα. Λογικές προτάσεις, κβαντοδότες ∀ και ∃, σχέσεις συνεπαγωγής.',
    tags:        ['λογική', 'κβαντοδότες', 'θεωρήματα', 'αξιώματα', 'ορισμοί', 'λήμματα', 'εικασία'],
    category:    'Διαλέξεις',
    url:         'lectures/lecture1.html'
  },
  {
    id:          'lecture2',
    title:       'Διάλεξη 2 — Αποδείξεις',
    description: 'Μέθοδοι απόδειξης: άμεση, αντιθετοαντίστροφη, εις άτοπον, εξαντλητική. Πώς να χτίσεις αποδεικτικό επιχείρημα.',
    tags:        ['απόδειξη', 'άμεση', 'αντιθετοαντίστροφη', 'εις άτοπον', 'contradiction', 'contrapositive'],
    category:    'Διαλέξεις',
    url:         'lectures/lecture2.html'
  },
  {
    id:          'lecture3',
    title:       'Διάλεξη 3 — Δομική Επαγωγή',
    description: 'Μαθηματική επαγωγή (αδύναμη & ισχυρή), δομική επαγωγή σε δέντρα και γλωσσολογικές δομές. Τυπικά σχήματα και παραδείγματα.',
    tags:        ['επαγωγή', 'μαθηματική επαγωγή', 'ισχυρή επαγωγή', 'δομική επαγωγή', 'induction', 'βάση επαγωγής'],
    category:    'Διαλέξεις',
    url:         'lectures/lecture3.html'
  },
  {
    id:          'lecture4',
    title:       'Διάλεξη 4 — Αποδείξεις Ύπαρξης & Αρχή Περιστερεώνα',
    description: 'Κατασκευαστικές και μη-κατασκευαστικές αποδείξεις ύπαρξης. Αρχή Περιστερεώνα (Pigeonhole Principle) και εφαρμογές στη συνδυαστική.',
    tags:        ['ύπαρξη', 'περιστερεώνας', 'pigeonhole', 'κατασκευαστική', 'μη-κατασκευαστική', 'combinatorics'],
    category:    'Διαλέξεις',
    url:         'lectures/lecture4.html'
  },
  {
    id:          'lecture5',
    title:       'Διάλεξη 5 — Διαγωνοποίηση & Υπολογισιμότητα',
    description: 'Διαγωνισμός Cantor, μη-αρίθμηση πραγματικών. Θεώρημα Halting Problem. Αναγωγή υπολογιστικών προβλημάτων, μη-αποφασίσιμα.',
    tags:        ['cantor', 'διαγωνοποίηση', 'halting problem', 'αναγωγή', 'αναρίθμητα', 'αποφασίσιμα', 'turing'],
    category:    'Διαλέξεις',
    url:         'lectures/lecture5.html'
  },
  {
    id:          'lecture6',
    title:       'Διάλεξη 6 — Γραφήματα, Δέντρα, Euler, Επίπεδα',
    description: 'Θεωρία γραφημάτων: συνεκτικότητα, BFS/DFS, δέντρα. Κυκλώματα και μονοπάτια Euler. Επίπεδα γραφήματα, θεώρημα Kuratowski, τύπος Euler.',
    tags:        ['γραφήματα', 'δέντρα', 'euler', 'bfs', 'dfs', 'επίπεδα', 'kuratowski', 'planar', 'συνεκτικότητα'],
    category:    'Διαλέξεις',
    url:         'lectures/lecture6.html'
  },
  {
    id:          'lecture7',
    title:       'Διάλεξη 7 — Ταιριάσματα & Θεώρημα Hall',
    description: 'Ταιριάσματα σε διμερή γραφήματα, μέγιστο ταίριασμα. Θεώρημα Hall (Marriage Theorem): ύπαρξη τέλειου ταιριάσματος.',
    tags:        ['ταίριασμα', 'matching', 'διμερές γράφημα', 'bipartite', 'hall', 'marriage theorem', 'maximum matching'],
    category:    'Διαλέξεις',
    url:         'lectures/lecture7.html'
  },
  {
    id:          'lecture8',
    title:       'Διάλεξη 8 — Σχέσεις, Μερικές Διατάξεις, Dilworth',
    description: 'Σχέσεις ισοδυναμίας και μερικής διάταξης. Hasse διαγράμματα. Αλυσίδες, αντι-αλυσίδες. Θεωρήματα Dilworth και Mirsky.',
    tags:        ['σχέσεις', 'μερική διάταξη', 'poset', 'hasse', 'dilworth', 'mirsky', 'αλυσίδες', 'antichain'],
    category:    'Διαλέξεις',
    url:         'lectures/lecture8.html'
  },
  {
    id:          'induction',
    title:       'Θέμα: Επαγωγή (Σύνοψη)',
    description: 'Συγκεντρωτικές σημειώσεις για όλες τις μορφές επαγωγής: αδύναμη, ισχυρή, δομική. Τυπικά templates αποδείξεων.',
    tags:        ['επαγωγή', 'induction', 'ισχυρή', 'δομική', 'template'],
    category:    'Θέματα',
    url:         'topics/induction.html'
  },
  {
    id:          'graphs',
    title:       'Θέμα: Γραφήματα (Σύνοψη)',
    description: 'Συγκεντρωτικές σημειώσεις γραφημάτων: ορισμοί, ιδιότητες, αλγόριθμοι, θεωρήματα. Γρήγορη αναφορά.',
    tags:        ['γραφήματα', 'graphs', 'δέντρα', 'euler', 'χρωματισμός'],
    category:    'Θέματα',
    url:         'topics/graphs.html'
  },
  {
    id:          'proofs-cheatsheet',
    title:       'Cheat Sheet Αποδείξεων',
    description: 'Γρήγορος οδηγός για όλες τις τεχνικές απόδειξης. Πότε να χρησιμοποιείς ποια μέθοδο — εις άτοπον, αντιθετοαντίστροφη, επαγωγή.',
    tags:        ['cheatsheet', 'αποδείξεις', 'τεχνικές', 'οδηγός', 'μέθοδοι'],
    category:    'Θέματα',
    url:         'topics/proofs-cheatsheet.html'
  },
  {
    id:          'solved',
    title:       'Λυμένες Ασκήσεις',
    description: 'Συλλογή λυμένων ασκήσεων από παλιά θέματα εξετάσεων και φροντιστήρια. Αναλυτικές λύσεις βήμα-βήμα.',
    tags:        ['ασκήσεις', 'λύσεις', 'εξετάσεις', 'solved', 'παραδείγματα'],
    category:    'Ασκήσεις',
    url:         'exercises/solved.html'
  },
  {
    id:          'formulas',
    title:       'Τύποι & Φόρμουλες',
    description: 'Όλοι οι σημαντικοί τύποι του μαθήματος σε ένα σημείο: γραφήματα, επαγωγή, συνδυαστική, Euler.',
    tags:        ['τύποι', 'φόρμουλες', 'formulas', 'εξετάσεις', 'summary'],
    category:    'Εξεταστική',
    url:         'exam-prep/formulas.html'
  },
  {
    id:          'key-theorems',
    title:       'Βασικά Θεωρήματα',
    description: 'Τα κρίσιμα θεωρήματα για τις εξετάσεις: Hall, Dilworth, Mirsky, Euler, Kuratowski, Pigeonhole — με αποδείξεις.',
    tags:        ['θεωρήματα', 'hall', 'dilworth', 'euler', 'kuratowski', 'pigeonhole', 'εξετάσεις'],
    category:    'Εξεταστική',
    url:         'exam-prep/key-theorems.html'
  },
  {
    id:          'tips',
    title:       'Συμβουλές Εξετάσεων',
    description: 'Στρατηγικές για τις εξετάσεις, κοινά λάθη που να αποφύγεις, και πώς να γράφεις καθαρές αποδείξεις.',
    tags:        ['συμβουλές', 'tips', 'εξετάσεις', 'στρατηγική', 'λάθη'],
    category:    'Εξεταστική',
    url:         'exam-prep/tips.html'
  }
];

/* ------------------------------------------------------------------
   Βοηθητικές συναρτήσεις
------------------------------------------------------------------ */

// Υπολογισμός prefix ανάλογα με το βάθος της τρέχουσας σελίδας
function getBasePath() {
  return /\/(lectures|topics|exercises|exam-prep)\//.test(window.location.pathname)
    ? '../'
    : './';
}

// Escape HTML
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Highlight matched text
function highlight(text, matches, key) {
  if (!matches) return escapeHtml(text);
  const match = matches.find(m => m.key === key);
  if (!match || !match.indices.length) return escapeHtml(text);

  let result = '';
  let lastIndex = 0;
  const indices = match.indices
    .slice()
    .sort((a, b) => a[0] - b[0]);

  indices.forEach(([start, end]) => {
    result += escapeHtml(text.slice(lastIndex, start));
    result += `<mark>${escapeHtml(text.slice(start, end + 1))}</mark>`;
    lastIndex = end + 1;
  });
  result += escapeHtml(text.slice(lastIndex));
  return result;
}

/* ------------------------------------------------------------------
   Core search logic
------------------------------------------------------------------ */
let fuseInstance = null;
let searchInput  = null;
let resultsBox   = null;
let selectedIdx  = -1;

document.addEventListener('DOMContentLoaded', initSearch);

function initSearch() {
  searchInput = document.getElementById('search-input');
  resultsBox  = document.getElementById('search-results');
  if (!searchInput || !resultsBox) return;

  // Αν το Fuse.js δεν φορτώθηκε ακόμα, περίμενε
  if (typeof Fuse === 'undefined') {
    let attempts = 0;
    const poll = setInterval(() => {
      attempts++;
      if (typeof Fuse !== 'undefined') {
        clearInterval(poll);
        setupFuse();
      } else if (attempts > 20) {
        clearInterval(poll);
        console.warn('search.js: Fuse.js δεν φορτώθηκε.');
      }
    }, 100);
    return;
  }
  setupFuse();
}

function setupFuse() {
  fuseInstance = new Fuse(SEARCH_INDEX, {
    keys: [
      { name: 'title',       weight: 0.5 },
      { name: 'tags',        weight: 0.3 },
      { name: 'description', weight: 0.2 }
    ],
    threshold:        0.38,
    includeMatches:   true,
    minMatchCharLength: 2,
    ignoreLocation:   true
  });

  searchInput.setAttribute('autocomplete', 'off');
  searchInput.setAttribute('aria-autocomplete', 'list');
  searchInput.setAttribute('aria-controls', 'search-results');
  searchInput.setAttribute('aria-expanded', 'false');
  resultsBox.setAttribute('role', 'listbox');

  searchInput.addEventListener('input',   onInput);
  searchInput.addEventListener('keydown', onKeydown);
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim().length >= 2) renderResults(fuseInstance.search(searchInput.value.trim()));
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) closeResults();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeResults();
  });
}

function onInput() {
  const q = searchInput.value.trim();
  selectedIdx = -1;

  if (q.length < 2) {
    closeResults();
    return;
  }
  renderResults(fuseInstance.search(q));
}

function renderResults(results) {
  if (!results.length) {
    resultsBox.innerHTML = `<div class="sr-empty">Δεν βρέθηκαν αποτελέσματα.</div>`;
    openResults();
    return;
  }

  const base = getBasePath();
  const MAX = 8;

  resultsBox.innerHTML = results.slice(0, MAX).map((r, i) => {
    const { item, matches } = r;
    const titleHtml = highlight(item.title, matches, 'title');
    const descHtml  = highlight(
      item.description.length > 90
        ? item.description.slice(0, 90) + '…'
        : item.description,
      matches, 'description'
    );
    const catClass = {
      'Διαλέξεις':  'sr-cat--lecture',
      'Θέματα':     'sr-cat--topic',
      'Ασκήσεις':   'sr-cat--exercise',
      'Εξεταστική': 'sr-cat--exam',
      'Γενικά':     'sr-cat--general'
    }[item.category] || '';

    return `
      <a class="sr-item" href="${base}${item.url}"
         role="option" id="sr-item-${i}"
         aria-selected="${i === selectedIdx}">
        <span class="sr-cat ${catClass}">${escapeHtml(item.category)}</span>
        <span class="sr-title">${titleHtml}</span>
        <span class="sr-desc">${descHtml}</span>
      </a>`;
  }).join('');

  openResults();
}

function openResults() {
  resultsBox.classList.add('is-open');
  searchInput.setAttribute('aria-expanded', 'true');
}

function closeResults() {
  resultsBox.classList.remove('is-open');
  resultsBox.innerHTML = '';
  searchInput.setAttribute('aria-expanded', 'false');
  selectedIdx = -1;
}

function onKeydown(e) {
  const items = resultsBox.querySelectorAll('.sr-item');
  if (!items.length) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedIdx = Math.min(selectedIdx + 1, items.length - 1);
    updateSelection(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedIdx = Math.max(selectedIdx - 1, -1);
    updateSelection(items);
  } else if (e.key === 'Enter' && selectedIdx >= 0) {
    e.preventDefault();
    items[selectedIdx].click();
  } else if (e.key === 'Escape') {
    closeResults();
    searchInput.blur();
  }
}

function updateSelection(items) {
  items.forEach((item, i) => {
    const active = i === selectedIdx;
    item.setAttribute('aria-selected', String(active));
    item.classList.toggle('sr-item--active', active);
    if (active) item.scrollIntoView({ block: 'nearest' });
  });
  if (selectedIdx >= 0) {
    searchInput.setAttribute('aria-activedescendant', `sr-item-${selectedIdx}`);
  } else {
    searchInput.removeAttribute('aria-activedescendant');
  }
}
