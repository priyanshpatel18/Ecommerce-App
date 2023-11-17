import { Router } from "express";
const productRouter = Router();
import * as productController from "../controllers/productController.js";

productRouter
  .post("/", productController.createProduct)
  .get("/", productController.getProducts)
  .get("/:productId", productController.getOneProduct)
  .put("/:productId", productController.updateProduct)
  .delete("/:productId", productController.deleteProduct);

export default productRouter;
