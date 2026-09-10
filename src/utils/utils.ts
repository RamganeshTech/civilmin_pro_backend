export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};


import { type Request } from "express";
import type { IRole } from "../models/user_models/user.model.js";

// export interface RoleBasedRequest extends Request {

//   user?: {
//     userId: string;
//     organizationId: string;
//     role: IRole;
//     userName: string;
//   };
// }

export interface RoleBasedRequest extends Request {
  params: Record<string, string>;
  query: Record<string, string | undefined>;

  user?: {
    userId: string;
    organizationId: string;
    role: IRole;
    userName: string;
  };
}