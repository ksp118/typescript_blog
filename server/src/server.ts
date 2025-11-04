import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { createRequire } from "module";

import postsRouter from "@/routes/posts";
import authRouter from "@/routes/auth";

dotenv.config();

const envFile =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
dotenv.config({ path: path.resolve(__dirname, "..", envFile) });

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  const app = express();

  const isProduction = process.env.NODE_ENV === "production";
  const distPath = path.resolve(__dirname, "..", "..", "frontend", "dist");

  if (isProduction) {
    app.set("trust proxy", 1); // 🔐 secure cookies 허용 (e.g. Heroku, nginx behind)
    app.use(express.static(distPath));
  } else {
    try {
      const frontendRequire = createRequire(
        path.resolve(__dirname, "..", "..", "frontend", "package.json")
      );
      const viteEntry = frontendRequire.resolve("vite");
      const { createServer: createViteServer } = await import(viteEntry);
      const vite = await createViteServer({
        root: path.resolve(__dirname, "..", "..", "frontend"),
        server: {
          middlewareMode: true,
        },
        appType: "custom",
      });
      app.use(vite.middlewares);
    } catch (error) {
      console.error(
        "Failed to start Vite in middleware mode. Make sure frontend dependencies are installed.",
        error
      );
      throw error;
    }
  }

  app.use(express.json());
  app.use(cookieParser());

  const corsOrigin = process.env.CORS_ORIGIN;

  app.use(
    cors({
      origin: corsOrigin || undefined,
      credentials: true,
    })
  );

  app.use("/api/posts", postsRouter);

  app.use("/api/auth", authRouter);

  if (isProduction) {
    const indexHtmlPath = path.join(distPath, "index.html");
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) {
        return next();
      }
      res.sendFile(indexHtmlPath);
    });
  }

  app.listen(PORT, () => {
    console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
