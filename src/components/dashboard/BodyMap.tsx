"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Activity, ShieldAlert, CheckCircle2, Info } from "lucide-react";

interface BodyPart {
  organ: string;
  status: "healthy" | "warning" | "attention";
  details: string;
}

interface BodyMapProps {
  mapping: BodyPart[];
}

export default function BodyMap({ mapping }: BodyMapProps) {
  // Simple mapping of organ names to SVG positions or grid slots
  // In a more complex version, this would be an actual SVG of a human body
  return (
    <div className="bg-white rounded-[2.5rem] border border-surface-border shadow-sm p-8 h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-heading font-bold text-text-primary">Body Systems Map</h3>
          <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest mt-1 italic italic-accent">AI-Derived Organ Health Visualization</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-brand-teal-pale text-brand-teal flex items-center justify-center">
           <Activity size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 relative">
        {mapping.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-text-muted text-sm italic italic-accent uppercase font-bold tracking-widest">No organ specific findings detected</p>
          </div>
        ) : (
          mapping.map((item, idx) => (
            <div 
              key={idx}
              className={cn(
                "group relative p-5 rounded-[2rem] border transition-all duration-300 hover:shadow-md",
                item.status === "healthy" ? "bg-green-50/50 border-green-100" : 
                item.status === "warning" ? "bg-red-50/50 border-red-100" : 
                "bg-orange-50/50 border-orange-100"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110",
                  item.status === "healthy" ? "bg-white text-status-success" : 
                  item.status === "warning" ? "bg-white text-status-danger" : 
                  "bg-white text-status-warning"
                )}>
                  {item.status === "healthy" ? <CheckCircle2 size={24} /> : 
                   item.status === "warning" ? <ShieldAlert size={24} /> : 
                   <Info size={24} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-text-primary uppercase tracking-tight text-sm">{item.organ}</h4>
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full",
                      item.status === "healthy" ? "bg-green-500 text-white" : 
                      item.status === "warning" ? "bg-status-danger text-white" : 
                      "bg-status-warning text-white"
                    )}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                    {item.details}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-surface-border">
         <div className="p-4 bg-brand-blue-pale rounded-2xl flex gap-3 items-start">
            <Info className="text-brand-blue shrink-0 mt-0.5" size={16} />
            <p className="text-[10px] text-brand-blue leading-relaxed font-medium">
              This mapping highlights body systems correlated with your abnormal markers. Consult a doctor for clinical confirmation.
            </p>
         </div>
      </div>
    </div>
  );
}
