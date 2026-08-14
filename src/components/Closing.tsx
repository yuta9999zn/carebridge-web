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
            {/* Grid 2 cột: cột 1 = icon (đứng cạnh nhãn ở dòng 1), cột 2 = nhãn + số/email.
                Số/email dùng col-start-2 nên căn giữa theo đúng cột chữ, không lệch. */}
            <a
              href={CONTACT_TEL_HREF}
              className="flex items-center justify-center rounded-full bg-rose px-6 py-3.5 font-bold text-white transition-colors hover:bg-rose-hover"
            >
              <span className="grid min-w-0 grid-cols-[auto_auto] items-center gap-x-2.5 gap-y-0.5 leading-tight">
                <IconPhone className="h-5 w-5 shrink-0" />
                <span className="justify-self-center">{t("tel")}</span>
                <span className="col-start-2 justify-self-center text-sm font-bold tracking-wide text-white/90">
                  {CONTACT_TEL}
                </span>
              </span>
            </a>
            <a
              href={CONTACT_EMAIL_HREF}
              className="flex items-center justify-center rounded-full border-2 border-rose bg-surface px-6 py-3.5 font-bold text-rose transition-colors hover:bg-rose-soft"
            >
              <span className="grid min-w-0 grid-cols-[auto_auto] items-center gap-x-2.5 gap-y-0.5 leading-tight">
                <IconMail className="h-5 w-5 shrink-0" />
                <span className="justify-self-center">{t("mail")}</span>
                <span className="col-start-2 min-w-0 justify-self-center break-all text-xs font-semibold text-rose/85">
                  {CONTACT_EMAIL}
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
