import { getTranslations } from "next-intl/server";

// Hero theo WEBデザイン5: nền ivory, tiêu đề 2 dòng (phần nhấn màu hồng),
// lockup「momokichi × ITMジャパン」, và một dòng banner phía dưới.
const H1_SIZE = "clamp(28px, 3.2vw, 46px)";

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="px-5 pt-28 pb-12 sm:pt-32 md:px-8 md:pt-36 md:pb-16">
      <div className="mx-auto max-w-[820px] text-center">
        <h1
          style={{ fontSize: H1_SIZE }}
          className="font-extrabold leading-[1.3] text-primary"
        >
          {t("titleLead")}
          <br />
          <span className="text-rose">{t("titleAccent")}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-fg-muted md:text-[15px]">
          {t("body")}
        </p>

        {/* Lockup hai công ty */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <div className="rounded-2xl border border-line bg-surface px-6 py-3 text-center shadow-card">
            <p className="text-base font-black text-primary">{t("lockupA")}</p>
            <p className="mt-0.5 text-[11px] font-medium text-fg-muted">{t("lockupARole")}</p>
          </div>
          <span className="text-lg font-bold text-rose" aria-hidden>
            ×
          </span>
          <div className="rounded-2xl border border-line bg-surface px-6 py-3 text-center shadow-card">
            <p className="text-base font-black text-primary">{t("lockupB")}</p>
            <p className="mt-0.5 text-[11px] font-medium text-fg-muted">{t("lockupBRole")}</p>
          </div>
        </div>

        {/* Dòng banner */}
        <p className="mx-auto mt-10 max-w-xl text-sm font-bold leading-7 text-fg md:text-base">
          {t("banner")}
        </p>
      </div>
    </section>
  );
}
