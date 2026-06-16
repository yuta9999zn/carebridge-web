import { getTranslations } from "next-intl/server";
import { getCategories, type CmsCategory } from "@/lib/store";
import { saveCategoryAction, deleteCategoryAction } from "./actions";

export const dynamic = "force-dynamic";

const inp = "w-full rounded-md border border-hairline px-2.5 py-1.5 text-sm outline-none focus:border-terracotta";

function Row({ c, t }: { c?: CmsCategory; t: (k: string) => string }) {
  return (
    <form action={saveCategoryAction} className="grid grid-cols-2 gap-2 rounded-xl border border-hairline bg-white p-3 md:grid-cols-7 md:items-end">
      {c?.id && <input type="hidden" name="id" value={c.id} />}
      <label className="text-xs">
        <span className="mb-1 block font-bold text-navy">Key</span>
        <input name="key" defaultValue={c?.key} required placeholder="key" className={inp} />
      </label>
      <label className="text-xs">
        <span className="mb-1 block font-bold text-navy">日本語</span>
        <input name="nameJa" defaultValue={c?.nameJa} required className={inp} />
      </label>
      <label className="text-xs">
        <span className="mb-1 block font-bold text-navy">Tiếng Việt</span>
        <input name="nameVi" defaultValue={c?.nameVi ?? ""} className={inp} />
      </label>
      <label className="text-xs">
        <span className="mb-1 block font-bold text-navy">English</span>
        <input name="nameEn" defaultValue={c?.nameEn ?? ""} className={inp} />
      </label>
      <label className="text-xs">
        <span className="mb-1 block font-bold text-navy">नेपाली</span>
        <input name="nameNe" defaultValue={c?.nameNe ?? ""} className={inp} />
      </label>
      <label className="text-xs">
        <span className="mb-1 block font-bold text-navy">#</span>
        <input name="displayOrder" type="number" defaultValue={c?.displayOrder ?? 0} className={inp} />
      </label>
      <div className="flex items-center gap-1.5">
        <select name="status" defaultValue={c?.status ?? "active"} className={inp}>
          <option value="active">active</option>
          <option value="hidden">hidden</option>
        </select>
        <button type="submit" className="shrink-0 rounded-md bg-terracotta px-3 py-1.5 text-xs font-bold text-white hover:bg-terracotta-dark">
          {t("save")}
        </button>
      </div>
    </form>
  );
}

export default async function AdminCategories() {
  const [t, cats] = await Promise.all([getTranslations("admin"), getCategories()]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">{t("nav.categories")}</h1>
      <p className="mt-1 text-sm text-muted">{t("categories.subtitle")}</p>

      <h2 className="mt-6 mb-2 text-sm font-bold text-navy">{t("categories.add")}</h2>
      <Row t={t} />

      <h2 className="mt-8 mb-2 text-sm font-bold text-navy">{t("categories.list")}</h2>
      <div className="space-y-2">
        {cats.map((c) => (
          <div key={c.id} className="flex items-start gap-2">
            <div className="flex-1">
              <Row c={c} t={t} />
            </div>
            <form action={deleteCategoryAction} className="pt-7">
              <input type="hidden" name="id" value={c.id} />
              <button type="submit" className="rounded-md border border-hairline px-3 py-1.5 text-xs font-medium text-muted hover:border-red-400 hover:text-red-500">
                {t("delete")}
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
