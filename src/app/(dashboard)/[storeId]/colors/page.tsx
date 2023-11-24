import { format } from "date-fns";

import { db, eq, schema } from "~/server/db";
import { ColorClient } from "./components/color-client";
import { type ColorColumn } from "./components/color-columns";

export default async function ColorsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const colors = await db.query.colors.findMany({
    where: eq(schema.colors.storeId, params.storeId),
    // orderBy: desc[color.createdAt],
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} storeId={params.storeId} />
      </div>
    </div>
  );
}
