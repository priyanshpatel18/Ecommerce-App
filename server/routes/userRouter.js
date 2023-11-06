import { Router } from "express";
const userRouter = Router();
import * as userController from "../controllers/userController.js";

userRouter
  .post("/signup", userController.SignUp)
  .post("/login", userController.Login);

export default userRouter;
