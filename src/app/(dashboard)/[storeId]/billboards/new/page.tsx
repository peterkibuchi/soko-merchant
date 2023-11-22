import { Billboard } from "~/components";

export default function BillboardPage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Billboard
          initialData={null}
          billboardId={null}
          storeId={params.storeId}
        />
      </div>
    </div>
  );
}
