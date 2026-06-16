"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ResetForm() {
  const t = useTranslations("admin");
  const router = useRouter();
  const token = useSearchParams().get("token") ?? "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message ?? "Error");
        setLoading(false);
        return;
      }
      setDone(true);
      setTimeout(() => router.replace("/admin/login"), 1500);
    } catch {
      setError("Error");
      setLoading(false);
    }
  }

  if (!token) return <p className="mt-8 text-center text-sm text-terracotta">{t("reset.invalid")}</p>;
  if (done) return <div className="mt-8 rounded-2xl bg-cream p-5 text-center text-sm text-muted">{t("reset.done")}</div>;

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      {error && <p className="rounded-lg bg-terracotta/10 px-4 py-2.5 text-sm font-medium text-terracotta">{error}</p>}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy">{t("reset.newPassword")}</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus
          className="w-full rounded-lg border border-hairline px-4 py-3 outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10" />
      </div>
      <button type="submit" disabled={loading} className="w-full rounded-full bg-terracotta px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-terracotta-dark disabled:opacity-60">
        {loading ? t("reset.loading") : t("reset.submit")}
      </button>
      <div className="text-center text-xs text-muted">
        <Link href="/admin/login" className="text-terracotta hover:underline">{t("reset.back")}</Link>
      </div>
    </form>
  );
}
