"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function AdminLogin() {
  const t = useTranslations("admin");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", { email, password, redirect: false });
      if (!res || res.error) {
        setError("メールアドレスまたはパスワードが正しくありません。");
        setLoading(false);
        return;
      }
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
        <p className="text-center text-lg font-black text-navy">介護人材ナビ</p>
        <p className="mt-1 text-center text-xs text-muted">{t("login.title")}</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          {error && <p className="rounded-lg bg-terracotta/10 px-4 py-2.5 text-sm font-medium text-terracotta">{error}</p>}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">{t("login.email")}</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus className={inp} />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy">{t("login.password")}</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inp} />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-full bg-terracotta px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-terracotta-dark disabled:opacity-60">
            {loading ? t("login.loading") : t("login.submit")}
          </button>
        </form>

        <div className="mt-5 flex justify-between text-xs text-muted">
          <Link href="/admin/register" className="hover:text-terracotta">{t("login.toRegister")}</Link>
          <Link href="/admin/forgot" className="hover:text-terracotta">{t("login.toForgot")}</Link>
        </div>
      </div>
    </div>
  );
}
