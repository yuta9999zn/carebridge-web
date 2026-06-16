"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { gradientFor, type Article } from "@/content/articles";

const PAGE_SIZE = 4;
const ALL = "__all__";

export default function ArticlesView({
  articles,
  cats,
}: {
  articles: Article[];
  cats: { key: string; label: string }[];
}) {
  const t = useTranslations("articles");
  const [active, setActive] = useState<string>(ALL);
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => [...articles].sort((a, b) => (a.date < b.date ? 1 : -1)), [articles]);
  const labelOf = useMemo(() => {
    const m = new Map(cats.map((c) => [c.key, c.label]));
    return (key: string) => m.get(key) ?? key;
  }, [cats]);

  function selectCat(key: string) {
    setActive(key);
    setPage(1);
  }

  const filtered = active === ALL ? sorted : sorted.filter((a) => a.category === active);
  const featured = filtered[0];
  const rest = filtered.slice(1);
  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = rest.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const latest = sorted.slice(0, 6);

  const tabs = [{ key: ALL, label: t("all") }, ...cats];

  return (
    <section className="mx-auto max-w-[1120px] px-5 py-12 md:py-16">
      <div className="mb-10 flex flex-wrap gap-2.5 border-b border-hairline pb-5">
        {tabs.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => selectCat(c.key)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              active === c.key ? "bg-navy text-white" : "bg-white text-ink/70 ring-1 ring-hairline hover:text-terracotta"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {featured && (
            <Link
              href={`/articles/${featured.slug}`}
              className="group block overflow-hidden rounded-3xl bg-white shadow-[0_4px_12px_rgba(23,56,77,0.05)] transition-all hover:shadow-[0_15px_35px_rgba(23,56,77,0.12)]"
            >
              <div className={`relative h-60 bg-gradient-to-br md:h-72 ${gradientFor(featured.category)}`}>
                {featured.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={featured.thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover" />
                )}
                <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-navy">
                  {labelOf(featured.category)}
                </span>
                <span className="absolute bottom-4 left-4 z-10 rounded-md bg-navy/80 px-2.5 py-1 text-[11px] font-bold text-white">
                  {t("featured")}
                </span>
              </div>
              <div className="p-6 md:p-7">
                <p className="text-xs text-muted">{featured.date}</p>
                <h2 className="mt-2 text-2xl font-black leading-snug text-navy group-hover:text-terracotta">{featured.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{featured.excerpt}</p>
              </div>
            </Link>
          )}

          {pageItems.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {pageItems.map((a) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_12px_rgba(23,56,77,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(23,56,77,0.12)]"
                >
                  <div className={`relative h-36 bg-gradient-to-br ${gradientFor(a.category)}`}>
                    {a.thumbnail && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    )}
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-navy">
                      {labelOf(a.category)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] text-muted">{a.date}</p>
                    <h3 className="mt-1 text-base font-bold leading-6 text-navy group-hover:text-terracotta">{a.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{a.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-2 pt-2" aria-label="pagination">
              <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={current === 1}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-white text-sm text-ink/70 transition-colors hover:border-terracotta hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-40">‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} type="button" onClick={() => setPage(n)} aria-current={current === n ? "page" : undefined}
                  className={`h-9 w-9 rounded-full text-sm font-bold transition-colors ${current === n ? "bg-terracotta text-white" : "border border-hairline bg-white text-ink/70 hover:border-terracotta hover:text-terracotta"}`}>{n}</button>
              ))}
              <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={current === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-white text-sm text-ink/70 transition-colors hover:border-terracotta hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-40">›</button>
            </nav>
          )}
        </div>

        <aside>
          <div className="rounded-3xl bg-white p-6 shadow-[0_4px_12px_rgba(23,56,77,0.05)] lg:sticky lg:top-24">
            <h3 className="flex items-center gap-2 text-base font-bold text-navy">
              <span className="h-4 w-1 rounded bg-terracotta" />
              {t("latest")}
            </h3>
            <ul className="mt-4 divide-y divide-hairline">
              {latest.map((a) => (
                <li key={a.slug}>
                  <Link href={`/articles/${a.slug}`} className="group flex gap-3 py-3">
                    {a.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.thumbnail} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                    ) : (
                      <span className={`h-14 w-14 shrink-0 rounded-lg bg-gradient-to-br ${gradientFor(a.category)}`} />
                    )}
                    <span className="min-w-0">
                      <span className="block text-[11px] text-muted">{a.date} ・ {labelOf(a.category)}</span>
                      <span className="mt-0.5 line-clamp-2 text-sm font-bold leading-5 text-navy group-hover:text-terracotta">{a.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
