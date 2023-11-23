import { z } from "zod";

export const createBillboardSchema = z.object({
  imageUrl: z.string().min(4, "Image Url must be at least 4 characters"),
  label: z
    .string()
    .min(4, "Label must be at least 4 characters")
    .max(64, "Label cannot exceed 64 characters"),

  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});

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

export const getBillboardByIdSchema = z.object({
  billboardId: z
    .string()
    .min(16, "Billboard ID must be at least 16 characters")
    .max(32, "Billboard ID cannot exceed 32 characters"),
});

export const getAllBillboardsSchema = z.object({
  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});

export const updateBillboardSchema = z.object({
  billboardId: z
    .string()
    .min(16, "Billboard ID must be at least 16 characters")
    .max(32, "Billboard ID cannot exceed 32 characters"),
  imageUrl: z.string().min(4, "Image Url must be at least 4 characters"),
  label: z
    .string()
    .min(4, "Label must be at least 4 characters")
    .max(64, "Label cannot exceed 64 characters"),

  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});
