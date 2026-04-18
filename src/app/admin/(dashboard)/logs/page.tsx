import { prisma } from "@/lib/db";
import { History, Shield, Info, Database, User as UserIcon, Terminal } from "lucide-react";
import { format } from "date-fns";

export default async function AdminAuditLogsPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { timestamp: 'desc' },
    take: 100
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <History className="h-6 w-6 text-brand-teal" />
            System Audit Trails
          </h1>
          <p className="text-text-secondary">Track all administrative actions and data modifications.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-surface-border shadow-card overflow-hidden font-mono">
        <div className="bg-text-primary text-white p-3 flex items-center justify-between text-xs px-6 uppercase font-bold tracking-widest opacity-95">
          <div className="flex items-center gap-2">
            <Terminal className="h-3 w-3" />
            Console Output
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/50">Retention: 30 Days</span>
            <span className="flex items-center gap-1.5">
               <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
               Live Feed
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-soft border-b border-surface-border">
              <tr className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                <th className="px-6 py-4">Timestamp / IP</th>
                <th className="px-6 py-4">Administrator</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Entity</th>
                <th className="px-6 py-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border text-xs">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-soft/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="text-text-primary font-bold">{format(log.timestamp, 'HH:mm:ss')}</div>
                    <div className="text-[10px] text-text-muted">{log.ipAddress || "::1"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-medium text-text-secondary">
                      <UserIcon className="h-3 w-3" />
                      {log.userEmail || "System"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] ${
                        log.action === 'CREATE' ? 'bg-green-100 text-green-700' :
                        log.action === 'DELETE' ? 'bg-red-100 text-red-700' :
                        log.action === 'UPDATE' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                     }`}>
                       {log.action}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-text-primary font-bold">{log.entityType}</div>
                    <div className="text-[10px] text-text-muted">ID: {log.entityId?.slice(0, 8)}...</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-brand-teal font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">View Diff</button>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-muted italic">
                    No audit logs available yet. Administrative actions will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
