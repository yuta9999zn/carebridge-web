import { cookies } from "next/headers";
import { z } from "zod";
import { createToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { getAdminByEmail, createAdminUser } from "@/lib/store";

const schema = z.object({
  fullName: z.string().trim().min(1).max(50),
  email: z.string().trim().min(6).max(255).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  password: z.string().min(8).max(72),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false, errorCode: "USR-ERR4", message: "リクエスト形式が不正です。" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const f = String(parsed.error.issues[0]?.path[0] ?? "");
    const msg =
      f === "password"
        ? "パスワードは8文字以上で入力してください。"
        : f === "email"
          ? "メールアドレスの形式が正しくありません。"
          : "お名前を入力してください。";
    return Response.json({ success: false, errorCode: "USR-ERR4", field: f, message: msg }, { status: 400 });
  }

  const existing = await getAdminByEmail(parsed.data.email);
  if (existing) {
    return Response.json(
      { success: false, errorCode: "USR-ERR6", field: "email", message: "このメールアドレスは既に登録されています。" },
      { status: 409 }
    );
  }

  const user = await createAdminUser(parsed.data);
  const store = await cookies();
  store.set(SESSION_COOKIE, createToken(user.id), sessionCookieOptions);
  return Response.json({ success: true }, { status: 201 });
}
