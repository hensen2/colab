import { api } from "@/lib/api";
import { AuthResponse } from "@/types/api-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export interface LoginUser {
  email: string;
  password: string;
}

export const loginUser = (data: LoginUser): Promise<AuthResponse> => {
  return api.post("/auth/login", { ...data });
};

export function useLogin() {
  const queryClient = useQueryClient();

  const setToken = useCallback(
    (data: AuthResponse) => queryClient.setQueryData(["auth"], data),
    [queryClient],
  );

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setToken(data);
    },
  });
}
