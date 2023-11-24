"use client";

import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";

import { ApiList } from "~/components/ui/api-list";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { columns, type CategoryColumn } from "./category-columns";

interface CategoryClientProps {
  data: CategoryColumn[];
  storeId: string;
}

export function CategoryClient({ data, storeId }: CategoryClientProps) {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your store"
        />
        <Button onClick={() => router.push(`/${storeId}/categories/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />

      <DataTable filterKey="name" columns={columns} data={data} />

      <Heading title="API" description="API Calls for Categories" />

      <Separator />

      <ApiList
        entityName="categories"
        entityIdName="categoryId"
        storeId={storeId}
      />
    </div>
  );
}
