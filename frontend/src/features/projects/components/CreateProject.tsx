import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import ProjectForm from "./ProjectForm";
import { useState } from "react";

export default function CreateProject() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create
        </Button>
      </SheetTrigger>
      <SheetContent side="center">
        <SheetHeader>
          <SheetTitle>Create project</SheetTitle>
          <SheetDescription>
            {"Enter the details for your new project."}
          </SheetDescription>
        </SheetHeader>
        <ProjectForm setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
}
