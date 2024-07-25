import { api } from "@/lib/api";
import { IUserResponse } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const getUser = (): Promise<IUserResponse> => {
  return api.get("/api/users");
};

export function useUser(isAuthenticated: boolean) {
  return useQuery<IUserResponse, AxiosError>({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: isAuthenticated,
    retry: false,
  });
}
