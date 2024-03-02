import { relations } from "drizzle-orm";
import { boolean, index, varchar } from "drizzle-orm/pg-core";

import { createdAt, pgTable, updatedAt } from "./_table";
import { products } from "./product";
import { stores } from "./store";

export const orders = pgTable(
  "orders",
  {
    id: varchar("id", { length: 32 }).primaryKey(), // prefix_ + nanoid(16)

    phone: varchar("phone", { length: 16 }).default("").notNull(),
    address: varchar("address", { length: 128 }).default("").notNull(),
    isPaid: boolean("isPaid").default(false).notNull(),

    storeId: varchar("storeId", { length: 32 }).notNull(),

    createdAt,
    updatedAt,
  },
  (order) => ({
    storeIdIdx: index("orders_storeId_idx").on(order.storeId),
  }),
);

export const ordersRelations = relations(orders, ({ many, one }) => ({
  orderItems: many(orderItems),
  store: one(stores, { fields: [orders.storeId], references: [stores.id] }),
}));

export const orderItems = pgTable(
  "orderItems",
  {
    id: varchar("id", { length: 32 }).primaryKey(), // prefix_ + nanoid(16)

    orderId: varchar("orderId", { length: 32 }).notNull(),
    productId: varchar("productId", { length: 32 }).notNull(),
  },
  (orderItem) => ({
    orderIdIdx: index("orderItems_orderId_idx").on(orderItem.orderId),
    productId: index("orderItems_productId_idx").on(orderItem.productId),
  }),
);

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));
