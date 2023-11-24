"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
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

const categoryFormSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(64, "Name cannot exceed 64 characters"),
  billboardId: z
    .string()
    .min(16, "This field is required")
    .max(32, "Billboard ID cannot exceed 32 characters"),
});
type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
  initialData: typeof schema.categories.$inferSelect | null;
  billboards: (typeof schema.billboards.$inferSelect)[];
  categoryId: string | null;
  storeId: string;
}

export function CategoryForm({
  initialData,
  billboards,
  categoryId,
  storeId,
}: CategoryFormProps) {
  const router = useRouter();

  const toastTitle = initialData ? "Category updated" : "Category created";
  const toastMessage = initialData
    ? "Your category has been updated successfully."
    : "Your category has been created successfully.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: initialData ?? {
      name: "",
      billboardId: "",
    },
  });

  const { mutateAsync: createCategory, isPending: creating } =
    api.category.create.useMutation({
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

  const { mutateAsync: updateCategory, isPending: updating } =
    api.category.update.useMutation({
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

  const onSubmit = async (values: CategoryFormValues) => {
    // If categoryId exists, we are updating a category
    if (categoryId) {
      await updateCategory({ ...values, storeId, categoryId });
    } else {
      // If categoryId is null, we are creating a new category
      await createCategory({ ...values, storeId });
    }

    router.refresh();
    router.push(`/${storeId}/categories`);
  };

  return (
    <div className="my-8">
      <Form {...form}>
        <form
          className="w-full space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
                      placeholder="Category Name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>

                  <Select
                    value={field.value}
                    defaultValue={field.value}
                    disabled={creating || updating}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
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
