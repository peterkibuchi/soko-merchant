"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import {
  updateStoreSchema,
  type UpdateStoreValues,
} from "~/server/api/validators";
import { type schema } from "~/server/db";
import { api } from "~/trpc/react";

interface UpdateStoreFormProps {
  initialData: typeof schema.stores.$inferSelect;
}

export function UpdateStoreForm({ initialData }: UpdateStoreFormProps) {
  const router = useRouter();

  const form = useForm<UpdateStoreValues>({
    resolver: zodResolver(updateStoreSchema),
    defaultValues: initialData,
  });

  const { mutateAsync: updateStore, isPending } = api.store.update.useMutation({
    onSuccess() {
      toast({
        title: "Store Updated",
        description: "Your store has been updated successfully.",
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

  const onSubmit = async (values: UpdateStoreValues) => {
    await updateStore(values);
    router.refresh();
  };

  return (
    <div className="my-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Store Name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isPending} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
