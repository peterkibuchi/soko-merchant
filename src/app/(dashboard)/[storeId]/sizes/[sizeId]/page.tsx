import { redirect } from "next/navigation";

import { Size } from "~/components";
import { db, eq, schema } from "~/server/db";

export default async function SizePage({
  params,
}: {
  params: { sizeId: string };
}) {
  const size = await db.query.sizes.findFirst({
    where: eq(schema.sizes.id, params.sizeId),
  });

  if (!size) {
    redirect("/sizes");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Size initialData={size} sizeId={size.id} storeId={size.storeId} />
      </div>
    </div>
  );
}
