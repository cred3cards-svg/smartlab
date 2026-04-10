import { PrismaClient, SampleType, Gender, UserRole, BookingStatus, PaymentStatus, ReportStatus, BillingPeriod } from "@prisma/client";
import "dotenv/config";

// Direct client for seeding
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seeding (Direct Connection)...");

  // 1. Admin User
  await prisma.adminUser.upsert({
    where: { email: "admin@smartlab247.com" },
    update: {},
    create: {
      email: "admin@smartlab247.com",
      name: "SmartAdmin",
      password: "hashed_password_here",
      role: UserRole.ADMIN,
    },
  });

  // 2. City & Areas (Kolkata First)
  const kolkata = await prisma.city.upsert({
    where: { slug: "kolkata" },
    update: {},
    create: {
      name: "Kolkata",
      slug: "kolkata",
      state: "West Bengal",
      heroTagline: "AI-Assisted Diagnostics at Your Doorstep in Kolkata",
      centreCount: 1,
      collectionTime: "60 mins",
      metaTitle: "Lab Tests at Home in Kolkata | SMARTLAB247",
      metaDescription: "Book blood tests and health checkups in Kolkata. Fast home sample collection across Salt Lake, New Town, and more.",
    },
  });

  console.log("🏙️ City created: Kolkata");

  const areas = ["Salt Lake", "New Town", "Park Street", "Behala", "Dum Dum", "Howrah"];
  for (const areaName of areas) {
    await prisma.area.create({
      data: {
        name: areaName,
        cityId: kolkata.id,
      },
    });
  }

  // 3. Categories
  const catGeneral = await prisma.category.upsert({
    where: { slug: "general-health" },
    update: {},
    create: { name: "General Health", slug: "general-health", icon: "Activity" },
  });

  const catThyroid = await prisma.category.upsert({
    where: { slug: "thyroid" },
    update: {},
    create: { name: "Thyroid", slug: "thyroid", icon: "Thermometer" },
  });

  console.log("📁 Categories created");

  // 4. Tests
  const cbc = await prisma.test.upsert({
    where: { slug: "complete-blood-count" },
    update: {},
    create: {
      name: "Complete Blood Count (CBC)",
      slug: "complete-blood-count",
      shortDescription: "Measures all types of blood cells — a fundamental health indicator",
      price: 480,
      originalPrice: 550,
      discountPercent: 13,
      reportTime: "6 hours",
      homeCollection: true,
      fasting: false,
      sampleType: SampleType.BLOOD,
      parameterCount: 24,
      organCategory: "Blood",
      preparation: ["No fasting required", "Stay well hydrated"],
      whoShouldTake: ["Annual health check-up", "Suspicion of anaemia or infection"],
      whyImportant: "CBC gives a broad picture of your overall health.",
      labDetails: "NABL-accredited lab using Sysmex XN-series.",
      popular: true,
      categories: { connect: { id: catGeneral.id } },
      parameters: {
        create: [
          { name: "Haemoglobin", unit: "g/dL", normalRange: "13.5–17.5" },
          { name: "Platelet Count", unit: "10^3/mcL", normalRange: "150–450" },
        ],
      },
    },
  });

  const thyroid = await prisma.test.upsert({
    where: { slug: "thyroid-profile-total" },
    update: {},
    create: {
      name: "Thyroid Profile Total (T3, T4, TSH)",
      slug: "thyroid-profile-total",
      shortDescription: "Complete thyroid function panel — T3, T4, and TSH levels",
      price: 500,
      originalPrice: 590,
      discountPercent: 15,
      reportTime: "8 hours",
      homeCollection: true,
      fasting: false,
      sampleType: SampleType.BLOOD,
      parameterCount: 3,
      organCategory: "Thyroid",
      preparation: ["No fasting required"],
      whoShouldTake: ["Fatigue", "Unexplained weight change"],
      popular: true,
      categories: { connect: { id: catThyroid.id } },
      parameters: {
        create: [
          { name: "TSH", unit: "mIU/L", normalRange: "0.4–4.0" },
        ],
      },
    },
  });

  console.log("🧪 Tests created: CBC, Thyroid");

  // 5. Packages
  await prisma.checkupPackage.upsert({
    where: { slug: "full-body-essential" },
    update: {},
    create: {
      name: "Full Body Checkup – Essential",
      slug: "full-body-essential",
      tagline: "Ideal for annual wellness and general fitness tracking — 91 parameters",
      price: 1599,
      originalPrice: 5243,
      discountPercent: 70,
      reportTime: "24 hours",
      parameterCount: 91,
      testCount: 10,
      gender: Gender.ALL,
      ageGroup: "30+ years",
      purpose: ["Annual wellness", "Preventive health"],
      popular: true,
      recommended: true,
      preparation: ["Fast for 10–12 hours before the test"],
      items: {
        create: [
          { testId: cbc.id },
          { testId: thyroid.id },
          { label: "Lipid Profile" },
          { label: "Liver Function Test" },
        ],
      },
    },
  });

  console.log("📦 Packages created");

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
