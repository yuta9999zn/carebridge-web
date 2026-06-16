"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/guard";
import { saveArticle, deleteArticle } from "@/lib/store";
import { parseBody, slugify } from "@/lib/article-format";
import type { Article } from "@/content/articles";

export async function saveArticleAction(formData: FormData) {
  await requireUser();

  const id = String(formData.get("id") ?? "").trim() || undefined;
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim() || "お知らせ";
  const slugInput = String(formData.get("slug") ?? "").trim();
  const authorName = String(formData.get("authorName") ?? "編集部").trim() || "編集部";
  const lead = String(formData.get("lead") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || lead;
  const date = String(formData.get("date") ?? "").trim() || new Date().toISOString().slice(0, 10).replace(/-/g, ".");
  const time = String(formData.get("time") ?? "09:00").trim();
  const tags = String(formData.get("tags") ?? "").split(",").map((t) => t.trim()).filter(Boolean);
  const status = (String(formData.get("status") ?? "published") === "draft" ? "draft" : "published") as "published" | "draft";
  const thumbnail = String(formData.get("thumbnail") ?? "").trim();
  const body = parseBody(String(formData.get("body") ?? ""));
  const readingTime = Math.max(1, Math.round(body.reduce((n, b) => n + ("text" in b ? b.text.length : 20), 0) / 400));

  // Bản dịch theo locale (vi/en/ne) — chỉ lưu khi có nội dung
  const translations: Article["translations"] = {};
  for (const loc of ["vi", "en", "ne"]) {
    const tTitle = String(formData.get(`tr.${loc}.title`) ?? "").trim();
    const tLead = String(formData.get(`tr.${loc}.lead`) ?? "").trim();
    const tExcerpt = String(formData.get(`tr.${loc}.excerpt`) ?? "").trim();
    const tBodyRaw = String(formData.get(`tr.${loc}.body`) ?? "").trim();
    if (tTitle || tLead || tExcerpt || tBodyRaw) {
      translations![loc] = {
        title: tTitle || undefined,
        lead: tLead || undefined,
        excerpt: tExcerpt || undefined,
        body: tBodyRaw ? parseBody(tBodyRaw) : undefined,
      };
    }
  }

  const article: Article = {
    id,
    slug: slugInput || slugify(title),
    category,
    title: title || "(無題)",
    date,
    time,
    author: { name: authorName, initial: authorName.slice(0, 1) },
    readingTime,
    views: 0,
    status,
    thumbnail,
    lead,
    excerpt,
    tags,
    body,
    translations,
  };

  await saveArticle(article);
  revalidatePath("/articles");
  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function deleteArticleAction(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "");
  if (id) await deleteArticle(id);
  revalidatePath("/articles");
  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}
