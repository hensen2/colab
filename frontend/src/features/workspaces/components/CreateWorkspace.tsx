import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import WorkspaceForm from "./WorkspaceForm";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function CreateWorkspace() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="inline-flex h-6 w-6 items-center rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <Plus size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent side="center">
        <SheetHeader>
          <SheetTitle>Create workspace</SheetTitle>
          <SheetDescription>
            {"Enter the details for your new workspace."}
          </SheetDescription>
        </SheetHeader>
        <WorkspaceForm setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
}
