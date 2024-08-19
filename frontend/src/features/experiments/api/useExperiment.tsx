import { api } from "@/lib/api";
import { IExperimentResponse } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getExperiment = (experimentId: string): Promise<IExperimentResponse> => {
  return api.get(`/api/experiments/${experimentId}`);
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

export function useExperiment(experimentId: string) {
  return useQuery<IExperimentResponse, AxiosError>({
    queryKey: ["experiments", experimentId],
    queryFn: () => getExperiment(experimentId),
  });
}
