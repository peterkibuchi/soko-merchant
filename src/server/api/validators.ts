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

// Billboard
export const billboardFormSchema = z.object({
  billboardId: z
    .string()
    .min(16, "Billboard ID must be at least 16 characters")
    .max(32, "Billboard ID cannot exceed 32 characters"),
  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
  label: z
    .string()
    .min(4, "Label must be at least 4 characters")
    .max(64, "Label cannot exceed 64 characters"),
  imageUrl: z.string().min(4, "Image Url must be at least 4 characters"),
});
export type BillboardFormValues = z.infer<typeof billboardFormSchema>;

export const deleteBillboardSchema = z.object({
  billboardId: z
    .string()
    .min(16, "Billboard ID must be at least 16 characters")
    .max(32, "Billboard ID cannot exceed 32 characters"),
  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});
