import * as dotenv from "dotenv-flow";
dotenv.config({
  node_env: process.env.NODE_ENV || "development",
});

import { PrismaClient } from "@prisma/client";
import { devData, testData } from "./data/index";

const prisma = new PrismaClient();

async function main() {
  await prisma.project.deleteMany({});

  const currentEnv = process.env.NODE_ENV || "development";
  const projects = currentEnv === "test" ? testData.projects : devData.projects;

  console.log(`Using ${currentEnv} data for seeding...`);

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }

  console.log("Database has been seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
