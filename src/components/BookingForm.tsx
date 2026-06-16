"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "loading" | "sent";

export default function BookingForm() {
  const t = useTranslations("booking");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      customerName: String(fd.get("customerName") ?? ""),
      organization: String(fd.get("organization") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      preferredAt: String(fd.get("preferredAt") ?? ""),
      meetingType: String(fd.get("meetingType") ?? "オンライン"),
      topic: String(fd.get("topic") ?? ""),
      consent: fd.get("consent") === "on",
    };
    setStatus("loading");
    try {
      const res = await fetch("/api/bookings", {
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

  const cls =
    "w-full rounded-lg border border-line px-4 py-3.5 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15";
  const lbl = "mb-2 block text-sm font-medium text-primary";

  if (status === "sent") {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl bg-surface p-10 text-center shadow-soft">
        <p className="text-lg font-bold text-primary">{t("successTitle")}</p>
        <p className="mt-2 text-sm text-fg-muted">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto max-w-2xl rounded-3xl bg-surface p-6 shadow-soft md:p-10">
      {error && <p className="mb-5 rounded-lg bg-danger/10 px-4 py-3 text-sm font-medium text-danger">{error}</p>}

      <div className="mb-5">
        <label htmlFor="customerName" className={lbl}>{t("name")} <span className="text-danger">*</span></label>
        <input id="customerName" name="customerName" className={cls} />
      </div>
      <div className="mb-5">
        <label htmlFor="organization" className={lbl}>{t("organization")}</label>
        <input id="organization" name="organization" className={cls} />
      </div>
      <div className="mb-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={lbl}>{t("email")}</label>
          <input id="email" name="email" type="email" className={cls} />
        </div>
        <div>
          <label htmlFor="phone" className={lbl}>{t("phone")}</label>
          <input id="phone" name="phone" className={cls} />
        </div>
      </div>
      <p className="-mt-2 mb-5 text-xs text-muted">{t("contactNote")}</p>
      <div className="mb-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="preferredAt" className={lbl}>{t("preferredAt")} <span className="text-danger">*</span></label>
          <input id="preferredAt" name="preferredAt" type="datetime-local" className={cls} />
        </div>
        <div>
          <label htmlFor="meetingType" className={lbl}>{t("meetingType")} <span className="text-danger">*</span></label>
          <select id="meetingType" name="meetingType" className={cls} defaultValue="オンライン">
            <option value="オンライン">{t("online")}</option>
            <option value="対面">{t("inPerson")}</option>
            <option value="電話">{t("phoneType")}</option>
          </select>
        </div>
      </div>
      <div className="mb-5">
        <label htmlFor="topic" className={lbl}>{t("topic")}</label>
        <textarea id="topic" name="topic" rows={4} placeholder={t("topicPlaceholder")} className={cls} />
      </div>
      <label className="mb-6 flex items-start gap-2.5 text-sm text-muted">
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
        className="w-full rounded-full bg-primary px-8 py-4 font-bold text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {status === "loading" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
