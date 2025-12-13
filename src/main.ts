import dotenv from "dotenv";
dotenv.config({ quiet: true });

import express from "express";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import {
  newPostRouter,
  deletePostsRouter,
  updatePostRouter,
  showPostsRouter,

  newCommentRouter,
  deleteCommentRouter,

  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter
  
} from "./routers";
import cors from 'cors';
import cookieSession from "cookie-session";
import { currentUser, requireAuth } from "../common";

const app = express();

app.use(cors({
  origin: "*",
  optionsSuccessStatus: 200
}))

app.set('trust proxy', true);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: false
}))

app.use(currentUser)

app.use(signupRouter)
app.use(signinRouter)
app.use(currentUserRouter)
app.use(signoutRouter)


app.use(requireAuth, newPostRouter);
app.use(requireAuth, deletePostsRouter);
app.use(requireAuth, updatePostRouter);
app.use(showPostsRouter);

app.use(requireAuth, deleteCommentRouter);
app.use(requireAuth, newCommentRouter);

app.use((req, res, next) => {
  const error = new Error('not found') as customError;
  error.status = 404;
  next(error)
})

declare global {
  interface customError extends Error {
    status?: number;
  }
}

// error handler middleware (defined by error param)
app.use(
  (error: customError, req: Request, res: Response, next: NextFunction) => {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }

    res.status(500).json({ message: "Somenthing went wrong" });
  }
);

const start = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required");

  if (!process.env.JWT_KEY) throw new Error("JWT_KEY is required");

  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
    throw new Error("database error");
  }

  app.listen(8080, () => console.log("Server is up and running on port 8080"));
};

start();
