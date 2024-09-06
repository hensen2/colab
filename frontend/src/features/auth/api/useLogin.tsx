/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { api } from "@/lib/api";
import { IAuthResponse, ILoginUserData } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useToast } from "@/hooks/useToast";
import type { AxiosError } from "axios";

export const loginUser = (data: ILoginUserData): Promise<IAuthResponse> => {
  return api.post("/auth/login", { ...data });
};

export function useLogin() {
  const queryClient = useQueryClient();
  // Use toast to render auth server error messages
  const { toast } = useToast();

  // Manually update cache instead of invalidating
  const setAuth = useCallback(
    (data: IAuthResponse) => queryClient.setQueryData(["auth"], data),
    [queryClient],
  );

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuth(data);
    },
    onError: (error: AxiosError<any>) => {
      toast({
        variant: "destructive",
        title: error.response?.data.errorType,
        description: error.response?.data.message,
      });
    },
  });
}
