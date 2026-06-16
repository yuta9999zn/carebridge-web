import { getTranslations } from "next-intl/server";
import ArticleForm from "@/components/admin/ArticleForm";

export const dynamic = "force-dynamic";

export default async function NewArticle() {
  const t = await getTranslations("admin");
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-navy">{t("articles.createTitle")}</h1>
      <ArticleForm />
    </div>
  );
}
