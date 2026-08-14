import { getTranslations } from "next-intl/server";
import { IconPhone, IconMail } from "./Icons";
import { CONTACT_TEL, CONTACT_TEL_HREF, CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "@/content/site";

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

          {/* Yêu cầu khách 2026-08-14: gọi/mail trực tiếp cho 大林 (không qua /booking, /contact),
              và hiện luôn số ĐT / email trong nút để người dùng đọc được. */}
          <div className="mt-7 flex flex-col gap-3">
            {/* Dòng 1: icon dính sát nhãn (inline-flex, gap-2.5 = 10px; icon w-5 = 20px).
                Dòng 2: block text-center thụt trái đúng 30px (= 20 + 10) → tâm chữ dòng 2
                trùng tâm nhãn dòng 1, mà icon vẫn sát chữ. Email dài thì tự xuống dòng, không tràn. */}
            <a
              href={CONTACT_TEL_HREF}
              className="block rounded-full bg-rose px-6 py-3.5 text-center font-bold text-white transition-colors hover:bg-rose-hover"
            >
              <span className="inline-flex items-center gap-2.5 leading-tight">
                <IconPhone className="h-5 w-5 shrink-0" />
                {t("tel")}
              </span>
              <span className="mt-0.5 block pl-[30px] text-sm font-bold leading-tight tracking-wide text-white/90">
                {CONTACT_TEL}
              </span>
            </a>
            <a
              href={CONTACT_EMAIL_HREF}
              className="block rounded-full border-2 border-rose bg-surface px-6 py-3.5 text-center font-bold text-rose transition-colors hover:bg-rose-soft"
            >
              <span className="inline-flex items-center gap-2.5 leading-tight">
                <IconMail className="h-5 w-5 shrink-0" />
                {t("mail")}
              </span>
              <span className="mt-0.5 block break-all pl-[30px] text-xs font-semibold leading-tight text-rose/85">
                {CONTACT_EMAIL}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
