import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import { getContent } from "@/lib/store";
import { iconByKey } from "@/components/Icons";
import { pageTitle } from "@/content/site";

export const metadata: Metadata = { title: pageTitle("ビジョン・方針") };
export const dynamic = "force-dynamic";

export default async function VisionPage() {
  const locale = await getLocale();
  const c = await getContent(locale);

  const policies = [
    { icon: "shield", title: c["vision.policy1.title"], desc: c["vision.policy1.desc"] },
    { icon: "book", title: c["vision.policy2.title"], desc: c["vision.policy2.desc"] },
    { icon: "heart", title: c["vision.policy3.title"], desc: c["vision.policy3.desc"] },
  ];

  return (
    <>
      <PageHeader eyebrow="Vision" title={c["vision.title"]} lead={c["vision.lead"]} />

      <section className="px-5 py-16 md:py-20">
        <div className="mx-auto grid max-w-[1120px] gap-7 md:grid-cols-2">
          <div className="rounded-3xl bg-navy p-10 text-white shadow-[0_10px_30px_rgba(23,56,77,0.08)]">
            <h2 className="text-2xl font-bold">{c["vision.vision.title"]}</h2>
            <p className="mt-4 whitespace-pre-line text-sm leading-8 text-white/85">{c["vision.vision.body"]}</p>
          </div>
          <div className="rounded-3xl border border-hairline bg-white p-10 shadow-[0_4px_12px_rgba(23,56,77,0.05)]">
            <h2 className="text-2xl font-bold text-navy">{c["vision.mission.title"]}</h2>
            <p className="mt-4 whitespace-pre-line text-sm leading-8 text-muted">{c["vision.mission.body"]}</p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:pb-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-7 md:grid-cols-3">
            {policies.map((p) => {
              const Icon = iconByKey[p.icon] ?? iconByKey.heart;
              return (
                <article key={p.title} className="rounded-3xl bg-white p-8 text-center shadow-[0_10px_30px_rgba(23,56,77,0.08)]">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream text-terracotta">
                    <Icon className="h-8 w-8" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-navy">{p.title}</h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted">{p.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
