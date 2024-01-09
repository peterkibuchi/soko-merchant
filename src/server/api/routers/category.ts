import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  createCategorySchema,
  deleteCategorySchema,
  getAllCategoriesSchema,
  getCategoryByIdSchema,
  updateCategorySchema,
} from "~/server/api/validators/category";
import { eq, genId, schema } from "~/server/db";

export const categoryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCategorySchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.session;
      const { storeId } = input;
      const categoryId = `category_${genId()}`;

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
        .insert(schema.categories)
        .values({ id: categoryId, ...input });

      return ctx.db.query.categories.findFirst({
        where: eq(schema.categories.id, categoryId),
      });
    }),

  delete: protectedProcedure
    .input(deleteCategorySchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.session;
      const { categoryId, storeId } = input;

      const storeByUserId = await ctx.db.query.stores.findFirst({
        where:
          eq(schema.stores.id, storeId) && eq(schema.stores.userId, userId),
      });

      if (!storeByUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.db
        .delete(schema.categories)
        .where(eq(schema.categories.id, categoryId));

      return categoryId;
    }),

  getAll: protectedProcedure
    .input(getAllCategoriesSchema)
    .mutation(async ({ ctx, input }) => {
      const { storeId } = input;

      return ctx.db.query.categories.findMany({
        where: eq(schema.categories.storeId, storeId),
      });
    }),

  getById: publicProcedure
    .input(getCategoryByIdSchema)
    .mutation(async ({ ctx, input }) => {
      const { categoryId } = input;

      return ctx.db.query.categories.findFirst({
        where: eq(schema.categories.id, categoryId),
      });
    }),

  update: protectedProcedure
    .input(updateCategorySchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.session;
      const { billboardId, categoryId, name, storeId } = input;

      const storeByUserId = await ctx.db.query.stores.findFirst({
        where:
          eq(schema.stores.id, storeId) && eq(schema.stores.userId, userId),
      });

      if (!storeByUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.db
        .update(schema.categories)
        .set({ name, billboardId })
        .where(eq(schema.categories.id, categoryId));

      return ctx.db.query.categories.findFirst({
        where: eq(schema.categories.id, categoryId),
      });
    }),
});
