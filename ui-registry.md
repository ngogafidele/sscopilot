### Sale Return Status Badge

File: components/sales/sales-manager.tsx
Last updated: 2026-10-19

| Property | Class |
| --- | --- |
| Background | `bg-muted` |
| Border | `border border-foreground/20` |
| Border radius | `rounded-full` |
| Text - primary | `text-xs font-semibold text-foreground` |
| Text - secondary | `text-muted-foreground` |
| Spacing | `px-2 py-0.5`, parent `gap-1.5` |
| Hover state | none |
| Shadow | none |
| Accent usage | Neutral ink badge keeps the return state distinct from the success/warning payment badge without adding a hue. |

**Pattern notes:**
Return badges sit under the payment badge inside the existing sale Status cell.
Use `Returned` for fully returned sales and `Partially returned` when only some
sold quantity has been returned. Keep the badge compact so dense sales tables
remain scannable.

### Dashboard Metric Cards

File: components/dashboard/dashboard-stats.tsx
Last updated: 2026-10-19

| Property | Class |
| --- | --- |
| Background | `bg-card` (white) for every metric |
| Border | `border border-l-4` with the left rule colored by tone (`METRIC_TONE_CLASSES` in `lib/utils/metric-tones.ts`) |
| Border radius | `rounded-2xl` |
| Text - primary | `text-2xl font-semibold` |
| Text - secondary | `text-xs uppercase leading-4 tracking-[0.12em] text-muted-foreground` |
| Spacing | Card `p-4`, page section `space-y-14`, grid `gap-x-5 gap-y-12` |
| Hover state | none |
| Shadow | `shadow-sm` |
| Accent usage | Tone by meaning, not per metric: emerald money in, ink stock, grey costs/counts, amber attention, red loss. Icon takes the tone color. |

**Pattern notes:**
Dashboard cards remain the same visual component for admin and restricted users.
Restricted users see only the approved eight cards, while admin users keep the
full metric set and the supporting activity tables. Keep the restricted UI in
step with `app/api/dashboard/stats/route.ts`, which returns only the approved
dashboard metrics for non-admin sessions.
