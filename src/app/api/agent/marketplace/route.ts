import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      where: { active: true },
      include: {
        _count: {
          select: { packages: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    const packages = await prisma.package.findMany({
      where: { status: "PUBLISHED" },
      include: {
        dmc: true,
        images: true,
        destinationRel: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      destinations,
      packages
    });
  } catch (error) {
    console.error("Marketplace API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
