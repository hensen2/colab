import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox";
import { ColumnHeader } from "@/components/ui/ColumnHeader";

export interface Experiment {
  id: string;
  name: string;
  tags: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export const columns: ColumnDef<Experiment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => <ColumnHeader column={column} title="Created By" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <ColumnHeader column={column} title="Created At" />,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <ColumnHeader column={column} title="Updated At" />,
  },
];
