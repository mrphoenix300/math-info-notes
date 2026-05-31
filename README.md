# Μαθηματικά Πληροφορικής — Σημειώσεις

> Αναλυτικές σημειώσεις, cheatsheets, formula sheet, λυμένες ασκήσεις και στρατηγικές εξέτασης για το μάθημα **Μαθηματικά Πληροφορικής** — ΕΚΠΑ, Τμήμα Πληροφορικής & Τηλεπικοινωνιών.

Built with ❤️ for ΕΚΠΑ DI

---

## Περιεχόμενα

### 8 Διαλέξεις

| # | Τίτλος | Κύρια Θέματα |
|---|--------|-------------|
| [Δ1](lectures/lecture1.html) | Υποθέσεις, Θεωρήματα & Αποδείξεις | Λογικοί συνδέτοροι, είδη αποδείξεων |
| [Δ2](lectures/lecture2.html) | Τεχνικές Απόδειξης | Εξαντλητική, Ramsey, Επαγωγή, Fibonacci, Αριθμοθεωρία |
| [Δ3](lectures/lecture3.html) | Δομική Επαγωγή | Σ\*, BST, γλώσσες |
| [Δ4](lectures/lecture4.html) | Ύπαρξη & Περιστερεώνας | Πιθανοτική, Erdős–Szekeres, Dirichlet |
| [Δ5](lectures/lecture5.html) | Διαγωνοποίηση & Υπολογισιμότητα | Cantor, ℝ μη-αριθμήσιμο, Halting Problem |
| [Δ6](lectures/lecture6.html) | Θεωρία Γραφημάτων | Χειραψία, Ramsey, Δέντρα, Euler, Planarity |
| [Δ7](lectures/lecture7.html) | Ταιριάσματα & Θεώρημα Hall | Αυξητικά μονοπάτια, Hall, BFS, Defect |
| [Δ8](lectures/lecture8.html) | Σχέσεις & Dilworth | Posets, Hasse, Dilworth, Mirsky, Sperner |

### Συγκεντρωτικοί Οδηγοί (Topics)

- [Οδηγός Επαγωγής](topics/induction.html) — Templates, συχνά λάθη, 10 ασκήσεις
- [Οδηγός Γραφημάτων](topics/graphs.html) — Cheatsheet ορισμών, decision tree θεωρημάτων
- [Cheatsheet Αποδείξεων](topics/proofs-cheatsheet.html) — 9 τεχνικές, πότε/πώς/παγίδες

### Ασκήσεις

- [Λυμένες Ασκήσεις](exercises/solved.html) — 22 ασκήσεις τύπου εξετάσεων με πλήρεις λύσεις

### Εξεταστική Προετοιμασία

- [Formula Sheet](exam-prep/formulas.html) — Όλοι οι τύποι σε grid 2 στηλών
- [Κεντρικά Θεωρήματα](exam-prep/key-theorems.html) — Accordion με ιδέα + πλήρη απόδειξη
- [Στρατηγικές Εξέτασης](exam-prep/tips.html) — 7ήμερο πρόγραμμα, αναγνώριση ασκήσεων

---

## Tech Stack

| Τεχνολογία | Χρήση |
|-----------|-------|
| **HTML5 + CSS3** | Δομή και στυλ (vanilla, χωρίς framework) |
| **[MathJax 3](https://www.mathjax.org/)** | Απόδοση LaTeX μαθηματικών |
| **[Mermaid.js v10](https://mermaid.js.org/)** | Διαγράμματα (flowcharts, graphs) |
| **[Fuse.js v7](https://fusejs.io/)** | Client-side fuzzy search |
| **CSS Custom Properties** | Dark mode theming |
| **IntersectionObserver** | Active TOC link highlighting |
| **localStorage** | Αποθήκευση theme + progress |

---

## Δομή Αρχείων

```text
math-info-notes/
├── index.html              # Αρχική σελίδα
├── 404.html                # Custom 404
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine directives
├── README.md               # Αυτό το αρχείο
│
├── css/
│   └── style.css           # Κεντρικό stylesheet (dark mode, callouts, TOC)
│
├── js/
│   ├── main.js             # Theme, TOC, progress tracker, back-to-top
│   └── search.js           # Fuse.js search
│
├── lectures/
│   ├── lecture1.html       # Δ1: Υποθέσεις & Θεωρήματα
│   ├── lecture2.html       # Δ2: Τεχνικές Απόδειξης
│   ├── lecture3.html       # Δ3: Δομική Επαγωγή
│   ├── lecture4.html       # Δ4: Ύπαρξη & Περιστερεώνας
│   ├── lecture5.html       # Δ5: Διαγωνοποίηση
│   ├── lecture6.html       # Δ6: Γραφήματα (εκτεταμένο)
│   ├── lecture7.html       # Δ7: Ταιριάσματα & Hall
│   └── lecture8.html       # Δ8: Σχέσεις & Dilworth
│
├── topics/
│   ├── induction.html      # Οδηγός Επαγωγής
│   ├── graphs.html         # Οδηγός Γραφημάτων
│   └── proofs-cheatsheet.html
│
├── exercises/
│   └── solved.html         # 22 Λυμένες Ασκήσεις
│
└── exam-prep/
    ├── formulas.html       # Formula Sheet (grid, print-friendly)
    ├── key-theorems.html   # Θεωρήματα (accordion)
    └── tips.html           # Στρατηγικές Εξέτασης
```

---

## Features

- **Dark Mode** — toggle + localStorage persistence, FOUC-free IIFE
- **Sticky Sidebar TOC** — IntersectionObserver active-link highlighting
- **Back-to-Top Button** — εμφανίζεται μετά από 400px scroll
- **Progress Tracker** — checkboxes per lecture (read/understood/exercises)
- **Collapsible Proofs** — `<details>` elements για αποδείξεις
- **7 Callout Types** — definition, theorem, proof, example, warning, exam, tldr
- **MathJax 3** — full LaTeX support με custom macros
- **Mermaid v10** — flowcharts και graph diagrams
- **Fuse.js Search** — client-side fuzzy search στην αρχική
- **Breadcrumbs** — navigation context
- **Print-friendly** — formula sheet με `@media print`
- **Mobile-responsive** — collapsible TOC, responsive grids
- **Open Graph tags** — για σωστό sharing στα social media

---

## Συνεισφορά

1. Fork το repository
2. Δημιούργησε branch: `git checkout -b fix/typo-lecture3`
3. Κάνε τις αλλαγές και commit: `git commit -m "Fix: ..."`
4. Push: `git push origin fix/typo-lecture3`
5. Άνοιξε Pull Request

---

## License

MIT License — ελεύθερη χρήση για εκπαιδευτικούς σκοπούς.

---

## Credits

Βασισμένο στις διαλέξεις του Τμήματος Πληροφορικής & Τηλεπικοινωνιών ΕΚΠΑ.
Μαθηματικό περιεχόμενο από τις επίσημες σημειώσεις του μαθήματος.
