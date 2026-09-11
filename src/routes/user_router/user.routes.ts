import { Router } from "express";
import { register, login, getMe, logout, resetPassword } from "../../controllers/user_controllers/auth.controller.js";
import { multiAuthRole } from "../../middleware/auth.middleware.js";
import { forgotPassword, getAllUsers } from "../../controllers/user_controllers/auth.controller.js";

const userRoutes = Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/reset-password/:userId/:token", resetPassword);

/* ----------------- Protected Routes ------------------- */
// Authenticated user session
userRoutes.get("/me", multiAuthRole(), getMe);
userRoutes.post("/logout", multiAuthRole(), logout);

// User listing scoped to the organization (e.g. for assigning Site Engineers)
userRoutes.get(
  "/",
  multiAuthRole("owner", "admin", "cto", "staff"),
  getAllUsers
);

export default userRoutes;