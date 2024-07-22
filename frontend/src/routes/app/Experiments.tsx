import { Experiment, columns } from "@/features/experiments/components/columns";
import { DataTable } from "@/components/blocks";

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

export const ExperimentsPage = () => {
  // const data = await getData();

  return (
    <div className="w-full pb-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
