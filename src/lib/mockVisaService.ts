import { Destination } from "@prisma/client";

export type VisaStatus = "VISA_FREE" | "VOA" | "E_VISA" | "VISA_REQUIRED" | "NOT_ELIGIBLE";

export interface VisaEligibilityResult {
  destinationId: string;
  destination: string;
  countryCode: string;
  visaStatus: VisaStatus;
  processingDays: number;
  eligible: boolean;
  selectable: boolean;
  reason: string;
  seasonalityMessage?: string;
  seasonalityStatus?: "optimal" | "acceptable" | "poor";
}

export interface VisaCheckParams {
  nationality: string;
  passportCountry: string;
  travelDate: string; // ISO string
  nights?: number;
  destinations: Destination[];
}

export async function checkVisaEligibility(params: VisaCheckParams): Promise<VisaEligibilityResult[]> {
  const { passportCountry, travelDate, destinations } = params;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  let daysUntilTravel = 999;
  let travelMonth = -1;
  if (travelDate) {
    const today = new Date();
    const travel = new Date(travelDate);
    travelMonth = travel.getMonth(); // 0-11
    const diffTime = travel.getTime() - today.getTime();
    daysUntilTravel = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }

  const getSeasonality = (destLower: string, month: number) => {
    if (month === -1) return undefined;
    
    // Simple mock logic for seasonality
    // Northern Hemisphere (US, UK, France): Summer is best (Jun-Aug / 5-7), Winter is poor (Dec-Feb / 11,0,1)
    if (destLower.includes("us") || destLower.includes("uk") || destLower.includes("france") || destLower.includes("schengen")) {
      if (month >= 5 && month <= 7) return { status: "optimal" as const, message: "High Season" };
      if (month === 11 || month === 0 || month === 1) return { status: "poor" as const, message: "Low Season" };
      return { status: "acceptable" as const, message: "Good Season" };
    }
    
    // Middle East / Desert (UAE, Dubai): Winter is best (Nov-Feb / 10,11,0,1), Summer is poor (Jun-Aug / 5-7)
    if (destLower.includes("uae") || destLower.includes("dubai")) {
      if (month === 10 || month === 11 || month === 0 || month === 1) return { status: "optimal" as const, message: "High Season" };
      if (month >= 5 && month <= 7) return { status: "poor" as const, message: "Not a good season" };
      return { status: "acceptable" as const, message: "Good Season" };
    }

    // Tropical (Thailand, Maldives, Singapore): Varies, generally Dry season is best
    if (destLower.includes("thailand") || destLower.includes("maldives")) {
      if (month >= 11 || month <= 3) return { status: "optimal" as const, message: "High Season" };
      if (month >= 5 && month <= 9) return { status: "poor" as const, message: "Low Season" };
      return { status: "acceptable" as const, message: "Good Season" };
    }

    return { status: "acceptable" as const, message: "Good Season" };
  };

  const results: VisaEligibilityResult[] = destinations.map((dest) => {
    let visaStatus: VisaStatus = "VISA_REQUIRED";
    let processingDays = dest.visaProcessingDays;
    let reason = "Standard processing time applies.";

    const destLower = dest.name.toLowerCase();
    const passportLower = passportCountry.toLowerCase();

    // Mock logic based on destination name
    if (destLower.includes("uae") || destLower.includes("dubai")) {
      visaStatus = "E_VISA";
      processingDays = 3;
      reason = "E-Visa required. Fast processing.";
    } else if (destLower.includes("thailand") || destLower.includes("singapore")) {
      visaStatus = "VISA_FREE";
      processingDays = 0;
      reason = "Visa free for most nationalities.";
    } else if (destLower.includes("maldives")) {
      visaStatus = "VOA";
      processingDays = 0;
      reason = "Visa on arrival available.";
    } else if (destLower.includes("uk") || destLower.includes("united kingdom")) {
      visaStatus = "VISA_REQUIRED";
      processingDays = 15;
      reason = "Visa required. 15 days processing.";
    } else if (destLower.includes("us") || destLower.includes("united states")) {
      visaStatus = "VISA_REQUIRED";
      processingDays = 30;
      reason = "Visa required. 30 days processing.";
    } else if (destLower.includes("france") || destLower.includes("schengen")) {
      visaStatus = "VISA_REQUIRED";
      processingDays = 20;
      reason = "Schengen Visa required.";
    }

    // Special exemptions (e.g. US passport holders often get visa free)
    if (["us", "usa", "american", "british"].includes(passportLower) && visaStatus === "VISA_REQUIRED") {
      if (!destLower.includes("us") && !destLower.includes("uk")) {
         visaStatus = "VISA_FREE";
         processingDays = 0;
         reason = "Visa free for your passport.";
      }
    }

    // Determine eligibility based on processing days vs travel date
    let eligible = true;
    let selectable = true;

    if (processingDays > daysUntilTravel) {
      eligible = false;
      selectable = false;
      reason = `Visa processing time (${processingDays} days) exceeds your departure date.`;
    }

    const seasonality = getSeasonality(destLower, travelMonth);

    return {
      destinationId: dest.id,
      destination: dest.name,
      countryCode: dest.countryCode,
      visaStatus,
      processingDays,
      eligible,
      selectable,
      reason,
      seasonalityMessage: seasonality?.message,
      seasonalityStatus: seasonality?.status
    };
  });

  return results;
}
