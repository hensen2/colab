import { api } from "@/lib/api";
import { IAuthResponse } from "@/types/api.types";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const getToken = async (): Promise<IAuthResponse> => {
  return api.get("/auth");
};

const queryOptions = {
  queryKey: ["auth"],
  queryFn: getToken,
  refetchInterval: 1000 * 60 * 10,
};

export const authLoader = (queryClient: QueryClient) => async () => {
  return await queryClient.ensureQueryData(queryOptions);
};

export function useAuth() {
  return useQuery<IAuthResponse, AxiosError>(queryOptions);
}
