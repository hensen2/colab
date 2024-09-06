import { api } from "@/lib/api";
import { IUserResponse } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const changeWorkspace = (data: {
  workspaceId: string;
}): Promise<IUserResponse> => {
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
