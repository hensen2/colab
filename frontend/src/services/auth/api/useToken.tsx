import { api } from "@/lib/api";
import { AuthResponse } from "@/types/api-types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const getToken = (): Promise<AuthResponse> => {
  return api.get("/auth");
};

export function useToken() {
  return useQuery<AuthResponse, AxiosError>({
    queryKey: ["auth"],
    queryFn: getToken,
  });
}
