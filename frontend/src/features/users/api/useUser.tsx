import { api } from "@/lib/api";
import { UserResponse } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const getUser = (): Promise<UserResponse> => {
  return api.get("/api/users");
};

export function useUser(isAccessToken: boolean) {
  return useQuery<UserResponse, AxiosError>({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: isAccessToken,
  });
}
