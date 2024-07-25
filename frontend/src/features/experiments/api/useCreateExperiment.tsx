import { api } from "@/lib/api";
import { ICreateExperimentData, IExperimentsResponse } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const createExperiment = (
  data: ICreateExperimentData,
): Promise<IExperimentsResponse> => {
  return api.post("/api/experiments", { ...data });
};

export function useCreateExperiment() {
  const queryClient = useQueryClient();

  const setExperiments = useCallback(
    (data: IExperimentsResponse) =>
      queryClient.setQueryData(["experiments"], data),
    [queryClient],
  );

  return useMutation({
    mutationFn: createExperiment,
    onSuccess: (data) => {
      setExperiments(data);
    },
  });
}
