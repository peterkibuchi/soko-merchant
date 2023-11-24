import { z } from "zod";

export const createSizeSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(16, "Name cannot exceed 16 characters"),
  value: z
    .string()
    .min(1, "Value must be at least 1 character")
    .max(4, "Value cannot exceed 4 characters"),

  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});

export const deleteSizeSchema = z.object({
  sizeId: z
    .string()
    .min(16, "Size ID must be at least 16 characters")
    .max(32, "Size ID cannot exceed 32 characters"),

  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});

export const getSizeByIdSchema = z.object({
  sizeId: z
    .string()
    .min(16, "Size ID must be at least 16 characters")
    .max(32, "Size ID cannot exceed 32 characters"),
});

export const getAllSizesSchema = z.object({
  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});

export const updateSizeSchema = z.object({
  sizeId: z
    .string()
    .min(16, "Size ID must be at least 16 characters")
    .max(32, "Size ID cannot exceed 32 characters"),
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(16, "Name cannot exceed 16 characters"),
  value: z
    .string()
    .min(1, "Value must be at least 1 character")
    .max(4, "Value cannot exceed 4 characters"),

  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});
