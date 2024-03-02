import { drizzle } from "drizzle-orm/postgres-js";
import { customAlphabet } from "nanoid";
import postgres from "postgres";

import { env } from "~/env";
import * as order from "./schema/order";
import * as product from "./schema/product";
import * as store from "./schema/store";

export const schema = { ...order, ...product, ...store };

export * from "drizzle-orm";

export const db = drizzle(postgres(env.DATABASE_URL), { schema });

// Use custom alphabet without special chars for less chaotic, copy-able URLs
// Will not collide for a long long time: https://zelark.github.io/nano-id-cc/
export const genId = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16);
