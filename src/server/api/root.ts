import { billboardRouter } from "~/server/api/routers/billboard";
import { storeRouter } from "~/server/api/routers/store";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  billboard: billboardRouter,
  store: storeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
