"use client";

import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { type BillboardColumn } from "./billboard-column";

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

      {/* <DataTable searchKey="label" columns={columns} data={data} /> */}
      <Heading title="API" description="API Calls for Billboards" />

      <Separator />

      {/* <ApiList entityName="billboards" entityIdName="billboardId" /> */}
    </div>
  );
}
