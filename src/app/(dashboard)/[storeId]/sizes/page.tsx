import { format } from "date-fns";

import { db, eq, schema } from "~/server/db";
import { SizeClient } from "./components/size-client";
import { type SizeColumn } from "./components/size-columns";

export default async function SizesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const sizes = await db.query.sizes.findMany({
    where: eq(schema.sizes.storeId, params.storeId),
    // orderBy: desc[size.createdAt],
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} storeId={params.storeId} />
      </div>
    </div>
  );
}
