import { getToken } from "@/features/auth/api/useAuth";
import { api } from "@/lib/api";
import { IProjectsResponse } from "@/types/api.types";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getProjects = (): Promise<IProjectsResponse> => {
  return api.get("/api/projects");
};

const queryOptions = {
  queryKey: ["projects"],
  queryFn: getProjects,
};

export const projectsLoader = (queryClient: QueryClient) => async () => {
  return await queryClient.ensureQueryData({
    queryKey: ["auth"],
    queryFn: getToken,
  });
};

export function useProjects() {
  return useQuery<IProjectsResponse, AxiosError>(queryOptions);
}
