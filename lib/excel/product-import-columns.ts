// Describes the product import columns shared by the import route and its template.
//
// The template's headers are built from `label`, with "(required)" or
// "(optional)" appended; the import's header matching drops anything in
// parentheses, so a filled-in template imports without edits.

// Largest number of product rows accepted in one import.
export const PRODUCT_IMPORT_MAX_ROWS = 2000

export type ProductImportField =
  | "name"
  | "sku"
  | "unit"
  | "quantity"
  | "lowStockThreshold"
  | "costPrice"
  | "price"
  | "supplierName"
  | "supplierPhone"

export type ProductImportColumn = {
  field: ProductImportField
  label: string
  required: boolean
  kind: "text" | "wholeNumber" | "money"
  width: number
  rule: string
  example: string
}

// Template order: required columns first. SKU is left out on purpose; the
// import always generates SKUs and only reads that column to spot duplicates.
export const PRODUCT_IMPORT_COLUMNS: ProductImportColumn[] = [
  {
    field: "name",
    label: "Product",
    required: true,
    kind: "text",
    width: 32,
    rule: "Product name. Must be new to the store; names already in the products list are skipped.",
    example: "Cement 50kg",
  },
  {
    field: "costPrice",
    label: "Cost Price (Rwf)",
    required: true,
    kind: "money",
    width: 26,
    rule: "What the business pays per unit. A number of 0 or more.",
    example: "8500",
  },
  {
    field: "price",
    label: "Selling Price (Rwf)",
    required: true,
    kind: "money",
    width: 28,
    rule: "Price charged to customers per unit. A number of 0 or more.",
    example: "10000",
  },
  {
    field: "unit",
    label: "Unit",
    required: false,
    kind: "text",
    width: 16,
    rule: "Unit of measure, such as pcs, bag, kg, box, or litre. Defaults to pcs when blank.",
    example: "bag",
  },
  {
    field: "quantity",
    label: "Quantity",
    required: false,
    kind: "wholeNumber",
    width: 18,
    rule: "Opening stock on hand. A whole number of 0 or more. Defaults to 0 when blank.",
    example: "120",
  },
  {
    field: "lowStockThreshold",
    label: "Low Stock Threshold",
    required: false,
    kind: "wholeNumber",
    width: 30,
    rule: "A low-stock alert is raised when stock falls to this level. A whole number of 0 or more. Defaults to 0.",
    example: "20",
  },
  {
    field: "supplierName",
    label: "Supplier Name",
    required: false,
    kind: "text",
    width: 26,
    rule: "Fill in together with Supplier Phone to record the opening quantity as a stock receipt from this supplier.",
    example: "Kigali Building Supplies",
  },
  {
    field: "supplierPhone",
    label: "Supplier Phone",
    required: false,
    kind: "text",
    width: 26,
    rule: "Fill in together with Supplier Name. Leave both blank if there is no supplier record.",
    example: "0788 123456",
  },
]

export function productImportHeader(column: ProductImportColumn) {
  return `${column.label} (${column.required ? "required" : "optional"})`
}
