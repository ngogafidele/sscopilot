// Describes expense data exchanged between UI and branch APIs.
import type { StoreKey } from "@/lib/utils/constants"

export type Expense = {
  id: string
  store: StoreKey
  description: string
  amount: number
  category: string
  paymentMethod: "cash" | "mobile-money" | "bank"
  date: string
  notes?: string
  createdBy?: string
  createdAt?: string
}
