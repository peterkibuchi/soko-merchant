import { Product } from "~/components";
import { db, eq, schema } from "~/server/db";

export default async function ProductPage({
  params,
}: {
  params: { storeId: string };
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

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Product
          initialData={null}
          productId={null}
          storeId={params.storeId}
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
      </div>
    </div>
  );
}
