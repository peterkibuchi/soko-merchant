import { pgTableCreator, timestamp } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM.
 * Use the same database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgTable = pgTableCreator((name) => `soko_${name}`);

export const createdAt = timestamp("createdAt").defaultNow().notNull();
export const updatedAt = timestamp("updatedAt").defaultNow();
