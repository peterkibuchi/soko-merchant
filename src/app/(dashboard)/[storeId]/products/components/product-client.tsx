"use client";

import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";

import { ApiList } from "~/components/ui/api-list";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { columns, type ProductColumn } from "./product-columns";

interface ProductClientProps {
  data: ProductColumn[];
  storeId: string;
}

export function ProductClient({ data, storeId }: ProductClientProps) {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Button onClick={() => router.push(`/${storeId}/products/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />

      <DataTable filterKey="name" columns={columns} data={data} />

      <Heading title="API" description="API Calls for Products" />

      <Separator />

      <ApiList
        entityName="products"
        entityIdName="productId"
        storeId={storeId}
      />
    </div>
  );
}
