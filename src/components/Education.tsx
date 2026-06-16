import { getTranslations } from "next-intl/server";

type Pro = { tag: string; name: string; items: string[] };

export default async function Education() {
  const t = await getTranslations("education");
  const proA = t.raw("proA") as Pro;
  const proB = t.raw("proB") as Pro;

  return (
    <section className="bg-mint px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[760px]">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose text-base font-black text-white" aria-hidden>
            {t("no")}
          </span>
          <h2 className="mt-4 text-2xl font-bold text-primary md:text-3xl">{t("title")}</h2>
        </div>

        <p className="mt-6 text-sm leading-7 text-fg md:text-[15px]">{t("lead1")}</p>
        <p className="mt-3 text-sm leading-7 text-fg md:text-[15px]">{t("lead2")}</p>

        {/* Hai chuyên môn */}
        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          {/* 介護のプロ — momokichi (hồng) */}
          <div className="rounded-2xl border border-rose/30 bg-rose-soft p-6">
            <span className="inline-block rounded-full bg-rose px-3 py-1 text-xs font-bold text-white">{proA.tag}</span>
            <p className="mt-3 text-lg font-black text-primary">{proA.name}</p>
            <ul className="mt-4 space-y-2.5">
              {proA.items.map((it) => (
                <li key={it} className="flex items-start gap-2 text-sm leading-6 text-fg">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" aria-hidden />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* 教育のプロ — ITM (teal) */}
          <div className="rounded-2xl border border-blue/30 bg-blue-soft p-6">
            <span className="inline-block rounded-full bg-blue px-3 py-1 text-xs font-bold text-white">{proB.tag}</span>
            <p className="mt-3 text-lg font-black text-primary">{proB.name}</p>
            <ul className="mt-4 space-y-2.5">
              {proB.items.map((it) => (
                <li key={it} className="flex items-start gap-2 text-sm leading-6 text-fg">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" aria-hidden />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Nhãn kết quả */}
        <div className="mt-5 flex justify-center">
          <span className="rounded-full border border-line bg-surface px-5 py-2 text-sm font-bold text-primary shadow-card">
            ↓ {t("centerLabel")}
          </span>
        </div>

        <p className="mt-8 text-sm leading-7 text-fg-muted md:text-[15px]">{t("history")}</p>

        {/* Banner người tài cung cấp */}
        <div className="mt-8 rounded-2xl border-2 border-rose bg-surface p-6 text-center">
          <p className="text-xs font-bold tracking-wide text-rose">{t("highlightLabel")}</p>
          <p className="mt-2 text-base font-bold leading-7 text-primary md:text-lg">{t("highlight")}</p>
        </div>
      </div>
    </section>
  );
}
