import { useParams, useRouter } from "next/navigation";
import { CopyIcon, EditIcon, MoreHorizontalIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { toast } from "~/components/ui/use-toast";
import { type ColorColumn } from "./color-columns";

interface CellActionProps {
  data: ColorColumn;
}

export function CellAction({ data }: CellActionProps) {
  const params = useParams();
  const router = useRouter();

  const onCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    toast({
      title: "Copied",
      description: "Color ID copied to clipboard.",
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <CopyIcon className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              router.push(`/${params.storeId}/colors/${data.id}`)
            }
          >
            <EditIcon className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
