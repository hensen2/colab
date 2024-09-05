import { api } from "@/lib/api";
import { IProjectResponse } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getProject = (projectId: string): Promise<IProjectResponse> => {
  return api.get(`/projects/${projectId}`);
};

// function projectOptions(projectId: string) {
//   return queryOptions({
//     queryKey: ["projects", projectId],
//     queryFn: () => getProject(projectId),
//   });
// }

// export const projectLoader = (queryClient: QueryClient) => () => {
//   return (
//     queryClient.getQueryData(queryOptions.queryKey) ??
//     queryClient.fetchQuery(queryOptions)
//   );
// };

export function useProject(projectId: string) {
  return useQuery<IProjectResponse, AxiosError>({
    queryKey: ["projects", projectId],
    queryFn: () => getProject(projectId),
  });
}
