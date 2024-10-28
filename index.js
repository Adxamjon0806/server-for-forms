import express from "express";
import router from "./router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/error-middleware.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://adkham-forms.vercel.app",
  })
);
app.use("", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT} - port`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
