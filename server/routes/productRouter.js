import { Router } from "express";
const productRouter = Router();
import * as productController from "../controllers/productController.js";

productRouter
  .post("/", productController.createProduct)
  .get("/", productController.getProducts)
  .get("/:id", productController.getOneProduct)
  .put("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

export default productRouter;
