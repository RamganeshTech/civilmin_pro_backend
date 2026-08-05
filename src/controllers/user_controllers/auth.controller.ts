import { type Request, type Response, type NextFunction } from "express";
import * as authService from "./auth.service.js";
import type { RoleBasedRequest } from "../../utils/utils.js";

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, email, password, role, organizationId } = req.body;

        if (!name || !email || !password || !role) {
            res.status(400).json({ ok: false, message: "All fields required" });
            return;
        }

        if(!organizationId){
             res.status(400).json({ ok: false, message: "organizationId field is required" });
            return;
        }

        const { user, token } = await authService.registerUser(name, email, password, role, organizationId);

        res.status(201).json({ ok: true, token, data: user });
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ ok: false, message: "Email and password required" });
            return;
        }

        const { user, token } = await authService.loginUser(email, password);

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            // sameSite: "lax",
            sameSite: process.env.NODE_ENV === "production" ? ("none" as const) : ("lax" as const),
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        // res.cookie(specificRefreshKey, refreshToken, { ...cookieOptions, maxAge: 1000 * 60 * 60 * 24 * 7 });


        res.status(200).json({ ok: true, token, data: user });
    } catch (error) {
        next(error);
    }
};

export const getMe = async (
    req: RoleBasedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        res.status(200).json({ ok: true, data: req.user });
    } catch (error) {
        next(error);
    }
};



export const logout = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res
            .clearCookie("accessToken")
            .status(200)
            .json({
                ok: true,
                message: "Logged out successfully",
            });
    } catch (error) {
        next(error);
    }

};