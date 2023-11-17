import { Router } from "express";
const userRouter = Router();
import * as userController from "../controllers/userController.js";

userRouter
  .post("/signup", userController.SignUp)
  .post("/login", userController.Login)
  .post("/addToCart/:productId", userController.AddToCart)
  .get("/cart", userController.getCartItems);

export default userRouter;
