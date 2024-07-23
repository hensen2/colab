import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "@/components/ui/ColumnHeader";
import { IExperiment } from "@/types/api.types";

export const columns: ColumnDef<IExperiment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => <ColumnHeader column={column} title="Created By" />,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <ColumnHeader column={column} title="Updated At" />,
  },
];
