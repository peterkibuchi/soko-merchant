import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(64, "Name cannot exceed 64 characters"),

  billboardId: z
    .string()
    .min(16, "Billboard ID must be at least 16 characters")
    .max(32, "Billboard ID cannot exceed 32 characters"),
  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});

export const deleteCategorySchema = z.object({
  categoryId: z
    .string()
    .min(16, "Category ID must be at least 16 characters")
    .max(32, "Category ID cannot exceed 32 characters"),

  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});

export const getAllCategoriesSchema = z.object({
  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});

export const getCategoryByIdSchema = z.object({
  categoryId: z
    .string()
    .min(16, "Category ID must be at least 16 characters")
    .max(32, "Category ID cannot exceed 32 characters"),
});

export const updateCategorySchema = z.object({
  categoryId: z
    .string()
    .min(16, "Category ID must be at least 16 characters")
    .max(32, "Category ID cannot exceed 32 characters"),
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(64, "Name cannot exceed 64 characters"),

  billboardId: z
    .string()
    .min(16, "Billboard ID must be at least 16 characters")
    .max(32, "Billboard ID cannot exceed 32 characters"),
  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});
