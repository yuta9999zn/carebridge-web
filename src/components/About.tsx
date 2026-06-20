import { getTranslations } from "next-intl/server";
import { IconArrow } from "./Icons";

type CompanyA = {
  no: string;
  kicker: string;
  name: string;
  role: string;
  desc: string;
  points: string[];
  link: string;
};
type Stat = { value: string; label: string };
type CompanyB = CompanyA & {
  visaLabel: string;
  visas: string[];
  stats: Stat[];
  statsNote: string;
  regLabel: string;
  reg: string;
  licenseLabel: string;
  license: string;
};

export default async function About() {
  const t = await getTranslations("about");
  const a = t.raw("companyA") as CompanyA;
  const b = t.raw("companyB") as CompanyB;

  return (
    <section className="bg-ivory px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[760px]">
        {/* Divider「私たちについて」 */}
        <div className="flex flex-col items-center">
          <span aria-hidden className="h-10 w-px bg-line" />
          <span className="mt-4 text-sm font-bold tracking-wide text-fg-muted">{t("divider")}</span>
          <h2 className="mt-5 text-center text-xl font-bold leading-relaxed text-primary md:text-2xl">
            {t("lead")}
          </h2>
        </div>

        <div className="mt-12 space-y-6">
          {/* momokichi — accent hồng */}
          <article className="rounded-3xl border border-line border-l-4 border-l-rose bg-surface p-7 shadow-card md:p-9">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose text-sm font-black text-white" aria-hidden>
                {a.no}
              </span>
              <p className="text-sm font-bold text-rose">{a.kicker}</p>
            </div>
            <h3 className="mt-4 text-2xl font-black text-primary">{a.name}</h3>
            <p className="mt-1 text-sm font-medium text-fg-muted">{a.role}</p>
            <p className="mt-4 text-sm leading-7 text-fg">{a.desc}</p>
            <ul className="mt-5 space-y-3">
              {a.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm leading-7 text-fg">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" aria-hidden />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://momokichi2011.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-rose underline-offset-4 hover:underline"
            >
              {a.link}
              <IconArrow className="h-4 w-4" />
            </a>
          </article>

          {/* ITMジャパン — accent teal */}
          <article className="rounded-3xl border border-line border-l-4 border-l-blue bg-surface p-7 shadow-card md:p-9">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue text-sm font-black text-white" aria-hidden>
                {b.no}
              </span>
              <p className="text-sm font-bold text-blue">{b.kicker}</p>
            </div>
            <h3 className="mt-4 text-2xl font-black text-primary">{b.name}</h3>
            <p className="mt-1 text-sm font-medium text-fg-muted">{b.role}</p>
            <p className="mt-4 text-sm leading-7 text-fg">{b.desc}</p>
            <ul className="mt-5 space-y-3">
              {b.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm leading-7 text-fg">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" aria-hidden />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            {/* 対応する在留資格 */}
            <p className="mt-6 text-xs font-bold text-fg-muted">{b.visaLabel}</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {b.visas.map((v) => (
                <span key={v} className="rounded-full bg-blue-soft px-3 py-1 text-xs font-bold text-blue">
                  {v}
                </span>
              ))}
            </div>

            {/* 実績 */}
            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 rounded-2xl bg-blue-soft p-5 sm:grid-cols-4">
              {b.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <dd className="text-2xl font-black text-blue md:text-3xl">{s.value}</dd>
                  <dt className="mt-1 text-[11px] leading-4 text-fg-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-right text-[11px] text-fg-muted">{b.statsNote}</p>

            {/* 許可番号 */}
            <div className="mt-4 space-y-2 border-t border-line pt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-fg-muted">{b.regLabel}</span>
                <span className="font-mono text-sm font-bold tracking-wider text-blue">{b.reg}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-fg-muted">{b.licenseLabel}</span>
                <span className="font-mono text-sm font-bold tracking-wider text-blue">{b.license}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
