import jwt from "jsonwebtoken";
// import UserModel, { type IUser } from "../models/user.model.js";
// import { ApiError } from "../utils/apiError.js";
import {Types} from "mongoose"
import bcrypt from "bcryptjs";
import type { IUser } from "../../models/user_models/user.model.js";
import UserModel from "../../models/user_models/user.model.js";
import { ApiError } from "../../utils/apiError.js";

const SALT_ROUNDS = 12;

export const hashPassword = async (
    password: string
): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> => {
    return bcrypt.compare(plainPassword, hashedPassword);
};

export const generateToken = ({ userId, userName, email, role, organizationId }: { userId: string, userName: string, email: string, role: string, organizationId:string }): string => {
    const secret = process.env.JWT_SECRET!;
    return jwt.sign({ userId: userId, userName, email, role, organizationId }, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    } as jwt.SignOptions);
};

export const registerUser = async (
    name: string,
    email: string,
    password: string,
    role: string,
    organizationId: Types.ObjectId
): Promise<{ user: IUser; token: string }> => {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "Email already registered");
    }

    const hashedPassword = await hashPassword(password);


    const user = await UserModel.create({ userName: name, email, password: hashedPassword, organizationId });
    const token = generateToken({ userId: user._id.toString(), email, role, userName: name, organizationId: user.organizationId.toString() });

    return { user, token };
};

export const loginUser = async (
    email: string,
    password: string
): Promise<{ user: IUser; token: string }> => {
    // Explicitly select password since it's excluded by default
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    if (!user.isActive) {
        throw new ApiError(403, "Account is deactivated");
    }

    //   const isPasswordValid = await user.comparePassword(password);
    const isPasswordValid = await comparePassword(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    //   const token = generateToken(user._id.toString());
    const token = generateToken({ userId: user._id.toString(), email, role: user.role, userName: user.userName , organizationId: user.organizationId.toString()});

    return { user, token };
};