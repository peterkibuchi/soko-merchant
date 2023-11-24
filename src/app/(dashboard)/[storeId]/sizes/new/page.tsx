import { Size } from "~/components";

export default function SizePage({ params }: { params: { storeId: string } }) {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Size initialData={null} sizeId={null} storeId={params.storeId} />
      </div>
    </div>
  );
}
