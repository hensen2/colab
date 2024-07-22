import { api } from "@/lib/api";
import { ICreateProject, IProjectsResponse } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const createProject = (
  data: ICreateProject,
): Promise<IProjectsResponse> => {
  return api.post("/api/projects", { ...data });
};

export function useCreateProject() {
  const queryClient = useQueryClient();

  const setProjects = useCallback(
    (data: IProjectsResponse) => queryClient.setQueryData(["projects"], data),
    [queryClient],
  );

  return useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      setProjects(data);
    },
  });
}
