import { sql } from "drizzle-orm";
import { mysqlTableCreator, timestamp } from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM.
 * Use the same database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mySqlTable = mysqlTableCreator((name) => `soko_${name}`);

export const createdAt = timestamp("created_at")
  .default(sql`CURRENT_TIMESTAMP`)
  .notNull();
export const updatedAt = timestamp("updatedAt").onUpdateNow();
