import dotenv from "dotenv";

dotenv.config();

export const environment = process.env.NODE_ENV as string;

export const port = process.env.PORT as string;

export const clientURL = process.env.CLIENT_URL as string;

export const dbURL = process.env.DB_URL as string;

export const cookieSecret = process.env.COOKIE_SECRET as string;

export const tokenInfo = {
  issuer: process.env.TOKEN_ISSUER as string,
  audience: process.env.TOKEN_AUDIENCE as string,
  accessKey: process.env.ACCESS_JWT_SECRET as string,
  refreshKey: process.env.REFRESH_JWT_SECRET as string,
};
