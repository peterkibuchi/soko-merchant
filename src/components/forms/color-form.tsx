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

const colorFormSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(16, "Name cannot exceed 16 characters"),
  value: z.string().min(4).max(9).regex(/^#/, {
    message: "String must be a valid hex code",
  }),
});
type ColorFormValues = z.infer<typeof colorFormSchema>;

interface ColorFormProps {
  initialData: typeof schema.colors.$inferSelect | null;
  colorId: string | null;
  storeId: string;
}

export function ColorForm({ initialData, colorId, storeId }: ColorFormProps) {
  const router = useRouter();

  const toastTitle = initialData ? "Color updated" : "Color created";
  const toastMessage = initialData
    ? "Your color has been updated successfully."
    : "Your color has been created successfully.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(colorFormSchema),
    defaultValues: initialData ?? {
      name: "",
      value: "",
    },
  });

  const { mutateAsync: createColor, isPending: creating } =
    api.color.create.useMutation({
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

  const { mutateAsync: updateColor, isPending: updating } =
    api.color.update.useMutation({
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

  const onSubmit = async (values: ColorFormValues) => {
    // If colorId exists, we are updating a color
    if (colorId) {
      await updateColor({ ...values, storeId, colorId });
    } else {
      // If colorId is null, we are creating a new color
      await createColor({ ...values, storeId });
    }

    router.refresh();
    router.push(`/${storeId}/colors`);
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
                      placeholder="Color Name"
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
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={creating || updating}
                        placeholder="Color value"
                        {...field}
                      />
                      <div
                        className="rounded-full border p-4"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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
