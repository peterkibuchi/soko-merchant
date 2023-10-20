import { schema } from "@acme/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createStoreSchema } from "../validators";

export const storeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createStoreSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.auth;

      // TODO: Implement rate limiting
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      return ctx.db.insert(schema.stores).values({ ...input, userId });
    }),
});
