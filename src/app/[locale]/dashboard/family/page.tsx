"use client";

import { useState } from "react";
import { 
  Users, 
  Plus, 
  UserCircle2, 
  MoreVertical, 
  ShieldCheck, 
  History,
  Trash2,
  Edit3,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  gender: string;
  initials: string;
}

export default function FamilyProfilesPage() {
  const [members, setMembers] = useState<FamilyMember[]>([
    { id: "1", name: "Rajesh Sharma", relation: "Self", age: 34, gender: "Male", initials: "RS" },
    { id: "2", name: "Sunita Sharma", relation: "Spouse", age: 32, gender: "Female", initials: "SS" },
    { id: "3", name: "Mahendra Sharma", relation: "Parent", age: 62, gender: "Male", initials: "MS" },
  ]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-1">Family Profiles</h1>
          <p className="text-text-secondary text-sm">Manage health intelligence for your loved ones under one account.</p>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue-light transition-all shadow-lg shadow-brand-blue/20 rounded-2xl">
          <Plus size={18} className="mr-2" /> Add Family Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white rounded-[2.5rem] border border-surface-border p-8 shadow-sm hover:shadow-xl hover:border-brand-blue transition-all group relative overflow-hidden">
             {/* Gradient Background Decoration */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

             <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-[1.5rem] bg-brand-blue-pale text-brand-blue flex items-center justify-center font-bold text-xl shadow-inner group-hover:bg-brand-blue group-hover:text-white transition-colors duration-500">
                  {member.initials}
                </div>
                <button className="p-2 text-text-muted hover:text-text-primary transition-colors">
                   <MoreVertical size={20} />
                </button>
             </div>

             <div className="space-y-1 mb-8">
                <h3 className="text-xl font-heading font-bold text-text-primary">{member.name}</h3>
                <p className="text-xs font-bold text-brand-teal uppercase tracking-widest">{member.relation}</p>
             </div>

             <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="bg-surface-soft rounded-2xl p-3 border border-surface-border/50">
                   <p className="text-[10px] text-text-muted font-bold uppercase tracking-tighter mb-1">Age</p>
                   <p className="text-sm font-bold text-text-primary">{member.age} Years</p>
                </div>
                <div className="bg-surface-soft rounded-2xl p-3 border border-surface-border/50">
                   <p className="text-[10px] text-text-muted font-bold uppercase tracking-tighter mb-1">Gender</p>
                   <p className="text-sm font-bold text-text-primary">{member.gender}</p>
                </div>
             </div>

             <div className="flex flex-col gap-3">
                <Button fullWidth variant="primary" size="sm" className="rounded-xl font-bold transition-all shadow-sm">
                   Switch To Dashboard
                </Button>
                <div className="flex gap-2">
                   <Button variant="outline" size="sm" className="flex-1 rounded-xl font-bold bg-white text-text-secondary border-surface-border">
                      <Edit3 size={14} className="mr-2" /> Edit
                   </Button>
                   <Button variant="outline" size="sm" className="flex-1 rounded-xl font-bold bg-white text-status-danger border-red-100 hover:bg-red-50">
                      <Trash2 size={14} className="mr-2" /> Remove
                   </Button>
                </div>
             </div>
          </div>
        ))}

        {/* Placeholder for Adding New */}
        <button className="bg-surface-soft/50 rounded-[2.5rem] border-2 border-dashed border-surface-border p-8 flex flex-col items-center justify-center text-text-muted hover:text-brand-blue hover:bg-white hover:border-brand-blue transition-all group">
           <div className="w-16 h-16 rounded-[1.5rem] bg-surface-soft border border-surface-border flex items-center justify-center mb-6 group-hover:bg-brand-blue-pale group-hover:text-brand-blue transition-colors">
             <Plus size={32} />
           </div>
           <p className="font-heading font-bold text-lg mb-1">Add New Profile</p>
           <p className="text-xs text-center px-4">Include parents or children to track their health reports.</p>
        </button>
      </div>

      {/* Subscription/Membership Cross-sell */}
      <div className="bg-gradient-to-br from-[#0F5280] to-brand-blue rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-teal text-[10px] font-bold uppercase tracking-widest mb-6 border border-white/10">
                  <ShieldCheck size={14} /> Family Membership Saving
               </div>
               <h2 className="text-4xl font-heading font-bold mb-4 italic italic-accent">SMARTPASS247 Family</h2>
               <p className="text-white/70 text-lg leading-relaxed mb-8">
                  One plan for your entire household. Get unlimited free home collections and 20% off all tests for up to 6 members.
               </p>
               <div className="flex gap-4">
                  <Button variant="primary" className="bg-white text-brand-blue hover:bg-white/90 rounded-2xl px-10 font-bold shadow-xl shadow-black/10">
                     Upgrade Plan
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-2xl px-10 font-bold">
                     View All Benefits
                  </Button>
               </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
               {[
                 { label: "Free Collection", icon: <History /> },
                 { label: "Family Trends", icon: <BarChart3 /> },
                 { label: "Priority Slots", icon: <Users /> },
                 { label: "Doctor Access", icon: <ShieldCheck /> },
               ].map((item, i) => (
                 <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-[2rem] p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-3">
                       {item.icon}
                    </div>
                    <p className="text-sm font-bold">{item.label}</p>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
