import { relations } from "drizzle-orm";
import { index, varchar } from "drizzle-orm/pg-core";

import { createdAt, pgTable, updatedAt } from "./_table";
import { orders } from "./order";
import { colors, products, sizes } from "./product";

export const stores = pgTable("stores", {
  id: varchar("id", { length: 32 }).primaryKey(), // prefix_ + nanoid(16)
  name: varchar("name", { length: 64 }).notNull(),
  userId: varchar("userId", { length: 64 }).notNull(),

  createdAt,
  updatedAt,
});

export const storesRelations = relations(stores, ({ many }) => ({
  billboards: many(billboards),
  categories: many(categories),
  colors: many(colors),
  orders: many(orders),
  products: many(products),
  sizes: many(sizes),
}));

export const billboards = pgTable(
  "billboards",
  {
    id: varchar("id", { length: 32 }).primaryKey(), // prefix_ + nanoid(16)
    imageUrl: varchar("imageUrl", { length: 128 }).notNull(),
    label: varchar("label", { length: 64 }).notNull(),

    storeId: varchar("storeId", { length: 32 }).notNull(),

    createdAt,
    updatedAt,
  },
  (billboard) => ({
    storeIdIdx: index("billboards_storeId_idx").on(billboard.storeId),
  }),
);

export const billboardsRelations = relations(billboards, ({ many, one }) => ({
  categories: many(categories),
  store: one(stores, { fields: [billboards.storeId], references: [stores.id] }),
}));

export const categories = pgTable(
  "categories",
  {
    id: varchar("id", { length: 32 }).primaryKey(), // prefix_ + nanoid(16)
    name: varchar("name", { length: 64 }).notNull(),

    billboardId: varchar("billboardId", { length: 32 }).notNull(),
    storeId: varchar("storeId", { length: 32 }).notNull(),

    createdAt,
    updatedAt,
  },
  (category) => ({
    billboardId: index("categories_billboardId_idx").on(category.billboardId),
    storeId: index("categories_storeId_idx").on(category.storeId),
  }),
);

export const categoriesRelations = relations(categories, ({ many, one }) => ({
  products: many(products),

  billboard: one(billboards, {
    fields: [categories.billboardId],
    references: [billboards.id],
  }),
  store: one(stores, { fields: [categories.storeId], references: [stores.id] }),
}));
