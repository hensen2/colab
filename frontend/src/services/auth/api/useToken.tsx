import { api } from "@/lib/api";
import { AuthResponse } from "@/types/api-types";
import { useQuery } from "@tanstack/react-query";

export const getToken = (): Promise<AuthResponse> => {
  return api.get("/auth");
};

export function useToken() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: getToken,
    initialData: { accessToken: null, message: null },
  });
}
