import { relations } from "drizzle-orm";
import { boolean, decimal, index, varchar } from "drizzle-orm/pg-core";

import { createdAt, pgTable, updatedAt } from "./_table";
import { orderItems } from "./order";
import { categories, stores } from "./store";

export const products = pgTable(
  "products",
  {
    id: varchar("id", { length: 32 }).primaryKey(), // prefix_ + nanoid(16)
    name: varchar("name", { length: 64 }).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),

    isArchived: boolean("isArchived").default(false).notNull(),
    isFeatured: boolean("isFeatured").default(false).notNull(),

    categoryId: varchar("categoryId", { length: 32 }).notNull(),
    colorId: varchar("colorId", { length: 32 }).notNull(),
    sizeId: varchar("sizeId", { length: 32 }).notNull(),
    storeId: varchar("storeId", { length: 32 }).notNull(),

    createdAt,
    updatedAt,
  },
  (product) => ({
    categoryId: index("products_categoryId_idx").on(product.categoryId),
    colorId: index("products_colorId_idx").on(product.colorId),
    sizeId: index("products_sizeId_idx").on(product.sizeId),
    storeId: index("products_storeId_idx").on(product.storeId),
  }),
);

export const productsRelations = relations(products, ({ many, one }) => ({
  images: many(images),
  orderItems: many(orderItems),

  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  color: one(colors, { fields: [products.colorId], references: [colors.id] }),
  size: one(sizes, { fields: [products.sizeId], references: [sizes.id] }),
  store: one(stores, { fields: [products.storeId], references: [stores.id] }),
}));

export const colors = pgTable(
  "colors",
  {
    id: varchar("id", { length: 32 }).primaryKey(), // prefix_ + nanoid(16)
    name: varchar("name", { length: 16 }).notNull(),
    value: varchar("value", { length: 9 }).notNull(),

    storeId: varchar("storeId", { length: 32 }).notNull(),

    createdAt,
    updatedAt,
  },
  (color) => ({
    storeIdIdx: index("colors_storeId_idx").on(color.storeId),
  }),
);

export const colorsRelations = relations(colors, ({ many, one }) => ({
  products: many(products),
  store: one(stores, { fields: [colors.storeId], references: [stores.id] }),
}));

export const sizes = pgTable(
  "sizes",
  {
    id: varchar("id", { length: 32 }).primaryKey(), // prefix_ + nanoid(16)
    name: varchar("name", { length: 16 }).notNull(),
    value: varchar("value", { length: 4 }).notNull(),

    storeId: varchar("storeId", { length: 32 }).notNull(),

    createdAt,
    updatedAt,
  },
  (size) => ({
    storeIdIdx: index("sizes_storeId_idx").on(size.storeId),
  }),
);

export const sizesRelations = relations(sizes, ({ many, one }) => ({
  products: many(products),
  store: one(stores, { fields: [sizes.storeId], references: [stores.id] }),
}));

export const images = pgTable(
  "images",
  {
    id: varchar("id", { length: 32 }).primaryKey(), // prefix_ + nanoid(16)
    url: varchar("url", { length: 128 }).notNull(),

    productId: varchar("productId", { length: 32 }).notNull(),

    createdAt,
    updatedAt,
  },
  (image) => ({
    productIdIdx: index("images_productId_idx").on(image.productId),
  }),
);

export const imagesRelations = relations(images, ({ one }) => ({
  product: one(products, {
    fields: [images.productId],
    references: [products.id],
  }),
}));
