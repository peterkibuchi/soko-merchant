import { z } from "zod";

export const createColorSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(32, "Name cannot exceed 32 characters"),
  value: z
    .string()
    .min(4, "Value must be at least 4 characters")
    .max(32, "Value cannot exceed 32 characters"),

  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});

export const deleteColorSchema = z.object({
  colorId: z
    .string()
    .min(16, "Color ID must be at least 16 characters")
    .max(32, "Color ID cannot exceed 32 characters"),

  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});

export const getColorByIdSchema = z.object({
  colorId: z
    .string()
    .min(16, "Color ID must be at least 16 characters")
    .max(32, "Color ID cannot exceed 32 characters"),
});

export const getAllColorsSchema = z.object({
  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});

export const updateColorSchema = z.object({
  colorId: z
    .string()
    .min(16, "Color ID must be at least 16 characters")
    .max(32, "Color ID cannot exceed 32 characters"),
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(32, "Name cannot exceed 32 characters"),
  value: z
    .string()
    .min(4, "Value must be at least 4 characters")
    .max(32, "Value cannot exceed 32 characters"),

  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});
