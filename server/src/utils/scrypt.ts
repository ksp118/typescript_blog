import { scrypt as _scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

const KEY_LENGTH = 64;

export async function hashPassword(
  password: string,
  salt: string
): Promise<string> {
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  return derivedKey.toString("hex");
}

export function generateSalt(length: number = 16): string {
  return randomBytes(length).toString("hex");
}

export async function verifyPassword(
  password: string,
  salt: string,
  hashed: string
): Promise<boolean> {
  const hashedAttempt = await hashPassword(password, salt);
  return hashedAttempt === hashed;
}
