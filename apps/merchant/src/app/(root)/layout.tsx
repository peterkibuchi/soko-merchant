import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { db, eq, schema } from "@acme/db";

interface SetupLayoutProps {
  children: React.ReactNode;
}

export default async function SetupLayout({ children }: SetupLayoutProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  const store = await db.query.stores.findFirst({
    where: eq(schema.stores.userId, userId),
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <div>{children}</div>;
}
