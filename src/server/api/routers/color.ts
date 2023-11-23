import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  createColorSchema,
  deleteColorSchema,
  getAllColorsSchema,
  getColorByIdSchema,
  updateColorSchema,
} from "~/server/api/validators/color";
import { eq, genId, schema } from "~/server/db";

export const colorRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createColorSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.auth;
      const { storeId } = input;
      const colorId = `color_${genId()}`;

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

      await ctx.db.insert(schema.colors).values({ id: colorId, ...input });

      return ctx.db.query.colors.findFirst({
        where: eq(schema.colors.id, colorId),
      });
    }),

  delete: protectedProcedure
    .input(deleteColorSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.auth;
      const { colorId, storeId } = input;

      const storeByUserId = await ctx.db.query.stores.findFirst({
        where:
          eq(schema.stores.id, storeId) && eq(schema.stores.userId, userId),
      });

      if (!storeByUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.db.delete(schema.colors).where(eq(schema.colors.id, colorId));

      return colorId;
    }),

  getAll: publicProcedure
    .input(getAllColorsSchema)
    .mutation(async ({ ctx, input }) => {
      const { storeId } = input;

      return ctx.db.query.colors.findMany({
        where: eq(schema.colors.storeId, storeId),
      });
    }),

  getById: publicProcedure
    .input(getColorByIdSchema)
    .mutation(async ({ ctx, input }) => {
      const { colorId } = input;

      return ctx.db.query.colors.findFirst({
        where: eq(schema.colors.id, colorId),
      });
    }),

  update: protectedProcedure
    .input(updateColorSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.auth;
      const { colorId, name, storeId, value } = input;

      const storeByUserId = await ctx.db.query.stores.findFirst({
        where:
          eq(schema.stores.id, storeId) && eq(schema.stores.userId, userId),
      });

      if (!storeByUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.db
        .update(schema.colors)
        .set({ name, value })
        .where(eq(schema.colors.id, colorId));

      return ctx.db.query.colors.findFirst({
        where: eq(schema.colors.id, colorId),
      });
    }),
});
