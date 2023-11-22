import { redirect } from "next/navigation";

import { Billboard } from "~/components";
import { db, eq, schema } from "~/server/db";

export default async function BillboardPage({
  params,
}: {
  params: { billboardId: string };
}) {
  const billboard = await db.query.billboards.findFirst({
    where: eq(schema.billboards.id, params.billboardId),
  });

  if (!billboard) {
    redirect("/billboards");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Billboard
          initialData={billboard}
          billboardId={billboard.id}
          storeId={billboard.storeId}
        />
      </div>
    </div>
  );
}
