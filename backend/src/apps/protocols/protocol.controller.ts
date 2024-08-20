import { Request, Response } from "express";
import { createNewProtocol, getWorkspaceProtocols } from "./";
import catchAsync from "../../utils/catchAsync";
import { StatusCode, StatusType } from "../../types/response.types";
import { NotFoundError } from "../../lib/appError";
import { createInitialYDoc, createNewDocument } from "../documents";
import { Types } from "mongoose";

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

    const protocol = await createNewProtocol({
      ...req.body,
      isProjectMember: req.body.projectId ? true : false,
      workspaceId,
      createdBy: user.email,
      document: new Types.ObjectId(),
    });

    if (!protocol) {
      throw new NotFoundError("Protocol not created");
    }

    const newDocData = {
      _id: protocol.document,
      name: `protocol.${protocol.id}`,
      createdBy: user.email,
      workspaceId,
      state: createInitialYDoc(),
    };

    const document = await createNewDocument(newDocData);

    if (!document) {
      throw new NotFoundError("Document not created");
    }

    return res.status(StatusCode.SUCCESS).json({
      type: StatusType.SUCCESS,
      message: "New protocol created",
      protocol,
    });
  },
);
