/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useExperiment } from "@/features/experiments/api/useExperiment";
import { IExperiment } from "@/types/api.types";
import { useLocation } from "react-router-dom";

export const ExperimentPage = () => {
  const { state: experiment }: { state: IExperiment } = useLocation();
  const { data } = useExperiment(experiment.id);

  return (
    <div className="h-full">
      {experiment.name}
      <div className="h-full py-4">{data?.experiment.name}</div>
    </div>
  );
};
