import express from "express";
// const { MongoClient } = require("mongodb");
import mongoose from "mongoose";
import router from "./router.js";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const DB_URL =
  process.env.Mongo_Connect_Url ||
  "mongodb+srv://adxamjon0806:Dh0TpjxMxeaQDRVk@cluster0.qel4h5g.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(
//   "mongodb+srv://adxamjon0806:Dh0TpjxMxeaQDRVk@cluster0.qel4h5g.mongodb.net/?retryWrites=true&w=majority"
// );

const app = express();
app.use(express.json());
app.use(cors());
app.use("", router);

const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT} - port`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
