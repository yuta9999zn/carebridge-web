"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/guard";
import { updateBookingStatus } from "@/lib/store";

export async function setBookingStatus(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "受付待ち");
  const cancelReason = String(formData.get("cancelReason") ?? "");
  if (id) await updateBookingStatus(id, status, cancelReason);
  revalidatePath("/admin/bookings");
  redirect("/admin/bookings");
}
