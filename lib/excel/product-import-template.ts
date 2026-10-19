// Builds the blank product import workbook that marks required and optional columns.
import type ExcelJS from "exceljs"
import { createWorkbook, MONEY_FORMAT } from "@/lib/excel/workbook"
import {
  PRODUCT_IMPORT_COLUMNS,
  PRODUCT_IMPORT_MAX_ROWS,
  productImportHeader,
  type ProductImportColumn,
} from "@/lib/excel/product-import-columns"

// Ink & Emerald brand colors, as ExcelJS ARGB values.
const REQUIRED_FILL = "FF136B52"
const REQUIRED_TEXT = "FFFFFFFF"
const OPTIONAL_FILL = "FFEEF1EF"
const OPTIONAL_TEXT = "FF0A0A0A"
const MUTED_TEXT = "FF565C59"

// ExcelJS supports range-wide validation at runtime but leaves it out of its
// type definitions. A range avoids creating thousands of empty cells, which
// would inflate the sheet's row count toward the import's row limit.
type RangeValidations = {
  dataValidations: {
    add(range: string, validation: ExcelJS.DataValidation): void
  }
}

function solidFill(argb: string): ExcelJS.Fill {
  return { type: "pattern", pattern: "solid", fgColor: { argb } }
}

// Excel shows these when a cell is selected and rejects entries that break
// them, so mistakes are caught while typing instead of at import time.
function validationFor(column: ProductImportColumn): ExcelJS.DataValidation | null {
  if (column.kind === "text") return null
  const wholeNumber = column.kind === "wholeNumber"
  return {
    type: wholeNumber ? "whole" : "decimal",
    operator: "greaterThanOrEqual",
    formulae: [0],
    allowBlank: !column.required,
    showInputMessage: true,
    promptTitle: column.label,
    prompt: wholeNumber ? "Whole number, 0 or more." : "Number, 0 or more.",
    showErrorMessage: true,
    errorStyle: "stop",
    errorTitle: "Invalid value",
    error: wholeNumber
      ? `${column.label} must be a whole number of 0 or more.`
      : `${column.label} must be a number of 0 or more.`,
  }
}

function addProductsSheet(workbook: ExcelJS.Workbook) {
  // Import reads the first sheet and treats row 1 as headers, so this sheet
  // must come first and must not carry sample rows that could be imported.
  const sheet = workbook.addWorksheet("Products", {
    views: [{ state: "frozen", ySplit: 1 }],
  })
  sheet.columns = PRODUCT_IMPORT_COLUMNS.map((column) => ({
    header: productImportHeader(column),
    key: column.field,
    width: column.width,
    style: column.kind === "money" ? { numFmt: MONEY_FORMAT } : undefined,
  }))

  const header = sheet.getRow(1)
  header.height = 22
  PRODUCT_IMPORT_COLUMNS.forEach((column, index) => {
    const cell = header.getCell(index + 1)
    cell.font = {
      bold: true,
      color: { argb: column.required ? REQUIRED_TEXT : OPTIONAL_TEXT },
    }
    cell.fill = solidFill(column.required ? REQUIRED_FILL : OPTIONAL_FILL)
    cell.alignment = { vertical: "middle" }
    cell.note = `${column.required ? "Required" : "Optional"}. ${column.rule}\nExample: ${column.example}`

    const validation = validationFor(column)
    if (!validation) return
    const letter = sheet.getColumn(index + 1).letter
    ;(sheet as unknown as RangeValidations).dataValidations.add(
      `${letter}2:${letter}${PRODUCT_IMPORT_MAX_ROWS + 1}`,
      validation
    )
  })
}

function addInstructionsSheet(workbook: ExcelJS.Workbook) {
  const sheet = workbook.addWorksheet("Instructions")
  sheet.columns = [
    { key: "column", width: 30 },
    { key: "status", width: 12 },
    { key: "rule", width: 80 },
    { key: "example", width: 26 },
  ]

  const title = sheet.addRow(["Product import template"])
  title.font = { bold: true, size: 14 }
  const intro = sheet.addRow([
    "Fill in the Products sheet, one product per row, then upload this file from Products > Import Excel.",
  ])
  intro.font = { color: { argb: MUTED_TEXT } }
  sheet.addRow([])

  const header = sheet.addRow(["Column", "Status", "What to enter", "Example"])
  header.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: REQUIRED_TEXT } }
    cell.fill = solidFill("FF0A0A0A")
  })

  for (const column of PRODUCT_IMPORT_COLUMNS) {
    const row = sheet.addRow([
      productImportHeader(column),
      column.required ? "Required" : "Optional",
      column.rule,
      column.example,
    ])
    row.alignment = { vertical: "top", wrapText: true }
    const status = row.getCell(2)
    status.font = {
      bold: true,
      color: { argb: column.required ? REQUIRED_TEXT : OPTIONAL_TEXT },
    }
    status.fill = solidFill(column.required ? REQUIRED_FILL : OPTIONAL_FILL)
  }

  sheet.addRow([])
  const notesTitle = sheet.addRow(["Good to know"])
  notesTitle.font = { bold: true }
  for (const note of [
    "Required columns must have a value on every product row; optional columns can be left blank.",
    "Keep the header row as it is. Column order does not matter, and extra columns are ignored.",
    "SKUs are generated automatically, so there is no SKU column to fill in.",
    "Products whose name is already in the products list are skipped, not changed.",
    `Import at most ${PRODUCT_IMPORT_MAX_ROWS} products at a time. Only the first sheet is read.`,
  ]) {
    const row = sheet.addRow([`• ${note}`])
    sheet.mergeCells(row.number, 1, row.number, 4)
    row.alignment = { wrapText: true, vertical: "top" }
  }
}

export function buildProductImportTemplate() {
  const workbook = createWorkbook()
  addProductsSheet(workbook)
  addInstructionsSheet(workbook)
  return workbook
}
