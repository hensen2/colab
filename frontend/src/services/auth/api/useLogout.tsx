import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const logoutUser = (): Promise<void> => {
  return api.post("/auth/logout");
};

export function useLogout() {
  const queryClient = useQueryClient();

  const setToken = useCallback(
    () => queryClient.setQueryData(["auth"], null),
    [queryClient],
  );

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setToken();
    },
  });
}
