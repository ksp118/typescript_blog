import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();

const envFile =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
dotenv.config({ path: path.resolve(__dirname, "..", envFile) });

const app = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // 🔐 secure cookies 허용 (e.g. Heroku, nginx behind)
}

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

const corsOrigin = process.env.CORS_ORIGIN || "";

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

app.use(express.json());

import postsRouter from "@/routes/posts";
app.use("/api/posts", postsRouter);

import authRouter from "@/routes/auth";
app.use("/api/auth", authRouter);

//404?

app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
