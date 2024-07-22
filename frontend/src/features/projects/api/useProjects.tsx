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

export const projectsLoader = (queryClient: QueryClient) => () => {
  return (
    queryClient.getQueryData(queryOptions.queryKey) ??
    queryClient.fetchQuery(queryOptions)
  );
};

export function useProjects() {
  return useQuery<IProjectsResponse, AxiosError>(queryOptions);
}
