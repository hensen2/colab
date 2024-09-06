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
import { Input } from "@/components/ui/Input";
import { useCreateWorkspace } from "../api/useCreateWorkspace";
import { Dispatch, SetStateAction } from "react";
import { Textarea } from "@/components/ui/Textarea";
import { useUserWorkspace } from "@/features/userWorkspaces/api/useUserWorkspace";

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
  createdBy: z.string().email(),
});

interface ProtocolFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function WorkspaceForm({ setOpen }: ProtocolFormProps) {
  const { data } = useUserWorkspace();
  const { mutate: createWorkspace } = useCreateWorkspace();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      createdBy: data?.user.email,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createWorkspace(values, {
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
              <FormLabel>Workspace name</FormLabel>
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

        <div className="flex justify-end">
          <Button
            type="submit"
            className="inline-flex bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create workspace
          </Button>
        </div>
      </form>
    </Form>
  );
}
