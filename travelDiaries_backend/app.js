import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routing/user_routes";
import postRouter from "./routing/post_routes";
import cors from "cors";

const app = express();
dotenv.config();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/posts", postRouter);
//connections

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.9gd8eeg.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(5000, () =>
      console.log(
        "connection is successful and Listening to localhost port 5000"
      )
    )
  )
  .catch((err) => console.log(err));
