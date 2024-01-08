"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { ImageUpload } from "~/components/ui/image-upload";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { toast } from "~/components/ui/use-toast";
import { type schema } from "~/server/db";
import { api } from "~/trpc/react";

const productFormSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(64, "Name cannot exceed 64 characters"),
  price: z.coerce.number().min(1, "Price cannot be less than 1"),

  isArchived: z.boolean().default(false).optional(),
  isFeatured: z.boolean().default(false).optional(),
  images: z
    .object({
      url: z.string().min(4, "Image Url must be at least 4 characters"),
    })
    .array(),

  categoryId: z
    .string()
    .min(16, "Category ID must be at least 16 characters")
    .max(32, "Category ID cannot exceed 32 characters"),
  colorId: z
    .string()
    .min(16, "Color ID must be at least 16 characters")
    .max(32, "Color ID cannot exceed 32 characters"),
  sizeId: z
    .string()
    .min(16, "Size ID must be at least 16 characters")
    .max(32, "Size ID cannot exceed 32 characters"),
});
type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  initialData: typeof schema.products.$inferSelect | null;
  productId: string | null;
  storeId: string;

  categories: (typeof schema.categories.$inferSelect)[];
  colors: (typeof schema.colors.$inferSelect)[];
  sizes: (typeof schema.sizes.$inferSelect)[];
}

export function ProductForm({
  initialData,
  productId,
  storeId,
  categories,
  colors,
  sizes,
}: ProductFormProps) {
  const router = useRouter();

  const toastTitle = initialData ? "Product updated" : "Product created";
  const toastMessage = initialData
    ? "Your product has been updated successfully."
    : "Your product has been created successfully.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
        }
      : {
          name: "",
          price: 0,

          isArchived: false,
          isFeatured: false,
          images: [],

          categoryId: "",
          colorId: "",
          sizeId: "",
        },
  });

  const { mutateAsync: createProduct, isPending: creating } =
    api.product.create.useMutation({
      onSuccess() {
        toast({
          title: toastTitle,
          description: toastMessage,
        });
      },

      onError() {
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      },
    });

  const { mutateAsync: updateProduct, isPending: updating } =
    api.product.update.useMutation({
      onSuccess() {
        toast({
          title: toastTitle,
          description: toastMessage,
        });
      },

      onError() {
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      },
    });

  const onSubmit = async (values: ProductFormValues) => {
    // If productId exists, we are updating a product
    if (productId) {
      await updateProduct({ ...values, storeId, productId });
    } else {
      // If productId is null, we are creating a new product
      await createProduct({ ...values, storeId });
    }

    router.refresh();
    router.push(`/${storeId}/products`);
  };

  return (
    <div className="my-8">
      <Form {...form}>
        <form
          className="w-full space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={creating || updating}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={creating || updating}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={creating || updating}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={creating || updating}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    disabled={creating || updating}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a size"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    disabled={creating || updating}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a color"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="ml-auto"
            disabled={creating || updating}
          >
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
}
