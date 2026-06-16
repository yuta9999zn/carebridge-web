import { getTranslations } from "next-intl/server";
import { getInquiries } from "@/lib/store";
import { setLeadStatus } from "./actions";

export const dynamic = "force-dynamic";

const STATUSES = ["New", "In progress", "Done", "Closed", "Spam"];

export default async function AdminLeads() {
  const t = await getTranslations("admin");
  const list = (await getInquiries()).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">{t("leads.title")}</h1>
      <p className="mt-1 text-sm text-muted">{t("leads.subtitle")}</p>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-hairline bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-hairline bg-cream/50 text-xs text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">{t("leads.hDate")}</th>
              <th className="px-4 py-3 font-medium">{t("leads.hFacility")}</th>
              <th className="px-4 py-3 font-medium">{t("leads.hContact")}</th>
              <th className="px-4 py-3 font-medium">{t("leads.hContactInfo")}</th>
              <th className="px-4 py-3 font-medium">{t("leads.hStatus")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {list.map((i) => (
              <tr key={i.inquiryID} className="align-top hover:bg-cream/40">
                <td className="px-4 py-3 text-muted">{new Date(i.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3 font-medium text-navy">
                  {i.facilityName}
                  {i.message && <p className="mt-1 max-w-xs text-xs font-normal text-muted">{i.message}</p>}
                </td>
                <td className="px-4 py-3 text-muted">{i.contactName}</td>
                <td className="px-4 py-3 text-muted">{i.email}</td>
                <td className="px-4 py-3">
                  <form action={setLeadStatus} className="flex items-center gap-1.5">
                    <input type="hidden" name="id" value={i.inquiryID} />
                    <select name="status" defaultValue={i.status} className="rounded-md border border-hairline px-2 py-1 text-xs">
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{t(`leadStatus.${s}`)}</option>
                      ))}
                    </select>
                    <button type="submit" className="rounded-md bg-navy px-2.5 py-1 text-xs font-bold text-white hover:bg-navy-deep">
                      {t("update")}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-muted">{t("leads.empty")}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
