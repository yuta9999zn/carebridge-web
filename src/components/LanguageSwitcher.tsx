"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { locales, localeLabels, LOCALE_COOKIE } from "@/i18n/config";
import { IconGlobe } from "./Icons";

export default function LanguageSwitcher() {
  const router = useRouter();
  const current = useLocale();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function choose(code: string) {
    // eslint-disable-next-line react-hooks/immutability -- document.cookie is a browser API setter, not a React binding
    document.cookie = `${LOCALE_COOKIE}=${code};path=/;max-age=31536000`;
    setOpen(false);
    startTransition(() => router.refresh());
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="言語を切り替える"
        aria-expanded={open}
        disabled={pending}
        className="flex items-center gap-1.5 rounded-full border border-hairline bg-white px-3 py-2 text-xs font-medium text-ink/80 transition-colors hover:border-terracotta hover:text-terracotta disabled:opacity-60"
      >
        <IconGlobe className="h-4 w-4" />
        <span className="hidden sm:inline">{localeLabels[current as keyof typeof localeLabels] ?? "言語"}</span>
        <span className={`text-[9px] transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
          <ul className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-hairline bg-white py-1 shadow-[0_10px_30px_rgba(23,56,77,0.12)]">
            {locales.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  onClick={() => choose(code)}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-cream ${
                    current === code ? "font-bold text-terracotta" : "text-ink/80"
                  }`}
                >
                  {localeLabels[code]}
                  {current === code && <span className="text-xs">✓</span>}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
