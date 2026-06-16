"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { can, type Resource } from "@/lib/rbac";

type Counts = { leads: number; bookings: number };

export default function AdminShell({
  children,
  counts,
  role,
}: {
  children: React.ReactNode;
  counts: Counts;
  role: string;
}) {
  const t = useTranslations("admin");
  const pathname = usePathname();

  const nav = [
    { href: "/admin", key: "dashboard", exact: true, badge: 0, res: "articles" as Resource },
    { href: "/admin/articles", key: "articles", badge: 0, res: "articles" as Resource },
    { href: "/admin/categories", key: "categories", badge: 0, res: "categories" as Resource },
    { href: "/admin/content", key: "content", badge: 0, res: "content" as Resource },
    { href: "/admin/leads", key: "leads", badge: counts.leads, res: "leads" as Resource },
    { href: "/admin/bookings", key: "bookings", badge: counts.bookings, res: "bookings" as Resource },
    { href: "/admin/users", key: "users", badge: 0, res: "users" as Resource },
  ].filter((item) => can(role, item.res));

  async function logout() {
    await signOut({ redirectTo: "/admin/login" });
  }

  const isActive = (item: (typeof nav)[number]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="flex min-h-screen bg-cream">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-hairline bg-white md:flex">
        <div className="border-b border-hairline px-5 py-4">
          <p className="text-base font-black text-navy">介護人材ナビ</p>
          <p className="text-[11px] text-muted">{t("panel")}</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive(item) ? "bg-terracotta text-white" : "text-ink/80 hover:bg-cream"
              }`}
            >
              <span>{t(`nav.${item.key}`)}</span>
              {item.badge > 0 && (
                <span
                  className={`ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                    isActive(item) ? "bg-white text-terracotta" : "bg-terracotta text-white"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="border-t border-hairline p-3">
          <div className="px-2 pb-2">
            <LanguageSwitcher />
          </div>
          <Link href="/" className="block rounded-lg px-4 py-2 text-xs text-muted hover:text-terracotta">
            ← {t("viewSite")}
          </Link>
          <button onClick={logout} className="mt-1 w-full rounded-lg px-4 py-2 text-left text-xs text-muted hover:text-terracotta">
            {t("logout")}
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between gap-3 border-b border-hairline bg-white px-5 py-3 md:hidden">
          <span className="text-sm font-black text-navy">介護人材ナビ</span>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button onClick={logout} className="text-xs text-muted">{t("logout")}</button>
          </div>
        </header>
        {/* mobile nav */}
        <nav className="flex gap-2 overflow-x-auto border-b border-hairline bg-white px-4 py-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${
                isActive(item) ? "bg-terracotta text-white" : "bg-cream text-ink/70"
              }`}
            >
              {t(`nav.${item.key}`)}
              {item.badge > 0 && (
                <span className="inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-terracotta">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
