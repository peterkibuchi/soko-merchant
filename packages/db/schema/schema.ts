import { relations, sql } from "drizzle-orm";
import {
  boolean,
  decimal,
  index,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

const createdAt = timestamp("created_at")
  .default(sql`CURRENT_TIMESTAMP`)
  .notNull();
const updatedAt = timestamp("updatedAt").onUpdateNow();

export const stores = mySqlTable("stores", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),

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
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    imageUrl: varchar("userId", { length: 255 }).notNull(),
    label: varchar("userId", { length: 255 }).notNull(),

    storeId: varchar("userId", { length: 255 }).notNull(),

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
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),

    billboardId: varchar("userId", { length: 255 }).notNull(),
    storeId: varchar("userId", { length: 255 }).notNull(),

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

export const products = mySqlTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    isArchived: boolean("isArchived").default(false).notNull(),
    isFeatured: boolean("isFeatured").default(false).notNull(),

    categoryId: varchar("userId", { length: 255 }).notNull(),
    colorId: varchar("userId", { length: 255 }).notNull(),
    sizeId: varchar("userId", { length: 255 }).notNull(),
    storeId: varchar("userId", { length: 255 }).notNull(),

    createdAt,
    updatedAt,
  },
  (product) => ({
    categoryId: index("orderId_idx").on(product.categoryId),
    colorId: index("colorId_idx").on(product.colorId),
    sizeId: index("sizeId_idx").on(product.sizeId),
    storeId: index("storeId_idx").on(product.storeId),
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

export const colors = mySqlTable(
  "colors",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    value: varchar("name", { length: 255 }).notNull(),

    storeId: varchar("userId", { length: 255 }).notNull(),

    createdAt,
    updatedAt,
  },
  (color) => ({
    storeIdIdx: index("storeId_idx").on(color.storeId),
  }),
);

export const colorsRelations = relations(colors, ({ many, one }) => ({
  products: many(products),
  store: one(stores, { fields: [colors.storeId], references: [stores.id] }),
}));

export const sizes = mySqlTable(
  "sizes",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    value: varchar("name", { length: 255 }).notNull(),

    storeId: varchar("userId", { length: 255 }).notNull(),

    createdAt,
    updatedAt,
  },
  (size) => ({
    storeIdIdx: index("storeId_idx").on(size.storeId),
  }),
);

export const sizesRelations = relations(sizes, ({ many, one }) => ({
  products: many(products),
  store: one(stores, { fields: [sizes.storeId], references: [stores.id] }),
}));

export const images = mySqlTable(
  "images",
  {
    id: serial("id").primaryKey(),
    url: varchar("name", { length: 255 }).notNull(),

    productId: varchar("userId", { length: 255 }).notNull(),

    createdAt,
    updatedAt,
  },
  (image) => ({
    productIdIdx: index("productId_idx").on(image.productId),
  }),
);

export const imagesRelations = relations(images, ({ one }) => ({
  product: one(products, {
    fields: [images.productId],
    references: [products.id],
  }),
}));
