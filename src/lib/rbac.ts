/**
 * RBAC tối giản (MVP). Vai trò trong DB (AdminUser.role).
 * super_admin: toàn quyền (gồm quản lý người dùng & cấu hình pháp lý).
 * momokichi / itm_japan / admin: nghiệp vụ (bài viết, chuyên mục, nội dung, lead, booking) — KHÔNG quản lý người dùng.
 * (Phân quyền chi tiết hơn theo 05-Permission-Matrix có thể bổ sung sau.)
 */
export const ROLES = ["super_admin", "momokichi", "itm_japan"] as const;
export type Role = (typeof ROLES)[number] | string;

export type Resource = "users" | "content" | "articles" | "categories" | "leads" | "bookings" | "settings";

export function can(role: string | undefined, resource: Resource): boolean {
  if (!role) return false;
  if (role === "super_admin") return true;
  // Các vai trò khác: mọi thứ trừ quản lý người dùng & cấu hình hệ thống
  if (resource === "users" || resource === "settings") return false;
  return true;
}

export const roleLabel: Record<string, string> = {
  super_admin: "Super Admin",
  momokichi: "桃吉",
  itm_japan: "ITMジャパン",
  admin: "Admin",
};
