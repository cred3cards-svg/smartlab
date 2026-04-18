import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";


const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    // Only throw in production runtime. During build/dev, we can fallback to a placeholder
    // to prevent build-time crashes during static analysis.
    if (process.env.NODE_ENV === "production" && !process.env.NEXT_PHASE) {
      throw new Error("DATABASE_URL is not set");
    }
    return new PrismaClient();
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
