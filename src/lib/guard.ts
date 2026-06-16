import { redirect } from "next/navigation";
import { auth } from "@/auth";

/** Yêu cầu đã đăng nhập (Auth.js). Trả về session.user, ngược lại redirect login. */
export async function requireUser() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session.user;
}
