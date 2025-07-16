import { RowDataPacket } from "mysql2";
import { UserRole } from "@/types/user";

export interface DBUserRow extends RowDataPacket {
  id: Buffer; // BINARY(16)
  username: string;
  nickname: string;
  email: string | null;
  email_verified: boolean;
  role: UserRole;
  status: "active" | "dormant" | "suspended" | "deleted";
  created_at: Date;
  last_login_at: Date | null;
  dormant_at: Date | null;
}
