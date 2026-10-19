// Serves the blank product import workbook to administrators.
import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth/middleware"
import { workbookResponse } from "@/lib/excel/workbook"
import { buildProductImportTemplate } from "@/lib/excel/product-import-template"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    // Only administrators can import products, so only they get the template.
    const { authorized, session } = await requireAdmin(request)
    if (!authorized || !session) {
      return NextResponse.json(
        { success: false, error: session ? "Admin access required" : "Unauthorized" },
        { status: session ? 403 : 401 }
      )
    }

    return workbookResponse(
      buildProductImportTemplate(),
      "product-import-template.xlsx"
    )
  } catch (error) {
    console.error("[Product Import Template Error]", error)
    return NextResponse.json(
      { success: false, error: "Failed to build the import template" },
      { status: 500 }
    )
  }
}
