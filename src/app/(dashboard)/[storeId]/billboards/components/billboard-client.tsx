"use client";

import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";

import { ApiList } from "~/components/ui/api-list";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { columns, type BillboardColumn } from "./billboard-columns";

interface BillboardClientProps {
  data: BillboardColumn[];
  storeId: string;
}

export function BillboardClient({ data, storeId }: BillboardClientProps) {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button onClick={() => router.push(`/${storeId}/billboards/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />

      <DataTable filterKey="label" columns={columns} data={data} />

      <Heading title="API" description="API Calls for Billboards" />

      <Separator />

      <ApiList
        entityName="billboards"
        entityIdName="billboardId"
        storeId={storeId}
      />
    </div>
  );
}
