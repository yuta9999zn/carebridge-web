import { z } from "zod";
import { createBooking } from "@/lib/store";

/**
 * POST /api/bookings — đặt lịch trao đổi (DE-06).
 * Validate theo Validation Rule; mã lỗi theo Message Definition (USR-ERRx). Lưu PostgreSQL.
 */
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = z
  .object({
    customerName: z.string().trim().min(1).max(50),
    organization: z.string().trim().max(100).optional().default(""),
    email: z.string().trim().max(255).optional().default(""),
    phone: z.string().trim().max(15).optional().default(""),
    preferredAt: z.string().trim().min(1),
    meetingType: z.enum(["オンライン", "対面", "電話"]),
    topic: z.string().trim().max(2000).optional().default(""),
    consent: z.literal(true),
  })
  .refine((d) => d.email !== "" || d.phone !== "", { message: "contact", path: ["email"] })
  .refine((d) => d.email === "" || emailRe.test(d.email), { message: "email", path: ["email"] });

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false, errorCode: "USR-ERR4", message: "リクエスト形式が不正です。" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const field = String(issue?.path[0] ?? "");
    let message = `[${field}] の形式が正しくありません。`;
    if (field === "consent") message = "個人情報の取扱いへの同意が必要です。";
    else if (field === "customerName") message = "お名前を入力してください。";
    else if (field === "preferredAt") message = "ご希望日時を入力してください。";
    else if (field === "email") message = "メールアドレスまたは電話番号を入力してください。";
    return Response.json({ success: false, errorCode: "USR-ERR3", field, message }, { status: 400 });
  }

  // ngày hẹn không được ở quá khứ (USR-ERR7)
  const when = new Date(parsed.data.preferredAt);
  if (isNaN(when.getTime()) || when.getTime() < Date.now()) {
    return Response.json(
      { success: false, errorCode: "USR-ERR7", field: "preferredAt", message: "ご希望日時は現在より後を指定してください。" },
      { status: 400 }
    );
  }

  try {
    const id = await createBooking({
      customerName: parsed.data.customerName,
      organization: parsed.data.organization,
      email: parsed.data.email,
      phone: parsed.data.phone,
      preferredAt: parsed.data.preferredAt,
      meetingType: parsed.data.meetingType,
      topic: parsed.data.topic,
    });
    return Response.json(
      { success: true, data: { bookingID: id, status: "受付待ち" }, message: "ご予約を受け付けました。" },
      { status: 201 }
    );
  } catch (e) {
    console.error("createBooking failed", e);
    return Response.json({ success: false, errorCode: "SYS-ERR4", message: "システムエラーが発生しました。" }, { status: 500 });
  }
}
