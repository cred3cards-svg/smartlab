import { PrismaClient, UserRole, SampleType, Gender } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import bcrypt from 'bcryptjs';
import "dotenv/config";

// Import hardcoded data
import { TESTS } from '../src/data/tests';
import { PACKAGES } from '../src/data/packages';
import { CATEGORIES, CITIES, FAQS } from '../src/data/index';

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaNeon({ connectionString: connectionString! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Database Content Sync Started ---');

  // 1. Seed Super Admin
  const adminEmail = 'admin@admin.com';
  const hashedPassword = await bcrypt.hash('Kopal0586', 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword, role: UserRole.SUPER_ADMIN },
    create: {
      email: adminEmail,
      name: 'Super Admin',
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
      active: true,
    },
  });
  console.log('✅ Super Admin synchronized.');

  // 2. Seed Categories
  console.log('Syncing Categories...');
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: { 
        slug: cat.slug, 
        name: cat.name, 
        description: cat.description,
        icon: cat.icon 
      },
    });
  }
  console.log(`✅ Seeded ${CATEGORIES.length} categories.`);

  // 3. Seed Tests
  console.log('Syncing Tests...');
  for (const test of TESTS) {
    const sampleTypeMap: Record<string, SampleType> = {
      'Blood': SampleType.BLOOD,
      'Urine': SampleType.URINE,
    };

    await prisma.test.upsert({
      where: { slug: test.slug },
      update: {
        name: test.name,
        shortDescription: test.shortDescription,
        price: test.price,
        originalPrice: test.originalPrice,
        discountPercent: test.discountPercent,
        reportTime: test.reportTime,
        homeCollection: test.homeCollection,
        fasting: test.fasting,
        fastingHours: test.fastingHours,
        sampleType: sampleTypeMap[test.sampleType] || SampleType.OTHER,
        parameterCount: test.parameterCount,
        organCategory: test.organCategory,
        preparation: test.preparation,
        whoShouldTake: test.whoShouldTake,
        whyImportant: test.whyImportant,
        labDetails: test.labDetails,
        popular: test.popular,
        isNew: test.isNew,
      },
      create: {
        slug: test.slug,
        name: test.name,
        shortDescription: test.shortDescription,
        price: test.price,
        originalPrice: test.originalPrice,
        discountPercent: test.discountPercent,
        reportTime: test.reportTime,
        homeCollection: test.homeCollection,
        fasting: test.fasting,
        fastingHours: test.fastingHours,
        sampleType: sampleTypeMap[test.sampleType] || SampleType.OTHER,
        parameterCount: test.parameterCount,
        organCategory: test.organCategory,
        preparation: test.preparation,
        whoShouldTake: test.whoShouldTake,
        whyImportant: test.whyImportant,
        labDetails: test.labDetails,
        popular: test.popular,
        isNew: test.isNew,
        // Connect categories by slug
        categories: {
          connect: CATEGORIES.filter(c => test.categories.includes(c.name)).map(c => ({ slug: c.slug }))
        },
        // Parameters
        parameters: {
          create: test.parameters?.map(p => ({
            name: p.name,
            unit: p.unit,
            normalRange: p.normalRange
          }))
        }
      },
    });
  }
  console.log(`✅ Seeded ${TESTS.length} tests.`);

  // 4. Seed Packages
  console.log('Syncing Packages...');
  for (const pkg of PACKAGES) {
    const genderMap: Record<string, Gender> = {
      'all': Gender.ALL,
      'male': Gender.MALE,
      'female': Gender.FEMALE,
    };

    // Find existing tests to link
    const matchingTests = await prisma.test.findMany({
      where: {
        name: { in: pkg.includedTests }
      }
    });

    await prisma.checkupPackage.upsert({
      where: { slug: pkg.slug },
      update: {
        name: pkg.name,
        tagline: pkg.tagline,
        price: pkg.price,
        originalPrice: pkg.originalPrice,
        discountPercent: pkg.discountPercent,
        reportTime: pkg.reportTime,
        homeCollection: pkg.homeCollection,
        fasting: pkg.fasting,
        fastingHours: pkg.fastingHours,
        parameterCount: pkg.parameterCount,
        testCount: pkg.testCount,
        gender: genderMap[pkg.gender] || Gender.ALL,
        ageGroup: pkg.ageGroup,
        purpose: pkg.purpose,
        popular: pkg.popular,
        recommended: pkg.recommended,
        membershipEligible: pkg.membershipEligible,
        preparation: pkg.preparation,
        frequency: pkg.frequency,
      },
      create: {
        slug: pkg.slug,
        name: pkg.name,
        tagline: pkg.tagline,
        price: pkg.price,
        originalPrice: pkg.originalPrice,
        discountPercent: pkg.discountPercent,
        reportTime: pkg.reportTime,
        homeCollection: pkg.homeCollection,
        fasting: pkg.fasting,
        fastingHours: pkg.fastingHours,
        parameterCount: pkg.parameterCount,
        testCount: pkg.testCount,
        gender: genderMap[pkg.gender] || Gender.ALL,
        ageGroup: pkg.ageGroup,
        purpose: pkg.purpose,
        popular: pkg.popular,
        recommended: pkg.recommended,
        membershipEligible: pkg.membershipEligible,
        preparation: pkg.preparation,
        frequency: pkg.frequency,
        items: {
          create: matchingTests.map(t => ({ testId: t.id }))
        }
      },
    });
  }
  console.log(`✅ Seeded ${PACKAGES.length} packages.`);

  // 5. Seed Referral Logic Settings
  console.log('Syncing Referral Settings...');
  const referralTiers = [
    { threshold: 2, rewardType: 'WALLET', amount: 250, notes: 'Bronze Tier' },
    { threshold: 5, rewardType: 'PACKAGE', amount: 0, notes: 'Silver Tier' },
    { threshold: 10, rewardType: 'CASH', amount: 1000, notes: 'Gold Tier' }
  ];

  await prisma.siteSetting.upsert({
    where: { key: 'referral_tiers' },
    update: { value: JSON.stringify(referralTiers) },
    create: {
      key: 'referral_tiers',
      value: JSON.stringify(referralTiers),
    }
  });
  console.log('✅ Referral tiers synchronized to SiteSettings.');

  console.log('--- Database Content Sync Completed Successfully ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
