import { prisma } from "@/lib/db";
import { 
  Calendar, 
  Clock, 
  FileCheck, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalBookingsToday,
    pendingCollections,
    reportsPending,
    recentBookings
  ] = await Promise.all([
    prisma.testBooking.count({
      where: { createdAt: { gte: today } }
    }),
    prisma.testBooking.count({
      where: { status: 'BOOKED' }
    }),
    prisma.testReport.count({
      where: { status: 'PENDING' }
    }),
    prisma.testBooking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        patient: true,
        tests: { select: { name: true } }
      }
    })
  ]);

  const stats = [
    { name: 'Today\'s Bookings', value: totalBookingsToday, icon: Calendar, change: '+12%', changeType: 'positive' },
    { name: 'Pending Collections', value: pendingCollections, icon: Clock, change: '-5%', changeType: 'neutral' },
    { name: 'Reports Pending', value: reportsPending, icon: FileCheck, change: '+2', changeType: 'negative' },
    { name: 'Revenue (Today)', value: '₹0', icon: TrendingUp, change: '+0%', changeType: 'neutral' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary">Welcome back to SMARTLAB247 Operational Control.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-card border border-surface-border"
          >
            <div className="flex items-center">
              <div className="rounded-lg bg-brand-teal-pale p-3">
                <item.icon className="h-6 w-6 text-brand-teal" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-text-muted">{item.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-text-primary">{item.value}</div>
                    <div className={cn(
                      "ml-2 flex items-baseline text-xs font-semibold",
                      item.changeType === 'positive' ? 'text-brand-green' : 
                      item.changeType === 'negative' ? 'text-status-danger' : 'text-text-muted'
                    )}>
                      {item.changeType === 'positive' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {item.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-2xl bg-white shadow-card border border-surface-border overflow-hidden">
          <div className="px-6 py-5 border-b border-surface-border flex justify-between items-center">
            <h3 className="text-base font-semibold leading-6 text-text-primary">Recent Bookings</h3>
            <button className="text-sm font-medium text-brand-teal hover:text-brand-teal-dark">View all</button>
          </div>
          <div className="px-6 py-4">
            <ul role="list" className="divide-y divide-surface-border">
              {recentBookings.map((booking) => (
                <li key={booking.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {booking.patient.name}
                      </p>
                      <p className="text-xs text-text-muted truncate">
                        {booking.tests.map(t => t.name).join(', ')}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-xs font-semibold">
                      <span className={cn(
                        "px-2.5 py-0.5 rounded-full",
                        booking.status === 'REPORT_READY' ? 'bg-green-100 text-green-800' :
                        booking.status === 'BOOKED' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      )}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-card border border-surface-border p-6 space-y-4">
          <h3 className="text-base font-semibold text-text-primary">System Alerts</h3>
          <div className="space-y-4">
             <div className="flex items-start p-3 bg-red-50 rounded-lg text-sm text-status-danger border border-red-100">
               <span>Critical: 2 delayed collections in Noida area. Action required.</span>
             </div>
             <div className="flex items-start p-3 bg-orange-50 rounded-lg text-sm text-status-warning border border-orange-100">
               <span>Warning: Pathologist "Dr. Verma" has 15 pending report reviews.</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
