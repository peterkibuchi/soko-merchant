import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { Settings } from "~/components";
import { db, eq, schema } from "~/server/db";

interface SettingsPageProps {
  params: { storeId: string };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Settings initialData={store} storeId={store.id} />
      </div>
    </div>
  );
}
