# Project Overview

## About The Project

Supply and Service Copilot Ltd is a single-store inventory, sales, invoicing, receivables, expense, alert, and reporting application for a physical-goods business. The store is labelled `Main Store`.

The app is implemented as a Next.js 16 App Router project with React 19, MongoDB/Mongoose persistence, JWT cookie sessions, Zod validation, Tailwind CSS 4 plus local UI primitives, Recharts visualizations, and PDFKit-generated documents.

---

## Store Model

Application data is isolated by store.

| Internal Key | Store | Document Address |
| --- | --- | --- |
| `store1` | Main Store | `xxxxxxx` |

The business runs a single store. Every record is still tagged with the store key `store1` and every query is scoped to it, so a second store can be added later by adding a key, label, and address in `lib/utils/constants.ts`. The admin store switcher and the user-management store picker only appear when more than one store is configured. Users still carry an allowed `stores` list in their session, and route handlers resolve the store from the request/session and reject stores that are not allowed for the current user. On login, retired store keys (such as the former `store2`) are dropped from the user record, and users left without a store are assigned to `store1`.

---

## Pages

```text
/                         Login page
/setup-admin              First administrator setup
/reset-password           Password reset form
/verify                   Step-up password verification
/home                     Authenticated workspace hub
/dashboard                Admin overview
/products                 Product catalog, receiving, stock movement monitor
/sales                    Sales entry, sale edit, sale invoicing
/customers-suppliers      Customer and supplier lookup
/returns                  Returns and replacements
/invoices                 Sales invoices and proformas
/expenses                 Operating expenses
/outstanding              Unpaid sales, loan collection, statements
/alerts                   Low-stock alerts
/stock-adjustments        Admin stock corrections
/reports                  Admin visual reports
/financial-statements     Admin income statement and balance sheet
/users                    Admin user management
```

---

## Core User Flow

1. An admin creates the first account from `/setup-admin`.
2. Users sign in from `/` with email and password.
3. The authenticated shell wraps the workspace hub and operational pages with a sticky header, loan notifications, user badge, logout action, and a role-aware sidebar on non-home pages.
4. Staff and managers use daily workflows for products, sales, returns, invoices, proformas, expenses, loans, and alerts within their assigned store.
5. Admins additionally access dashboard, reports, financial statements, users, stock adjustments, product administration, correction edits, and destructive actions.

---

## Business Capabilities

- Manage products, generated SKUs, categories, units, quantities, low-stock thresholds, cost prices, selling prices, and supplier receipt context.
- Receive stock with supplier details, received date, quantity, unit cost, and total cost.
- Record paid sales through cash, bank, or mobile money.
- Record unpaid sales as customer loans with expected payment dates.
- Track partial loan payments, remaining balances, due-today loans, and overdue loans.
- Create invoices from sales and create proformas from sale-backed or manually entered item data.
- Download PDFs for sales invoices, proformas, product catalogs, outstanding statements, management reports, income statements, and balance sheets.
- Record returns, replacement items, expenses, low-stock alerts, and admin stock adjustments.
- Produce admin reports for revenue, cost of sales, expenses, profit, inventory value, loans, product movement, recent sales, income statements, and balance sheets.

---

## Roles And Access

| Role | Access Pattern |
| --- | --- |
| Admin | Full access, including dashboard, reports, financial statements, users, stock adjustments, product management, and corrective edits/deletes. |
| Manager | Assigned-store operational workflows where permitted by routes and UI. |
| Staff | Assigned-store operational workflows without admin-only management functions. |

JWT sessions carry `userId`, `name`, `email`, `role`, `isAdmin`, allowed `stores`, `currentStore`, login log id, idle timestamp, strict-mode flag, and optional step-up verification timestamp.

Admin idle timeout is 1 hour, staff/manager idle timeout is 6 hours, and strict admin routes use a 10-minute idle window plus password re-verification. Strict coverage includes `/dashboard`, `/reports`, `/financial-statements`, and `/verify`; matching dashboard/report/financial API paths require current re-authentication.

---

## Success Criteria

- Every operational query and mutation is scoped to an authorized store.
- Stock never goes below zero.
- Sales, returns, stock receiving, stock adjustments, and sale deletion keep product quantities accurate.
- Paid sales require a payment method.
- Unpaid sales require customer and expected payment details.
- Loans remain sales: goods leave stock when issued, not when the loan is collected.
- Report calculations and report PDFs use the same revenue, return, expense, and inventory semantics.
- Customer-facing documents use the Supply and Service Copilot Ltd identity and branch address values.
