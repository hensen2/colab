/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Editor from "@/features/editor/components/Editor";
import { IExperiment } from "@/types/api.types";
import { useLocation } from "react-router-dom";

export const ExperimentPage = () => {
  const { state: experiment }: { state: IExperiment } = useLocation();

  return (
    <div className="h-full">
      {experiment.name}
      <div className="h-full py-4">
        <Editor />
      </div>
    </div>
  );
};
