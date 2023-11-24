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
import { CategoryForm } from "../forms/category-form";

interface CategoryProps {
  initialData: typeof schema.categories.$inferSelect | null;
  billboards: (typeof schema.billboards.$inferSelect)[];
  categoryId: string | null;
  storeId: string;
}

export function Category({
  initialData,
  billboards,
  categoryId,
  storeId,
}: CategoryProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData
    ? "Edit your category."
    : "Add a new category.";

  const { mutateAsync: deleteCategory, isPending } =
    api.category.delete.useMutation({
      onSuccess() {
        toast({
          title: "Category Deleted",
          description: "Your category has been deleted successfully.",
        });
      },

      onError() {
        toast({
          title: "Something went wrong",
          description:
            "Please make sure you have removed all products using this category first, then try again.",
          variant: "destructive",
        });
      },
    });

  const onDelete = async () => {
    if (categoryId) await deleteCategory({ categoryId, storeId });
    router.refresh();
    router.push(`/${storeId}/categories`);
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

      <CategoryForm
        initialData={initialData}
        billboards={billboards}
        categoryId={categoryId}
        storeId={storeId}
      />
    </div>
  );
}
