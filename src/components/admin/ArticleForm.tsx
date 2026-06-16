import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { saveArticleAction } from "@/app/admin/(protected)/articles/actions";
import { serializeBody } from "@/lib/article-format";
import { getLocalizedCategories } from "@/lib/store";
import { type Article } from "@/content/articles";
import ImageUploader from "./ImageUploader";

const input =
  "w-full rounded-lg border border-hairline px-4 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10";
const label = "mb-1.5 block text-xs font-bold text-navy";

export default async function ArticleForm({ article }: { article?: Article }) {
  const locale = await getLocale();
  const [t, cats] = await Promise.all([getTranslations("admin"), getLocalizedCategories(locale)]);
  const defaultCat = article?.category ?? cats[0]?.key ?? "";
  return (
    <form action={saveArticleAction} className="max-w-3xl space-y-5">
      {article?.id && <input type="hidden" name="id" value={article.id} />}

      <div>
        <label className={label}>{t("form.title")} *</label>
        <input name="title" required defaultValue={article?.title} className={input} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>{t("form.category")}</label>
          <select name="category" defaultValue={defaultCat} className={input}>
            {cats.map((c) => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>{t("form.status")}</label>
          <select name="status" defaultValue={article?.status ?? "published"} className={input}>
            <option value="published">{t("articles.published")}</option>
            <option value="draft">{t("articles.draft")}</option>
          </select>
        </div>
      </div>

      <div>
        <label className={label}>{t("form.thumbnail")}</label>
        <ImageUploader name="thumbnail" defaultValue={article?.thumbnail} />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={label}>{t("form.slug")}</label>
          <input name="slug" defaultValue={article?.slug} className={input} placeholder="auto" />
        </div>
        <div>
          <label className={label}>{t("form.date")}</label>
          <input name="date" defaultValue={article?.date} className={input} placeholder="2026.06.07" />
        </div>
        <div>
          <label className={label}>{t("form.time")}</label>
          <input name="time" defaultValue={article?.time ?? "09:00"} className={input} placeholder="09:00" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>{t("form.author")}</label>
          <input name="authorName" defaultValue={article?.author?.name ?? "編集部"} className={input} />
        </div>
        <div>
          <label className={label}>{t("form.tags")}</label>
          <input name="tags" defaultValue={article?.tags?.join(", ")} className={input} />
        </div>
      </div>

      <div>
        <label className={label}>{t("form.lead")}</label>
        <textarea name="lead" rows={2} defaultValue={article?.lead} className={input} />
      </div>

      <div>
        <label className={label}>{t("form.excerpt")}</label>
        <textarea name="excerpt" rows={2} defaultValue={article?.excerpt} className={input} />
      </div>

      <div>
        <label className={label}>{t("form.body")}</label>
        <textarea name="body" rows={12} defaultValue={serializeBody(article?.body)} className={`${input} font-mono`} />
        <p className="mt-1.5 text-[11px] text-muted">{t("form.bodyHint")}</p>
      </div>

      {/* Bản dịch theo ngôn ngữ (để trống = dùng bản gốc tiếng Nhật) */}
      <div className="space-y-3 rounded-2xl border border-hairline bg-cream/40 p-4">
        <p className="text-xs font-bold text-navy">{t("form.translations")}</p>
        {([
          { loc: "vi", langLabel: "Tiếng Việt" },
          { loc: "en", langLabel: "English" },
          { loc: "ne", langLabel: "नेपाली" },
        ] as const).map(({ loc, langLabel }) => {
          const tr = article?.translations?.[loc];
          return (
            <details key={loc} className="rounded-xl bg-white p-3 ring-1 ring-hairline">
              <summary className="cursor-pointer text-sm font-bold text-navy">{langLabel}</summary>
              <div className="mt-3 space-y-3">
                <div>
                  <label className={label}>{t("form.title")}</label>
                  <input name={`tr.${loc}.title`} defaultValue={tr?.title} className={input} />
                </div>
                <div>
                  <label className={label}>{t("form.lead")}</label>
                  <textarea name={`tr.${loc}.lead`} rows={2} defaultValue={tr?.lead} className={input} />
                </div>
                <div>
                  <label className={label}>{t("form.excerpt")}</label>
                  <textarea name={`tr.${loc}.excerpt`} rows={2} defaultValue={tr?.excerpt} className={input} />
                </div>
                <div>
                  <label className={label}>{t("form.body")}</label>
                  <textarea name={`tr.${loc}.body`} rows={8} defaultValue={serializeBody(tr?.body)} className={`${input} font-mono`} />
                </div>
              </div>
            </details>
          );
        })}
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="rounded-full bg-terracotta px-6 py-2.5 text-sm font-bold text-white hover:bg-terracotta-dark">
          {t("save")}
        </button>
        <Link href="/admin/articles" className="rounded-full border border-hairline px-6 py-2.5 text-sm font-bold text-ink/80 hover:border-terracotta hover:text-terracotta">
          {t("cancel")}
        </Link>
      </div>
    </form>
  );
}
