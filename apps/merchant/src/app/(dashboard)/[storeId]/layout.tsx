import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { db, eq, schema } from "@acme/db";

interface StoreLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

export default async function StoreLayout({
  children,
  params,
}: StoreLayoutProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  const store = await db.query.stores.findFirst({
    where:
      eq(schema.stores.userId, userId) && eq(schema.stores.id, params.storeId),
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div>
      {/* <Navbar /> */}
      {children}
    </div>
  );
}
