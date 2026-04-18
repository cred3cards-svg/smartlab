import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;
  
  // If no connection string, return a client with a placeholder to prevent build-time crashes.
  if (!connectionString) {
    console.warn("⚠️ DATABASE_URL not set. Database operations will fail.");
    return new PrismaClient({
      // @ts-ignore - Placeholder for build-time static analysis
      datasourceUrl: "postgresql://placeholder:placeholder@localhost:5432/placeholder"
    });
  }
  
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.prisma ?? prismaClientSingleton();

export const prisma = db;
export default db;

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
