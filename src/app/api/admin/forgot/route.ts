import { setResetToken } from "@/lib/store";
import { sendMail } from "@/lib/mailer";
import { SITE_NAME_SHORT } from "@/content/site";

/**
 * Quên mật khẩu: tạo token reset (1 giờ) + gửi email link reset (nếu cấu hình SMTP).
 * Chưa cấu hình SMTP → trả về resetUrl trong response (chỉ DEV) + log.
 */
export async function POST(req: Request) {
  let email = "";
  try {
    email = String((await req.json()).email ?? "");
  } catch {
    /* ignore */
  }

  const token = await setResetToken(email);
  const isDev = process.env.NODE_ENV !== "production";

  if (token) {
    const base = process.env.APP_URL || new URL(req.url).origin;
    const resetUrl = `${base}/admin/reset?token=${token}`;
    console.log(`[forgot] reset link for ${email}: ${resetUrl}`);
    await sendMail({
      to: email,
      subject: `【${SITE_NAME_SHORT}】パスワード再設定`,
      html: `<p>パスワード再設定のリンクです（1時間有効）：</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
    });
    return Response.json({ success: true, ...(isDev ? { resetUrl: `/admin/reset?token=${token}` } : {}) });
  }

  // Không tiết lộ email tồn tại hay không
  return Response.json({ success: true });
}
