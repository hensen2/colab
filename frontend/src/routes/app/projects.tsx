import { columns } from "@/features/projects/components/columns";
import { DataTable } from "@/components/blocks";
import { useProjects } from "@/features/projects/api/useProjects";
import TableHeader from "@/components/blocks/TableHeader";

export const ProjectsPage = () => {
  const { data } = useProjects();

  return (
    <>
      <TableHeader />
      <div className="w-full pb-10">
        {data && <DataTable columns={columns} data={data.projects} />}
      </div>
    </>
  );
};
