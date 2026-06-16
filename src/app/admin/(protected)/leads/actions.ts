"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/guard";
import { updateInquiryStatus } from "@/lib/store";

export async function setLeadStatus(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "New");
  if (id) await updateInquiryStatus(id, status);
  revalidatePath("/admin/leads");
  redirect("/admin/leads");
}
