"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AdminForgot() {
  const t = useTranslations("admin");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [resetUrl, setResetUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setResetUrl(data.resetUrl ?? null);
      setDone(true);
    } catch {
      setDone(true);
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-5">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(23,56,77,0.08)]">
        <p className="text-center text-lg font-black text-navy">{t("forgot.title")}</p>
        <p className="mt-1 text-center text-xs text-muted">{t("forgot.subtitle")}</p>

        {done ? (
          <div className="mt-8 rounded-2xl bg-cream p-5 text-center text-sm text-muted">
            <p>{t("forgot.sent")}</p>
            {resetUrl && (
              <p className="mt-3 break-all text-xs">
                {t("forgot.devLink")}{" "}
                <Link href={resetUrl} className="text-terracotta underline">{resetUrl}</Link>
              </p>
            )}
            <Link href="/admin/login" className="mt-4 inline-block text-xs text-terracotta hover:underline">{t("forgot.back")}</Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("login.email")} autoFocus
              className="w-full rounded-lg border border-hairline px-4 py-3 outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10" />
            <button type="submit" disabled={loading} className="w-full rounded-full bg-terracotta px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-terracotta-dark disabled:opacity-60">
              {loading ? t("forgot.loading") : t("forgot.submit")}
            </button>
            <div className="text-center text-xs text-muted">
              <Link href="/admin/login" className="text-terracotta hover:underline">{t("forgot.back")}</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
