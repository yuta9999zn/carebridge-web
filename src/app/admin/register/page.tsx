"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function AdminRegister() {
  const t = useTranslations("admin");
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message ?? "Error");
        setLoading(false);
        return;
      }
      await signIn("credentials", { email: form.email, password: form.password, redirect: false });
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Error");
      setLoading(false);
    }
  }

  const inp = "w-full rounded-lg border border-hairline px-4 py-3 outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10";

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-5">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(23,56,77,0.08)]">
        <p className="text-center text-lg font-black text-navy">{t("register.title")}</p>
        <p className="mt-1 text-center text-xs text-muted">{t("register.subtitle")}</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          {error && <p className="rounded-lg bg-terracotta/10 px-4 py-2.5 text-sm font-medium text-terracotta">{error}</p>}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy">{t("register.name")}</label>
            <input value={form.fullName} onChange={set("fullName")} className={inp} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy">{t("register.email")}</label>
            <input type="email" value={form.email} onChange={set("email")} className={inp} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy">{t("register.password")}</label>
            <input type="password" value={form.password} onChange={set("password")} className={inp} />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-full bg-terracotta px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-terracotta-dark disabled:opacity-60">
            {loading ? t("register.loading") : t("register.submit")}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-muted">
          {t("register.have")}{" "}
          <Link href="/admin/login" className="text-terracotta hover:underline">{t("register.toLogin")}</Link>
        </div>
      </div>
    </div>
  );
}
