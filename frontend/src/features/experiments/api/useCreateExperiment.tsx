import { api } from "@/lib/api";
import { ICreateExperimentData, IExperimentsResponse } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createExperiment = (
  data: ICreateExperimentData,
): Promise<IExperimentsResponse> => {
  return api.post("/api/experiments", { ...data });
};

export function useCreateExperiment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExperiment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["experiments"] });
    },
  });
}
