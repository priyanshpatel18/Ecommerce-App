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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://shophub-five.vercel.app/",
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
console.log("Connecting to the database...");
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT, () => console.log("Server connected"));
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });