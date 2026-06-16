import { getTranslations } from "next-intl/server";

type PriceCard = { name: string; price: string; unit: string; note: string };

export default async function Cost() {
  const t = await getTranslations("cost");
  const cards = t.raw("cards") as PriceCard[];
  const included = t.raw("included") as string[];
  const extra = t.raw("extra") as string[];

  return (
    <section className="bg-mint px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[680px]">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose text-base font-black text-white" aria-hidden>
            {t("no")}
          </span>
          <h2 className="mt-4 text-2xl font-bold text-primary md:text-3xl">{t("title")}</h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {cards.map((c) => (
            <article key={c.name} className="rounded-2xl border border-line bg-surface p-6 text-center shadow-card">
              <h3 className="text-sm font-bold text-fg">{c.name}</h3>
              <p className="mt-3 flex items-baseline justify-center gap-1 text-blue">
                <span className="text-3xl font-black md:text-4xl">{c.price}</span>
                <span className="text-sm font-bold">{c.unit}</span>
              </p>
              <p className="mt-3 text-xs leading-5 text-fg-muted">{c.note}</p>
            </article>
          ))}
        </div>

        {/* 料金に含まれます */}
        <div className="mt-5 rounded-2xl bg-blue-soft p-5">
          <p className="text-sm font-bold text-blue">{t("includedLabel")}</p>
          <p className="mt-2 text-sm leading-7 text-fg">{included.join("　／　")}</p>
        </div>

        {/* 別途、実費 */}
        <div className="mt-4 rounded-2xl border border-dashed border-line bg-surface p-5">
          <p className="text-sm font-bold text-fg-muted">{t("extraLabel")}</p>
          <p className="mt-2 text-sm leading-7 text-fg-muted">{extra.join("　／　")}</p>
        </div>

        <p className="mt-5 text-center text-xs text-fg-muted">{t("taxNote")}</p>
      </div>
    </section>
  );
}
