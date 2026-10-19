// Maps metric meaning to the Ink & Emerald card treatment shared by screens and PDFs.
//
// Cards stay white; only a left rule and the icon carry color, and the color
// says what kind of figure it is rather than giving every metric its own hue:
//   brand     - money coming in (revenue, payments, profit)
//   ink       - stock and catalogue values
//   neutral   - costs and counts
//   attention - figures that need follow-up (loans, returns)
//   negative  - a loss
export type MetricTone = "brand" | "ink" | "neutral" | "attention" | "negative"

export const METRIC_CARD_BASE =
  "rounded-2xl border border-l-4 bg-card p-4 text-card-foreground shadow-sm"

export const METRIC_TONE_CLASSES: Record<
  MetricTone,
  { card: string; icon: string }
> = {
  brand: { card: "border-l-brand", icon: "text-brand" },
  ink: { card: "border-l-foreground", icon: "text-foreground" },
  neutral: { card: "border-l-chart-2", icon: "text-muted-foreground" },
  attention: { card: "border-l-warning", icon: "text-warning" },
  negative: { card: "border-l-destructive", icon: "text-destructive" },
}

// PDFKit cannot read CSS variables, so print uses the light-theme values.
export const METRIC_TONE_PRINT: Record<MetricTone, string> = {
  brand: "#136b52",
  ink: "#0a0a0a",
  neutral: "#8c8c8c",
  attention: "#b45309",
  negative: "#c62828",
}
