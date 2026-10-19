// Describes sales records and their line-item value snapshots.
import type { StoreKey } from "@/lib/utils/constants"

export type SaleItem = {
  id: string
  name: string
  unit: string
  quantity: number
  sellingPrice: number
  lineTotal: number
}

export type Sale = {
  id: string
  store: StoreKey
  items: SaleItem[]
  totalAmount: number
  paymentStatus?: "paid" | "unpaid"
  paymentMethod?: "cash" | "bank" | "mobile"
  amountPaid?: number
  remainingBalance?: number
  payments?: Array<{
    amount: number
    paymentMethod: "cash" | "bank" | "mobile"
    paidAt?: string
    notes?: string
  }>
  customer?: {
    name?: string
    phone?: string
  }
  outstanding?: {
    customerName: string
    customerPhone?: string
    paymentDate?: string
  }
  createdAt: string
}
