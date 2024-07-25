import { api } from "@/lib/api";
import { IAuthResponse, ILoginUserData } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const loginUser = (data: ILoginUserData): Promise<IAuthResponse> => {
  return api.post("/auth/login", { ...data });
};

export function useLogin() {
  const queryClient = useQueryClient();

  const setToken = useCallback(
    (data: IAuthResponse) => queryClient.setQueryData(["auth"], data),
    [queryClient],
  );

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setToken(data);
      // api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    },
  });
}
