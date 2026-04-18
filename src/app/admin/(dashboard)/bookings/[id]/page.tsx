import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { 
  ChevronLeft, 
  MapPin, 
  Phone, 
  User, 
  Calendar, 
  Clock, 
  FlaskConical, 
  CreditCard,
  CheckCircle2,
  FileUp
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default async function BookingDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const booking = await prisma.testBooking.findUnique({
    where: { id },
    include: {
      patient: true,
      address: {
        include: {
          area: true
        }
      },
      slot: true,
      tests: true,
      packages: true,
      reports: true
    }
  });

  if (!booking) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Link href="/admin/bookings" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-brand-teal transition-colors font-medium">
        <ChevronLeft className="h-4 w-4" />
        Back to Bookings
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <h1 className="text-3xl font-heading font-black text-text-primary">Order {booking.bookingId}</h1>
             <Badge variant={(booking.status as string) === "REPORT_READY" || (booking.status as string) === "DELIVERED" ? "success" : "info"}>
               {booking.status}
             </Badge>
          </div>
          <p className="text-text-secondary font-medium">Placed on {format(booking.createdAt, 'PPPpp')}</p>
        </div>
        
        <div className="flex gap-3">
          {(booking.reports.length === 0 && (booking.status === "COLLECTED" || booking.status === "ASSIGNED")) && (
            <Link href={`/admin/reports/upload?bookingId=${booking.id}`}>
              <Button variant="teal" leftIcon={<FileUp className="h-4 w-4" />}>
                Upload Report
              </Button>
            </Link>
          )}
          <Button variant="outline">Update Status</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Patient Card */}
          <div className="bg-white rounded-[2rem] border border-surface-border p-8 shadow-sm">
            <h2 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
              <User size={18} className="text-brand-teal" />
              Patient Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">Full Name</label>
                   <p className="text-sm font-semibold text-text-primary">{booking.patient.name}</p>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">Gender / Age</label>
                   <p className="text-sm font-semibold text-text-primary uppercase">{booking.patient.gender} • {booking.patient.age}y</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">Contact Details</label>
                   <p className="text-sm font-semibold text-text-primary flex items-center gap-2">
                     <Phone size={14} className="text-text-muted" />
                     {booking.patient.phone}
                   </p>
                   {booking.patient.email && (
                     <p className="text-xs text-text-muted mt-1">{booking.patient.email}</p>
                   )}
                </div>
              </div>
            </div>
          </div>

          {/* Tests Card */}
          <div className="bg-white rounded-[2rem] border border-surface-border p-8 shadow-sm">
            <h2 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
              <FlaskConical size={18} className="text-brand-teal" />
              Order Items
            </h2>
            <div className="space-y-4">
              {booking.tests.map(test => (
                <div key={test.id} className="flex justify-between items-center p-4 bg-surface-soft rounded-2xl">
                  <div className="font-bold text-sm text-text-primary">{test.name}</div>
                  <div className="text-brand-blue font-bold">₹{test.price}</div>
                </div>
              ))}
              {booking.packages.map(pkg => (
                <div key={pkg.id} className="flex justify-between items-center p-4 bg-brand-teal-pale/30 rounded-2xl border border-brand-teal-pale">
                  <div>
                    <div className="font-bold text-sm text-brand-teal">{pkg.name}</div>
                    <div className="text-[10px] text-text-muted font-bold uppercase tracking-wide">Bundle Package</div>
                  </div>
                  <div className="text-brand-blue font-bold">₹{pkg.price}</div>
                </div>
              ))}
              <div className="pt-4 border-t border-surface-border flex justify-between items-center px-2">
                 <span className="font-bold text-text-primary">Total Amount</span>
                 <span className="text-xl font-black text-brand-blue">₹{booking.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Execution */}
        <div className="space-y-8">
           {/* Slot & Location */}
           <div className="bg-brand-blue text-white rounded-[2rem] p-8 shadow-lg shadow-brand-blue/20">
              <h3 className="text-xs font-black uppercase tracking-widest text-brand-blue-pale/60 mb-6">Service Window</h3>
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Calendar size={20} />
                 </div>
                 <div>
                    <p className="text-sm font-bold">{format(booking.slot.date, 'EEEE, MMM do')}</p>
                    <p className="text-xs text-brand-blue-pale font-medium">{booking.slot.time}</p>
                 </div>
              </div>
              <div className="pt-6 border-t border-white/10">
                 <div className="flex gap-3 mb-2">
                    <MapPin size={16} className="text-brand-blue-pale shrink-0 mt-0.5" />
                    <p className="text-xs font-medium leading-relaxed">
                       {booking.address.street}, {booking.address.landmark && `${booking.address.landmark}, `}
                       {booking.address.area?.name || ""}, {booking.address.city} - {booking.address.pincode}
                    </p>
                 </div>
              </div>
           </div>

           {/* Payment Status */}
           <div className="bg-white rounded-[2rem] border border-surface-border p-8 shadow-sm">
              <h3 className="text-xs font-black text-text-muted uppercase tracking-widest mb-4">Payment</h3>
              <div className="flex items-center gap-3">
                 <div className={booking.paymentStatus === "PAID" ? "text-green-500" : "text-amber-500"}>
                    <CreditCard size={20} />
                 </div>
                 <div className="font-bold text-text-primary">
                    {booking.paymentStatus === "PAID" ? "Payment Confirmed" : "Payment Pending"}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
