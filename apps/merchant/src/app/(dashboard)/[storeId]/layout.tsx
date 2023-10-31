import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { db, eq, schema } from "@acme/db";

import { Navbar } from "~/components";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
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
      <Navbar />
      {children}
    </div>
  );
}