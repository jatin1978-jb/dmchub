import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const destinationId = searchParams.get('destinationId');
    
    if (!destinationId) {
      return NextResponse.json({ error: "Destination ID is required" }, { status: 400 });
    }

    const packages = await prisma.package.findMany({
      where: { 
        status: "PUBLISHED",
        destinationId: destinationId
      },
      include: {
        dmc: true,
        images: true,
        destinationRel: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ packages });
  } catch (error) {
    console.error("Packages API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
