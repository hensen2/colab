import { api } from "@/lib/api";
import { AuthResponse } from "@/types/api-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

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
    },
  });
}
