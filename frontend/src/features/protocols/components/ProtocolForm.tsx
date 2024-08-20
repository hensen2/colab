/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Input } from "@/components/ui/Input";
import { useCreateProtocol } from "../api/useCreateProtocol";
import { Dispatch, SetStateAction, useState } from "react";
import { Textarea } from "@/components/ui/Textarea";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProjects } from "@/features/projects/api/useProjects";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(63, "Maximum of 63 characters allowed."),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters.")
    .max(255, "Maximum of 255 characters allowed.")
    .optional()
    .or(z.literal("")),
  projectId: z.string().length(24).optional(),
});

interface ProtocolFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ProtocolForm({ setOpen }: ProtocolFormProps) {
  const [openProject, setOpenProject] = useState(false);
  const { mutate: createProtocol } = useCreateProtocol();
  const { data: projectsData } = useProjects();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createProtocol(values, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  }

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Protocol name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Project</FormLabel>
              <Popover open={openProject} onOpenChange={setOpenProject}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openProject}
                      className={cn(
                        "w-[200px] justify-between px-3",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? projectsData?.projects.find(
                            (project) => project.id === field.value,
                          )?.name
                        : "Add project"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search project..." />
                    <CommandList>
                      <CommandEmpty>No project found.</CommandEmpty>
                      <CommandGroup>
                        {projectsData?.projects.map((project) => (
                          <CommandItem
                            key={project.id}
                            value={project.id}
                            onSelect={() => {
                              form.setValue("projectId", project.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                project.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {project.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            className="inline-flex bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create protocol
          </Button>
        </div>
      </form>
    </Form>
  );
}
