import { create } from "zustand";

interface useStoreModalStore {
  isOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export const useStoreModal = create<useStoreModalStore>((set) => ({
  isOpen: false,
  onOpenModal: () => set({ isOpen: true }),
  onCloseModal: () => set({ isOpen: false }),
}));
