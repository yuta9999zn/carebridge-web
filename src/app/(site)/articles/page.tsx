import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import ArticlesView from "@/components/ArticlesView";
import Stats from "@/components/Stats";
import { getPublishedArticles, getLocalizedCategories } from "@/lib/store";
import { localize } from "@/content/articles";
import { pageTitle } from "@/content/site";

export const metadata: Metadata = { title: pageTitle("記事・活動レポート") };
export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const locale = await getLocale();
  const [raw, t, cats] = await Promise.all([
    getPublishedArticles(),
    getTranslations("articles"),
    getLocalizedCategories(locale, true),
  ]);
  const articles = raw.map((a) => localize(a, locale));
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
      <ArticlesView articles={articles} cats={cats} />
      <Stats />
    </>
  );
}
