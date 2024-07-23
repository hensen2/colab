import { api } from "@/lib/api";
import { IExperimentsResponse } from "@/types/api.types";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getExperiments = (): Promise<IExperimentsResponse> => {
  return api.get("/api/experiments");
};

const queryOptions = {
  queryKey: ["experiments"],
  queryFn: getExperiments,
};

export const experimentsLoader = (queryClient: QueryClient) => () => {
  return (
    queryClient.getQueryData(queryOptions.queryKey) ??
    queryClient.fetchQuery(queryOptions)
  );
};

export function useExperiments() {
  return useQuery<IExperimentsResponse, AxiosError>(queryOptions);
}
