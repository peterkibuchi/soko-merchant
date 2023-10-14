import { Modal } from "~/components/ui/modal";
import { useStoreModal } from "~/hooks/use-store-modal";

export function StoreModal() {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories."
      isOpen={storeModal.isOpen}
      onCloseModal={storeModal.onCloseModal}
    ></Modal>
  );
}
