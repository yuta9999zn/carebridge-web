import { z } from "zod";
import { createInquiry } from "@/lib/store";
import { sendMail, ADMIN_NOTIFY_EMAIL } from "@/lib/mailer";
import { SITE_NAME_SHORT } from "@/content/site";

/**
 * POST /api/inquiries — tiếp nhận yêu cầu tư vấn (DE-01).
 * Validate theo Validation Rule; mã lỗi theo Message Definition (USR-ERRx).
 * Lưu vào PostgreSQL qua Prisma.
 */

const InquirySchema = z.object({
  facilityName: z.string().trim().min(1).max(100),
  contactName: z.string().trim().min(1).max(50),
  email: z
    .string()
    .trim()
    .min(6)
    .max(255)
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  message: z.string().trim().max(2000).default(""),
  consent: z.literal(true),
});

type Issue = { code: string; path: PropertyKey[]; minimum?: number };

function toUserError(issue: Issue) {
  const field = String(issue.path[0] ?? "");
  if (field === "consent") {
    return { errorCode: "USR-ERR3", field, message: "個人情報の取扱いへの同意が必要です。" };
  }
  if (issue.code === "too_small") {
    if (issue.minimum === 1) return { errorCode: "USR-ERR3", field, message: `[${field}] を入力してください。` };
    return { errorCode: "USR-ERR5", field, message: `[${field}] の長さが不正です。` };
  }
  if (issue.code === "too_big") {
    return { errorCode: "USR-ERR5", field, message: `[${field}] が長すぎます。` };
  }
  return { errorCode: "USR-ERR4", field, message: `[${field}] の形式が正しくありません。` };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { success: false, errorCode: "USR-ERR4", message: "リクエスト形式が不正です。" },
      { status: 400 }
    );
  }

  const parsed = InquirySchema.safeParse(body);
  if (!parsed.success) {
    const err = toUserError(parsed.error.issues[0] as unknown as Issue);
    return Response.json({ success: false, ...err }, { status: 400 });
  }

  let inquiryID: string;
  try {
    inquiryID = await createInquiry({
      facilityName: parsed.data.facilityName,
      contactName: parsed.data.contactName,
      email: parsed.data.email,
      message: parsed.data.message,
    });
  } catch (e) {
    console.error("createInquiry failed", e);
    return Response.json(
      { success: false, errorCode: "SYS-ERR4", message: "システムエラーが発生しました。" },
      { status: 500 }
    );
  }

  // Thông báo nội bộ khi có lead mới (FR-LM-06) — fire-and-forget
  if (ADMIN_NOTIFY_EMAIL) {
    void sendMail({
      to: ADMIN_NOTIFY_EMAIL,
      subject: `【${SITE_NAME_SHORT}】新しいお問い合わせ`,
      html: `<p>新しいお問い合わせが届きました。</p>
        <ul>
          <li>法人・施設: ${parsed.data.facilityName}</li>
          <li>担当者: ${parsed.data.contactName}</li>
          <li>メール: ${parsed.data.email}</li>
          <li>内容: ${parsed.data.message || "-"}</li>
        </ul>`,
    }).catch(() => {});
  }

  return Response.json(
    { success: true, data: { inquiryID, status: "New" }, message: "送信ありがとうございます。" },
    { status: 201 }
  );
}
