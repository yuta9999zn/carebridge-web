"use client";

import { useState, useId } from "react";
import { useTranslations } from "next-intl";
import SectionHead from "./SectionHead";

export default function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="bg-ivory px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHead eyebrow={t("eyebrow")} title={t("title")} />

        <div className="mt-12 flex flex-col gap-3 md:mt-14">
          {items.map((item, i) => {
            const active = open === i;
            const btnId = `${baseId}-q-${i}`;
            const panelId = `${baseId}-a-${i}`;
            return (
              <div key={i} className="overflow-hidden rounded-2xl border border-line bg-surface">
                <h3>
                  <button
                    type="button"
                    id={btnId}
                    aria-expanded={active}
                    aria-controls={panelId}
                    onClick={() => setOpen(active ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-bold text-primary md:px-6"
                  >
                    <span>{item.q}</span>
                    <span
                      className={`shrink-0 text-secondary transition-transform duration-300 ${active ? "rotate-180" : ""}`}
                      aria-hidden
                    >
                      ▾
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  hidden={!active}
                  className="px-5 pb-5 text-[15px] leading-7 text-fg-muted md:px-6"
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
