import { IDocument } from "../documents";
import { Protocol, IProtocol } from "./";

export const createNewProtocol = async (data: IProtocol) => {
  return await Protocol.create(data);
};

export const getWorkspaceProtocols = async (workspaceId: string) => {
  return await Protocol.find({ workspaceId });
};

export const getProtocolWithIds = async (_id: string, workspaceId: string) => {
  return await Protocol.findOne({ _id, workspaceId }).populate<{
    document: IDocument;
  }>("document");
};

export const updateProtocolState = async (
  _id: string,
  workspaceId: string,
  state: Buffer,
) => {
  return await Protocol.updateOne({ _id, workspaceId }, { state });
};
