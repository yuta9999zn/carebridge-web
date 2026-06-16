import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import ResetForm from "@/components/admin/ResetForm";

export const dynamic = "force-dynamic";

export default async function AdminReset() {
  const t = await getTranslations("admin");
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-5">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(23,56,77,0.08)]">
        <p className="text-center text-lg font-black text-navy">{t("reset.title")}</p>
        <Suspense fallback={<p className="mt-8 text-center text-sm text-muted">...</p>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}
