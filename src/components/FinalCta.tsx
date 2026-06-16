import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { IconArrow, IconMail } from "./Icons";

export default async function FinalCta() {
  const t = await getTranslations("finalCta");
  return (
    <section className="bg-primary px-5 py-20 text-white md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold leading-snug md:text-3xl">{t("title")}</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/85 md:text-base">{t("lead")}</p>

        <div className="mt-9 flex flex-col items-stretch justify-center gap-4 sm:flex-row">
          <div className="flex flex-col items-center">
            <Link
              href="/booking"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 font-bold text-primary transition-colors hover:bg-mint sm:w-auto"
            >
              {t("bookLabel")}
              <IconArrow className="h-5 w-5" />
            </Link>
            <span className="mt-2 text-xs text-white/75">{t("bookSub")}</span>
          </div>
          <div className="flex flex-col items-center">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border-2 border-white/80 bg-transparent px-8 py-4 font-bold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              <IconMail className="h-5 w-5" />
              {t("contactLabel")}
            </Link>
            <span className="mt-2 text-xs text-white/75">{t("contactSub")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
