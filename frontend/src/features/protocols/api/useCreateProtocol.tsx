import { api } from "@/lib/api";
import { ICreateProtocolData, IProtocolsResponse } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createProtocol = (
  data: ICreateProtocolData,
): Promise<IProtocolsResponse> => {
  return api.post("/protocols", { ...data });
};

export function useCreateProtocol() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProtocol,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["protocols"] });
    },
  });
}
