import { NextRequest } from "next/server";
import { GET } from "@/app/api/projects/route";
import { execSync } from "child_process";
import { prisma } from "../jest.setup";
import { ProjectStatus } from "@prisma/client";

describe("Projects API", () => {
  beforeAll(async () => {
    execSync("npx prisma migrate reset --force", {
      env: { ...process.env, NODE_ENV: "test" },
      stdio: "inherit",
    });
  });

  beforeEach(async () => {
    await prisma.$transaction([
      prisma.commentLike.deleteMany(),
      prisma.projectLike.deleteMany(),
      prisma.comment.deleteMany(),
      prisma.session.deleteMany(),
      prisma.account.deleteMany(),
      prisma.verificationToken.deleteMany(),
      prisma.project.deleteMany(),
      prisma.user.deleteMany(),
    ]);

    const { testData } = await import("@/prisma/data");
    await prisma.project.createMany({
      data: testData.projects,
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("GET /api/projects returns projects with default pagination", async () => {
    const request = new NextRequest("http://localhost:3000/api/projects", {
      method: "GET",
    });

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty("projects");
    expect(data).toHaveProperty("pagination");
    expect(data.pagination.page).toBe(1);
    expect(data.pagination.limit).toBe(10);
    expect(Array.isArray(data.projects)).toBe(true);
  });

  test("GET /api/projects with pagination parameters", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/projects?page=2&limit=5",
      {
        method: "GET",
      }
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.pagination.page).toBe(2);
    expect(data.pagination.limit).toBe(5);
  });

  test("GET /api/projects with filtering by featured", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/projects?featured=true",
      {
        method: "GET",
      }
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.projects.every((project: any) => project.featured)).toBe(true);
  });

  test("GET /api/projects with filtering by category", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/projects?category=Finance",
      {
        method: "GET",
      }
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(
      data.projects.every((project: any) => project.category === "Finance")
    ).toBe(true);
  });

  test("GET /api/projects with filtering by status", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/projects?status=COMPLETED",
      {
        method: "GET",
      }
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(
      data.projects.every(
        (project: any) => project.status === ProjectStatus.COMPLETED
      )
    ).toBe(true);
  });

  test("GET /api/projects with multiple filters", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/projects?featured=true&category=Machine Learning&status=COMPLETED",
      {
        method: "GET",
      }
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(
      data.projects.every(
        (project: any) =>
          project.featured &&
          project.category === "Machine Learning" &&
          project.status === ProjectStatus.COMPLETED
      )
    ).toBe(true);
  });

  test("GET /api/projects with invalid pagination parameters returns default values", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/projects?page=invalid&limit=invalid",
      {
        method: "GET",
      }
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.pagination.page).toBe(1);
    expect(data.pagination.limit).toBe(10);
  });

  test("GET /api/projects pagination respects total count", async () => {
    const totalProjects = await prisma.project.count();
    const limit = 5;
    const lastPage = Math.ceil(totalProjects / limit);

    const request = new NextRequest(
      `http://localhost:3000/api/projects?page=${lastPage}&limit=${limit}`,
      {
        method: "GET",
      }
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.pagination.pages).toBe(lastPage);
    expect(data.projects.length).toBeLessThanOrEqual(limit);
  });
});
