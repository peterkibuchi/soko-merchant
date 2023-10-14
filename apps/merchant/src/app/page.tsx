"use client";

import { useEffect } from "react";

import { useStoreModal } from "~/hooks/use-store-modal";

export const runtime = "edge";

export default function HomePage() {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpenModal = useStoreModal((state) => state.onOpenModal);

  useEffect(() => {
    if (!isOpen) {
      onOpenModal();
    }
  }, [isOpen, onOpenModal]);

  return null;
}
