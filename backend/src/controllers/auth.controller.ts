import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";

type User = {
  username: string;
  password: string;
};

const testUser = {
  username: "matthew.hensen92@gmail.com",
  password: "password",
};

export const generateAccessToken = (user: User) => {
  return jwt.sign({ user }, process.env.ACCESS_JWT_SECRET!, {
    expiresIn: "1m",
  });
};

export const generateRefreshToken = (user: User) => {
  return jwt.sign({ user }, process.env.REFRESH_JWT_SECRET!, {
    expiresIn: "1d",
  });
};

export const getToken = (req: Request, res: Response) => {
  const refreshToken: string = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).send({
      message: "Unauthorized",
      accessToken: null,
      user: null,
    });
  }

  // verify jwt refresh token, throw exception if token isn't valid
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET!);
    const accessToken = generateAccessToken((<any>decoded).user);

    return res.status(200).send({
      message: "Successful token refresh",
      accessToken,
      user: (<any>decoded).user.username,
    });
  } catch (error: any) {
    console.log(error?.message);
    return res.status(401).send({
      message: "Invalid refresh token",
      accessToken: null,
      user: null,
    });
  }
};

export const register = catchAsync(async (req: Request, res: Response) => {});

export const token = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send({
      loggedIn: false,
      message: "Unauthorized",
    });
    return;
  }

  if (!authHeader.startsWith("Bearer ")) {
    res.status(401).send({
      loggedIn: false,
      message: "Invalid authorization",
    });
    return;
  }

  // We grab the token from the header
  const accessToken = authHeader.split(" ")[1];

  const accessTokenPayload = jwt.decode(accessToken);
  console.log(accessTokenPayload);

  console.log(req.cookies.refreshToken);

  const refreshToken = generateRefreshToken(testUser);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
  });

  res.status(200).json({
    accessToken,
    message: "Test user success",
    user: testUser.username,
  });
};
