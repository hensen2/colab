import { Document, IDocument } from "./";
import { Doc, encodeStateAsUpdate } from "yjs";

export const createInitialYDoc = () => {
  const ydoc = new Doc();
  return Buffer.from(encodeStateAsUpdate(ydoc));
};

export const createNewDocument = async (data: IDocument | IDocument[]) => {
  return await Document.create(data);
};

export const getDocumentWithIds = async (workspaceId: string, name: string) => {
  return await Document.findOne({ workspaceId, name });
};

export const updateDocumentState = async (
  workspaceId: string,
  name: string,
  state: Buffer,
) => {
  return await Document.updateOne({ workspaceId, name }, { state });
};
