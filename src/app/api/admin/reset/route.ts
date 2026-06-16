import { resetPasswordWithToken } from "@/lib/store";

export async function POST(req: Request) {
  let token = "";
  let password = "";
  try {
    const body = await req.json();
    token = String(body.token ?? "");
    password = String(body.password ?? "");
  } catch {
    /* ignore */
  }

  if (password.length < 8) {
    return Response.json(
      { success: false, errorCode: "USR-ERR5", message: "パスワードは8文字以上で入力してください。" },
      { status: 400 }
    );
  }

  const ok = await resetPasswordWithToken(token, password);
  if (!ok) {
    return Response.json(
      { success: false, errorCode: "USR-ERR4", message: "リンクが無効か、有効期限が切れています。" },
      { status: 400 }
    );
  }
  return Response.json({ success: true });
}
