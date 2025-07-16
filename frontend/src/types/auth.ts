export type UserRole = "reader" | "responder" | "writer" | "admin" | "banned";

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
