// Defines stable store identifiers and their human-facing store identity.
// The business runs a single store. Records stay tagged with a store key so
// every query remains store-scoped; adding a store later means adding a key
// here (and its label and address) rather than reworking the data model.
export const STORE_KEYS = ["store1"] as const

export type StoreKey = (typeof STORE_KEYS)[number]

export const DEFAULT_STORE: StoreKey = STORE_KEYS[0]

// Store identity is shared by navigation, reports, and generated documents.
export const STORE_LABELS: Record<StoreKey, string> = {
  store1: "Main Store",
}

// Customer-facing PDFs must identify the store that owns the transaction.
export const STORE_ADDRESSES: Record<StoreKey, string> = {
  store1: "xxxxxxx",
}

// Store pickers and per-store columns only mean something with more than one.
export const HAS_MULTIPLE_STORES = STORE_KEYS.length > 1
