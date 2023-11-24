"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "lucide-react";

import { AlertModal } from "~/components/modals/alert-modal";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { toast } from "~/components/ui/use-toast";
import { type schema } from "~/server/db";
import { api } from "~/trpc/react";
import { BillboardForm } from "../forms/billboard-form";

interface BillboardProps {
  initialData: typeof schema.billboards.$inferSelect | null;
  billboardId: string | null;
  storeId: string;
}

export function Billboard({
  initialData,
  billboardId,
  storeId,
}: BillboardProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData
    ? "Edit your billboard."
    : "Add a new billboard.";

  const { mutateAsync: deleteBillboard, isPending } =
    api.billboard.delete.useMutation({
      onSuccess() {
        toast({
          title: "Billboard Deleted",
          description: "Your billboard has been deleted successfully.",
        });
      },

      onError() {
        toast({
          title: "Something went wrong",
          description:
            "Please make sure you have removed all categories using this billboard first, then try again.",
          variant: "destructive",
        });
      },
    });

  const onDelete = async () => {
    if (billboardId) await deleteBillboard({ billboardId, storeId });
    router.refresh();
    router.push(`/${storeId}/billboards`);
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
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isPending}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <BillboardForm
        initialData={initialData}
        billboardId={billboardId}
        storeId={storeId}
      />
    </div>
  );
}
