import dotenv from 'dotenv';
dotenv.config({quiet: true});

import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const start = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required");

  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error)
    throw new Error("database error");
  }

  app.listen(8080, () => console.log("Server is up and running on port 8080"));
};

start()