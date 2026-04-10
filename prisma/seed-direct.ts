import { Pool } from "@neondatabase/serverless";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seed() {
  console.log("🌱 Starting direct SQL seeding (V2)...");
  const client = await pool.connect();

  try {
    // 1. Admin User
    await client.query(`
      INSERT INTO "AdminUser" (id, email, password, name, role, "updatedAt")
      VALUES ('admin-1', 'admin@smartlab247.com', 'hashed_password', 'SmartAdmin', 'ADMIN', NOW())
      ON CONFLICT (email) DO NOTHING
    `);

    // 2. City
    const cityResult = await client.query(`
      INSERT INTO "City" (id, slug, name, state, "heroTagline", "metaTitle", "metaDescription", "updatedAt")
      VALUES ('city-kol', 'kolkata', 'Kolkata', 'West Bengal', 'AI-Assisted Diagnostics at Your Doorstep', 'Lab Tests at Home in Kolkata', 'Book blood tests and health checkups in Kolkata.', NOW())
      ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
      RETURNING id
    `);
    const cityId = cityResult.rows[0].id;

    // 3. Areas
    const areas = ["Salt Lake", "New Town", "Park Street", "Behala"];
    for (const area of areas) {
      await client.query(`
        INSERT INTO "Area" (id, name, "cityId", "updatedAt")
        VALUES ('area-' || lower(replace($1, ' ', '-')), $1, $2, NOW())
        ON CONFLICT DO NOTHING
      `, [area, cityId]);
    }

    // 4. Categories
    const catResult = await client.query(`
      INSERT INTO "Category" (id, name, slug, icon, "updatedAt")
      VALUES ('cat-gen', 'General Health', 'general-health', 'Activity', NOW())
      ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
      RETURNING id
    `);
    const catId = catResult.rows[0].id;

    // 5. Tests
    const testResult = await client.query(`
      INSERT INTO "Test" (id, slug, name, "shortDescription", price, "originalPrice", "discountPercent", "reportTime", "parameterCount", "popular", "updatedAt")
      VALUES ('test-cbc', 'complete-blood-count', 'Complete Blood Count (CBC)', 'Measures all types of blood cells', 480, 550, 13, '6 hours', 24, true, NOW())
      ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
      RETURNING id
    `);
    const testId = testResult.rows[0].id;

    // 6. Test Parameters
    await client.query(`
      INSERT INTO "TestParameter" (id, name, unit, "normalRange", "testId", "updatedAt")
      VALUES ('param-hb', 'Haemoglobin', 'g/dL', '13.5–17.5', $1, NOW())
      ON CONFLICT DO NOTHING
    `, [testId]);

    // 7. Test-Category Relation (Many-to-Many join table)
    await client.query(`
      INSERT INTO "_TestCategories" ("A", "B")
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
    `, [catId, testId]);

    // 8. Packages
    await client.query(`
      INSERT INTO "CheckupPackage" (id, slug, name, tagline, price, "originalPrice", "discountPercent", "reportTime", "parameterCount", "testCount", "popular", "recommended", "updatedAt")
      VALUES ('pkg-fbe', 'full-body-essential', 'Full Body Checkup – Essential', 'Ideal for wellness', 1599, 5243, 70, '24 hours', 91, 10, true, true, NOW())
      ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    `);

    console.log("✅ Direct SQL seeding completed successfully!");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
