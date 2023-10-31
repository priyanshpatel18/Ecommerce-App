import { Router } from "express";
const customerRouter = Router();
import * as customerController from "../controllers/customerController.js";

customerRouter
  .post("/", customerController.createCustomer)
  .get("/:id", customerController.getCustomer)
  .put("/:id", customerController.updateCustomer)
  .delete("/:id", customerController.deleteCustomer);

export default customerRouter;
