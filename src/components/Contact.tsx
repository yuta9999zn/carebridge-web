"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import SectionTitle from "./SectionTitle";
import { IconPhone, IconMail } from "./Icons";
import { CONTACT_TEL, CONTACT_TEL_HREF, CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "@/content/site";

type Status = "idle" | "loading" | "sent";

export default function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      facilityName: String(fd.get("company") ?? ""),
      contactName: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
    };
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message ?? t("errorGeneric"));
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setError(t("errorGeneric"));
      setStatus("idle");
    }
  }

  const inputCls =
    "w-full rounded-lg border border-line px-4 py-3.5 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15";

  return (
    <section id="contact" className="px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1120px]">
        <SectionTitle eyebrow={t("eyebrow")} title={t("title")} />
        <p className="-mt-6 mb-8 text-center text-[15px] leading-7 text-fg-muted md:mb-10">{t("lead")}</p>

        <div className="mx-auto max-w-3xl rounded-3xl bg-surface p-6 shadow-soft md:p-14">
          <p className="mb-6 text-center text-sm text-fg-muted">
            <span className="rounded-full bg-mint px-3 py-1 text-xs font-medium text-primary">{t("personLabel")}</span>
            <span className="ml-2 font-bold text-primary">{t("person")}</span>
            <span className="ml-2">{t("personCompany")}</span>
          </p>
          {/* Yêu cầu khách 2026-08-14: dùng số ĐT/email thật của 大林 và hiện luôn trong nút. */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row">
            {/* Icon nằm ngoài cột chữ → 2 dòng chữ căn giữa với nhau, không bị icon đẩy lệch. */}
            <a
              href={CONTACT_TEL_HREF}
              className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-primary px-5 py-3.5 text-center font-bold text-white transition-colors hover:bg-primary-hover"
            >
              <IconPhone className="h-5 w-5 shrink-0" />
              <span className="flex min-w-0 flex-col items-center gap-0.5 leading-tight">
                <span>{CONTACT_TEL}</span>
                <span className="text-xs font-normal text-white/80">{t("telNote")}</span>
              </span>
            </a>
            <a
              href={CONTACT_EMAIL_HREF}
              className="flex flex-1 items-center justify-center gap-2.5 rounded-full border-2 border-primary bg-surface px-5 py-3.5 text-center font-bold text-primary transition-colors hover:bg-mint"
            >
              <IconMail className="h-5 w-5 shrink-0" />
              <span className="flex min-w-0 flex-col items-center gap-0.5 leading-tight">
                <span>{t("mail")}</span>
                <span className="max-w-full break-all text-xs font-semibold text-primary/80">{CONTACT_EMAIL}</span>
              </span>
            </a>
          </div>

          {status === "sent" ? (
            <div className="rounded-2xl bg-mint p-8 text-center">
              <p className="text-lg font-bold text-primary">{t("successTitle")}</p>
              <p className="mt-2 text-sm text-fg-muted">{t("successBody")}</p>
            </div>
          ) : (
            <form id="contact-form" onSubmit={onSubmit} noValidate>
              {error && (
                <p className="mb-5 rounded-lg bg-danger/10 px-4 py-3 text-sm font-medium text-danger">{error}</p>
              )}
              <div className="mb-5">
                <label htmlFor="company" className="mb-2 block text-sm font-medium text-primary">
                  {t("company")} <span className="text-danger">*</span>
                </label>
                <input id="company" name="company" className={inputCls} />
              </div>
              <div className="mb-5">
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-primary">
                  {t("name")} <span className="text-danger">*</span>
                </label>
                <input id="name" name="name" className={inputCls} />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-primary">
                  {t("email")} <span className="text-danger">*</span>
                </label>
                <input id="email" name="email" type="email" className={inputCls} />
              </div>
              <div className="mb-5">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-primary">{t("message")}</label>
                <textarea id="message" name="message" rows={5} placeholder={t("messagePlaceholder")} className={inputCls} />
              </div>
              <label className="mb-6 flex items-start gap-2.5 text-sm text-fg-muted">
                <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-primary" />
                <span>
                  {t("consentPre")}
                  <a href="/privacy" className="text-primary underline">{t("consentLink")}</a>
                  {t("consentPost")} <span className="text-danger">*</span>
                </span>
              </label>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-primary px-8 py-4 font-bold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? t("sending") : t("submit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
