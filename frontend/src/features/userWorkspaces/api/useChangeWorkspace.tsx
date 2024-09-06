import { api } from "@/lib/api";
import { IUserWorkspaceResponse } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const changeWorkspace = (data: {
  workspaceId: string;
}): Promise<IUserWorkspaceResponse> => {
  return api.patch("/users", { ...data });
};

export function useChangeWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeWorkspace,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
