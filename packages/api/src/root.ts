import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { storeRouter } from "./router/store";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  store: storeRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
