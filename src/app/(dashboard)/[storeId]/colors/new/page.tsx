import { Color } from "~/components";

export default function ColorPage({ params }: { params: { storeId: string } }) {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Color initialData={null} colorId={null} storeId={params.storeId} />
      </div>
    </div>
  );
}
