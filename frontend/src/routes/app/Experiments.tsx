import { columns } from "@/features/experiments/components/ExperimentColumns";
import { DataTable } from "@/components/common";
import CreateExperiment from "@/features/experiments/components/CreateExperiment";
import { useExperiments } from "@/features/experiments/api/useExperiments";

export const ExperimentsPage = () => {
  const { data } = useExperiments();

  return (
    <>
      <div className="mb-4 mt-3 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold capitalize leading-7 text-gray-900 sm:truncate sm:text-3xl">
            All Experiments
          </h2>
        </div>
        <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Edit
          </button>
          <CreateExperiment />
        </div>
      </div>
      <div className="w-full pb-10">
        {data && <DataTable columns={columns} data={data.experiments} />}
      </div>
    </>
  );
};
