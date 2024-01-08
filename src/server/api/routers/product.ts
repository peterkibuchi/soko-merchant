import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  createProductSchema,
  deleteProductSchema,
  getAllProductsSchema,
  getProductByIdSchema,
  updateProductSchema,
} from "~/server/api/validators/product";
import { eq, genId, schema } from "~/server/db";

export const productRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createProductSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.auth;
      const { storeId, price } = input;
      const productId = `product_${genId()}`;

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
        .insert(schema.products)
        .values({ id: productId, ...input, price: String(price) });

      return ctx.db.query.products.findFirst({
        where: eq(schema.products.id, productId),
      });
    }),

  delete: protectedProcedure
    .input(deleteProductSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.auth;
      const { productId, storeId } = input;

      const storeByUserId = await ctx.db.query.stores.findFirst({
        where:
          eq(schema.stores.id, storeId) && eq(schema.stores.userId, userId),
      });

      if (!storeByUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.db
        .delete(schema.products)
        .where(eq(schema.products.id, productId));

      return productId;
    }),

  getAll: publicProcedure
    .input(getAllProductsSchema)
    .mutation(async ({ ctx, input }) => {
      const { storeId } = input;
      const { searchParams } = new URL(ctx.req!.url);

      const isFeatured = searchParams.get("isFeatured");
      const categoryId = searchParams.get("categoryId") ?? undefined;
      const colorId = searchParams.get("colorId") ?? undefined;
      const sizeId = searchParams.get("sizeId") ?? undefined;

      return ctx.db.query.products.findMany({
        where:
          eq(schema.products.storeId, storeId) &&
          eq(schema.products.isArchived, false) &&
          eq(schema.products.isFeatured, Boolean(isFeatured)) &&
          eq(schema.products.categoryId, categoryId!) &&
          eq(schema.products.colorId, colorId!) &&
          eq(schema.products.sizeId, sizeId!),
      });
    }),

  getById: publicProcedure
    .input(getProductByIdSchema)
    .mutation(async ({ ctx, input }) => {
      const { productId } = input;

      return ctx.db.query.products.findFirst({
        where: eq(schema.products.id, productId),
      });
    }),

  update: protectedProcedure
    .input(updateProductSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.auth;
      const { productId, storeId, price } = input;

      const storeByUserId = await ctx.db.query.stores.findFirst({
        where:
          eq(schema.stores.id, storeId) && eq(schema.stores.userId, userId),
      });

      if (!storeByUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.db
        .update(schema.products)
        .set({
          ...input,
          price: String(price),
        })
        .where(eq(schema.products.id, productId));

      return ctx.db.query.products.findFirst({
        where: eq(schema.products.id, productId),
      });
    }),
});
