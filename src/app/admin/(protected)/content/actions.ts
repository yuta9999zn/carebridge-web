"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/guard";
import { saveContentBlock } from "@/lib/store";

export async function saveContentAction(formData: FormData) {
  await requireUser();

  const keys = new Set<string>();
  for (const k of formData.keys()) {
    const m = k.match(/^(.+)::(ja|vi|en|ne)$/);
    if (m) keys.add(m[1]);
  }
  for (const key of keys) {
    await saveContentBlock(key, {
      ja: String(formData.get(`${key}::ja`) ?? ""),
      vi: String(formData.get(`${key}::vi`) ?? ""),
      en: String(formData.get(`${key}::en`) ?? ""),
      ne: String(formData.get(`${key}::ne`) ?? ""),
    });
  }
  revalidatePath("/about");
  revalidatePath("/vision");
  revalidatePath("/admin/content");
  redirect("/admin/content");
}
