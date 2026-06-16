"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/guard";
import { saveCategory, deleteCategory } from "@/lib/store";

export async function saveCategoryAction(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "").trim() || undefined;
  const nameJa = String(formData.get("nameJa") ?? "").trim();
  const key = String(formData.get("key") ?? "").trim() || nameJa;
  if (!nameJa || !key) redirect("/admin/categories");
  await saveCategory({
    id,
    key,
    nameJa,
    nameVi: String(formData.get("nameVi") ?? "").trim(),
    nameEn: String(formData.get("nameEn") ?? "").trim(),
    nameNe: String(formData.get("nameNe") ?? "").trim(),
    displayOrder: Number(formData.get("displayOrder") ?? 0) || 0,
    status: String(formData.get("status") ?? "active") === "hidden" ? "hidden" : "active",
  });
  revalidatePath("/admin/categories");
  revalidatePath("/articles");
  redirect("/admin/categories");
}

export async function deleteCategoryAction(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "");
  if (id) await deleteCategory(id);
  revalidatePath("/admin/categories");
  revalidatePath("/articles");
  redirect("/admin/categories");
}
