import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { gradientFor, findBySlug, relatedFrom, mostReadFrom, localize, type Block } from "@/content/articles";
import { getPublishedArticles, getLocalizedCategories } from "@/lib/store";
import ReactionBar from "@/components/ReactionBar";
import { IconArrow } from "@/components/Icons";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = findBySlug(await getPublishedArticles(), slug);
  if (!a) return { title: "記事が見つかりません" };
  return {
    title: `${a.title} ｜ ネパール介護人材ナビ`,
    description: a.lead,
    openGraph: { title: a.title, description: a.lead, type: "article" },
  };
}

function BlockView({ block, gradient }: { block: Block; gradient: string }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 flex items-center gap-2.5 text-xl font-bold text-navy">
          <span className="h-5 w-1.5 rounded bg-terracotta" />
          {block.text}
        </h2>
      );
    case "p":
      return <p className="mt-5 text-[15px] leading-8 text-ink">{block.text}</p>;
    case "quote":
      return (
        <blockquote className="mt-6 rounded-r-xl border-l-4 border-terracotta bg-cream px-5 py-4 text-[15px] font-medium italic text-navy">
          {block.text}
        </blockquote>
      );
    case "image":
      return (
        <figure className="mt-7">
          {block.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={block.src} alt={block.caption} className="w-full rounded-2xl" />
          ) : (
            <div className={`h-56 w-full rounded-2xl bg-gradient-to-br md:h-72 ${gradient}`} />
          )}
          {block.caption && <figcaption className="mt-2 text-center text-xs text-muted">{block.caption}</figcaption>}
        </figure>
      );
  }
}

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const all = await getPublishedArticles();
  const rawA = findBySlug(all, slug);
  if (!rawA) notFound();

  const locale = await getLocale();
  const [t, cats] = await Promise.all([getTranslations("articles"), getLocalizedCategories(locale)]);
  const labelOf = (k: string) => cats.find((c) => c.key === k)?.label ?? k;
  const a = localize(rawA, locale);
  const gradient = gradientFor(a.category);
  const related = relatedFrom(all, slug, 3).map((r) => localize(r, locale));
  const mostRead = mostReadFrom(all, 5).map((r) => localize(r, locale));

  return (
    <div className="px-5 pt-28 pb-16 md:pt-32">
      <div className="mx-auto max-w-[1120px]">
        {/* breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="hover:text-terracotta">ホーム</Link>
          <span>/</span>
          <Link href="/articles" className="hover:text-terracotta">記事</Link>
          <span>/</span>
          <span className="text-ink">{labelOf(a.category)}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-3">
          {/* main */}
          <article className="lg:col-span-2">
            {a.thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={a.thumbnail} alt={a.title} className="mb-6 h-56 w-full rounded-2xl object-cover md:h-72" />
            )}
            <span className="inline-block rounded-full bg-terracotta/10 px-3 py-1 text-xs font-bold text-terracotta">
              {labelOf(a.category)}
            </span>
            <h1 className="mt-3 text-2xl font-black leading-snug text-navy md:text-3xl">{a.title}</h1>

            {/* byline */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-hairline pb-5 text-sm text-muted">
              <span className="flex items-center gap-2">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white ${gradient}`}>
                  {a.author.initial}
                </span>
                <span className="font-medium text-ink">{a.author.name}</span>
              </span>
              <span>{a.date} {a.time}</span>
              {a.location && <span>・{a.location}</span>}
              <span>・約{a.readingTime}分で読めます</span>
            </div>

            {/* lead */}
            <p className="mt-6 border-l-4 border-terracotta/40 pl-4 text-base font-medium leading-8 text-navy">
              {a.lead}
            </p>

            {/* body */}
            <div>
              {a.body.map((b, i) => (
                <BlockView key={i} block={b} gradient={gradient} />
              ))}
            </div>

            {/* tags */}
            {a.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {a.tags.map((t) => (
                  <span key={t} className="rounded-full bg-cream px-3 py-1.5 text-xs text-ink/70">
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* reactions */}
            <div className="mt-8">
              <ReactionBar />
            </div>

            {/* related */}
            {related.length > 0 && (
              <section className="mt-12 border-t border-hairline pt-8">
                <h2 className="mb-5 text-lg font-bold text-navy">{t("related")}</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/articles/${r.slug}`}
                      className="group overflow-hidden rounded-xl bg-white shadow-[0_4px_12px_rgba(23,56,77,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(23,56,77,0.12)]"
                    >
                      {r.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={r.thumbnail} alt="" className="h-24 w-full object-cover" />
                      ) : (
                        <div className={`h-24 bg-gradient-to-br ${gradientFor(r.category)}`} />
                      )}
                      <div className="p-4">
                        <p className="text-[10px] text-muted">{r.date}</p>
                        <p className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-navy group-hover:text-terracotta">
                          {r.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-10">
              <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-bold text-terracotta hover:underline">
                <IconArrow className="h-4 w-4 rotate-180" />
                {t("back")}
              </Link>
            </div>
          </article>

          {/* sidebar */}
          <aside>
            <div className="rounded-3xl bg-white p-6 shadow-[0_4px_12px_rgba(23,56,77,0.05)] lg:sticky lg:top-24">
              <h3 className="flex items-center gap-2 text-base font-bold text-navy">
                <span className="h-4 w-1 rounded bg-terracotta" />
                {t("mostRead")}
              </h3>
              <ul className="mt-4 space-y-1">
                {mostRead.map((m, i) => (
                  <li key={m.slug}>
                    <Link href={`/articles/${m.slug}`} className="group flex gap-3 py-3">
                      <span className="text-xl font-black text-terracotta/50">{i + 1}</span>
                      <span className="min-w-0">
                        <span className="block text-[11px] text-muted">{m.date} ・ {labelOf(m.category)}</span>
                        <span className="mt-0.5 line-clamp-2 text-sm font-bold leading-5 text-navy group-hover:text-terracotta">
                          {m.title}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
