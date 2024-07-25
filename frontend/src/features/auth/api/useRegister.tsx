import { api } from "@/lib/api";
import { IAuthResponse, IRegisterUserData } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const registerUser = (
  data: IRegisterUserData,
): Promise<IAuthResponse> => {
  return api.post("/auth/register", { ...data });
};

export function useRegister() {
  const queryClient = useQueryClient();

  const setToken = useCallback(
    (data: IAuthResponse) => queryClient.setQueryData(["auth"], data),
    [queryClient],
  );

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setToken(data);
    },
  });
}
