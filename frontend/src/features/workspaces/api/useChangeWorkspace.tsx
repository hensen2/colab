import { api } from "@/lib/api";
import { IWorkspaceResponse } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const changeWorkspace = (
  workspaceId: string,
): Promise<IWorkspaceResponse> => {
  return api.get(`/workspaces/${workspaceId}`);
};

export function useChangeWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeWorkspace,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}
