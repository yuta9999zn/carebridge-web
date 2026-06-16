import { getTranslations } from "next-intl/server";
import { getContentRaw } from "@/lib/store";
import { CONTENT_SCHEMA } from "@/content/cms-schema";
import { saveContentAction } from "./actions";

export const dynamic = "force-dynamic";

const cell = "w-full rounded-md border border-hairline px-2.5 py-1.5 text-sm outline-none focus:border-terracotta";

export default async function AdminContent() {
  const [t, raw] = await Promise.all([getTranslations("admin"), getContentRaw()]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy">{t("nav.content")}</h1>
        <p className="mt-1 text-sm text-muted">{t("content.subtitle")}</p>
      </div>

      {CONTENT_SCHEMA.map((group) => (
        <form key={group.id} action={saveContentAction} className="rounded-2xl border border-hairline bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-navy">{group.title}</h2>
            <button type="submit" className="rounded-full bg-terracotta px-5 py-2 text-sm font-bold text-white hover:bg-terracotta-dark">
              {t("save")}
            </button>
          </div>

          <div className="space-y-5">
            {group.fields.map((f) => {
              const v = raw[f.key] ?? { ja: "", vi: "", en: "", ne: "" };
              return (
                <div key={f.key} className="rounded-xl bg-cream/40 p-3">
                  <p className="mb-2 text-xs font-bold text-navy">{f.label} <span className="font-normal text-muted">({f.key})</span></p>
                  <div className="grid gap-2 md:grid-cols-2">
                    {(["ja", "vi", "en", "ne"] as const).map((loc) => {
                      const label = { ja: "日本語", vi: "Tiếng Việt", en: "English", ne: "नेपाली" }[loc];
                      const name = `${f.key}::${loc}`;
                      return (
                        <label key={loc} className="block text-xs">
                          <span className="mb-1 block text-muted">{label}</span>
                          {f.type === "textarea" ? (
                            <textarea name={name} rows={2} defaultValue={v[loc]} className={cell} />
                          ) : (
                            <input name={name} defaultValue={v[loc]} className={cell} />
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      ))}
    </div>
  );
}
