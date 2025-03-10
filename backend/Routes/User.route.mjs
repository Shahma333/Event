import express from "express";


import { deleteUser, getAllUsers, getUserProfile, loginUser, registerUser } from "../Controllers/userController.mjs";
import { adminOnly, protect } from "../Middleware/Auth.mjs";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", protect, getUserProfile);
userRouter.get("/", protect, adminOnly, getAllUsers);
userRouter.delete("/:userId", protect, adminOnly, deleteUser);

export default userRouter;


