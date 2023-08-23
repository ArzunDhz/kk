// in app we use all the middlewares and  routes for the application

import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/userRoutes.js";
import ConnectionRouter from "./routes/connectionRoutes.js";
import { errorMiddleware } from "./middleware/Error.js";
import cors from "cors";
export const app = express();

config({
  path: "./config/config.env",
});

app.use(
  cors({
    origin: ["https://main--starlit-mochi-d0dbf9.netlify.app","http://localhost:5173","https://chatfront-z.vercel.app"],
    credentials: true,
    methods: "*",
  })
);

app.use(express.json());
app.use(express.Router());
app.use(cookieParser());

app.use("/user", UserRouter);
app.use("/", ConnectionRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.json("ok");
});
