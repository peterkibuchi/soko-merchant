"use client";

import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";

import { ApiList } from "~/components/ui/api-list";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { columns, type SizeColumn } from "./size-columns";

interface SizeClientProps {
  data: SizeColumn[];
  storeId: string;
}

export function SizeClient({ data, storeId }: SizeClientProps) {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />
        <Button onClick={() => router.push(`/${storeId}/sizes/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />

      <DataTable filterKey="name" columns={columns} data={data} />

      <Heading title="API" description="API Calls for Sizes" />

      <Separator />

      <ApiList entityName="sizes" entityIdName="sizeId" storeId={storeId} />
    </div>
  );
}
