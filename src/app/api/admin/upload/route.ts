import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { auth } from "@/auth";

/**
 * Upload ảnh bài viết.
 * - Chỉ chấp nhận JPEG/PNG/WebP, dung lượng đầu vào ≤ 10MB.
 * - Tự xoay đúng hướng, **resize tối đa 1600px**, nén về **WebP (quality 80)** → không vỡ & nhẹ.
 * - Lưu vào public/uploads/<yyyymm>/<uuid>.webp (chia theo tháng để cover hàng nghìn ảnh).
 */
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_INPUT = 10 * 1024 * 1024; // 10MB
const MAX_WIDTH = 1600;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });

  let file: File | null = null;
  try {
    const form = await req.formData();
    file = form.get("file") as File | null;
  } catch {
    return Response.json({ success: false, message: "リクエスト形式が不正です。" }, { status: 400 });
  }
  if (!file) return Response.json({ success: false, message: "ファイルがありません。" }, { status: 400 });

  if (!ALLOWED.includes(file.type)) {
    return Response.json({ success: false, message: "対応形式は JPEG / PNG / WebP のみです。" }, { status: 400 });
  }
  if (file.size > MAX_INPUT) {
    return Response.json({ success: false, message: "ファイルサイズは10MB以下にしてください。" }, { status: 400 });
  }

  const input = Buffer.from(await file.arrayBuffer());
  let output: Buffer;
  try {
    output = await sharp(input)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
  } catch {
    return Response.json({ success: false, message: "画像の処理に失敗しました。" }, { status: 400 });
  }

  const ym = new Date().toISOString().slice(0, 7).replace("-", "");
  const name = `${crypto.randomUUID()}.webp`;
  const dir = path.join(process.cwd(), "public", "uploads", ym);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), output);

  const url = `/uploads/${ym}/${name}`;
  return Response.json({ success: true, url, size: output.length }, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) return Response.json({ success: false }, { status: 401 });

  const url = new URL(req.url).searchParams.get("url") ?? "";
  // chỉ cho phép xóa file trong /uploads, chặn path traversal
  if (!/^\/uploads\/[A-Za-z0-9/_.-]+$/.test(url) || url.includes("..")) {
    return Response.json({ success: false, message: "Invalid url" }, { status: 400 });
  }
  const filePath = path.join(process.cwd(), "public", url);
  await fs.unlink(filePath).catch(() => {});
  return Response.json({ success: true });
}
