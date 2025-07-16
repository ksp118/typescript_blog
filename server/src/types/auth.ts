export interface RegisterRequest {
  username: string;
  nickname: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  nickname: string;
  role: UserRole;
}

import { RowDataPacket } from "mysql2";
import { UserRole } from "./user";

export interface DBLoginResponse extends RowDataPacket {
  id: Buffer;
  nickname: string;
  role: string;
  hashed_password: string;
  salt: string;
}

export interface DBSessionResponse extends RowDataPacket {
  id: Buffer;
  nickname: string;
  role: string;
  expires_at: Date;
}
