import { redirect } from "next/navigation";

import { Product } from "~/components";
import { db, eq, schema } from "~/server/db";

export default async function ProductPage({
  params,
}: {
  params: { productId: string; storeId: string };
}) {
  const categories = await db.query.categories.findMany({
    where: eq(schema.categories.storeId, params.storeId),
  });

  const colors = await db.query.colors.findMany({
    where: eq(schema.colors.storeId, params.storeId),
  });

  const sizes = await db.query.sizes.findMany({
    where: eq(schema.sizes.storeId, params.storeId),
  });

  const product = await db.query.products.findFirst({
    where: eq(schema.products.id, params.productId),
    with: { images: true },
  });

  if (!product) {
    redirect("/products");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Product
          initialData={product}
          productId={product.id}
          storeId={product.storeId}
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
      </div>
    </div>
  );
}
