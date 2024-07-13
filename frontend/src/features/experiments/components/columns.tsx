import { ColumnDef } from "@tanstack/react-table";

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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
