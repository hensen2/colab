import { api } from "@/lib/api";
import { AuthResponse, RegisterUser } from "@/types/api-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const registerUser = (data: RegisterUser): Promise<AuthResponse> => {
  return api.post("/auth/register", { ...data });
};

export function useRegister() {
  const queryClient = useQueryClient();

  const setToken = useCallback(
    (data: AuthResponse) => queryClient.setQueryData(["auth"], data),
    [queryClient],
  );

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setToken(data);
      // api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    },
  });
}
