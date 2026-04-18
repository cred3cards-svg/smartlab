import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { 
  ChevronLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  ShoppingBag, 
  UsersRound, 
  TrendingUp,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default async function UserProfilePage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const pUser = await prisma.patientAccount.findUnique({
    where: { id },
    include: {
      referralCode: true,
      referralsMade: true,
      rewards: true
    }
  });

  if (!pUser) {
    notFound();
  }

  // Fetch bookings for this user via phone number match
  const userBookings = await prisma.testBooking.findMany({
    where: {
      patient: {
        phone: pUser.phone
      }
    },
    orderBy: { createdAt: 'desc' },
    include: { 
      slot: true,
      patient: true 
    }
  });

  const latestBooking = userBookings[0];
  const userGender = latestBooking?.patient?.gender || "Not specified";
  const userAge = latestBooking?.patient?.age || null;

  const totalSpent = userBookings.reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Link href="/admin/users" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-brand-teal transition-colors font-medium">
        <ChevronLeft className="h-4 w-4" />
        Back to Users
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white rounded-[2.5rem] border border-surface-border p-8 shadow-sm text-center">
              <div className="w-24 h-24 bg-brand-blue-pale text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black">
                {pUser.name ? pUser.name[0] : "?"}
              </div>
              <h1 className="text-2xl font-black text-text-primary mb-1">{pUser.name || "Guest Patient"}</h1>
              <p className="text-text-muted text-sm font-medium mb-6">Patient ID: {pUser.id.slice(-8).toUpperCase()}</p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                 <Badge variant="info" className="uppercase">{userGender}</Badge>
                 <Badge variant="muted">{userAge ? `${userAge} Years` : "Age Unknown"}</Badge>
              </div>

              <div className="space-y-4 text-left border-t border-surface-border pt-8">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-soft flex items-center justify-center text-text-muted">
                       <Phone size={14} />
                    </div>
                    <span className="text-sm font-bold text-text-primary">{pUser.phone}</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-soft flex items-center justify-center text-text-muted">
                       <Mail size={14} />
                    </div>
                    <span className="text-sm font-bold text-text-primary truncate">{pUser.email || "No email provided"}</span>
                 </div>
              </div>
           </div>

           {/* Stats Cards */}
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-brand-teal text-white rounded-[2rem] p-6">
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Lifetime Value</p>
                 <p className="text-xl font-black">₹{totalSpent}</p>
              </div>
              <div className="bg-brand-blue text-white rounded-[2rem] p-6">
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Bookings</p>
                 <p className="text-xl font-black">{userBookings.length}</p>
              </div>
           </div>
        </div>

        {/* Right Column: History & Referrals */}
        <div className="lg:col-span-8 space-y-8">
           {/* Booking History */}
           <div className="bg-white rounded-[2.5rem] border border-surface-border overflow-hidden shadow-sm">
              <div className="p-8 border-b border-surface-border flex justify-between items-center">
                 <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                    <ShoppingBag size={20} className="text-brand-teal" />
                    Booking History
                 </h2>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-surface-soft">
                       <tr>
                          <th className="px-8 py-4 text-[10px] font-black text-text-muted uppercase tracking-widest">Order ID</th>
                          <th className="px-8 py-4 text-[10px] font-black text-text-muted uppercase tracking-widest">Date / Slot</th>
                          <th className="px-8 py-4 text-[10px] font-black text-text-muted uppercase tracking-widest">Amount</th>
                          <th className="px-8 py-4 text-[10px] font-black text-text-muted uppercase tracking-widest">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-border">
                       {userBookings.length > 0 ? userBookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-surface-soft/50 transition-colors">
                             <td className="px-8 py-5">
                                <Link href={`/admin/bookings/${booking.id}`} className="font-bold text-brand-blue hover:underline">
                                   {booking.bookingId}
                                </Link>
                             </td>
                             <td className="px-8 py-5">
                                <div className="text-xs font-bold text-text-primary">{format(booking.slot.date, 'MMM do, yyyy')}</div>
                                <div className="text-[10px] text-text-muted font-bold uppercase">{booking.slot.time}</div>
                             </td>
                             <td className="px-8 py-5 font-bold text-text-primary">₹{booking.totalAmount}</td>
                             <td className="px-8 py-5">
                                <Badge variant={(booking.status as string) === "REPORT_READY" || (booking.status as string) === "DELIVERED" ? "success" : "info"} className="text-[10px]">
                                   {booking.status}
                                </Badge>
                             </td>
                          </tr>
                       )) : (
                          <tr>
                             <td colSpan={4} className="px-8 py-10 text-center text-text-muted italic">No bookings yet.</td>
                          </tr>
                       )}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* Referral Stats */}
           <div className="bg-surface-soft/50 rounded-[2.5rem] border border-dashed border-surface-border p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                 <h3 className="text-sm font-black text-text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                    <UsersRound size={16} className="text-brand-teal" />
                    Referral Network
                 </h3>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-text-secondary">Code:</span>
                       <span className="font-black text-brand-teal">{pUser.referralCode?.code || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-text-secondary">Friends Joined:</span>
                       <span className="font-black text-text-primary">{pUser.referralsMade.length}</span>
                    </div>
                 </div>
              </div>
              <div>
                 <h3 className="text-sm font-black text-text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                    <TrendingUp size={16} className="text-brand-teal" />
                    Reward Balance
                 </h3>
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-2xl border border-surface-border flex items-center justify-center text-brand-teal shadow-sm">
                       <CreditCard size={20} />
                    </div>
                    <div>
                       <p className="text-xl font-black text-text-primary">₹{pUser.rewards.reduce((sum, r) => sum + r.amount, 0)}</p>
                       <p className="text-[10px] text-text-muted font-bold uppercase tracking-wide">Available Credit</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
