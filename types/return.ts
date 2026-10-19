// Describes returned items and recorded branch return transactions.
import type { StoreKey } from "@/lib/utils/constants"

export type ReturnItem = {
  productId: string
  name: string
  sku: string
  unit: string
  quantity: number
  basePrice: number
  unitPrice: number
  lineTotal: number
}

export type Return = {
  id: string
  store: StoreKey
  returnItems: ReturnItem[]
  totalReturnAmount: number
  notes?: string
  createdBy?: string
  createdAt?: string
}
