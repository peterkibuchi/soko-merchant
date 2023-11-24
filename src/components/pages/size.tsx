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
import { SizeForm } from "../forms/size-form";

interface SizeProps {
  initialData: typeof schema.sizes.$inferSelect | null;
  sizeId: string | null;
  storeId: string;
}

export function Size({ initialData, sizeId, storeId }: SizeProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const title = initialData ? "Edit size" : "Create size";
  const description = initialData ? "Edit your size." : "Add a new size.";

  const { mutateAsync: deleteSize, isPending } = api.size.delete.useMutation({
    onSuccess() {
      toast({
        title: "Size Deleted",
        description: "Your size has been deleted successfully.",
      });
    },

    onError() {
      toast({
        title: "Something went wrong",
        description:
          "Please make sure you have removed all products using this size first, then try again.",
        variant: "destructive",
      });
    },
  });

  const onDelete = async () => {
    if (sizeId) await deleteSize({ sizeId, storeId });
    router.refresh();
    router.push(`/${storeId}/sizes`);
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

      <SizeForm initialData={initialData} sizeId={sizeId} storeId={storeId} />
    </div>
  );
}
