import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const envFile =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
dotenv.config({ path: path.resolve(__dirname, "..", envFile) });

const app = express();
const PORT = process.env.PORT || 3000;

const corsOrigin = process.env.CORS_ORIGIN || "";

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

app.use(express.json());

import postsRouter from "./routes/posts";
app.use("/api/posts", postsRouter);

//404?

app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
