import { redirect } from "next/navigation";

import { Category } from "~/components";
import { db, eq, schema } from "~/server/db";

export default async function BillboardPage({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) {
  const billboards = await db.query.billboards.findMany({
    where: eq(schema.billboards.storeId, params.storeId),
  });

  const category = await db.query.categories.findFirst({
    where: eq(schema.categories.id, params.categoryId),
  });

  if (!category) {
    redirect("/categories");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Category
          initialData={category}
          billboards={billboards}
          categoryId={category.id}
          storeId={category.storeId}
        />
      </div>
    </div>
  );
}
