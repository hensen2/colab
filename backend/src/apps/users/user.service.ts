import { UserModel } from "./user.model";
import { CreateUserData } from "./user.types";

export const getUserById = async (id: string) => {
  return await UserModel.findById(id);
};

export const getUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

export const createUser = async (data: CreateUserData) => {
  return await UserModel.create(data);
};
