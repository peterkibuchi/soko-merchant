import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  createSizeSchema,
  deleteSizeSchema,
  getAllSizesSchema,
  getSizeByIdSchema,
  updateSizeSchema,
} from "~/server/api/validators/size";
import { eq, genId, schema } from "~/server/db";

export const sizeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createSizeSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.session;
      const { storeId } = input;
      const sizeId = `size_${genId()}`;

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

      await ctx.db.insert(schema.sizes).values({ id: sizeId, ...input });

      return ctx.db.query.sizes.findFirst({
        where: eq(schema.sizes.id, sizeId),
      });
    }),

  delete: protectedProcedure
    .input(deleteSizeSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.session;
      const { sizeId, storeId } = input;

      const storeByUserId = await ctx.db.query.stores.findFirst({
        where:
          eq(schema.stores.id, storeId) && eq(schema.stores.userId, userId),
      });

      if (!storeByUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.db.delete(schema.sizes).where(eq(schema.sizes.id, sizeId));

      return sizeId;
    }),

  getAll: publicProcedure
    .input(getAllSizesSchema)
    .mutation(async ({ ctx, input }) => {
      const { storeId } = input;

      return ctx.db.query.sizes.findMany({
        where: eq(schema.sizes.storeId, storeId),
      });
    }),

  getById: publicProcedure
    .input(getSizeByIdSchema)
    .mutation(async ({ ctx, input }) => {
      const { sizeId } = input;

      return ctx.db.query.sizes.findFirst({
        where: eq(schema.sizes.id, sizeId),
      });
    }),

  update: protectedProcedure
    .input(updateSizeSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.session;
      const { sizeId, name, storeId, value } = input;

      const storeByUserId = await ctx.db.query.stores.findFirst({
        where:
          eq(schema.stores.id, storeId) && eq(schema.stores.userId, userId),
      });

      if (!storeByUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.db
        .update(schema.sizes)
        .set({ name, value })
        .where(eq(schema.sizes.id, sizeId));

      return ctx.db.query.sizes.findFirst({
        where: eq(schema.sizes.id, sizeId),
      });
    }),
});
