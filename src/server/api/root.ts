import { billboardRouter } from "~/server/api/routers/billboard";
import { categoryRouter } from "~/server/api/routers/category";
import { colorRouter } from "~/server/api/routers/color";
import { productRouter } from "~/server/api/routers/product";
import { sizeRouter } from "~/server/api/routers/size";
import { storeRouter } from "~/server/api/routers/store";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  billboard: billboardRouter,
  category: categoryRouter,
  color: colorRouter,
  product: productRouter,
  size: sizeRouter,
  store: storeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
