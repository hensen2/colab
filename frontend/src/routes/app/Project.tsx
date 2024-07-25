/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { columns } from "@/features/projects/components/ProjectColumns";
import { DataTable } from "@/components/blocks";
import { useProject } from "@/features/projects/api/useProject";
import { useLocation } from "react-router-dom";
import { IProject } from "@/types/api.types";
import CreateExperiment from "@/features/experiments/components/CreateExperiment";

export const ProjectPage = () => {
  const { state: project }: { state: IProject } = useLocation();
  const { data } = useProject(project.id);

  return (
    <>
      <div className="mb-4 mt-3 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold capitalize leading-7 text-gray-900 sm:truncate sm:text-3xl">
            {project.name}
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
        {data && (
          <DataTable columns={columns} data={data.project.experiments} />
        )}
      </div>
    </>
  );
};
