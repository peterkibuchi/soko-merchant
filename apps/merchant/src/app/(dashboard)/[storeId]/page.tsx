import { db, eq, schema } from "@acme/db";

interface DashboardPageProps {
  params: { storeId: string };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const store = await db.query.stores.findFirst({
    where: eq(schema.stores.id, params.storeId),
  });

  return <div>Active Store: {store?.name}</div>;
}
