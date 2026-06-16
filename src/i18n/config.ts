export const locales = ["ja", "vi", "en", "ne"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ja";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeLabels: Record<Locale, string> = {
  ja: "日本語",
  vi: "Tiếng Việt",
  en: "English",
  ne: "नेपाली",
};
