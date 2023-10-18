import { relations } from "drizzle-orm";
import { boolean, index, serial, varchar } from "drizzle-orm/mysql-core";

import { createdAt, mySqlTable, updatedAt } from "./_table";
import { products } from "./product";
import { stores } from "./store";

export const orders = mySqlTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    isPaid: boolean("isPaid").default(false).notNull(),
    isDelivered: boolean("isDelivered").default(false).notNull(),
    phone: varchar("name", { length: 255 }).notNull(),
    address: varchar("name", { length: 255 }).notNull(),

    storeId: varchar("userId", { length: 255 }).notNull(),

    createdAt,
    updatedAt,
  },
  (order) => ({
    storeIdIdx: index("storeId_idx").on(order.storeId),
  }),
);

export const ordersRelations = relations(orders, ({ many, one }) => ({
  orderItems: many(orderItems),
  store: one(stores, { fields: [orders.storeId], references: [stores.id] }),
}));

export const orderItems = mySqlTable(
  "orderItems",
  {
    id: serial("id").primaryKey(),

    orderId: varchar("userId", { length: 255 }).notNull(),
    productId: varchar("userId", { length: 255 }).notNull(),
  },
  (orderItem) => ({
    orderIdIdx: index("orderId_idx").on(orderItem.orderId),
    productId: index("productId_idx").on(orderItem.productId),
  }),
);

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));
