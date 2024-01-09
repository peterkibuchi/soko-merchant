import { format } from "date-fns";

import { formatter } from "~/lib/utils";
import { db, eq, schema } from "~/server/db";
import { OrderClient } from "./components/order-client";
import { type OrderColumn } from "./components/order-columns";

export default async function OrdersPage({
  params,
}: {
  params: { storeId: string };
}) {
  const orders = await db.query.orders.findMany({
    where: eq(schema.orders.storeId, params.storeId),
    with: {
      orderItems: {
        with: { product: true },
      },
    },
    // orderBy: desc[order.createdAt],
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,

    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,

    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0),
    ),

    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
}
