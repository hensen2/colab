import { api } from "@/lib/api";
import { ICreateProjectData, IProjectsResponse } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createProject = (
  data: ICreateProjectData,
): Promise<IProjectsResponse> => {
  return api.post("/api/projects", { ...data });
};

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
