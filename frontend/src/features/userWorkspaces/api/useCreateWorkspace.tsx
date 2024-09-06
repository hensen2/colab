import { api } from "@/lib/api";
import { ICreateWorkspaceData, IWorkspaceResponse } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createWorkspace = (
  data: ICreateWorkspaceData,
): Promise<IWorkspaceResponse> => {
  return api.post("/workspaces", { ...data });
};

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkspace,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
