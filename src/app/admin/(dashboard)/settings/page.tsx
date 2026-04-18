import { prisma } from "@/lib/db";
import { Settings, Shield, Bell, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findMany();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">System Settings</h1>
        <p className="text-text-secondary">Global configurations for SMARTLAB247 platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-6">
             <h3 className="font-semibold text-text-primary flex items-center gap-2">
               <Shield className="h-4 w-4 text-brand-teal" />
               General Config
             </h3>
             <div className="space-y-4">
               {settings.map(s => (
                 <div key={s.id} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <label className="text-sm font-medium text-text-secondary">{s.key}</label>
                    <input 
                      type="text" 
                      defaultValue={s.value}
                      className="sm:col-span-2 block w-full px-3 py-2 border border-surface-border rounded-lg text-sm"
                    />
                 </div>
               ))}
               <div className="pt-4 flex justify-end">
                 <Button>
                   <Save className="h-4 w-4 mr-2" />
                   Save Changes
                 </Button>
               </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-4">
             <h3 className="font-semibold text-text-primary flex items-center gap-2">
               <Bell className="h-4 w-4 text-brand-teal" />
               Notifications
             </h3>
             <div className="space-y-2">
               <div className="flex items-center justify-between p-2 hover:bg-surface-soft rounded-lg cursor-pointer">
                 <span className="text-sm text-text-secondary">Booking Alerts</span>
                 <div className="w-8 h-4 bg-brand-teal rounded-full relative">
                   <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div>
                 </div>
               </div>
               <div className="flex items-center justify-between p-2 hover:bg-surface-soft rounded-lg cursor-pointer">
                 <span className="text-sm text-text-secondary">System Logs</span>
                 <div className="w-8 h-4 bg-brand-teal rounded-full relative">
                   <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
