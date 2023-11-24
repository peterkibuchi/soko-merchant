"use client";

import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";

import { ApiList } from "~/components/ui/api-list";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { columns, type ColorColumn } from "./color-columns";

interface ColorClientProps {
  data: ColorColumn[];
  storeId: string;
}

export function ColorClient({ data, storeId }: ColorClientProps) {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/${storeId}/colors/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />

      <DataTable filterKey="name" columns={columns} data={data} />

      <Heading title="API" description="API Calls for Colors" />

      <Separator />

      <ApiList entityName="colors" entityIdName="colorId" storeId={storeId} />
    </div>
  );
}
