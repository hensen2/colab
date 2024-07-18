import { ClientSession } from "mongoose";
import { User } from "./user.model";
import { IUser } from "./user.types";

export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const createUser = async (
  data: IUser,
  { session }: { session: ClientSession },
) => {
  return await User.create([data], { session });
};
