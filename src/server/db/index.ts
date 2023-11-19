import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { customAlphabet } from "nanoid";

import { env } from "~/env.mjs";
import * as order from "./schema/order";
import * as product from "./schema/product";
import * as store from "./schema/store";

export const schema = { ...order, ...product, ...store };

export * from "drizzle-orm";

export const db = drizzle(
  new Client({
    url: env.DATABASE_URL,
  }).connection(),
  { schema },
);

// Use custom alphabet without special chars for less chaotic, copy-able URLs
// Will not collide for a long long time: https://zelark.github.io/nano-id-cc/
export const genId = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16);
