import { getTranslations } from "next-intl/server";
import SectionHead from "./SectionHead";
import { IconHeart, IconNetwork, IconSupport } from "./Icons";

const icons = [IconHeart, IconNetwork, IconSupport];

export default async function Features() {
  const t = await getTranslations("reasons");
  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <section className="bg-surface px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1120px]">
        <SectionHead eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} num={2} />

        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3">
          {items.map((it, i) => {
            const Icon = icons[i] ?? IconHeart;
            return (
              <article key={it.title} className="rounded-3xl border border-line bg-ivory p-7 md:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-primary">{it.title}</h3>
                <p className="mt-3 text-sm leading-7 text-fg-muted">{it.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
