import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ArticleForm from "@/components/admin/ArticleForm";
import { getArticleById } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function EditArticle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [t, article] = await Promise.all([getTranslations("admin"), getArticleById(id)]);
  if (!article) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-navy">{t("articles.editTitle")}</h1>
      <ArticleForm article={article} />
    </div>
  );
}
