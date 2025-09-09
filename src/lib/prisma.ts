import "server-only";
import { PrismaClient } from "@prisma/client";

export const prisma =
  (global as unknown).prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  (global as unknown).prisma = prisma;
}
