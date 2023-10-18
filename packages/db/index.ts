import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as order from "./schema/order";
import * as post from "./schema/post";
import * as product from "./schema/product";
import * as store from "./schema/store";

export const schema = { ...order, ...post, ...product, ...store };

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

export const db = drizzle(
  new Client({
    url: process.env.DATABASE_URL,
  }).connection(),
  { schema },
);
