/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { api } from "@/lib/api";
import { IAuthResponse, IRegisterUserData } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useToast } from "@/hooks/useToast";
import type { AxiosError } from "axios";

export const registerUser = (
  data: IRegisterUserData,
): Promise<IAuthResponse> => {
  return api.post("/auth/register", { ...data });
};

export function useRegister() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const setToken = useCallback(
    (data: IAuthResponse) => queryClient.setQueryData(["auth"], data),
    [queryClient],
  );

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setToken(data);
    },
    onError: (error: AxiosError<any>) => {
      console.log(error.response?.data.errorType);

      toast({
        variant: "destructive",
        title: error.response?.data.errorType,
        description: error.response?.data.message,
      });
    },
  });
}
