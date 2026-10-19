// Describes authenticated roles and administrator-managed user records.
import type { StoreKey } from "@/lib/utils/constants"

export type UserRole = "admin" | "manager" | "staff"

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  stores: Array<StoreKey>
  isActive: boolean
}
