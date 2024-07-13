import { Experiment, columns } from "@/features/experiments/components/columns";
import { DataTable } from "@/features/experiments/components/data-table";

// async function getData(): Promise<Experiment[]> {
//   return
// }

const data: Experiment[] = [
  {
    id: "728ed52f",
    name: "Experiment 1",
    tags: "NGS",
    createdBy: "Matt Hensen",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function DocumentsPage() {
  // const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
