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
import { useStoreModal } from "~/hooks/use-store-modal";
import {
  createStoreSchema,
  type CreateStoreValues,
} from "~/server/api/validators/store";
import { api } from "~/trpc/react";

export function CreateStoreForm() {
  const storeModal = useStoreModal();

  const form = useForm<CreateStoreValues>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutateAsync: createStore, isPending } = api.store.create.useMutation({
    onSuccess() {
      toast({
        title: "Store Created",
        description: "Your store has been created successfully.",
      });
    },

    onError() {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    },

    onSettled() {
      form.reset();
    },
  });

  const onSubmit = async (values: CreateStoreValues) => {
    const response = await createStore(values);
    if (response) window.location.assign(`/${response.id}`);
  };

  return (
    <div className="space-y-4 py-2 pb-4">
      <div className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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

            <div className="flex w-full items-center justify-end space-x-2 pt-6">
              <Button
                disabled={isPending}
                variant="outline"
                onClick={storeModal.onCloseModal}
              >
                Cancel
              </Button>

              <Button disabled={isPending} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
