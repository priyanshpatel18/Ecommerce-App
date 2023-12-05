import express from "express";
import mongoose from "mongoose";
const app = express();
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import vendorRouter from "./routes/vendorRouter.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// Authentication
import cookieParser from "cookie-parser";

// MiddleWares
app.use(
  cors({
    origin: "https://shop-hub-lovat.vercel.app",
    credentials: true,
    methods: ["POST", "GET"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/products", productRouter);
app.use("/user", userRouter);
app.use("/vendor", vendorRouter);

// Connection
console.log(process.env.DB_URL, process.env.PORT);
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DataBase Connected");
    app.listen(process.env.PORT, () => console.log("Server Connected"));
  })
  .catch((err) => console.error(err));
