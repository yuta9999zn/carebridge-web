import { getTranslations } from "next-intl/server";

type Item = { title: string; desc: string };

export default async function WhyNepal() {
  const t = await getTranslations("nepal");
  const items = t.raw("items") as Item[];

  return (
    <section className="bg-ivory px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[760px]">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose text-base font-black text-white" aria-hidden>
            {t("no")}
          </span>
          <h2 className="mt-4 text-2xl font-bold text-primary md:text-3xl">{t("title")}</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-fg-muted">{t("lead")}</p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((it, i) => (
            <li key={it.title} className="rounded-2xl border border-line bg-surface p-5 shadow-card">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose text-xs font-black text-white" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="text-base font-bold text-primary">{it.title}</h3>
              </div>
              <p className="mt-2.5 text-sm leading-6 text-fg-muted">{it.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
