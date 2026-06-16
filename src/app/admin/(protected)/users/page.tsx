import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { can, ROLES, roleLabel } from "@/lib/rbac";
import { getAdminUsers } from "@/lib/store";
import { createUserAction, updateRoleAction, setStatusAction, deleteUserAction } from "./actions";

export const dynamic = "force-dynamic";

const inp = "rounded-md border border-hairline px-2.5 py-1.5 text-sm outline-none focus:border-terracotta";

export default async function AdminUsers() {
  const session = await auth();
  const me = session?.user;
  if (!me || !can(me.role, "users")) redirect("/admin");
  const [t, users] = await Promise.all([getTranslations("admin"), getAdminUsers()]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">{t("users.title")}</h1>
      <p className="mt-1 text-sm text-muted">{t("users.subtitle")}</p>

      {/* tạo mới */}
      <form action={createUserAction} className="mt-5 flex flex-wrap items-end gap-2 rounded-2xl border border-hairline bg-white p-4">
        <label className="text-xs"><span className="mb-1 block font-bold text-navy">{t("users.name")}</span><input name="fullName" className={inp} /></label>
        <label className="text-xs"><span className="mb-1 block font-bold text-navy">Email</span><input name="email" type="email" required className={inp} /></label>
        <label className="text-xs"><span className="mb-1 block font-bold text-navy">{t("users.password")}</span><input name="password" type="password" required className={inp} /></label>
        <label className="text-xs"><span className="mb-1 block font-bold text-navy">{t("users.role")}</span>
          <select name="role" defaultValue="momokichi" className={inp}>
            {ROLES.map((r) => <option key={r} value={r}>{roleLabel[r]}</option>)}
          </select>
        </label>
        <button type="submit" className="rounded-full bg-terracotta px-5 py-2 text-sm font-bold text-white hover:bg-terracotta-dark">{t("users.add")}</button>
      </form>

      {/* danh sách */}
      <div className="mt-5 overflow-x-auto rounded-2xl border border-hairline bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-hairline bg-cream/50 text-xs text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">{t("users.name")} / Email</th>
              <th className="px-4 py-3 font-medium">{t("users.role")}</th>
              <th className="px-4 py-3 font-medium">{t("users.status")}</th>
              <th className="px-4 py-3 text-right font-medium">{t("users.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-cream/40">
                <td className="px-4 py-3">
                  <p className="font-medium text-navy">{u.fullName}{u.id === me.id && <span className="ml-1 text-[10px] text-terracotta">(あなた)</span>}</p>
                  <p className="text-xs text-muted">{u.email}</p>
                </td>
                <td className="px-4 py-3">
                  <form action={updateRoleAction} className="flex items-center gap-1.5">
                    <input type="hidden" name="id" value={u.id} />
                    <select name="role" defaultValue={u.role} className={inp}>
                      {ROLES.map((r) => <option key={r} value={r}>{roleLabel[r]}</option>)}
                    </select>
                    <button type="submit" className="rounded-md bg-navy px-2.5 py-1 text-xs font-bold text-white hover:bg-navy-deep">{t("update")}</button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${u.status === "active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{u.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    {u.status === "active" ? (
                      <form action={setStatusAction}>
                        <input type="hidden" name="id" value={u.id} /><input type="hidden" name="status" value="disabled" />
                        <button className="rounded-md border border-hairline px-3 py-1.5 text-xs hover:border-amber-400 hover:text-amber-600">{t("users.disable")}</button>
                      </form>
                    ) : (
                      <form action={setStatusAction}>
                        <input type="hidden" name="id" value={u.id} /><input type="hidden" name="status" value="active" />
                        <button className="rounded-md border border-hairline px-3 py-1.5 text-xs hover:border-green-400 hover:text-green-600">{t("users.enable")}</button>
                      </form>
                    )}
                    {u.id !== me.id && (
                      <form action={deleteUserAction}>
                        <input type="hidden" name="id" value={u.id} />
                        <button className="rounded-md border border-hairline px-3 py-1.5 text-xs text-muted hover:border-red-400 hover:text-red-500">{t("delete")}</button>
                      </form>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
