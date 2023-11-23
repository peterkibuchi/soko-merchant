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
import { ImageUpload } from "~/components/ui/image-upload";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import { type schema } from "~/server/db";
import { api } from "~/trpc/react";

const billboardFormSchema = z.object({
  label: z
    .string()
    .min(4, "Label must be at least 4 characters")
    .max(64, "Label cannot exceed 64 characters"),
  imageUrl: z.string().min(4, "Image Url must be at least 4 characters"),
});
type BillboardFormValues = z.infer<typeof billboardFormSchema>;

interface BillboardFormProps {
  initialData: typeof schema.billboards.$inferSelect | null;
  billboardId: string | null;
  storeId: string;
}

export function BillboardForm({
  initialData,
  billboardId,
  storeId,
}: BillboardFormProps) {
  const router = useRouter();

  const toastTitle = initialData ? "Billboard updated" : "Billboard created";
  const toastMessage = initialData
    ? "Your billboard has been updated successfully."
    : "Your billboard has been created successfully.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(billboardFormSchema),
    defaultValues: initialData ?? {
      imageUrl: "",
      label: "",
    },
  });

  const { mutateAsync: createBillboard, isPending: creating } =
    api.billboard.create.useMutation({
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

  const { mutateAsync: updateBillboard, isPending: updating } =
    api.billboard.update.useMutation({
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

  const onSubmit = async (values: BillboardFormValues) => {
    // If billboardId exists, we are updating a billboard
    if (billboardId) {
      await updateBillboard({ ...values, storeId, billboardId });
    } else {
      // If billboardId is null, we are creating a new billboard
      await createBillboard({ ...values, storeId });
    }

    router.refresh();
    router.push(`/${storeId}/billboards`);
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>

                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={creating || updating}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>

                  <FormControl>
                    <Input
                      disabled={creating || updating}
                      placeholder="Billboard Label"
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
