import { Router, Request, Response } from "express";
import { pool } from "@/db";

import { Post } from "@/types/post";
import { ApiResponse } from "@/types/api";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<Post[]>(
      "select * from posts order by created_at DESC"
    );

    const data: ApiResponse<Post[]> = { success: true, data: rows };
    res.json(data);
  } catch (err) {
    console.error(err);
    const errRes: ApiResponse<null> = { success: false, error: "DB Error" };
    res.status(500).json(errRes);
  }
});

router.get("/:slug", async (req: Request<{ slug: string }>, res: Response) => {
  const { slug } = req.params;
  try {
    const [rows] = await pool.query<Post[]>(
      "select * from posts where slug=?",
      [slug]
    );
    if (rows.length === 0) {
      const err: ApiResponse<null> = {
        success: false,
        error: "no such post",
      };
      return res.status(404).json(err);
    }

    const response: ApiResponse<Post> = { success: true, data: rows[0] };
    res.json(response);
  } catch (err) {
    console.error(err);
    const errRes: ApiResponse<null> = { success: false, error: "DB Error" };
    res.status(500).json(errRes);
  }
});

export default router;
