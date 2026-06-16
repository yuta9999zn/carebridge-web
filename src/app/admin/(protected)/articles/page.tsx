import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { getArticles, getLocalizedCategories } from "@/lib/store";
import { deleteArticleAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminArticles({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const locale = await getLocale();
  const [t, cats] = await Promise.all([getTranslations("admin"), getLocalizedCategories(locale)]);
  const labelOf = (k: string) => cats.find((c) => c.key === k)?.label ?? k;
  const { q = "" } = await searchParams;
  const all = await getArticles();
  const list = q
    ? all.filter((a) => (a.title + a.category + a.tags.join(",")).toLowerCase().includes(q.toLowerCase()))
    : all;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-navy">{t("articles.title")}</h1>
        <Link href="/admin/articles/new" className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-bold text-white hover:bg-terracotta-dark">
          ＋ {t("create")}
        </Link>
      </div>

      <form className="mt-5" action="/admin/articles" method="get">
        <input
          name="q"
          defaultValue={q}
          placeholder={t("articles.searchPh")}
          className="w-full max-w-md rounded-full border border-hairline px-5 py-2.5 text-sm outline-none focus:border-terracotta"
        />
      </form>

      <div className="mt-5 overflow-hidden rounded-2xl border border-hairline bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-hairline bg-cream/50 text-xs text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">{t("articles.hTitle")}</th>
              <th className="px-4 py-3 font-medium">{t("articles.hCategory")}</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">{t("articles.hDate")}</th>
              <th className="px-4 py-3 font-medium">{t("articles.hStatus")}</th>
              <th className="px-4 py-3 text-right font-medium">{t("articles.hActions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {list.map((a) => (
              <tr key={a.id} className="hover:bg-cream/40">
                <td className="px-4 py-3 font-medium text-navy">{a.title}</td>
                <td className="px-4 py-3 text-muted">{labelOf(a.category)}</td>
                <td className="hidden px-4 py-3 text-muted md:table-cell">{a.date}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${a.status === "draft" ? "bg-hairline text-muted" : "bg-terracotta/10 text-terracotta"}`}>
                    {a.status === "draft" ? t("articles.draft") : t("articles.published")}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/articles/${a.id}`} className="rounded-md border border-hairline px-3 py-1.5 text-xs font-medium hover:border-terracotta hover:text-terracotta">
                      {t("edit")}
                    </Link>
                    <form action={deleteArticleAction}>
                      <input type="hidden" name="id" value={a.id} />
                      <button type="submit" className="rounded-md border border-hairline px-3 py-1.5 text-xs font-medium text-muted hover:border-red-400 hover:text-red-500">
                        {t("delete")}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-muted">{t("articles.empty")}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
