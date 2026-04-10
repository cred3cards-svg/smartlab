import { Testimonial, DoctorEndorsement, MembershipPlan, FAQ, Category, OrganCategory } from "@/types";
import { City, Centre } from "@/types";

// ─── Testimonials ─────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", name: "Priya Sharma", city: "Bengaluru", rating: 5, text: "Booking took under 2 minutes. The SkillMedic™ arrived exactly on time at 7 AM, was gentle and professional. My CBC + thyroid results were in my WhatsApp by 2 PM. Phenomenal service!", testTaken: "SmartScreen Essential", date: "2026-03-12", verified: true, initials: "PS", avatarColor: "#00A8A8" },
  { id: "t2", name: "Rahul Mehta", city: "Mumbai", rating: 5, text: "As a diabetic, I was always going to a lab early morning. Now SMARTLAB247 does it at home and the report actually explains my HbA1c trend with an AI graph. Game-changer!", testTaken: "Diabetes Care Panel", date: "2026-02-28", verified: true, initials: "RM", avatarColor: "#0B3C5D" },
  { id: "t3", name: "Ananya Krishnan", city: "Hyderabad", rating: 5, text: "Booked the Women's Wellness Panel for my mother and myself. The entire experience was seamless, reports came with simple language explanations. No confusing medical jargon!", testTaken: "Women's Wellness Panel", date: "2026-03-05", verified: true, initials: "AK", avatarColor: "#4CAF50" },
  { id: "t4", name: "Vikram Singh", city: "Delhi", rating: 5, text: "Got a comprehensive panel done at 77% off the market price. The quality is top-notch — NABL-certified lab, prompt report. I'll never go to a local diagnostic centre again.", testTaken: "SmartScreen Advanced", date: "2026-01-20", verified: true, initials: "VS", avatarColor: "#00A8A8" },
  { id: "t5", name: "Meera Pillai", city: "Gurugram", rating: 5, text: "My 72-year-old father was nervous about getting blood drawn at home. The SkillMedic™ was so patient and calming — single prick, done in minutes. He said it was the easiest test he's ever had!", testTaken: "SeniorShield Panel", date: "2026-03-18", verified: true, initials: "MP", avatarColor: "#0B3C5D" },
  { id: "t6", name: "Aditya Patel", city: "Noida", rating: 5, text: "I'm a startup founder — no time to visit labs. SMARTLAB247 is exactly what I needed. 6 AM slot, done before my morning stand-up. Reports on my phone. Perfect for busy professionals.", testTaken: "Complete Blood Count", date: "2026-02-14", verified: true, initials: "AP", avatarColor: "#4CAF50" },
];

// ─── Doctor Endorsements ──────────────────────────────────────
export const DOCTOR_ENDORSEMENTS: DoctorEndorsement[] = [
  { id: "d1", name: "Dr. Kavitha Rajan", specialty: "Internal Medicine", hospital: "Apollo Hospitals, Bengaluru", quote: "SMARTLAB247's AI-flagged reports significantly improve our pre-consultation diagnostic quality. The turnaround time is faster than any lab I've worked with. I actively recommend it to all my patients.", initials: "KR" },
  { id: "d2", name: "Dr. Arjun Nair", specialty: "Endocrinologist", hospital: "Manipal Hospital, Chennai", quote: "For my thyroid and diabetes patients, the AI trend graphs in SMARTLAB247 reports help me have much more productive consultations. The report format is the cleanest I've seen.", initials: "AN" },
  { id: "d3", name: "Dr. Shruti Joshi", specialty: "Gynaecologist", hospital: "Fortis, Mumbai", quote: "I prescribe the Women's Wellness Panel frequently. The at-home collection removes a real barrier for my patients. The hormonal parameter interpretation in the report is clinically sound.", initials: "SJ" },
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
  // Booking
  { question: "How do I book a lab test or package?", answer: "Search for a test or package on our website or app, add it to your cart, select a time slot and address, complete payment — and you're done. Your SkillMedic™ will arrive at your scheduled time.", category: "booking" },
  { question: "Can I book for someone else?", answer: "Yes. During checkout, you can add patient details for a family member or friend. You can manage multiple patient profiles under one account.", category: "booking" },
  { question: "Can I book same-day tests?", answer: "Yes! We offer same-day morning slots for most tests. Book before 8 AM for a guaranteed morning collection slot.", category: "booking" },
  { question: "How do I reschedule or cancel a booking?", answer: "Log in to your account or use the order tracking link in your booking confirmation message. You can reschedule up to 2 hours before your slot at no charge. Cancellations are free up to 4 hours before.", category: "booking" },
  // Preparation
  { question: "Will I be told how to prepare for my test?", answer: "Yes. After booking, we send detailed preparation instructions via WhatsApp and email. Your SkillMedic™ will also confirm preparation requirements on arrival.", category: "preparation" },
  { question: "What happens if I accidentally broke my fast?", answer: "Contact our support immediately. We can reschedule your slot at no extra charge. For some tests (like CBC or thyroid), fasting isn't critical and collection can proceed — our team will advise.", category: "preparation" },
  // Sample Collection
  { question: "Who collects my blood sample at home?", answer: "A trained and verified SkillMedic™ from SMARTLAB247 visits your home. All SkillMedics™ are certified phlebotomists, background-verified, and equipped with bio-safety kits.", category: "collection" },
  { question: "Is home collection available 24/7?", answer: "Home collection is available from 6 AM to 6 PM, 7 days a week including holidays. Emergency services may be available — contact support.", category: "collection" },
  { question: "How is my sample transported to the lab?", answer: "Samples are transported in temperature-controlled, sealed bio-containers that maintain sample integrity. Chain-of-custody is tracked digitally from collection to lab receipt.", category: "collection" },
  { question: "Is it safe to give blood at home?", answer: "Absolutely. Our SkillMedics™ use sterile, single-use, auto-retractable needles. Bio-hazard disposal is handled per BMWM guidelines. Our process matches clinical facility safety standards.", category: "collection" },
  // Reports
  { question: "How do I receive my reports?", answer: "Reports are delivered via WhatsApp, email, and on your SMARTLAB247 account dashboard. You can download a digitally signed PDF. Optionally, enable smart AI summary with the report.", category: "reports" },
  { question: "How fast are reports generated?", answer: "Most routine tests are ready in 4–8 hours. Advanced panels may take 24–36 hours. Each test listing shows the exact expected turnaround.", category: "reports" },
  { question: "Are my reports doctor-reviewed?", answer: "All pathology reports are authorised and digitally signed by our qualified pathologists. AI flags are reviewed before reports are released.", category: "reports" },
  // Accuracy
  { question: "How accurate are SMARTLAB247 test results?", answer: "We use premium automated analysers calibrated to international standards. Our labs run mandatory Internal Quality Controls (IQC) and External Quality Assurance Schemes (EQAS). Results accuracy is independently verified.", category: "accuracy" },
  // Payment
  { question: "What payment methods are accepted?", answer: "We accept UPI, credit/debit cards, net banking, EMI, and digital wallets. You can also pay cash to the SkillMedic™ at the time of collection.", category: "payment" },
  { question: "Are there any hidden charges?", answer: "Zero hidden charges. The price shown is final. Home collection charges are clearly shown at checkout (₹0 with SMARTPASS247 membership).", category: "payment" },
  // Membership
  { question: "What is SMARTPASS247?", answer: "SMARTPASS247 is our annual health membership that gives you free home collections, extra test discounts, priority booking slots, AI trend reports, and wellness calendar reminders — for yourself or your whole family.", category: "membership" },
  { question: "Can I transfer my SMARTPASS247 to someone else?", answer: "SMARTPASS247 is non-transferable but can cover your family members as per your chosen plan (Family or Senior plans include multiple members).", category: "membership" },
  // Cities
  { question: "Which cities does SMARTLAB247 serve?", answer: "Currently serving Bengaluru, Mumbai, Delhi, Gurugram, Noida, and Hyderabad. We're expanding to Pune, Chennai, Kolkata, Ahmedabad, and Kochi. Enter your pincode on the website to check availability in your area.", category: "cities" },
  // Refund
  { question: "What is the refund policy?", answer: "Full refund if we're unable to fulfill your order. If you cancel 4+ hours before your slot, you'll receive a full refund to your original payment method within 3–5 business days.", category: "refund" },
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
export const CITIES: City[] = [
  { id: "city1", slug: "bangalore", name: "Bengaluru", state: "Karnataka", heroTagline: "Home sample collection across Bengaluru — reports in hours", areasServed: ["Koramangala", "HSR Layout", "Whitefield", "Indiranagar", "BTM Layout", "Jayanagar", "Electronic City", "Marathahalli", "Hebbal", "Banashankari"], popularTests: ["complete-blood-count", "thyroid-profile-total", "vitamin-d-25-oh"], popularPackages: ["smartscreen-essential", "smartscreen-advanced"], centreCount: 8, collectionTime: "60 min", metaTitle: "Lab Tests at Home in Bengaluru | SMARTLAB247", metaDescription: "Book blood tests & health checkups in Bengaluru. Home sample collection in 60 min. Reports in hours. Up to 75% off." },
  { id: "city2", slug: "mumbai", name: "Mumbai", state: "Maharashtra", heroTagline: "Mumbai's fastest home blood test service — by appointment only", areasServed: ["Bandra", "Andheri", "Powai", "Navi Mumbai", "Thane", "Malad", "Borivali", "Dadar", "Kurla", "Lower Parel"], popularTests: ["lipid-profile", "complete-blood-count", "thyroid-profile-total"], popularPackages: ["womens-health-package", "smartscreen-essential"], centreCount: 12, collectionTime: "75 min", metaTitle: "Lab Tests at Home in Mumbai | SMARTLAB247", metaDescription: "Book blood tests & health checkups in Mumbai. Home sample collection from 6 AM. Reports in hours. Up to 75% off." },
  { id: "city3", slug: "delhi", name: "Delhi", state: "Delhi", heroTagline: "Delhi's premium AI-assisted pathology — at your doorstep", areasServed: ["South Extension", "Lajpat Nagar", "Karol Bagh", "Dwarka", "Rohini", "Pitampura", "Vasant Kunj", "Greater Kailash", "Saket", "Hauz Khas"], popularTests: ["vitamin-d-25-oh", "thyroid-profile-total", "hba1c-glycated-haemoglobin"], popularPackages: ["smartscreen-advanced", "cardiac-risk-package"], centreCount: 10, collectionTime: "60 min", metaTitle: "Lab Tests at Home in Delhi | SMARTLAB247", metaDescription: "Book blood tests & health checkups in Delhi. AI-assisted pathology. Home collection from 6 AM. Up to 75% off." },
  { id: "city4", slug: "gurugram", name: "Gurugram", state: "Haryana", heroTagline: "Corporate wellness and home diagnostics across Gurugram", areasServed: ["DLF Phase 1-5", "Sohna Road", "Golf Course Road", "Palam Vihar", "Sector 14", "Sector 31", "MG Road", "Cyber City", "Udyog Vihar"], popularTests: ["lipid-profile", "complete-blood-count", "vitamin-b12"], popularPackages: ["diabetes-management-pack", "smartscreen-essential"], centreCount: 5, collectionTime: "45 min", metaTitle: "Lab Tests at Home in Gurugram | SMARTLAB247", metaDescription: "Book blood tests & health checkups in Gurugram. Fastest home sample collection. Reports in hours. Up to 75% off." },
  { id: "city5", slug: "noida", name: "Noida", state: "Uttar Pradesh", heroTagline: "Noida & Greater Noida's premium home diagnostics service", areasServed: ["Sector 62", "Sector 18", "Sector 50", "Sector 137", "Greater Noida", "Indirapuram", "Vaishali", "Crossing Republik"], popularTests: ["complete-blood-count", "thyroid-profile-total", "blood-glucose-fasting"], popularPackages: ["smartscreen-essential", "cardiac-risk-package"], centreCount: 4, collectionTime: "60 min", metaTitle: "Lab Tests at Home in Noida | SMARTLAB247", metaDescription: "Book blood tests & health checkups in Noida. Home sample collection. AI-assisted pathology. Up to 75% off." },
  { id: "city6", slug: "hyderabad", name: "Hyderabad", state: "Telangana", heroTagline: "Hyderabad's most trusted home-collection pathology lab", areasServed: ["Banjara Hills", "Jubilee Hills", "Hitec City", "Gachibowli", "Kondapur", "Madhapur", "Kukatpally", "Secunderabad", "Ameerpet"], popularTests: ["thyroid-profile-total", "vitamin-d-25-oh", "complete-blood-count"], popularPackages: ["womens-health-package", "smartscreen-advanced"], centreCount: 6, collectionTime: "60 min", metaTitle: "Lab Tests at Home in Hyderabad | SMARTLAB247", metaDescription: "Book blood tests & health checkups in Hyderabad. Premium home diagnostics. Reports in hours. Up to 75% off." },
];

// ─── Centres ──────────────────────────────────────────────────
export const CENTRES: Centre[] = [
  { id: "cen1", slug: "koramangala", name: "SMARTLAB247 — Koramangala", city: "Bengaluru", address: "123, 5th Block, Koramangala, Bengaluru", pincode: "560034", phone: "+91-080-4567-8901", hours: "6 AM – 6 PM, 7 days a week", openNow: true, services: ["Home Collection", "Walk-in", "Corporate", "Rapid Tests"], homeCollection: true, walkIn: true, lat: 12.9352, lng: 77.6244 },
  { id: "cen2", slug: "indiranagar", name: "SMARTLAB247 — Indiranagar", city: "Bengaluru", address: "45, 100 Feet Road, Indiranagar, Bengaluru", pincode: "560038", phone: "+91-080-4567-8902", hours: "6 AM – 6 PM, 7 days a week", openNow: true, services: ["Home Collection", "Walk-in", "Women's Health", "Thyroid Clinic"], homeCollection: true, walkIn: true, lat: 12.9784, lng: 77.6408 },
  { id: "cen3", slug: "bandra-west", name: "SMARTLAB247 — Bandra West", city: "Mumbai", address: "8, Linking Road, Bandra West, Mumbai", pincode: "400050", phone: "+91-022-4567-8911", hours: "6 AM – 6 PM, 7 days a week", openNow: true, services: ["Home Collection", "Walk-in", "Cardiac Panel", "Corporate Health"], homeCollection: true, walkIn: true, lat: 19.0596, lng: 72.8295 },
];
