import { redirect } from "next/navigation";

import { Color } from "~/components";
import { db, eq, schema } from "~/server/db";

export default async function ColorPage({
  params,
}: {
  params: { colorId: string };
}) {
  const color = await db.query.colors.findFirst({
    where: eq(schema.colors.id, params.colorId),
  });

  if (!color) {
    redirect("/colors");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Color initialData={color} colorId={color.id} storeId={color.storeId} />
      </div>
    </div>
  );
}
