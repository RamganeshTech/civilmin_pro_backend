import { Router } from "express";
import { register, login, getMe, logout } from "../../controllers/user_controllers/auth.controller.js";
import { multiAuthRole } from "../../middleware/auth.middleware.js";

const userRoutes = Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.get("/me", multiAuthRole(), getMe);   // protected route — test your JWT here
userRoutes.post("/logout", multiAuthRole(), logout);

export default userRoutes;