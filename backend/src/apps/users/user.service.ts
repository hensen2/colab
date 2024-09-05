import { ClientSession } from "mongoose";
import { User } from "./user.model";
import { IUser } from "./user.types";

/** Find unique user with primary id. */
export const getUserById = async (id: string) => {
  return await User.findById(id);
};

/** Find unique user with indexed email. */
export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

/** Find unique user with indexed primary id and email. */
export const getUserByIdAndEmail = async (_id: string, email: string) => {
  return await User.findOne({ _id, email }).populate("workspaces");
};

/** Creates a new user within an active transaction session. */
export const createUser = async (
  data: IUser,
  { session }: { session: ClientSession },
) => {
  return await User.create([data], { session });
};

export const addNewUserWorkspace = async (_id: string, workspaceId: string) => {
  return await User.updateOne({ _id }, { $push: { workspaces: workspaceId } });
};
