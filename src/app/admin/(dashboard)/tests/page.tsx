import { prisma } from "@/lib/db";
import { List, Search, Plus, Edit2, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default async function AdminTestsPage() {
  const tests = await prisma.test.findMany({
    orderBy: { name: 'asc' },
    include: {
      categories: { select: { name: true } }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Test Catalog</h1>
          <p className="text-text-secondary">Manage available tests, pricing and descriptions.</p>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue-light">
          <Plus className="h-4 w-4 mr-2" />
          Create New Test
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-surface-border shadow-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-soft border-b border-surface-border font-body">
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase">Test Name / Slug</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase">Categories</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase">Price (INR)</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {tests.map((test) => (
              <tr key={test.id} className="hover:bg-surface-soft/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-text-primary">{test.name}</div>
                  <div className="text-[10px] text-text-muted font-mono">{test.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {test.categories.map(c => (
                      <span key={c.name} className="text-[10px] bg-brand-teal-pale text-brand-teal px-2 py-0.5 rounded-full font-bold uppercase">
                        {c.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-brand-blue">
                  ₹{test.price}
                  {test.originalPrice > test.price && (
                    <span className="text-[10px] text-text-muted line-through ml-2">₹{test.originalPrice}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                   <Link 
                     href={`/admin/tests/${test.id}`}
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
