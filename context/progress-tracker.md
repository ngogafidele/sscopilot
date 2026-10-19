# Progress Tracker

Update this file after meaningful feature work. It should let the next agent see what is implemented and what needs caution.

---

## Current Status

**Phase:** Production maintenance and feature iteration  
**Last documented:** 2026-09-07 context refresh against the Supply and Service Copilot Ltd structure; 2026-10-19 switched to a single store  
**Next:** Keep context files updated after future feature changes

---

## Implemented

- [x] Login, setup admin, logout, password reset, and password re-verification
- [x] JWT session cookie, idle timeout refresh, current-user validation, and lapsed logout recording
- [x] Strict admin gate for `/dashboard`, `/reports`, `/financial-statements`, and matching API paths
- [x] Authenticated app shell with role-aware sidebar, loan notifications, user badge, logout, and admin store switcher (hidden while only one store exists)
- [x] Single-store model: `store1` Main Store; `store2` retired. `STORE_KEYS` in `lib/utils/constants.ts` drives models, validators, and types
- [x] Authenticated `/home` workspace hub with grouped navigation cards
- [x] Product catalog, SKU generation, receiving, supplier receipt tracking, categories, and product catalog PDF
- [x] Admin product stock movement monitor using receipts, sales/loans, returns/replacements, and stock adjustments
- [x] Low-stock alert synchronization
- [x] Sales entry, paid/unpaid state, customer capture, admin sale edit/delete/restore behavior, and non-admin edits where allowed
- [x] Loan/receivable view, partial payments, due and overdue notifications, and outstanding statement PDF
- [x] Returns with replacement support, stock restoration, report impact, and transactional update/delete reconciliation
- [x] Sales invoices and proforma invoices with PDF downloads
- [x] Admin-only Excel exports (ExcelJS) for the products list (`/api/products/export`) and date-ranged sales (`/api/sales/export?start=&end=`)
- [x] Admin-only product import from Excel (`/api/products/import`): new names only; rows whose name/SKU already exists in the store, or repeat within the file, are skipped and reported
- [x] Downloadable product import template (`/api/products/import/template`): Products sheet with emerald required / grey optional headers, header notes, and number validation, plus an Instructions sheet. Columns come from `lib/excel/product-import-columns.ts`, which the import route also reads, so the two cannot drift
- [x] Expenses and categories
- [x] Dashboard and visual reports with cards, charts, store summary, top products, recent sales, and report PDF
- [x] Financial Reports section: Income Statement and Balance Sheet with PDF export
- [x] Manual balance-sheet items stored as append-only effective-dated `BalanceSheetItem` versions
- [x] User management and role/store controls
- [x] Anonymized visible business identity/contact values in source and documentation, while preserving image assets
- [x] Context documentation updated to match the current workspace structure

---

## Operational Notes

- The only store key is `store1`; its label and document address live in `lib/utils/constants.ts`. Login drops retired store keys from user records and assigns store-less users to `store1`.
- Any existing `store2` records in MongoDB are no longer shown or counted anywhere; they need a decision (merge into `store1` or archive).
- `components/store-switcher.tsx` is kept but only renders with multiple stores; route handlers must still resolve and enforce store access.
- Product stock is affected by sales, sale edits, sale deletion/restoration, returns, stock receiving, and stock adjustments.
- Staff and managers may edit sales they created where the route allows it; administrators have broader correction and deletion privileges.
- Low-stock alerts must stay synchronized after inventory mutations.
- Return edits and deletions must keep product quantity changes and return record mutations in the same transaction; guarded stock updates prevent concurrent writes from pushing stock below zero.
- Reports subtract returns from sales revenue and gross profit.
- Income Statement math in `lib/financial/income-statement.ts` intentionally mirrors the Reports page.
- Balance Sheet reconstructs Inventory Value and Accounts Receivable as of the selected date; no immutable ledger snapshot exists yet.
- `BalanceSheetItem` is append-only versioned: edits/deletes insert effective-dated versions; never mutate or hard-delete a version.
- Unpaid sales are loans; they are not a separate ledger.
- Loan settlement does not alter stock because stock moved when the sale was created.
- Invoice and proforma numbers use `NumberSequence`.
- PDFKit requires Node/server-only execution.
- PDFKit supports JPEG/PNG image embedding in this setup. PDF generators should use PNG/JPEG-compatible assets from `public/images`.
- Git commands may require this repo to be configured as a safe.directory in some environments.

---

## Verification Baseline

Recommended checks after code changes:

```bash
npm run lint
npm run build
```

Workflow checks should match the touched feature:

- Product changes: create/edit/receive/delete product and verify low-stock alerts.
- Sale changes: create paid sale, create unpaid sale, edit sale, delete/restore sale, verify stock.
- Loan changes: collect partial/full payment and refresh notifications.
- Return changes: return items and verify stock plus report calculations.
- Report changes: compare screen report and PDF report.
- Financial statement changes: compare statement screen totals and PDF totals.
- Auth changes: login, idle expiry, logout, setup admin, reset password, reauth gate.
