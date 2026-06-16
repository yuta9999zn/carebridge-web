import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { IconPhone, IconMail } from "./Icons";

export default async function Closing() {
  const t = await getTranslations("closing");

  return (
    <section className="bg-ivory px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[560px]">
        <div className="rounded-3xl border border-line bg-surface p-8 text-center shadow-card md:p-10">
          <h2 className="text-xl font-bold text-primary md:text-2xl">{t("title")}</h2>
          <p className="mt-3 text-sm leading-7 text-fg-muted">{t("lead")}</p>

          <p className="mt-5 text-sm text-fg-muted">
            <span className="rounded-full bg-rose-soft px-3 py-1 text-xs font-bold text-rose">{t("personLabel")}</span>
            <span className="ml-2 font-bold text-primary">{t("person")}</span>
            <span className="ml-2">{t("personCompany")}</span>
          </p>

          <div className="mt-7 flex flex-col gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-rose px-7 py-4 font-bold text-white transition-colors hover:bg-rose-hover"
            >
              <IconPhone className="h-5 w-5" />
              {t("tel")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-rose bg-surface px-7 py-4 font-bold text-rose transition-colors hover:bg-rose-soft"
            >
              <IconMail className="h-5 w-5" />
              {t("mail")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
