import dotenv from "dotenv-flow";
import { prisma } from "@/lib/prisma";

dotenv.config({ node_env: "test" });

(process.env as any).NODE_ENV = "test";

export { prisma };

afterAll(async () => {
  await prisma.$disconnect();
});
