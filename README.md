# 📊 DBMS Laboratory Practicals Portal (Oracle 21c XE)

A modern, responsive, client-side static web application showcasing complete laboratory experiments for Database Management Systems (DBMS). The portal features formatted SQL queries with syntax highlighting, schema definitions, theoretical backgrounds, and real execution output screenshots captured directly from Oracle Database Express Edition.

---

## 🚀 Quick Start

### Option 1: Open Directly in Browser
Double click or open `index.html` in any web browser. No web server or external installation is required.

### Option 2: Run Local Dev Server (with Live-Reload)
```bash
npm run dev
# or
node dev-server.js
```
The server will launch at [http://localhost:3000](http://localhost:3000) with automatic hot-reloading when files are modified.

---

## 📚 Experiments Covered

| Experiment | Title | Description | Queries | Outputs |
|:---:|---|---|:---:|:---:|
| **Exp 02** | **Data Definition Language (DDL)** | `CREATE TABLE`, `ALTER TABLE` (`ADD`, `DROP COLUMN`, `MODIFY`), and `DESCRIBE` schema checks. | 7 | 7 Screenshots |
| **Exp 03** | **Data Manipulation Language (DML)** | Bulk `INSERT INTO student2`, conditional `DELETE FROM`, and data `UPDATE`. | 3 | 3 Screenshots |
| **Exp 04** | **Data Control & Transaction Control (DCL & TCL)** | User creation (`CREATE USER JOY`), Privileges (`GRANT`, `REVOKE`), and Transactions (`COMMIT`, `ROLLBACK`). | 7 | 7 Screenshots |
| **Exp 05** | **Aggregate Functions & Set Operations** | `MIN`, `MAX`, `AVG`, `SUM`, `COUNT`, `LOWER`, `UPPER`, `UNION`, `UNION ALL`, `INTERSECT`, `MINUS`, `GROUP BY`, and `HAVING`. | 19 | 19 Screenshots + 7 PDF Pages |
| **Exp 06** | **String Functions & Dual Table** | `LENGTH`, `CONCAT`, `UPPER`, `LOWER`, `REPLACE`, `SUBSTR`, `INSTR`, `TRIM` via Oracle `DUAL`. | 10 | 10 Screenshots |
| **Exp 07** | **Relational Joins** | `INNER JOIN`, `LEFT OUTER JOIN`, `RIGHT OUTER JOIN`, `FULL OUTER JOIN`, `NATURAL JOIN`, and `NON-EQUI JOIN`. | 6 | 6 Screenshots + 3 PDF Pages |
| **Exp 08** | **Subqueries & Nested Queries** | Single-row subqueries, multi-row `IN` subqueries, nested subqueries, `INSERT INTO ... SELECT`, and subquery `UPDATE`. | 10 | 10 Screenshots |

---

## 🛠️ Key Features

- **Split & Stacked Views:** Side-by-side view (SQL query on the left, Oracle screenshot on the right) or stacked layout.
- **Dual Output Display:** Toggle between real Oracle XE screenshots and interactive tabular data representations.
- **Zoomable Lightbox:** Click any output screenshot or PDF page for full-screen inspection with zoom and pan.
- **Interactive SQL Sandbox:** Simulated browser-based SQL query tester for exploring table structures and results.
- **Keyword Search & Filter:** Instant search across all experiment titles, queries, and descriptions (`/` key shortcut).
- **1-Click SQL Copy:** Fast clipboard copying with instant visual toast notification.
- **Dark & Light Mode:** Seamless toggle with system theme preference detection and local storage persistence.
- **Print / PDF Ready:** Clean `@media print` stylesheet for physical submissions or saving as lab journals.

---

## 👥 Contributors & Academic Context

- **Course:** Database Management Systems (DBMS) Laboratory
- **RDBMS Engine:** Oracle Database Express Edition (XE) 21c
- **Student Contributors:**
  - Gargi Mahesh Malvi (Roll No: 18 / 20, Div: B, Batch: B1)
  - Pranali Rajesh Karande (Roll No: 06, Div: B, Batch: B1)
