import { getTranslations } from "next-intl/server";

type Step = { owner: string; color: "rose" | "blue" | "both"; text: string };
type Phase = { label: string; tone: "rose" | "blue"; steps: Step[] };

const rowTone: Record<Phase["tone"], string> = {
  rose: "bg-rose-soft",
  blue: "bg-blue-soft",
};
const labelTone: Record<Phase["tone"], string> = {
  rose: "bg-rose text-white",
  blue: "bg-blue text-white",
};
const pillTone: Record<Step["color"], string> = {
  rose: "bg-rose text-white",
  blue: "bg-blue text-white",
  both: "bg-primary text-white",
};

export default async function Process() {
  const t = await getTranslations("process");
  const phases = t.raw("phases") as Phase[];

  return (
    <section className="bg-surface px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[680px]">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose text-base font-black text-white" aria-hidden>
            {t("no")}
          </span>
          <h2 className="mt-4 text-2xl font-bold text-primary md:text-3xl">{t("title")}</h2>
        </div>

        <div className="mt-10 space-y-7">
          {phases.map((p) => (
            <div key={p.label}>
              <span className={`inline-block rounded-full px-3.5 py-1 text-xs font-bold ${labelTone[p.tone]}`}>
                {p.label}
              </span>
              <ul className="mt-3 space-y-2.5">
                {p.steps.map((s) => (
                  <li
                    key={s.text}
                    className={`flex items-center gap-x-3 rounded-2xl px-4 py-3.5 ${rowTone[p.tone]}`}
                  >
                    <span className={`w-24 shrink-0 rounded-full px-2.5 py-0.5 text-center text-[11px] font-bold ${pillTone[s.color]}`}>
                      {s.owner}
                    </span>
                    <span className="text-sm font-medium text-fg">{s.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
