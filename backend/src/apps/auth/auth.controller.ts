import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../lib/tokens";
import { AppError } from "../../lib/appError";
import { createUser, getUserByEmail, getUserById } from "../users";
import { AuthSuccessResponse } from "../../lib/appResponse";

export const getToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;

    try {
      const payload = verifyRefreshToken(refreshToken);

      const user = await getUserById(payload.sub!);

      if (!user) {
        res.clearCookie("refreshToken");
        return next(new AppError("Failure", 401, "Invalid refresh token"));
      }

      const accessToken = generateAccessToken(payload.sub!);

      return new AuthSuccessResponse(res, accessToken, "authenticated").send();
    } catch (error: any) {
      next(new AppError("Failure", 401, "Unauthenticated"));
    }
  },
);

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;

    const user = await getUserByEmail(email);

    if (user) {
      return next(new AppError("Failure", 401, "Email already registered"));
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const { id } = await createUser({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    if (!id) {
      return next(new AppError("Failure", 400, "User not created"));
    }

    const accessToken = generateAccessToken(id);
    const refreshToken = generateRefreshToken(id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
    });

    return new AuthSuccessResponse(res, accessToken, "user created").send();
  },
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return next(
        new AppError(
          "Failure",
          401,
          "No user registered for this email address",
        ),
      );
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      return next(new AppError("Failure", 401, "Incorrect password"));
    }

    try {
      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
      });

      return new AuthSuccessResponse(res, accessToken, "authenticated").send();
    } catch (error: any) {
      next(new AppError("Failure", 401, "User authentication failed"));
    }
  },
);

export const logout = (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("refreshToken");

    return new AuthSuccessResponse(res, null, "logout success").send();
  } catch (error: any) {
    next(new AppError("Failure", 401, "User logout failed"));
  }
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
