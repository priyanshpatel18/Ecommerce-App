import express from "express";
import mongoose from "mongoose";
const app = express();
import { DB_URL, PORT } from "./config.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import vendorRouter from "./routes/vendorRouter.js";
import cors from "cors";

// Authentication
import cookieParser from "cookie-parser";

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["POST", "GET"],
  })
);
app.use(cookieParser());

// Routes
app.use("/products", productRouter);
app.use("/user", userRouter);
app.use("/vendor", vendorRouter);

// Connection
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DataBase Connected");
    app.listen(PORT, () => console.log("Server Connected"));
  })
  .catch((err) => console.error(err));
