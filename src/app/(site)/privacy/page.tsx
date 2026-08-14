import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import Faq from "@/components/Faq";
import { pageTitle } from "@/content/site";

export const metadata: Metadata = { title: pageTitle("個人情報の取扱い") };

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");
  const items = t.raw("items") as { h: string; p: string }[];

  return (
    <>
      <PageHeader eyebrow="Privacy Policy" title={t("title")} lead={t("lead")} />
      <section className="mx-auto max-w-3xl px-5 py-14 md:py-20">
        <div className="space-y-8">
          {items.map((s) => (
            <div key={s.h}>
              <h2 className="text-lg font-bold text-navy">{s.h}</h2>
              <p className="mt-2 text-[15px] leading-8 text-muted">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
      <Faq />
    </>
  );
}
