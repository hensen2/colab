import { getToken } from "@/features/auth/api/useAuth";
import { api } from "@/lib/api";
import { IProtocolsResponse } from "@/types/api.types";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getProtocols = (): Promise<IProtocolsResponse> => {
  return api.get("/protocols");
};

const queryOptions = {
  queryKey: ["protocols"],
  queryFn: getProtocols,
};

export const protocolsLoader = (queryClient: QueryClient) => async () => {
  return await queryClient.ensureQueryData({
    queryKey: ["auth"],
    queryFn: getToken,
  });
};

export function useProtocols() {
  return useQuery<IProtocolsResponse, AxiosError>(queryOptions);
}
