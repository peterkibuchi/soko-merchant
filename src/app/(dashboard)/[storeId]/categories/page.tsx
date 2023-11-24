import { format } from "date-fns";

import { db, eq, schema } from "~/server/db";
import { CategoryClient } from "./components/category-client";
import { type CategoryColumn } from "./components/category-columns";

export default async function CategoriesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const categories = await db.query.categories.findMany({
    where: eq(schema.categories.storeId, params.storeId),
    with: { billboard: true },
    // orderBy: desc[categories.createdAt],
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} storeId={params.storeId} />
      </div>
    </div>
  );
}
