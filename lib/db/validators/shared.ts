// Supplies common store and identifier schemas used across endpoints.
import { z } from "zod"
import { STORE_KEYS } from "@/lib/utils/constants"

export const storeSchema = z.enum(STORE_KEYS)
export const storeArraySchema = z.array(storeSchema).min(1)
export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid id")
