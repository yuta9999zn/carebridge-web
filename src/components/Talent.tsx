import { getTranslations } from "next-intl/server";
import SectionHead from "./SectionHead";
import { IconCheck } from "./Icons";

export default async function Talent() {
  const t = await getTranslations("talent");
  const items = t.raw("items") as string[];

  return (
    <section className="bg-surface px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHead eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} num={5} />

        <ul className="mt-12 space-y-3 md:mt-14">
          {items.map((it) => (
            <li key={it} className="flex items-start gap-3 rounded-2xl border border-line bg-ivory p-5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint text-primary">
                <IconCheck className="h-4 w-4" />
              </span>
              <span className="text-sm leading-7 text-fg">{it}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-xs leading-6 text-fg-muted">{t("note")}</p>
      </div>
    </section>
  );
}
