import { Testimonial, DoctorEndorsement, MembershipPlan, FAQ, Category, OrganCategory } from "@/types";
import { City, Centre } from "@/types";

// ─── Testimonials ─────────────────────────────────────────────
// Updated to strictly focus on Kolkata (Live) users.
export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", name: "Priya Chatterjee", city: "Salt Lake, Kolkata", rating: 5, text: "Booking took under 2 minutes. The SkillMedic™ arrived exactly on time at 7 AM at our Salt Lake home. My CBC + thyroid results were on WhatsApp by 2 PM. Phenomenal service!", testTaken: "SmartScreen Essential", date: "2026-03-12", verified: true, initials: "PC", avatarColor: "#00A8A8" },
  { id: "t2", name: "Rahul Das", city: "New Town, Kolkata", rating: 5, text: "The report actually explains my HbA1c trend with an AI graph. Getting this done at my New Town doorstep is a game-changer for my diabetes management!", testTaken: "Diabetes Care Panel", date: "2026-02-28", verified: true, initials: "RD", avatarColor: "#0B3C5D" },
  { id: "t3", name: "Ananya Mukhopadhyay", city: "Behala, Kolkata", rating: 5, text: "Booked for my mother in Behala. The entire experience was seamless, reports came with simple language explanations. No confusing medical jargon!", testTaken: "Women's Wellness Panel", date: "2026-03-05", verified: true, initials: "AM", avatarColor: "#4CAF50" },
  { id: "t4", name: "Vikram Bose", city: "Park Street, Kolkata", rating: 5, text: "Got a comprehensive panel done at 77% off. The quality is top-notch — NABL-certified lab, prompt report. Kolkata finally has a world-class diagnostic partner.", testTaken: "SmartScreen Advanced", date: "2026-01-20", verified: true, initials: "VB", avatarColor: "#00A8A8" },
  { id: "t5", name: "Meera Sen", city: "Garia, Kolkata", rating: 5, text: "My father was nervous about getting blood drawn. The SkillMedic™ was so patient and calming. Kolkata's best at-home service by far!", testTaken: "SeniorShield Panel", date: "2026-03-18", verified: true, initials: "MS", avatarColor: "#0B3C5D" },
];

// ─── Doctor Endorsements ──────────────────────────────────────
// Localized to Kolkata medical ecosystem.
export const DOCTOR_ENDORSEMENTS: DoctorEndorsement[] = [
  { id: "d1", name: "Dr. K. Banerjee", specialty: "Internal Medicine", hospital: "Apollo Multispeciality, Kolkata", quote: "SMARTLAB247's AI-flagged reports significantly improve our pre-consultation diagnostic quality. Turnaround is faster than any lab in West Bengal.", initials: "KB" },
  { id: "d2", name: "Dr. A. Ghosal", specialty: "Endocrinologist", hospital: "Fortis Hospital, Kolkata", quote: "For my thyroid and diabetes patients, the AI trend graphs help me have much more productive consultations. The cleanest reports in the city.", initials: "AG" },
  { id: "d3", name: "Dr. S. Mukherjee", specialty: "Gynaecologist", hospital: "AMRI Hospitals, Kolkata", quote: "I prescribe the Women's Wellness Panel frequently. The at-home collection removes a real barrier for my patients in Kolkata.", initials: "SM" },
];

// ─── Membership Plans ─────────────────────────────────────────
export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "m1",
    name: "SMARTPASS247 Solo",
    tagline: "Your personal annual health partner",
    price: 999,
    originalPrice: 2499,
    billingPeriod: "annual",
    memberCount: 1,
    benefits: [
      "12 free home collections (₹99 saving each)",
      "Additional 20% off on all tests",
      "Priority morning slots (6–8 AM)",
      "Annual wellness reminder calendar",
      "Smart trend reports with AI insights",
      "Dedicated report helpline",
      "Exclusive member-only health packs",
      "WhatsApp report delivery",
    ],
    discountOnTests: 20,
    freeHomeCollections: 12,
    prioritySlots: true,
    reportSLAHours: 6,
    popular: false,
    color: "#0B3C5D",
  },
  {
    id: "m2",
    name: "SMARTPASS247 Family",
    tagline: "Protect your whole family — up to 4 members",
    price: 2499,
    originalPrice: 6999,
    billingPeriod: "annual",
    memberCount: 4,
    benefits: [
      "Covers up to 4 family members",
      "48 free home collections (12 per member)",
      "25% off on all tests for all members",
      "Priority slots for all members",
      "Individual health dashboards per member",
      "AI health trend tracking for whole family",
      "Annual wellness reminders per member",
      "Paediatric-friendly SkillMedic™ for kids",
      "Exclusive family health bundles",
      "Dedicated family relationship manager",
    ],
    discountOnTests: 25,
    freeHomeCollections: 48,
    prioritySlots: true,
    reportSLAHours: 6,
    popular: true,
    color: "#00A8A8",
  },
  {
    id: "m3",
    name: "SMARTPASS247 Senior",
    tagline: "Complete care for your elders — comfort-first collection",
    price: 1499,
    originalPrice: 3999,
    billingPeriod: "annual",
    memberCount: 2,
    benefits: [
      "Covers up to 2 senior members",
      "24 free home collections (12 per member)",
      "Patient, trained senior-specialist SkillMedic™",
      "20% off on all tests",
      "Emergency priority slots",
      "Large-font report format",
      "Doctor consultation platform credit included",
      "Annual health calendar with reminders",
      "Caretaker WhatsApp notifications",
    ],
    discountOnTests: 20,
    freeHomeCollections: 24,
    prioritySlots: true,
    reportSLAHours: 8,
    popular: false,
    color: "#4CAF50",
  },
];

// ─── FAQs ─────────────────────────────────────────────────────
export const FAQS: FAQ[] = [
  { question: "How do I book a lab test or package?", answer: "Search for a test or package on our website or app, add it to your cart, select a time slot and address, complete payment — and you're done.", category: "booking" },
  { question: "Which cities does SMARTLAB247 serve?", answer: "Currently serving Kolkata (Full City). We are launching soon in Goa, Belagavi, and across North East India. Enter your pincode to check instant availability.", category: "cities" },
];

// ─── Categories ───────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  { id: "c1", name: "Full Body", icon: "Activity", slug: "full-body", testCount: 12, description: "Comprehensive health screening" },
  { id: "c2", name: "Thyroid", icon: "Zap", slug: "thyroid", testCount: 8, description: "Complete thyroid function tests" },
  { id: "c3", name: "Vitamins", icon: "Sun", slug: "vitamins", testCount: 6, description: "Vitamin & mineral deficiency tests" },
  { id: "c4", name: "Women's Health", icon: "Heart", slug: "womens-health", testCount: 10, description: "Hormones, fertility & wellness" },
  { id: "c5", name: "Diabetes", icon: "Droplets", slug: "diabetes", testCount: 8, description: "Blood sugar & HbA1c tracking" },
  { id: "c6", name: "Heart Health", icon: "HeartPulse", slug: "heart-health", testCount: 7, description: "Cardiac risk & lipid profiling" },
  { id: "c7", name: "Allergy", icon: "AlertCircle", slug: "allergy", testCount: 5, description: "Common allergen panels" },
  { id: "c8", name: "Sexual Health", icon: "Shield", slug: "sexual-health", testCount: 6, description: "Confidential STI & hormone tests" },
];

// ─── Organ Categories ─────────────────────────────────────────
export const ORGAN_CATEGORIES: OrganCategory[] = [
  { id: "o1", name: "Blood", icon: "Droplets", slug: "blood", color: "#E53E3E" },
  { id: "o2", name: "Heart", icon: "Heart", slug: "heart", color: "#E53E3E" },
  { id: "o3", name: "Liver", icon: "Activity", slug: "liver", color: "#F59E0B" },
  { id: "o4", name: "Kidney", icon: "Filter", slug: "kidney", color: "#3182CE" },
  { id: "o5", name: "Thyroid", icon: "Zap", slug: "thyroid", color: "#00A8A8" },
  { id: "o6", name: "Hormones", icon: "FlaskConical", slug: "hormones", color: "#8B5CF6" },
  { id: "o7", name: "Vitamins", icon: "Sun", slug: "vitamins", color: "#F59E0B" },
  { id: "o8", name: "Bone", icon: "Bone", slug: "bone", color: "#6B7280" },
];

// ─── Cities ───────────────────────────────────────────────────
// Strictly approved locations only.
export const CITIES: City[] = [
  { id: "city-kol", slug: "kolkata", name: "Kolkata", state: "West Bengal", heroTagline: "Home sample collection across Kolkata — reports in 6 hours", areasServed: ["Salt Lake", "New Town", "Park Street", "Behala", "Garia", "Dum Dum", "Howrah", "Lake Town", "Alipore", "Jadavpur"], popularTests: ["complete-blood-count", "thyroid-profile-total", "hba1c"], popularPackages: ["smartscreen-essential", "smartscreen-advanced"], centreCount: 15, collectionTime: "60 min", metaTitle: "Lab Tests at Home in Kolkata | SMARTLAB247", metaDescription: "Book blood tests & health checkups in Kolkata. Home sample collection in 60 min. Up to 75% off." },
  { id: "city-goa", slug: "goa", name: "Goa", state: "Goa", heroTagline: "Launching Soon in Goa — Premium AI-Assisted Diagnostics", areasServed: ["Coming Soon"], popularTests: [], popularPackages: [], centreCount: 0, collectionTime: "Coming Soon", metaTitle: "Lab Tests at Home in Goa | SMARTLAB247", metaDescription: "SMARTLAB247 is coming soon to Goa. Register early for exclusive launch discounts." },
  { id: "city-bel", slug: "belagavi", name: "Belagavi", state: "Karnataka", heroTagline: "Launching Soon in Belagavi — Precision Home Diagnostics", areasServed: ["Coming Soon"], popularTests: [], popularPackages: [], centreCount: 0, collectionTime: "Coming Soon", metaTitle: "Lab Tests at Home in Belagavi | SMARTLAB247", metaDescription: "SMARTLAB247 is coming soon to Belagavi. Precision diagnostics at your doorstep." },
];

// ─── Centres ──────────────────────────────────────────────────
export const CENTRES: Centre[] = [
  { id: "cen1", slug: "salt-lake", name: "SMARTLAB247 — Salt Lake", city: "Kolkata", address: "Block CF, Sector 1, Salt Lake, Kolkata", pincode: "700064", phone: "+91-033-4567-8901", hours: "6 AM – 6 PM, 7 days a week", openNow: true, services: ["Home Collection", "Walk-in", "AI Diagnostics"], homeCollection: true, walkIn: true, lat: 22.5855, lng: 88.4149 },
];
