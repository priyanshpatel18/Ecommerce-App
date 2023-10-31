import { Router } from "express";
const vendorRouter = Router();
import * as vendorController from "../controllers/vendorController.js";

vendorRouter
  .post("/", vendorController.createVendor)
  .get("/:id", vendorController.getVendorById)
  .get("/", vendorController.getAllVendors)
  .put("/:id", vendorController.updateVendor)
  .delete("/:id", vendorController.deleteVendor);

export default vendorRouter;
