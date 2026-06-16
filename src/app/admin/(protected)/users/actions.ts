"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { can } from "@/lib/rbac";
import { createAdminUserWithRole, updateUserRole, setUserStatus, deleteAdminUser } from "@/lib/store";

async function guard() {
  const session = await auth();
  const u = session?.user;
  if (!u || !can(u.role, "users")) redirect("/admin");
  return u;
}

export async function createUserAction(formData: FormData) {
  await guard();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("fullName") ?? "").trim();
  const role = String(formData.get("role") ?? "momokichi");
  if (email && password.length >= 8) {
    try {
      await createAdminUserWithRole({ email, password, fullName, role });
    } catch {
      /* duplicate email — bỏ qua, có thể nâng cấp báo lỗi sau */
    }
  }
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function updateRoleAction(formData: FormData) {
  await guard();
  const id = String(formData.get("id") ?? "");
  const role = String(formData.get("role") ?? "");
  if (id && role) await updateUserRole(id, role);
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function setStatusAction(formData: FormData) {
  await guard();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "active");
  if (id) await setUserStatus(id, status);
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteUserAction(formData: FormData) {
  const me = await guard();
  const id = String(formData.get("id") ?? "");
  if (id && id !== me.id) await deleteAdminUser(id); // không tự xóa mình
  revalidatePath("/admin/users");
  redirect("/admin/users");
}
