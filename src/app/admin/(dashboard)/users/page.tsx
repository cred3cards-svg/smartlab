import { prisma } from "@/lib/db";
import { User, Mail, Phone, Calendar } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

export default async function AdminUsersPage() {
  const users = await prisma.patientAccount.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { referralsMade: true, rewards: true } }
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">User Management</h1>
        <p className="text-text-secondary">View and manage patient accounts and engagement.</p>
      </div>

      <div className="bg-white rounded-2xl border border-surface-border shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-soft border-b border-surface-border">
              <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase">Name / Phone</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase">Email</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase">Joined</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase">Referrals</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-surface-soft/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-text-primary">{user.name || "Unknown"}</div>
                  <div className="text-xs text-text-muted">{user.phone}</div>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {user.email || "-"}
                </td>
                <td className="px-6 py-4 text-xs text-text-muted">
                  {format(user.createdAt, 'PP')}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-brand-teal">
                  {user._count.referralsMade} referrals
                </td>
                <td className="px-6 py-4 text-right">
                   <Link href={`/admin/users/${user.id}`} className="text-brand-blue hover:underline text-sm font-bold">View Profile</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
