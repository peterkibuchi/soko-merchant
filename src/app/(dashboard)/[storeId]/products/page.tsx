import { format } from "date-fns";

import { formatter } from "~/lib/utils";
import { db, eq, schema } from "~/server/db";
import { ProductClient } from "./components/product-client";
import { type ProductColumn } from "./components/product-columns";

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await db.query.products.findMany({
    where: eq(schema.products.storeId, params.storeId),
    with: { category: true, color: true, size: true },
    // orderBy: desc[product.createdAt],
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: formatter.format(Number(item.price)),

    isArchived: item.isArchived,
    isFeatured: item.isFeatured,

    category: item.category.name,
    color: item.color.value,
    size: item.size.name,

    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} storeId={params.storeId} />
      </div>
    </div>
  );
}
