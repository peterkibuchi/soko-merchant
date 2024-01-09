"use client";

import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { columns, type OrderColumn } from "./order-columns";

interface OrderClientProps {
  data: OrderColumn[];
}

export function OrderClient({ data }: OrderClientProps) {
  return (
    <div>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />

      <Separator />

      <DataTable filterKey="products" columns={columns} data={data} />
    </div>
  );
}
