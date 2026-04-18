import { prisma } from "@/lib/db";
import { FileText, Plus, Search, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default async function AdminContentPage() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Content Management</h1>
          <p className="text-text-secondary">Manage FAQs, articles, and public site information.</p>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue-light">
          <Plus className="h-4 w-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-surface-border shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search within content..." 
            className="w-full pl-10 pr-4 py-2 bg-surface-soft border-transparent rounded-lg text-sm focus:ring-2 focus:ring-brand-teal focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* FAQs */}
        <div className="space-y-4">
          <h3 className="font-semibold text-text-primary flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-brand-teal" />
            Active FAQs ({faqs.length})
          </h3>
          <div className="space-y-3">
             {faqs.map(faq => (
               <div key={faq.id} className="p-4 bg-white rounded-xl border border-surface-border shadow-sm space-y-2">
                  <p className="font-bold text-sm text-brand-blue">{faq.question}</p>
                  <p className="text-xs text-text-secondary line-clamp-2">{faq.answer}</p>
                  <div className="pt-2 flex justify-between items-center border-t border-surface-border mt-2">
                    <span className="text-[10px] uppercase font-bold text-brand-teal bg-brand-teal-pale px-2 py-0.5 rounded">
                      {faq.category}
                    </span>
                    <button className="text-[10px] font-bold text-text-muted hover:text-text-primary">Edit</button>
                  </div>
               </div>
             ))}
             {faqs.length === 0 && (
               <div className="text-center py-12 bg-white rounded-xl border border-dashed border-surface-border text-text-muted text-sm">
                 No FAQs found. Create your first one.
               </div>
             )}
          </div>
        </div>

        {/* Banners & Articles Placeholder */}
        <div className="space-y-4">
          <h3 className="font-semibold text-text-primary flex items-center gap-2">
            <FileText className="h-4 w-4 text-brand-teal" />
            Banners & Hero Alt-Text
          </h3>
          <div className="bg-surface-soft/50 rounded-2xl border-2 border-dashed border-surface-border p-8 text-center">
             <p className="text-sm text-text-muted italic">Advanced content widgets (Hero Banners, Promos) are currently managed via Site Settings.</p>
             <Button variant="ghost" className="mt-4 text-brand-teal underline">Go to Settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
