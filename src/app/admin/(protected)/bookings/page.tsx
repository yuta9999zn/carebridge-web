import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getBookings, BOOKING_STATUSES } from "@/lib/store";
import { setBookingStatus } from "./actions";

export const dynamic = "force-dynamic";

const statusColor: Record<string, string> = {
  受付待ち: "bg-amber-100 text-amber-700",
  進行中: "bg-blue-100 text-blue-700",
  完了: "bg-green-100 text-green-700",
  キャンセル: "bg-gray-200 text-gray-600",
};
const statusKey: Record<string, string> = {
  受付待ち: "st_wait",
  進行中: "st_progress",
  完了: "st_done",
  キャンセル: "st_cancel",
};

export default async function AdminBookings({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const t = await getTranslations("admin");
  const { status } = await searchParams;
  const active = status && BOOKING_STATUSES.includes(status as (typeof BOOKING_STATUSES)[number]) ? status : "";
  const [list, all] = await Promise.all([getBookings(active || undefined), getBookings()]);
  const countBy = (s: string) => all.filter((b) => b.status === s).length;
  const sLabel = (s: string) => t(`bookings.${statusKey[s] ?? "st_wait"}`);

  const tabs = [
    { key: "", label: `${t("all")} (${all.length})` },
    ...BOOKING_STATUSES.map((s) => ({ key: s, label: `${sLabel(s)} (${countBy(s)})` })),
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">{t("bookings.title")}</h1>
      <p className="mt-1 text-sm text-muted">{t("bookings.subtitle")}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={tab.key ? `/admin/bookings?status=${encodeURIComponent(tab.key)}` : "/admin/bookings"}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
              active === tab.key ? "bg-navy text-white" : "bg-white text-ink/70 ring-1 ring-hairline hover:text-terracotta"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-hairline bg-white">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-hairline bg-cream/50 text-xs text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">{t("bookings.hDate")}</th>
              <th className="px-4 py-3 font-medium">{t("bookings.hCustomer")}</th>
              <th className="px-4 py-3 font-medium">{t("bookings.hContact")}</th>
              <th className="px-4 py-3 font-medium">{t("bookings.hPreferred")}</th>
              <th className="px-4 py-3 font-medium">{t("bookings.hType")}</th>
              <th className="px-4 py-3 font-medium">{t("bookings.hStatus")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {list.map((b) => (
              <tr key={b.bookingID} className="align-top hover:bg-cream/40">
                <td className="px-4 py-3 text-muted">{new Date(b.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-navy">{b.customerName}</p>
                  {b.organization && <p className="text-xs text-muted">{b.organization}</p>}
                  {b.topic && <p className="mt-1 max-w-xs text-xs text-muted">{b.topic}</p>}
                </td>
                <td className="px-4 py-3 text-muted">
                  {b.email && <p>{b.email}</p>}
                  {b.phone && <p>{b.phone}</p>}
                </td>
                <td className="px-4 py-3 text-muted">{b.preferredAt ? new Date(b.preferredAt).toLocaleString() : "-"}</td>
                <td className="px-4 py-3 text-muted">{b.meetingType ?? "-"}</td>
                <td className="px-4 py-3">
                  <span className={`mb-2 inline-block rounded-full px-2.5 py-1 text-[11px] font-bold ${statusColor[b.status] ?? "bg-cream"}`}>
                    {sLabel(b.status)}
                  </span>
                  {b.status === "キャンセル" && b.cancelReason && (
                    <p className="mb-2 text-xs text-muted">{t("bookings.reason")}: {b.cancelReason}</p>
                  )}
                  <form action={setBookingStatus} className="flex flex-wrap items-center gap-1.5">
                    <input type="hidden" name="id" value={b.bookingID} />
                    <select name="status" defaultValue={b.status} className="rounded-md border border-hairline px-2 py-1 text-xs">
                      {BOOKING_STATUSES.map((s) => (
                        <option key={s} value={s}>{sLabel(s)}</option>
                      ))}
                    </select>
                    <input name="cancelReason" placeholder={t("bookings.reasonPh")} className="w-28 rounded-md border border-hairline px-2 py-1 text-xs" />
                    <button type="submit" className="rounded-md bg-navy px-2.5 py-1 text-xs font-bold text-white hover:bg-navy-deep">{t("update")}</button>
                  </form>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-muted">{t("bookings.empty")}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
