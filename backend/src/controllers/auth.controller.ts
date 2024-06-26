import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import { UserModel } from "../models";
import bcrypt from "bcrypt";
import User from "../models/user.model";

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
      message: "Unauthenticated",
      accessToken: null,
    });
  }

  // verify jwt refresh token, throw exception if token isn't valid
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET!);
    const accessToken = generateAccessToken((<any>decoded).user);

    return res.status(200).send({
      message: "Authenticated",
      accessToken,
    });
  } catch (error: any) {
    console.log(error?.message);
    return res.status(401).send({
      message: "Unauthenticated",
      accessToken: null,
    });
  }
};

export const register = catchAsync(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    return res.status(400).send({
      message: "Email address already registered.",
      accessToken: null,
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const { id } = await UserModel.create({
    firstName,
    lastName,
    email,
    passwordHash,
  });

  if (!id) {
    return res.status(400).send({
      message: "User not created.",
      accessToken: null,
    });
  }

  const accessToken = generateAccessToken(id);
  const refreshToken = generateRefreshToken(id);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
  });

  res.status(200).json({
    accessToken,
    message: "Test user success",
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(401).send({
      message: "No user registered for this email address.",
      accessToken: null,
    });
  }

  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) {
    return res.status(401).send({
      message: "Incorrect password.",
      accessToken: null,
    });
  }

  const { id } = user;

  const accessToken = generateAccessToken(id);
  const refreshToken = generateRefreshToken(id);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
  });

  res.status(200).json({
    accessToken,
    message: "Test user success",
  });
});

// export const token = (req: Request, res: Response) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     res.status(401).send({
//       loggedIn: false,
//       message: "Unauthorized",
//     });
//     return;
//   }

//   if (!authHeader.startsWith("Bearer ")) {
//     res.status(401).send({
//       loggedIn: false,
//       message: "Invalid authorization",
//     });
//     return;
//   }

//   // We grab the token from the header
//   const accessToken = authHeader.split(" ")[1];

//   const accessTokenPayload = jwt.decode(accessToken);
//   console.log(accessTokenPayload);

//   console.log(req.cookies.refreshToken);

//   const refreshToken = generateRefreshToken(testUser);

//   res.cookie("refreshToken", refreshToken, {
//     httpOnly: true,
//     path: "/",
//   });

//   res.status(200).json({
//     accessToken,
//     message: "Test user success",
//     user: testUser.username,
//   });
// };
