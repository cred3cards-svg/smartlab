import Link from "next/link";
import { Smartphone, Download, Bell, TrendingUp, Users, FileText, ArrowRight } from "lucide-react";

const APP_FEATURES = [
  { icon: FileText, label: "Digital Reports", desc: "Download & share anytime" },
  { icon: TrendingUp, label: "Health Trends", desc: "AI trend charts per parameter" },
  { icon: Users, label: "Family Profiles", desc: "Manage up to 6 members" },
  { icon: Bell, label: "Smart Reminders", desc: "Annual test reminders" },
];

export default function AppSection() {
  return (
    <section className="section bg-white" aria-labelledby="app-section-heading">
      <div className="container-site">
        <div className="bg-gradient-to-br from-brand-blue to-[#0F5280] rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* Left: content */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-5 text-sm text-white/90 font-medium w-fit">
                <Smartphone size={14} className="text-brand-teal" />
                SMARTLAB247 App
              </div>
              <h2 id="app-section-heading" className="font-heading font-bold text-white mb-3"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}>
                Your Health Dashboard,{" "}
                <span className="text-brand-teal">In Your Pocket</span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-6">
                Track reports, view trends, manage family health profiles, and book repeat tests — all from one beautiful app.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {APP_FEATURES.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-brand-teal" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{label}</p>
                      <p className="text-xs text-white/60">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#" className="flex items-center gap-2 bg-white text-brand-blue font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity">
                  <Download size={16} />
                  App Store
                </a>
                <a href="#" className="flex items-center gap-2 bg-white/15 border border-white/20 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-white/20 transition-colors">
                  <Download size={16} />
                  Google Play
                </a>
              </div>

              <Link href="/app" className="inline-flex items-center gap-1.5 mt-4 text-sm text-white/60 hover:text-white transition-colors">
                Learn more about the app <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right: app mockup (SVG-drawn) */}
            <div className="flex items-center justify-center">
              <div className="relative">
                {/* Phone frame */}
                <div className="w-56 h-96 bg-gray-900 rounded-[2.5rem] p-2.5 shadow-2xl border-2 border-gray-700">
                  <div className="bg-white rounded-[2rem] h-full overflow-hidden">
                    {/* Status bar */}
                    <div className="bg-brand-blue px-4 py-3 flex items-center justify-between">
                      <span className="text-white text-xs font-medium">SMARTLAB247</span>
                      <div className="w-4 h-4 rounded-full bg-white/30" />
                    </div>

                    {/* App content */}
                    <div className="p-3 bg-surface-soft h-full">
                      <p className="text-xs font-bold text-text-primary mb-2">My Reports</p>

                      {/* Report cards */}
                      {[
                        { name: "CBC", date: "12 Apr", status: "Ready", color: "bg-green-100 text-green-700" },
                        { name: "Lipid Profile", date: "5 Apr", status: "Ready", color: "bg-green-100 text-green-700" },
                        { name: "Thyroid Panel", date: "15 Mar", status: "Ready", color: "bg-green-100 text-green-700" },
                      ].map((r) => (
                        <div key={r.name} className="bg-white rounded-xl p-2.5 mb-2 flex items-center justify-between shadow-sm border border-surface-border">
                          <div>
                            <p className="text-xs font-semibold text-text-primary">{r.name}</p>
                            <p className="text-[10px] text-text-muted">{r.date}</p>
                          </div>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${r.color}`}>{r.status}</span>
                        </div>
                      ))}

                      {/* Mini chart */}
                      <div className="bg-white rounded-xl p-2.5 shadow-sm border border-surface-border mt-3">
                        <p className="text-[10px] font-bold text-text-primary mb-2">Haemoglobin Trend</p>
                        <div className="flex items-end gap-1 h-10">
                          {[60, 70, 85, 80, 90, 95].map((h, i) => (
                            <div key={i} className="flex-1 bg-brand-teal/40 rounded-t" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                        <div className="flex justify-between text-[8px] text-text-muted mt-1">
                          <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating notification */}
                <div className="absolute -right-8 top-16 bg-white rounded-2xl shadow-card p-3 w-44 border border-surface-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-teal-pale flex items-center justify-center">
                      <Bell size={14} className="text-brand-teal" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-text-primary">Report Ready!</p>
                      <p className="text-[9px] text-text-muted">CBC delivered in 5h 42m</p>
                    </div>
                  </div>
                </div>

                {/* Floating family badge */}
                <div className="absolute -left-8 bottom-20 bg-white rounded-2xl shadow-card p-3 w-36 border border-surface-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                      <Users size={14} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-text-primary">4 Members</p>
                      <p className="text-[9px] text-text-muted">SMARTPASS247</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
