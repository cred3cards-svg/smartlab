import { prisma } from "@/lib/db";
import { Ticket, Search, Plus, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/Button";

export default async function AdminOffersPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Coupon Campaigns</h1>
          <p className="text-text-secondary">Create and manage discount codes and promotional offers.</p>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue-light">
          <Plus className="h-4 w-4 mr-2" />
          New Coupon Code
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map(coupon => (
          <div key={coupon.id} className="bg-white p-6 rounded-3xl border border-surface-border shadow-sm flex flex-col justify-between group hover:border-brand-teal transition-all">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-surface-soft rounded-2xl">
                  <Ticket className="h-6 w-6 text-brand-blue" />
                </div>
                {coupon.active ? (
                  <span className="text-[10px] font-bold text-brand-teal bg-brand-teal-pale px-2.5 py-1 rounded-full uppercase tracking-tighter">Active</span>
                ) : (
                  <span className="text-[10px] font-bold text-text-muted bg-surface-soft px-2.5 py-1 rounded-full uppercase tracking-tighter">Expired</span>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-text-primary uppercase tracking-wider">{coupon.code}</h3>
                <p className="text-sm text-text-secondary font-medium mt-1">
                  {coupon.discountType === 'PERCENTAGE' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
                </p>
              </div>

              <div className="flex items-center gap-6 pt-2 border-t border-surface-border">
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase">Usage</p>
                  <p className="text-sm font-bold text-text-primary">{coupon.usageCount}{coupon.usageLimit ? ` / ${coupon.usageLimit}` : ""}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase">Min Order</p>
                  <p className="text-sm font-bold text-text-primary">₹{coupon.minOrderValue}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-between items-center text-xs text-text-muted font-medium">
               <span className="flex items-center gap-1.5">
                 <Calendar className="h-3 w-3" />
                 Till {format(coupon.expiryDate, 'dd MMM yy')}
               </span>
               <button className="text-brand-blue font-bold opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
            </div>
          </div>
        ))}

        {coupons.length === 0 && (
          <div className="col-span-full py-12 text-center text-text-muted bg-surface-soft border-2 border-dashed border-surface-border rounded-3xl">
            No coupons active. Start your first campaign today.
          </div>
        )}
      </div>
    </div>
  );
}
