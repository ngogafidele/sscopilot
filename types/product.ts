// Describes a product and its branch-specific inventory values.
import type { StoreKey } from "@/lib/utils/constants"

export type Product = {
  id: string
  name: string
  sku: string
  unit: string
  quantity: number
  lowStockThreshold: number
  costPrice: number
  price: number
  store: StoreKey
}
