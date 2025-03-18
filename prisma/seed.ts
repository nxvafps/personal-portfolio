import * as dotenv from "dotenv-flow";
dotenv.config({
  node_env: process.env.NODE_ENV || "development",
});

import { PrismaClient } from "@prisma/client";
import { devData, testData } from "./data/index";

const prisma = new PrismaClient();

async function main() {
  await prisma.projectLike.deleteMany({});
  await prisma.commentLike.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.verificationToken.deleteMany({});

  await prisma.user.deleteMany({});
  await prisma.project.deleteMany({});

  await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Project_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Comment_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "ProjectLike_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "CommentLike_id_seq" RESTART WITH 1;`;

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
