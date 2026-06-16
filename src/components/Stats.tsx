import { getTranslations } from "next-intl/server";
import { homeContent } from "@/content/home";
import SectionTitle from "./SectionTitle";
import Counter from "./Counter";

export default async function Stats() {
  const t = await getTranslations("stats");
  const labels = t.raw("labels") as string[];
  const { stats } = homeContent;

  return (
    <section className="bg-navy px-5 py-20 text-white md:py-24">
      <div className="mx-auto max-w-[1120px]">
        <SectionTitle eyebrow={t("eyebrow")} title={t("title")} light />

        <div className="grid gap-10 text-center md:grid-cols-3">
          {stats.items.map((s, i) => (
            <div key={i}>
              <div className="flex items-center justify-center text-5xl font-black text-terracotta md:text-6xl">
                <Counter target={s.target} />
                <span className="text-3xl">{s.suffix}</span>
              </div>
              <p className="mt-2.5 text-base font-medium">{labels[i]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
