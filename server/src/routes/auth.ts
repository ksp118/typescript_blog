import { generateSalt, hashPassword, verifyPassword } from "@/utils/scrypt";
import { binaryToUuid, generateBinaryUuid } from "@/utils/uuid";

import { Router, Request, Response } from "express";
import { pool } from "@/db";

const router = Router();

import { ApiResponse } from "@/types/api";
import {
  RegisterRequest,
  LoginRequest,
  DBLoginResponse,
  LoginResponse,
  DBSessionResponse,
} from "@/types/auth";

router.post("/register", async (req: Request, res: Response) => {
  const { username, nickname, email, password } =
    req.body as Partial<RegisterRequest>;

  //validity check
  if (!username || !nickname || !email || !password) {
    return res.status(400).json({
      success: false,
      error: "enter all fields.",
    } satisfies ApiResponse<null>);
  }

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  //register
  try {
    //insert into users table
    const userId = generateBinaryUuid();
    const salt = generateSalt();
    const hashed = await hashPassword(password, salt);

    await conn.query(
      `insert into users (id, username, nickname, email) values (?, ?, ?, ?)`,
      [userId, username, nickname, email]
    );

    //insert into auth_local table
    await conn.query(
      `insert into auth_local (user_id, hashed_password, salt) values (?, ?, ?)`,
      [userId, hashed, salt]
    );

    await conn.commit();
    await conn.release();

    return res.json({ success: true, data: null } satisfies ApiResponse<null>);
  } catch (err: any) {
    await conn.rollback();
    conn.release();

    console.log(err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        error: "username or email already used.",
      } satisfies ApiResponse<null>);
    }

    return res
      .status(500)
      .json({ success: false, error: "DB Error" } satisfies ApiResponse<null>);
  }
});

import { User, UserRole } from "@/types/user";
import { DBUserRow } from "@/types/DBUserRow";

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body as Partial<LoginRequest>;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: "username and password required.",
    } satisfies ApiResponse<null>);
  }

  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.query<DBLoginResponse[]>(
      `
        select u.id, u.nickname, u.role, a.hashed_password, a.salt
        from users u
        join auth_local a on u.id = a.user_id
        where u.username = ?
        `,
      [username]
    );

    const user = rows[0];

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "invalid credentials",
      } satisfies ApiResponse<null>);
    }

    const isValid = await verifyPassword(
      password,
      user.salt,
      user.hashed_password
    );
    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: "invalid credentials",
      } satisfies ApiResponse<null>);
    }

    const sessionId = generateBinaryUuid();
    const SESSION_TTL = 1000 * 60 * 60 * 3; //3 hours
    const expiresAt = new Date(Date.now() + SESSION_TTL);

    //delete prev session if exist
    await conn.query(`delete from sessions where user_id = ?`, [user.id]);

    //create enw session
    await conn.query(
      `insert into sessions (session_id, user_id, expires_at) values (?, ?, ?)`,
      [sessionId, user.id, expiresAt]
    );

    //set cookie
    res.cookie("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: expiresAt,
    });

    const response: LoginResponse = {
      id: binaryToUuid(user.id),
      nickname: user.nickname,
      role: user.role as UserRole,
    };

    conn.commit();

    return res.json({
      success: true,
      data: response,
    } satisfies ApiResponse<LoginResponse>);
  } catch (err) {
    conn.rollback();
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "DB Error" } satisfies ApiResponse<null>);
  } finally {
    conn.release();
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  const sessionIdRaw = req.cookies?.session_id;

  if (!sessionIdRaw) {
    return res.status(200).json({
      success: true,
      data: null,
    } satisfies ApiResponse<null>);
  }

  const sessionId = Buffer.isBuffer(sessionIdRaw)
    ? sessionIdRaw
    : Buffer.from(sessionIdRaw);

  try {
    await pool.query(`DELETE FROM sessions WHERE session_id = ?`, [sessionId]);

    res.clearCookie("session_id", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({
      success: true,
      data: null,
    } satisfies ApiResponse<null>);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "DB error",
    } satisfies ApiResponse<null>);
  }
});

router.get("/status", async (req: Request, res: Response) => {
  const sessionIdRaw = req.cookies?.session_id;

  if (!sessionIdRaw) {
    return res.json({
      success: false,
      error: "not logged in",
    } satisfies ApiResponse<null>);
  }

  const sessionId = Buffer.isBuffer(sessionIdRaw)
    ? sessionIdRaw
    : Buffer.from(sessionIdRaw);

  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.query<DBSessionResponse[]>(
      `
      SELECT u.id, u.nickname, u.role, s.expires_at
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.session_id = ?
      `,
      [sessionId]
    );

    const session = rows[0];

    if (!session || session.expires_at < new Date()) {
      return res.json({
        success: false,
        error: "session expired or invalid",
      } satisfies ApiResponse<null>);
    }

    const response: LoginResponse = {
      id: binaryToUuid(session.id),
      nickname: session.nickname,
      role: session.role as LoginResponse["role"],
    };

    return res.json({
      success: true,
      data: response,
    } satisfies ApiResponse<LoginResponse>);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "DB error",
    } satisfies ApiResponse<null>);
  } finally {
    conn.release();
  }
});

export default router;
