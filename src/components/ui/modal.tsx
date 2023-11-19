import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

interface ModalProps {
  children?: React.ReactNode;
  description: string;
  isOpen: boolean;
  onCloseModal: () => void;
  title: string;
}

export function Modal({
  title,
  description,
  isOpen,
  onCloseModal,
  children,
}: ModalProps) {
  const onChange = (open: boolean) => {
    if (!open) {
      onCloseModal();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
