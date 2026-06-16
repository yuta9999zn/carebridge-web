import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import { getContent } from "@/lib/store";

export const metadata: Metadata = { title: "会社情報 ｜ ネパール介護人材ナビ" };
export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const locale = await getLocale();
  const c = await getContent(locale);

  return (
    <>
      <PageHeader eyebrow="About Us" title={c["about.title"]} lead={c["about.lead"]} />

      <section className="px-5 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-navy md:text-3xl">{c["about.intro.title"]}</h2>
          <p className="mt-5 whitespace-pre-line text-[15px] leading-8 text-muted">{c["about.intro.body"]}</p>
        </div>
      </section>

      <section className="px-5 pb-20 md:pb-24">
        <div className="mx-auto grid max-w-[1120px] gap-7 md:grid-cols-2">
          <article className="rounded-3xl border border-hairline bg-white p-8 shadow-[0_4px_12px_rgba(23,56,77,0.05)]">
            <h3 className="text-xl font-bold text-navy">{c["about.companyA.name"]}</h3>
            <p className="mt-1 text-xs font-medium text-terracotta">{c["about.companyA.role"]}</p>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">{c["about.companyA.desc"]}</p>
          </article>

          <article className="rounded-3xl border border-hairline bg-white p-8 shadow-[0_4px_12px_rgba(23,56,77,0.05)]">
            <h3 className="text-xl font-bold text-navy">{c["about.companyB.name"]}</h3>
            <p className="mt-1 text-xs font-medium text-terracotta">{c["about.companyB.role"]}</p>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">{c["about.companyB.desc"]}</p>
            <dl className="mt-6 divide-y divide-hairline border-t border-hairline">
              <div className="flex items-center justify-between py-3">
                <dt className="text-xs text-muted">{c["about.companyB.regLabel"]}</dt>
                <dd className="rounded-md bg-cream px-3 py-1 font-mono text-sm tracking-wider text-terracotta">{c["about.companyB.reg"]}</dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-xs text-muted">{c["about.companyB.licenseLabel"]}</dt>
                <dd className="rounded-md bg-cream px-3 py-1 font-mono text-sm tracking-wider text-terracotta">{c["about.companyB.license"]}</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>
    </>
  );
}
