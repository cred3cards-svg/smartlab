import { prisma } from "@/lib/db";
import { Package, Search, Plus, Edit2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default async function AdminPackagesPage() {
  const packages = await prisma.checkupPackage.findMany({
    orderBy: { price: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Checkup Packages</h1>
          <p className="text-text-secondary">Manage health screening bundles and age-group pricing.</p>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue-light">
          <Plus className="h-4 w-4 mr-2" />
          Create New Package
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-surface-border shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-soft border-b border-surface-border font-body">
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase">Package Name</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase">Age Group / Gender</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase">Price</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {packages.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-surface-soft/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-text-primary">{pkg.name}</div>
                  <div className="text-[10px] text-text-muted flex items-center gap-1 mt-1">
                    <CheckCircle2 className="h-2.5 w-2.5 text-brand-teal" />
                    {pkg.testCount} Tests Included
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs font-medium text-text-secondary capitalize">{pkg.gender.toLowerCase()} | {pkg.ageGroup}</div>
                </td>
                <td className="px-6 py-4 font-bold text-brand-blue">
                  ₹{pkg.price}
                  <span className="text-[10px] text-text-muted line-through ml-2 font-normal">₹{pkg.originalPrice}</span>
                </td>
                <td className="px-6 py-4 text-right">
                   <Link 
                     href={`/admin/packages/${pkg.id}`}
                     className="text-brand-blue hover:underline text-sm font-bold flex items-center gap-1.5 ml-auto w-fit"
                   >
                     <Edit2 className="h-3 w-3" />
                     Edit
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
