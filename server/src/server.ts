import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
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
