import { DBUserRow } from "@/types/DBUserRow";

export interface User {
  id: string; // UUID as string (converted from BINARY(16))
  username: string;
  nickname: string;
  role: UserRole;
  status: DBUserRow["status"];
}

export type UserRole = "reader" | "responder" | "writer" | "admin" | "banned";
