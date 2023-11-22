import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  createBillboardSchema,
  deleteBillboardSchema,
  updateBillboardSchema,
} from "~/server/api/validators";
import { eq, genId, schema } from "~/server/db";

export const billboardRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createBillboardSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.auth;
      const { storeId } = input;
      const billboardId = `billboard_${genId()}`;

      // TODO: Implement rate-limiting
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const storeByUserId = await ctx.db.query.stores.findFirst({
        where:
          eq(schema.stores.id, storeId) && eq(schema.stores.userId, userId),
      });

      if (!storeByUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.db
        .insert(schema.billboards)
        .values({ id: billboardId, ...input });

      return ctx.db.query.billboards.findFirst({
        where: eq(schema.billboards.id, billboardId),
      });
    }),

  update: protectedProcedure
    .input(updateBillboardSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.auth;
      const { billboardId, imageUrl, label, storeId } = input;

      const storeByUserId = await ctx.db.query.stores.findFirst({
        where:
          eq(schema.stores.id, storeId) && eq(schema.stores.userId, userId),
      });

      if (!storeByUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.db
        .update(schema.billboards)
        .set({ label, imageUrl })
        .where(eq(schema.billboards.id, billboardId));

      return ctx.db.query.stores.findFirst({
        where: eq(schema.billboards.id, billboardId),
      });
    }),

  delete: protectedProcedure
    .input(deleteBillboardSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.auth;
      const { billboardId, storeId } = input;

      const storeByUserId = await ctx.db.query.stores.findFirst({
        where:
          eq(schema.stores.id, storeId) && eq(schema.stores.userId, userId),
      });

      if (!storeByUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.db
        .delete(schema.billboards)
        .where(eq(schema.billboards.id, billboardId));

      return billboardId;
    }),
});
