import { RowDataPacket } from "mysql2";

export interface Post extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  created_at: string;
  slug: string;
}
