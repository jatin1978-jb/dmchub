import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkVisaEligibility } from "@/lib/mockVisaService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nationality, passportCountry, travelDate, nights } = body;

    if (!passportCountry || !travelDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const destinations = await prisma.destination.findMany({
      where: { active: true }
    });

    const eligibilityResults = await checkVisaEligibility({
      nationality,
      passportCountry,
      travelDate,
      nights,
      destinations
    });

    const eligibleDestinations = eligibilityResults.filter(d => d.eligible);
    const restrictedDestinations = eligibilityResults.filter(d => !d.eligible);

    return NextResponse.json({
      eligibleDestinations,
      restrictedDestinations,
      allResults: eligibilityResults
    });
  } catch (error) {
    console.error("Visa Check API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
