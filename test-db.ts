import { PrismaClient } from "@prisma/client";
import "dotenv/config";

async function main() {
  console.log("Testing connection...");
  const prisma = new PrismaClient({
     datasources: {
       db: {
         url: process.env.DATABASE_URL
       }
     }
  });
  
  try {
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log("Connection successful:", result);
  } catch (e) {
    console.error("Connection failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
