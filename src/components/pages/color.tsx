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
import { ColorForm } from "../forms/color-form";

interface ColorProps {
  initialData: typeof schema.colors.$inferSelect | null;
  colorId: string | null;
  storeId: string;
}

export function Color({ initialData, colorId, storeId }: ColorProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const title = initialData ? "Edit color" : "Create color";
  const description = initialData ? "Edit your color." : "Add a new color.";

  const { mutateAsync: deleteColor, isPending } = api.color.delete.useMutation({
    onSuccess() {
      toast({
        title: "Color Deleted",
        description: "Your color has been deleted successfully.",
      });
    },

    onError() {
      toast({
        title: "Something went wrong",
        description:
          "Please make sure you have removed all products using this color first, then try again.",
        variant: "destructive",
      });
    },
  });

  const onDelete = async () => {
    if (colorId) await deleteColor({ colorId, storeId });
    router.refresh();
    router.push(`/${storeId}/colors`);
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

      <ColorForm
        initialData={initialData}
        colorId={colorId}
        storeId={storeId}
      />
    </div>
  );
}
