import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export const getUser = (): Promise<IAuthResponse> => {
  return api.get("/auth");
};

export interface IUseUser {
  user: IUser | null;
}

export function useUser(): IUseUser {
  const { data } = useQuery({ queryKey: ["user"], queryFn: getUser });

  const user = data?.user;
  localStorage.setItem("accessToken", JSON.stringify(data?.accessToken));

  return {
    user: user ?? null,
  };
}
