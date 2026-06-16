import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getArticles, getInquiries, getBookings } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const [t, articles, inquiries, bookings] = await Promise.all([
    getTranslations("admin"),
    getArticles(),
    getInquiries(),
    getBookings(),
  ]);

  const cards = [
    { label: t("dashboard.articles"), value: articles.length, sub: `${t("dashboard.published")} ${articles.filter((a) => a.status !== "draft").length}`, href: "/admin/articles" },
    { label: t("dashboard.inquiries"), value: inquiries.length, sub: `${t("dashboard.newCount")} ${inquiries.filter((i) => i.status === "New").length}`, href: "/admin/leads" },
    { label: t("dashboard.bookings"), value: bookings.length, sub: `${t("dashboard.pending")} ${bookings.filter((b) => b.status === "受付待ち").length}`, href: "/admin/bookings" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">{t("dashboard.title")}</h1>
      <p className="mt-1 text-sm text-muted">{t("dashboard.subtitle")}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-hairline bg-white p-6 shadow-[0_4px_12px_rgba(23,56,77,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(23,56,77,0.12)]"
          >
            <p className="text-sm text-muted">{c.label}</p>
            <p className="mt-2 text-4xl font-black text-navy">{c.value}</p>
            <p className="mt-1 text-xs text-terracotta">{c.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-hairline bg-white p-6">
        <h2 className="text-base font-bold text-navy">{t("dashboard.quick")}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/articles/new" className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-bold text-white hover:bg-terracotta-dark">
            {t("dashboard.newArticle")}
          </Link>
          <Link href="/admin/leads" className="rounded-full border border-hairline px-5 py-2.5 text-sm font-bold text-ink/80 hover:border-terracotta hover:text-terracotta">
            {t("dashboard.checkInquiries")}
          </Link>
        </div>
      </div>
    </div>
  );
}
