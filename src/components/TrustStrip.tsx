import { getTranslations } from "next-intl/server";
import { IconHeart, IconShield, IconBook, IconGlobe } from "./Icons";

const icons = [IconHeart, IconShield, IconBook, IconGlobe];

export default async function TrustStrip() {
  const t = await getTranslations("trust");
  const items = t.raw("items") as string[];

  return (
    <section aria-label={t("aria")} className="bg-mint px-5 py-8 md:px-8">
      <ul className="mx-auto grid max-w-[1120px] grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((label, i) => {
          const Icon = icons[i] ?? IconHeart;
          return (
            <li key={label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium leading-6 text-fg">{label}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
