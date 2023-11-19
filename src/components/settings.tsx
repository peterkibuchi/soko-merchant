"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "lucide-react";

import { UpdateStoreForm } from "~/components/forms/update-store-form";
import { AlertModal } from "~/components/modals/alert-modal";
import { ApiAlert } from "~/components/ui/api-alert";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { toast } from "~/components/ui/use-toast";
import { getBaseUrl } from "~/hooks/get-base-url";
import { type schema } from "~/server/db";
import { api } from "~/trpc/react";

interface SettingsProps {
  initialData: typeof schema.stores.$inferSelect;
  storeId: string;
}

export function Settings({ initialData, storeId }: SettingsProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const {
    mutateAsync: deleteStore,
    isPending,
    // error,
  } = api.store.delete.useMutation({
    onSuccess() {
      toast({
        title: "Store Deleted",
        description: "Your store has been deleted successfully.",
      });
    },

    onError() {
      toast({
        title: "Something went wrong",
        description:
          "Please make sure you have removed all products and categories first and try again.",
        variant: "destructive",
      });
    },
  });

  const onDelete = async () => {
    await deleteStore({ storeId });
    // router.refresh();
    router.push("/");
  };

  return (
    <div>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />

      <div className="flex items-center justify-between">
        <Heading
          title="Store settings"
          description="Manage store preferences"
        />
        <Button
          disabled={isPending}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>

      <Separator />

      <UpdateStoreForm initialData={initialData} />

      <Separator />

      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        description={`${getBaseUrl()}/api/${storeId}`}
      />
    </div>
  );
}
