import dotenv from "dotenv-flow";
import { PrismaClient } from "@prisma/client";

dotenv.config({ node_env: "test" });

(process.env as any).NODE_ENV = "test";

declare global {
  var __prisma: PrismaClient | undefined;
}

if (!global.__prisma) {
  global.__prisma = new PrismaClient();
}

const prisma = global.__prisma;

export { prisma };

afterAll(async () => {
  await prisma.$disconnect();
});
