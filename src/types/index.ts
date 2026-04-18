// ─── Type Definitions ─────────────────────────────────────────

export interface Parameter {
  name: string;
  unit?: string;
  normalRange?: string;
}

export interface ParameterGroup {
  groupName: string;
  params: string[];
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export interface Test {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  reportTime: string;
  homeCollection: boolean;
  fasting: boolean;
  fastingHours?: number | null;
  sampleType: string;
  parameters?: Parameter[];
  parameterCount: number;
  categories: string[];
  organCategory?: string | null;
  preparation: string[];
  whoShouldTake?: string[];
  whyImportant?: string | null;
  labDetails?: string | null;
  popular: boolean;
  isNew: boolean;
  faqs?: FAQ[];
  relatedTests?: string[];
}

export interface Package {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  reportTime: string;
  homeCollection: boolean;
  fasting: boolean;
  fastingHours?: number | null;
  parameterCount: number;
  testCount: number;
  includedTests?: string[];
  parameterGroups?: ParameterGroup[];
  gender: "all" | "male" | "female" | "ALL" | "MALE" | "FEMALE" | "OTHER";
  ageGroup: string | null;
  purpose: string[];
  popular: boolean;
  recommended: boolean;
  membershipEligible: boolean;
  preparation: string[];
  frequency?: string | null;
  faqs?: FAQ[];
}

export interface City {
  id: string;
  slug: string;
  name: string;
  state: string;
  heroTagline: string;
  areasServed: string[];
  popularTests: string[];
  popularPackages: string[];
  centreCount: number;
  collectionTime: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Centre {
  id: string;
  slug: string;
  name: string;
  city: string;
  address: string;
  pincode: string;
  phone: string;
  hours: string;
  openNow: boolean;
  services: string[];
  homeCollection: boolean;
  walkIn: boolean;
  lat: number;
  lng: number;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  testTaken: string;
  date: string;
  verified: boolean;
  initials: string;
  avatarColor: string;
}

export interface DoctorEndorsement {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  quote: string;
  initials: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  billingPeriod: "monthly" | "quarterly" | "annual";
  memberCount: number;
  benefits: string[];
  discountOnTests: number;
  freeHomeCollections: number;
  prioritySlots: boolean;
  reportSLAHours: number;
  popular: boolean;
  color: string;
}

export interface Slot {
  date: string;
  time: string;
  available: boolean;
}

export interface OrderTrackingStep {
  label: string;
  description: string;
  time?: string;
  done: boolean;
  active: boolean;
}

export interface OrderTracking {
  orderId: string;
  patientName: string;
  tests: string[];
  currentStep: number;
  steps: OrderTrackingStep[];
  agentName?: string;
  agentPhone?: string;
  estimatedTime?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: number;
  author: string;
  publishedAt: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  testCount: number;
  description: string;
}

export interface OrganCategory {
  id: string;
  name: string;
  icon: string;
  slug: string;
  color: string;
}

export interface CartItem {
  id: string;
  type: "test" | "package";
  name: string;
  price: number;
  originalPrice: number;
  reportTime: string;
  homeCollection: boolean;
}

export interface BookingSlot {
  date: string;
  displayDate: string;
  slots: { time: string; available: boolean }[];
}
