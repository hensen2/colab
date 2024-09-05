import { api } from "@/lib/api";
import { IWorkspaceResponse } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const getWorkspace = (): Promise<IWorkspaceResponse> => {
  return api.get(`/workspaces`);
};

export function useWorkspace() {
  return useQuery<IWorkspaceResponse, AxiosError>({
    queryKey: ["workspace"],
    queryFn: getWorkspace,
  });
}
