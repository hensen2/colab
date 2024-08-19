import { Request, Response } from "express";
import { createNewProtocol, getWorkspaceProtocols } from "./";
import catchAsync from "../../utils/catchAsync";
import { StatusCode, StatusType } from "../../types/response.types";
import { NotFoundError } from "../../lib/appError";
import { Doc, encodeStateAsUpdate } from "yjs";

function createInitialProtocolDoc() {
  const ydoc = new Doc();
  return Buffer.from(encodeStateAsUpdate(ydoc));
}

export const getProtocols = catchAsync(async (_req: Request, res: Response) => {
  const protocols = await getWorkspaceProtocols(res.locals.workspaceId);

  if (!protocols) {
    throw new NotFoundError("Protocols not found");
  }

  return res.status(StatusCode.SUCCESS).json({
    type: StatusType.SUCCESS,
    message: "Retrieved all protocols",
    protocols,
  });
});

export const createProtocol = catchAsync(
  async (req: Request, res: Response) => {
    const { user, workspaceId } = res.locals;

    const state = createInitialProtocolDoc();

    const protocol = await createNewProtocol({
      ...req.body,
      workspaceId,
      createdBy: user.email,
      state,
    });

    if (!protocol) {
      throw new NotFoundError("Protocol not created");
    }

    return res.status(StatusCode.SUCCESS).json({
      type: StatusType.SUCCESS,
      message: "New protocol created",
      protocol,
    });
  },
);
