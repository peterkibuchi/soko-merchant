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
import { ProductForm } from "../forms/product-form";

interface ProductProps {
  initialData: typeof schema.products.$inferSelect | null;
  productId: string | null;
  storeId: string;

  categories: (typeof schema.categories.$inferSelect)[];
  colors: (typeof schema.colors.$inferSelect)[];
  sizes: (typeof schema.sizes.$inferSelect)[];
}

export function Product({
  initialData,
  productId,
  storeId,
  categories,
  colors,
  sizes,
}: ProductProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit your product." : "Add a new product.";

  const { mutateAsync: deleteProduct, isPending } =
    api.product.delete.useMutation({
      onSuccess() {
        toast({
          title: "Product Deleted",
          description: "Your product has been deleted successfully.",
        });
      },

      onError() {
        toast({
          title: "Something went wrong",
          description:
            "Please make sure you have removed all categories using this product first, then try again.",
          variant: "destructive",
        });
      },
    });

  const onDelete = async () => {
    if (productId) await deleteProduct({ productId, storeId });
    router.refresh();
    router.push(`/${storeId}/products`);
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

      <ProductForm
        initialData={initialData}
        productId={productId}
        storeId={storeId}
        categories={categories}
        colors={colors}
        sizes={sizes}
      />
    </div>
  );
}
