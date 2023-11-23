import { format } from "date-fns";

import { db, eq, schema } from "~/server/db";
import { BillboardClient } from "./components/billboard-client";
import { type BillboardColumn } from "./components/billboard-columns";

export default async function BillboardsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await db.query.billboards.findMany({
    where: eq(schema.billboards.storeId, params.storeId),
    // orderBy: desc[billboard.createdAt],
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} storeId={params.storeId} />
      </div>
    </div>
  );
}
