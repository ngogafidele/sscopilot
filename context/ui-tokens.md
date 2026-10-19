# UI Tokens

Supply and Service Copilot Ltd uses Tailwind CSS 4 tokens declared in `app/globals.css`. The app also imports `tw-animate-css` and `shadcn/tailwind.css`.

---

## Theme Source

All core colors and radii are CSS variables in `:root` and mapped into Tailwind utilities through `@theme inline`.

```css
:root {
  --background: #f4f6f5;
  --foreground: #0a0a0a;
  --card: #ffffff;
  --primary: #0a0a0a;          /* black: buttons, active nav */
  --primary-foreground: #ffffff;
  --secondary: #eef1ef;
  --muted: #eef1ef;
  --muted-foreground: #565c59;
  --brand: #136b52;            /* emerald signature */
  --brand-foreground: #ffffff;
  --brand-soft: #e7f2ee;
  --brand-strong: #0d4d3b;
  --accent: var(--brand-soft); /* hover/selected rows in menus */
  --accent-foreground: var(--brand-strong);
  --success: #136b52;
  --warning: #b45309;
  --border: #dfe3e1;
  --input: #cfd5d2;
  --ring: #136b52;
  --chart-1: #136b52;
  --chart-2: #8c8c8c;
  --chart-3: #0a0a0a;
  --chart-4: #5ea98f;
  --chart-5: #cfd5d2;
  --viz-revenue: #0a0a0a;
  --viz-cost: #8c8c8c;
  --viz-profit: #136b52;
  --viz-loss: #c62828;
  --radius: 0.8rem;
}
```

Dark mode variables also exist in `.dark`, though the application defaults to the light operational palette.

Tailwind token classes include:

- `bg-background`, `text-foreground`
- `bg-card`, `text-card-foreground`
- `bg-primary`, `text-primary-foreground`
- `bg-secondary`, `text-secondary-foreground`
- `bg-muted`, `text-muted-foreground`
- `bg-accent`, `text-accent-foreground`
- `border-border`, `ring-ring`
- `bg-success`, `bg-warning`, `text-destructive`

---

## Brand Palette: Ink & Emerald

This palette was chosen on 2026-10-19 so this client's product is clearly different from the earlier navy/orange project it was derived from. The black-and-white company stamp carries the identity; one deep emerald (`#136b52`, tuned to the green racking in `public/images/auth-background.webp`) is the only signature hue.

| Role | Token / utility | Value |
| --- | --- | --- |
| Primary actions, active nav | `--primary`, `bg-primary` | `#0a0a0a` |
| Signature accent | `--brand`, `bg-brand`, `text-brand`, `border-brand` | `#136b52` |
| Soft accent surface (menu hover, table headers) | `--brand-soft`, `--accent` | `#e7f2ee` |
| Accent text on soft surface | `--brand-strong` | `#0d4d3b` |
| Focus ring | `--ring` | `#136b52` |
| Page background | `--background` | `#f4f6f5` |
| Muted text | `--muted-foreground` | `#565c59` |
| Border / input | `--border`, `--input` | `#dfe3e1`, `#cfd5d2` |
| Success (paid) | `--success` | `#136b52` |
| Warning (due, loans) | `--warning` | `#b45309` |
| Destructive (errors, loss) | `--destructive` | red |

Signature details: active sidebar item is black with a 3px emerald inset rule; the home hero ring and section markers are emerald; every PDF has an emerald rule under its header and soft-emerald table headers.

Auth screens (`.brand-auth-surface`) define `--brand-black`, `--brand-emerald`, `--brand-emerald-strong`, `--brand-emerald-soft`, and `--brand-charcoal`, and use a concentric stamp-ring motif with an emerald foot band.

--- | --- | --- |
| Page background | `--background` | `#f5f5f5` |
| Text | `--foreground` | `#0a0a0a` |
| Main surface | `--card` | `#ffffff` |
| Primary black | `--primary` | `#0a0a0a` |
| Light grey accent | `--accent` | `#e8e8e8` |
| Focus ring | `--ring` | `#0a0a0a` |
| Muted surface | `--muted` | `#f0f0f0` |
| Muted text | `--muted-foreground` | `#5c5c5c` |
| Border | `--border` | `#e0e0e0` |
| Success | `--success` | `#12805c` |
| Warning | `--warning` | `#b7791f` |

Auth-specific variables inside `.brand-auth-surface` include `--brand-black`, `--brand-silver`, `--brand-gray-text`, and `--brand-charcoal`.

---

## Chart Tokens

Use chart variables for Recharts where possible:

- `--chart-1` through `--chart-5` for general charts.
- `--viz-revenue` (ink), `--viz-cost` (grey), `--viz-profit` (emerald), and `--viz-loss` (red) for financial report series. They separate by lightness as well as hue.

These variables have separate light and dark values and were selected for readable contrast on card surfaces.

---

## Layout Tokens

| Element | Current Pattern |
| --- | --- |
| Authenticated max width | `max-w-[92rem]` |
| Header | sticky, `bg-card/90`, `border-b border-border/80`, `backdrop-blur` |
| Sidebar | `w-full`, `md:w-60`, `rounded-2xl`, `bg-sidebar/90` |
| Main panel | `rounded-2xl border border-border/80 bg-card/95 p-2 sm:p-3 lg:p-4` |
| Operational cards | `rounded-2xl border border-border/80 bg-card p-4 shadow-sm` |
| Dialogs | Local `DialogContent`, `rounded-xl`, `bg-popover`, token-based ring/surface |

---

## Typography

| Element | Pattern |
| --- | --- |
| App title | `text-xl font-semibold sm:text-2xl` |
| Page title | `text-2xl font-semibold` |
| Section heading | `text-lg font-semibold` |
| Eyebrow labels | `text-xs uppercase tracking-[0.18em]` or `tracking-[0.2em]` |
| Form labels | `grid gap-1 text-sm` |
| Muted helper text | `text-sm text-muted-foreground` or `text-xs text-muted-foreground` |
| Table body | `text-sm` from table primitive |

---

## Component Tokens

### Buttons

Use `components/ui/button.tsx`.

- Default: `bg-primary text-primary-foreground`
- Outline: `border-border bg-background hover:bg-muted`
- Secondary: `bg-secondary text-secondary-foreground`
- Ghost: transparent until hover
- Destructive: `bg-destructive/10 text-destructive`
- Default height: `h-8`, rounded `rounded-lg`, `text-sm font-medium`

### Inputs

Use `components/ui/input.tsx`.

- Token border and focus ring
- Standard height is `h-8`
- Login/auth screens commonly override to `h-11`

### Tables

Use `components/ui/table.tsx`.

- Wrapper: `overflow-x-auto`
- Rows: `border-b transition-colors hover:bg-muted/50`
- Headers: `h-10 px-2 text-left font-medium text-foreground`
- Cells: `p-2 whitespace-nowrap`
- Feature managers often add alternating rows with `bg-muted/60 hover:bg-muted/70`

### Status Badges

Badges use tokens only:

- Paid: `success` tint
- Unpaid/loans: `warning` tint
- Returned: neutral ink (`border-foreground/20 bg-muted text-foreground`)
- Low stock: destructive tint
- Admin/destructive actions: destructive variant

Prefer existing badge patterns before adding a new palette.

---

## Rules

- Prefer token utilities (`bg-card`, `text-muted-foreground`, `border-border`, `bg-primary`) over raw color classes.
- Metric cards use `lib/utils/metric-tones.ts`: white card, colored left rule and icon by meaning (`brand` money in, `ink` stock, `neutral` costs/counts, `attention` loans/returns, `negative` loss). Do not give metrics individual hues; PDFs use `METRIC_TONE_PRINT` for the same mapping.
- Use `lucide-react` icons in buttons and navigation.
- Keep operational layouts dense and scannable.
- Do not introduce unrelated landing-page visual language into authenticated operations.
