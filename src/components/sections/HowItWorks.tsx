const STEPS = [
  {
    step: "01",
    title: "Book in 60 Seconds",
    description: "Search for a test or package, select your slot, add your address, and pay. Done. No queues, no calls needed.",
    emoji: "📱",
    color: "bg-brand-teal-pale",
    accent: "text-brand-teal",
  },
  {
    step: "02",
    title: "SkillMedic™ Arrives",
    description: "A verified, trained SMARTLAB247 SkillMedic™ comes to your home at your chosen time. Single-prick, painless collection.",
    emoji: "🏠",
    color: "bg-blue-50",
    accent: "text-brand-blue",
  },
  {
    step: "03",
    title: "AI-Assisted Testing",
    description: "Your sample reaches our NABL lab in temperature-controlled transport. Our AI-enhanced workflow processes it at speed.",
    emoji: "🧬",
    color: "bg-purple-50",
    accent: "text-purple-600",
  },
  {
    step: "04",
    title: "Reports in Hours",
    description: "Your doctor-reviewed, digitally signed reports are delivered via WhatsApp, email, and your dashboard — in as little as 6 hours.",
    emoji: "📊",
    color: "bg-green-50",
    accent: "text-brand-green",
  },
];

export default function HowItWorks() {
  return (
    <section className="section bg-white" aria-labelledby="how-it-works-heading">
      <div className="container-site">
        <div className="text-center mb-12">
          <p className="text-brand-teal text-sm font-semibold mb-2 uppercase tracking-wider">Simple 4-Step Process</p>
          <h2 id="how-it-works-heading" className="font-heading font-bold text-2xl md:text-3xl text-text-primary">
            How SMARTLAB247 Works
          </h2>
          <p className="text-text-muted mt-2 max-w-lg mx-auto">
            From booking to report — entirely at home, faster than ever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="absolute hidden lg:block top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-teal via-brand-blue to-brand-green" />

          {STEPS.map(({ step, title, description, emoji, color, accent }) => (
            <div key={step} className="flex flex-col items-center text-center relative">
              {/* Step number circle */}
              <div className={`relative z-10 w-14 h-14 rounded-full ${color} flex items-center justify-center mb-5 border-4 border-white shadow-card`}>
                <span className="text-2xl">{emoji}</span>
              </div>

              <span className={`text-xs font-bold uppercase tracking-widest ${accent} mb-2`}>
                Step {step}
              </span>
              <h3 className="font-heading font-semibold text-base text-text-primary mb-2">{title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
