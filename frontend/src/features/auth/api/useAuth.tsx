import { api } from "@/lib/api";
import { AuthResponse } from "@/types/api.types";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getToken = (): Promise<AuthResponse> => {
  return api.get("/auth");
};

const queryOptions = {
  queryKey: ["auth"],
  queryFn: getToken,
  refetchInterval: 1000 * 60,
};

export const authLoader = (queryClient: QueryClient) => () => {
  return (
    queryClient.getQueryData(queryOptions.queryKey) ??
    queryClient.fetchQuery(queryOptions)
  );
};

export function useAuth() {
  return useQuery<AuthResponse, AxiosError>(queryOptions);
}
