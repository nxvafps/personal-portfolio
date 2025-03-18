import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, ProjectStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1") || 1);
    const limit = Math.max(
      1,
      Math.min(50, parseInt(searchParams.get("limit") || "10") || 10)
    );
    const skip = (page - 1) * limit;

    const featured = searchParams.get("featured") === "true";
    const category = searchParams.get("category");
    const statusParam = searchParams.get("status")?.toUpperCase();

    const where: any = {};

    if (featured) where.featured = true;
    if (category) where.category = category;
    if (
      statusParam &&
      Object.values(ProjectStatus).includes(statusParam as ProjectStatus)
    ) {
      where.status = statusParam;
    }

    const projects = await prisma.project.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.project.count({ where });

    return NextResponse.json({
      projects,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
