import { Router } from "express";
const customerRouter = Router();
import * as customerController from "../controllers/customerController.js";

customerRouter
  .post("/signup", customerController.SignUp)
  .post("/login", customerController.Login);

export default customerRouter;
