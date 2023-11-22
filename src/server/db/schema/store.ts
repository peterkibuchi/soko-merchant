import { relations } from "drizzle-orm";
import { index, varchar } from "drizzle-orm/mysql-core";

import { createdAt, mySqlTable, updatedAt } from "./_table";
import { orders } from "./order";
import { colors, products, sizes } from "./product";

export const stores = mySqlTable("stores", {
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

export const billboards = mySqlTable(
  "billboards",
  {
    id: varchar("id", { length: 32 }).primaryKey(), // prefix_ + nanoid(16)
    imageUrl: varchar("userId", { length: 128 }).notNull(),
    label: varchar("userId", { length: 64 }).notNull(),

    storeId: varchar("userId", { length: 32 }).notNull(),

    createdAt,
    updatedAt,
  },
  (billboard) => ({
    storeIdIdx: index("storeId_idx").on(billboard.storeId),
  }),
);

export const billboardsRelations = relations(billboards, ({ many, one }) => ({
  categories: many(categories),
  store: one(stores, { fields: [billboards.storeId], references: [stores.id] }),
}));

export const categories = mySqlTable(
  "categories",
  {
    id: varchar("id", { length: 32 }).primaryKey(), // prefix_ + nanoid(16)
    name: varchar("name", { length: 64 }).notNull(),

    billboardId: varchar("userId", { length: 32 }).notNull(),
    storeId: varchar("userId", { length: 32 }).notNull(),

    createdAt,
    updatedAt,
  },
  (category) => ({
    billboardId: index("billboardId_idx").on(category.billboardId),
    storeId: index("storeId_idx").on(category.storeId),
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
