import { api } from "@/lib/api";
import { IUserWorkspaceResponse } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const getUserWorkspace = (): Promise<IUserWorkspaceResponse> => {
  return api.get("/users");
};

export function useUserWorkspace() {
  return useQuery<IUserWorkspaceResponse, AxiosError>({
    queryKey: ["user"],
    queryFn: getUserWorkspace,
  });
}
