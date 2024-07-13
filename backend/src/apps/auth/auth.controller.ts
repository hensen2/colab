import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../lib/tokens";
import { AuthFailureError, BadTokenError } from "../../lib/appError";
import { createUser, getUserByEmail, getUserById } from "../users";
import { AuthSuccessResponse } from "../../lib/appResponse";

export const getToken = catchAsync(async (req: Request, res: Response) => {
  const payload = verifyRefreshToken(req.cookies.refreshToken);
  const user = await getUserById(payload.sub!);

  if (!user) {
    res.clearCookie("refreshToken");
    throw new BadTokenError();
  }

  const accessToken = generateAccessToken(payload.sub!);
  const userData = {
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
  };

  return new AuthSuccessResponse(res, accessToken, userData).send();
});

export const register = catchAsync(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const isUser = await getUserByEmail(email);

  if (isUser) {
    throw new AuthFailureError("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser({
    firstName,
    lastName,
    email,
    passwordHash,
  });

  if (!user) {
    throw new AuthFailureError("User not created");
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
  });

  const userData = {
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
  };

  return new AuthSuccessResponse(
    res,
    accessToken,
    userData,
    "user registered",
  ).send();
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    throw new AuthFailureError();
  }

  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) {
    throw new AuthFailureError("Incorrect password");
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
  });

  const userData = {
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
  };

  return new AuthSuccessResponse(res, accessToken, userData).send();
});

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  return new AuthSuccessResponse(res, null, null, "logout success").send();
};

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
