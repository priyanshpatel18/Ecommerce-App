import express from "express";
import mongoose from "mongoose";
const app = express();
import { DB_URL, PORT } from "./config.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/customerRouter.js";
import vendorRouter from "./routes/vendorRouter.js";

// MiddleWares
app.use(express.json());
app.use(express.urlencoded());

// Routes
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/vendors", vendorRouter);

// Connection
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DataBase Connected");
    app.listen(PORT, () => console.log("Server Connected"));
  })
  .catch((err) => console.error(err));
