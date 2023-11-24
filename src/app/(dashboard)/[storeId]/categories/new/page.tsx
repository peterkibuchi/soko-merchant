import { Category } from "~/components";
import { db, eq, schema } from "~/server/db";

export default async function CategoryPage({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await db.query.billboards.findMany({
    where: eq(schema.billboards.storeId, params.storeId),
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Category
          initialData={null}
          billboards={billboards}
          categoryId={null}
          storeId={params.storeId}
        />
      </div>
    </div>
  );
}
