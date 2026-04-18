import { prisma } from "@/lib/db";
import { ShoppingBag, Search, Filter, ArrowRight, Clock } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default async function AdminBookingsPage() {
  const bookings = await prisma.testBooking.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      patient: true,
      address: true,
      slot: true
    },
    take: 50
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Operational Bookings</h1>
          <p className="text-text-secondary">Track and manage home collection work orders.</p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-surface-border shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search by ID, name or phone..." 
            className="w-full pl-10 pr-4 py-2 bg-surface-soft border-transparent rounded-lg text-sm focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-surface-border rounded-lg text-sm font-medium hover:bg-surface-soft">
          <Filter className="h-4 w-4" />
          More Filters
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-surface-border shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-soft border-b border-surface-border font-body">
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase">Booking ID</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase">Patient</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase">Slot</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-surface-soft/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-brand-blue flex items-center gap-2">
                    <ShoppingBag className="h-3 w-3" />
                    {booking.bookingId}
                  </div>
                  <div className="text-[10px] text-text-muted font-medium uppercase mt-1">
                    Added {format(booking.createdAt, 'PP')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-text-primary">{booking.patient.name}</div>
                  <div className="text-xs text-text-muted font-medium">{booking.patient.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-text-primary flex items-center gap-1.5 font-medium">
                    <Clock className="h-3.5 w-3.5 text-brand-teal" />
                    {format(booking.slot.date, 'dd MMM')}
                  </div>
                  <div className="text-xs text-text-muted font-bold uppercase mt-0.5">{booking.slot.time}</div>
                </td>
                <td className="px-6 py-4">
                   <div className="text-xs font-bold px-2.5 py-1 rounded-full bg-surface-soft border border-surface-border inline-block uppercase tracking-wider">
                     {booking.status.replace(/_/g, ' ')}
                   </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link 
                    href={`/admin/bookings/${booking.id}`}
                    className="inline-flex p-2 hover:bg-brand-teal/10 rounded-lg text-brand-teal transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
