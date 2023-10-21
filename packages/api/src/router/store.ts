import { eq, genId, schema } from "@acme/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createStoreSchema } from "../validators";

export const storeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createStoreSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.auth;
      const storeId = `store_${genId()}`;

      // TODO: Implement rate-limiting
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      await ctx.db
        .insert(schema.stores)
        .values({ id: storeId, userId, ...input });

      return ctx.db.query.stores.findFirst({
        where: eq(schema.stores.id, storeId),
      });
    }),
});
