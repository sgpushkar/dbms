# ⚡ Analysis of Algorithms (AOA) Laboratory Practicals Portal

A modern, responsive, high-contrast client-side web application showcasing complete laboratory experiments for **Analysis of Algorithms (AOA / DAA)** in C. The portal features syntax-highlighted C source codes, asymptotic time and space complexity analyses, recurrence relations, theoretical foundations, and verified terminal execution outputs captured directly from Turbo C / GCC console sessions.

---

## 🚀 Quick Start

### Option 1: Open Directly in Browser
Double-click or open `index.html` in any web browser (Chrome, Edge, Firefox, Safari). No web server, Node.js, or external dependencies are required.

### Option 2: Run Local Dev Server (with Live-Reload)
```bash
npm run dev
# or
node dev-server.js
```
The local server will launch at [http://localhost:3000](http://localhost:3000) with automatic hot-reloading on file modifications.

---

## 📚 Complete Experiments Index

| Exp | Title | Algorithmic Paradigm | Best Case | Worst Case | Space | Verified Output |
|:---:|---|---|:---:|:---:|:---:|:---:|
| **01** | **Insertion Sort** | Incremental / In-Place | $\mathcal{O}(n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(1)$ | `1 2 3 6 7 9` |
| **02** | **Binary Search** | Decrease and Conquer | $\mathcal{O}(1)$ | $\mathcal{O}(\log n)$ | $\mathcal{O}(1)$ | `Key 50 at Position 4` |
| **03** | **Merge Sort** | Divide and Conquer | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n)$ | `13 24 45 56 56 76` |
| **04** | **Quick Sort** | Divide and Conquer | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(\log n)$ | `4 12 23 56 78 443` |
| **05** | **Fractional Knapsack** | Greedy Method | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n)$ | `Max Profit = 36.67` |
| **06** | **Kruskal's Algorithm (MST)** | Greedy Strategy (DSU) | $\mathcal{O}(E \log E)$ | $\mathcal{O}(V^2)$ | $\mathcal{O}(V+E)$ | `Minimum Cost = 17` |
| **07** | **4-Queen Problem** | Backtracking | $\mathcal{O}(N!)$ | $\mathcal{O}(N!)$ | $\mathcal{O}(N)$ | `2 Chessboard Solutions` |
| **08** | **Graph m-Coloring** | Backtracking | $\mathcal{O}(V)$ | $\mathcal{O}(m^V)$ | $\mathcal{O}(V)$ | `3 Colors (V1:1, V2:2, V3:3, V4:2)` |
| **09** | **Longest Common Subsequence (LCS)** | Dynamic Programming | $\mathcal{O}(m \cdot n)$ | $\mathcal{O}(m \cdot n)$ | $\mathcal{O}(m \cdot n)$ | `LCS = ACEF (Length: 4)` |

---

## 🛠️ Key Features

- **Split & Stacked Views:** Toggle between side-by-side view (C source code on the left, console output on the right) or stacked view, code-only, or output-only.
- **Dual Output Display:** Switch seamlessly between actual lab execution screenshot crops and crisp formatted terminal console boxes.
- **Interactive Algorithm Simulator:** Built-in in-browser algorithm execution engine allowing live execution with custom inputs or lab test case presets for all 9 algorithms!
- **Zoomable Lightbox:** Click any output screenshot or original lab manual page for full-screen inspection with zoom (+/-), pan, navigation, and download.
- **Original PDF Lab Manual:** Includes all 23 rendered manual document pages and direct link to `aoa_practicals_manual.pdf`.
- **Search & Category Filters:** Real-time search across titles, code keywords, complexities, and paradigms with keyboard shortcut (`/` to search).
- **1-Click Code Copy:** Instant clipboard copying for all C programs with feedback notification.
- **Dark & Light Mode:** High-contrast pure monochrome theme with automatic system preference detection and local storage persistence.
- **Print / PDF Ready:** Formatted `@media print` layout for direct submission-ready physical printouts or PDF generation.

---

## 👥 Academic Context

- **Course:** Design & Analysis of Algorithms (AOA / DAA) Laboratory
- **Language / Standards:** ANSI C / C99 (Turbo C++ / GCC)
- **Manual Source:** Verified practical manual (`aoa_practicals_manual.pdf`)
