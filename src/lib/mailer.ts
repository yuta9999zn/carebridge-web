import nodemailer, { type Transporter } from "nodemailer";

/**
 * Gửi email qua SMTP (env). Nếu chưa cấu hình SMTP_HOST → no-op + log (DEV).
 */
let transporter: Transporter | null | undefined;

function getTransporter(): Transporter | null {
  if (transporter !== undefined) return transporter;
  const host = process.env.SMTP_HOST;
  if (!host) {
    transporter = null;
    return null;
  }
  const port = Number(process.env.SMTP_PORT || 587);
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });
  return transporter;
}

export async function sendMail(opts: { to: string; subject: string; html: string }): Promise<boolean> {
  const tr = getTransporter();
  if (!tr) {
    console.log(`[mail:skip] (SMTP chưa cấu hình) → ${opts.to} | ${opts.subject}`);
    return false;
  }
  try {
    await tr.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
    return true;
  } catch (e) {
    console.error("[mail:fail]", (e as Error).message);
    return false;
  }
}

export const ADMIN_NOTIFY_EMAIL = process.env.ADMIN_NOTIFY_EMAIL || "";
