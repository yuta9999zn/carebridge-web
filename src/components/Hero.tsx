import { Fragment } from "react";
import { getLocale, getTranslations } from "next-intl/server";

// Hero theo WEBデザイン5: nền ivory, tiêu đề 2 dòng (phần nhấn màu hồng),
// lockup「momokichi × ITMジャパン」, và một dòng banner phía dưới.
const H1_SIZE = "clamp(28px, 3.2vw, 46px)";

// 文節（phrase）単位で改行を制御するヒーロー本文（日本語のみ）。
// 各文節を whitespace-nowrap の「分割禁止の塊」にすることで、語の途中
//（例:「ご紹介」「人材づくり」）で改行されなくなる。折り返しは文節の
// 切れ目だけで起こるため、PC・iPhone どちらの画面でも文節が整う。
// 「ご紹介から、」の後に <br> を入れ、PC（md以上）ではここで必ず改行する。
const JA_BODY_PHRASES = [
  "介護事業者と",
  "登録支援機関の",
  "二社が、",
  "特定技能人材の",
  "ご紹介から、", // ← PCはこの後で改行（要求1）。スマホは文節で自然に折り返す（要求2）。
  "現場の",
  "人材づくりまで",
  "支えます。",
];
const JA_BODY_PC_BREAK_AFTER = "ご紹介から、";

export default async function Hero() {
  const t = await getTranslations("hero");
  const locale = await getLocale();

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
          {locale === "ja"
            ? JA_BODY_PHRASES.map((seg) => (
                <Fragment key={seg}>
                  <span className="whitespace-nowrap">{seg}</span>
                  {seg === JA_BODY_PC_BREAK_AFTER && <br className="hidden md:block" />}
                </Fragment>
              ))
            : t("body")}
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
