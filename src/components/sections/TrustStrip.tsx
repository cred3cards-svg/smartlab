import { Clock, Home, Shield, Award, Zap, Users } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Clock,
    value: "6 Hours",
    label: "Average Report Time",
    sub: "Most tests delivered same-day",
    color: "text-brand-teal",
    bg: "bg-brand-teal-pale",
  },
  {
    icon: Home,
    value: "60 Min",
    label: "Home Collection",
    sub: "SkillMedic™ at your door",
    color: "text-brand-blue",
    bg: "bg-blue-50",
  },
  {
    icon: Shield,
    value: "NABL",
    label: "Accredited Labs",
    sub: "ISO 15189 certified process",
    color: "text-brand-green",
    bg: "bg-green-50",
  },
  {
    icon: Award,
    value: "75%",
    label: "Average Savings",
    sub: "vs. MRP at clinic labs",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Zap,
    value: "AI",
    label: "Assisted Pathology",
    sub: "Intelligent anomaly flagging",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Users,
    value: "2 Lakh+",
    label: "Patients Served",
    sub: "Across 6 major cities",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-white border-b border-surface-border py-10" aria-label="Trust metrics">
      <div className="container-site">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {TRUST_ITEMS.map(({ icon: Icon, value, label, sub, color, bg }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-surface-soft transition-colors"
            >
              <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon size={20} className={color} />
              </div>
              <p className={`font-heading font-bold text-xl mb-0.5 ${color}`}>{value}</p>
              <p className="text-xs font-semibold text-text-primary">{label}</p>
              <p className="text-[11px] text-text-muted mt-0.5 leading-snug">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
