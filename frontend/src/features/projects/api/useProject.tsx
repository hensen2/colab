import { api } from "@/lib/api";
import { IProjectResponse } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getProject = (projectId: string): Promise<IProjectResponse> => {
  return api.get(`/projects/${projectId}`);
};

export function useProject(projectId: string) {
  return useQuery<IProjectResponse, AxiosError>({
    queryKey: ["projects", projectId],
    queryFn: () => getProject(projectId),
  });
}
