import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

/**
 * Auth: tài khoản trong DB (AdminUser), mật khẩu băm bcrypt, phiên = cookie ký HMAC chứa userId.
 * (Bước sau có thể nâng lên Auth.js + Argon2 + RBAC đầy đủ theo DE-09 / 09-Security.)
 */
export const SESSION_COOKIE = "cb_admin";
const SECRET = process.env.AUTH_SECRET ?? "dev-secret";
const MAX_AGE = 60 * 60 * 8; // 8 giờ
export const MAX_FAILED = 5;

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}
export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

function sign(value: string): string {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export function createToken(userId: string): string {
  const exp = String(Date.now() + MAX_AGE * 1000);
  const base = `${userId}.${exp}`;
  return `${base}.${sign(base)}`;
}

function parseToken(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [userId, exp, sig] = parts;
  if (sign(`${userId}.${exp}`) !== sig) return null;
  if (Number(exp) < Date.now()) return null;
  return userId;
}

export async function getCurrentUser() {
  const store = await cookies();
  const uid = parseToken(store.get(SESSION_COOKIE)?.value);
  if (!uid) return null;
  const user = await prisma.adminUser.findUnique({ where: { id: uid } });
  if (!user || user.status !== "active") return null;
  return user;
}

export async function isAuthenticated(): Promise<boolean> {
  return !!(await getCurrentUser());
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE,
};
