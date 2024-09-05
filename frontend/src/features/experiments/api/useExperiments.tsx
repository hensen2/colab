import { getToken } from "@/features/auth/api/useAuth";
import { api } from "@/lib/api";
import { IExperimentsResponse } from "@/types/api.types";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getExperiments = (): Promise<IExperimentsResponse> => {
  return api.get("/experiments");
};

const queryOptions = {
  queryKey: ["experiments"],
  queryFn: getExperiments,
};

export const experimentsLoader = (queryClient: QueryClient) => async () => {
  return await queryClient.ensureQueryData({
    queryKey: ["auth"],
    queryFn: getToken,
  });
};

export function useExperiments() {
  return useQuery<IExperimentsResponse, AxiosError>(queryOptions);
}
