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
import { toast } from "~/components/ui/use-toast";
import { type schema } from "~/server/db";
import { api } from "~/trpc/react";

const sizeFormSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(16, "Name cannot exceed 16 characters"),
  value: z
    .string()
    .min(1, "Value must be at least 1 character")
    .max(4, "Value cannot exceed 4 characters"),
});
type SizeFormValues = z.infer<typeof sizeFormSchema>;

interface SizeFormProps {
  initialData: typeof schema.sizes.$inferSelect | null;
  sizeId: string | null;
  storeId: string;
}

export function SizeForm({ initialData, sizeId, storeId }: SizeFormProps) {
  const router = useRouter();

  const toastTitle = initialData ? "Size updated" : "Size created";
  const toastMessage = initialData
    ? "Your size has been updated successfully."
    : "Your size has been created successfully.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(sizeFormSchema),
    defaultValues: initialData ?? {
      name: "",
      value: "",
    },
  });

  const { mutateAsync: createSize, isPending: creating } =
    api.size.create.useMutation({
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

  const { mutateAsync: updateSize, isPending: updating } =
    api.size.update.useMutation({
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

  const onSubmit = async (values: SizeFormValues) => {
    // If sizeId exists, we are updating a size
    if (sizeId) {
      await updateSize({ ...values, storeId, sizeId });
    } else {
      // If sizeId is null, we are creating a new size
      await createSize({ ...values, storeId });
    }

    router.refresh();
    router.push(`/${storeId}/sizes`);
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
                      placeholder="Size Name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>

                  <FormControl>
                    <Input
                      disabled={creating || updating}
                      placeholder="Size Value"
                      {...field}
                    />
                  </FormControl>

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
