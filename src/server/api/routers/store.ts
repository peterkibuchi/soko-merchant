import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  createStoreSchema,
  deleteStoreSchema,
  updateStoreSchema,
} from "~/server/api/validators/store";
import { eq, genId, schema } from "~/server/db";

export const storeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createStoreSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.session;
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

  update: protectedProcedure
    .input(updateStoreSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.session;
      const { name, storeId } = input;

      await ctx.db
        .update(schema.stores)
        .set({ name })
        .where(
          eq(schema.stores.userId, userId) && eq(schema.stores.id, storeId),
        );

      return ctx.db.query.stores.findFirst({
        where: eq(schema.stores.id, storeId),
      });
    }),

  delete: protectedProcedure
    .input(deleteStoreSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.session;
      const { storeId } = input;

      await ctx.db
        .delete(schema.stores)
        .where(
          eq(schema.stores.userId, userId) && eq(schema.stores.id, storeId),
        );

      return storeId;
    }),
});
