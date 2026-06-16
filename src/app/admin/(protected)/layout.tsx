import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getInquiries, getBookings } from "@/lib/store";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const [inquiries, pendingBookings] = await Promise.all([getInquiries(), getBookings("受付待ち")]);
  const counts = {
    leads: inquiries.filter((i) => i.status === "New").length,
    bookings: pendingBookings.length,
  };

  return (
    <AdminShell counts={counts} role={session.user.role ?? ""}>
      {children}
    </AdminShell>
  );
}
