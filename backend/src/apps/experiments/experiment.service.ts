import { Experiment, IExperiment } from "./";

export const createNewExperiment = async (data: IExperiment) => {
  return await Experiment.create(data);
};

export const getWorkspaceExperiments = async (workspaceId: string) => {
  return await Experiment.find({ workspaceId });
};

export const getExperimentWithIds = async (
  _id: string,
  workspaceId: string,
) => {
  return await Experiment.findOne({ _id, workspaceId });
};
