import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(64, "Name cannot exceed 64 characters"),
  price: z.coerce.number().min(1, "Price cannot be less than 1"),

  isArchived: z.boolean().default(false).optional(),
  isFeatured: z.boolean().default(false).optional(),
  images: z
    .object({
      url: z.string().min(4, "Image Url must be at least 4 characters"),
    })
    .array(),

  categoryId: z
    .string()
    .min(16, "Category ID must be at least 16 characters")
    .max(32, "Category ID cannot exceed 32 characters"),
  colorId: z
    .string()
    .min(16, "Color ID must be at least 16 characters")
    .max(32, "Color ID cannot exceed 32 characters"),
  sizeId: z
    .string()
    .min(16, "Size ID must be at least 16 characters")
    .max(32, "Size ID cannot exceed 32 characters"),
  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});

export const deleteProductSchema = z.object({
  productId: z
    .string()
    .min(16, "Product ID must be at least 16 characters")
    .max(32, "Product ID cannot exceed 32 characters"),

  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});

export const getProductByIdSchema = z.object({
  productId: z
    .string()
    .min(16, "Product ID must be at least 16 characters")
    .max(32, "Product ID cannot exceed 32 characters"),
});

export const getAllProductsSchema = z.object({
  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});

export const updateProductSchema = z.object({
  productId: z
    .string()
    .min(16, "Product ID must be at least 16 characters")
    .max(32, "Product ID cannot exceed 32 characters"),
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(64, "Name cannot exceed 64 characters"),
  price: z.coerce.number().min(1, "Price cannot be less than 1"),

  isArchived: z.boolean().default(false).optional(),
  isFeatured: z.boolean().default(false).optional(),
  images: z
    .object({
      url: z.string().min(4, "Image Url must be at least 4 characters"),
    })
    .array(),

  categoryId: z
    .string()
    .min(16, "Category ID must be at least 16 characters")
    .max(32, "Category ID cannot exceed 32 characters"),
  colorId: z
    .string()
    .min(16, "Color ID must be at least 16 characters")
    .max(32, "Color ID cannot exceed 32 characters"),
  sizeId: z
    .string()
    .min(16, "Size ID must be at least 16 characters")
    .max(32, "Size ID cannot exceed 32 characters"),
  storeId: z
    .string()
    .min(16, "Store ID must be at least 16 characters")
    .max(32, "Store ID cannot exceed 32 characters"),
});
