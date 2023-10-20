import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createStoreSchema, type createStoreType } from "@acme/api/validators";

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
import { useStoreModal } from "~/hooks/use-store-modal";
import { api } from "~/utils/api";

export function CreateStoreForm() {
  const storeModal = useStoreModal();

  const form = useForm<createStoreType>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    mutateAsync: createStore,
    isLoading,
    // error,
  } = api.store.create.useMutation();

  const onSubmit = async (values: createStoreType) => {
    try {
      const response = await createStore(values);
      console.log(response);
      // window.location.assign(`/${response.data.id}`);
    } catch (error) {
      // toast.error("Something went wrong");
    }
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
                      disabled={isLoading}
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
                disabled={isLoading}
                variant="outline"
                onClick={storeModal.onCloseModal}
              >
                Cancel
              </Button>

              <Button disabled={isLoading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
