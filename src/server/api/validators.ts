import { z } from "zod";

/**
 * Shared validators used both in the frontend and backend
 */

// Store
export const createStoreSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(64, "Name cannot exceed 64 characters"),
});
export type CreateStoreValues = z.infer<typeof createStoreSchema>;

export const updateStoreSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(64, "Name cannot exceed 64 characters"),
  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});
export type UpdateStoreValues = z.infer<typeof updateStoreSchema>;

export const deleteStoreSchema = z.object({
  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});
