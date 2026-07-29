export interface VisaRequirement {
  destination: string;
  processingDays: number;
  type: "Visa Required" | "Visa on Arrival" | "Visa Free";
}

export async function getVisaRequirements(
  passportCountry: string,
  destination: string
): Promise<VisaRequirement> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock standard rules based on destination
  const destLower = destination.toLowerCase();
  
  // Example rules:
  if (destLower.includes("uk") || destLower.includes("london") || destLower.includes("united kingdom")) {
    // UK takes ~21 days for most
    if (["us", "usa", "american", "british", "uk"].includes(passportCountry.toLowerCase())) {
      return { destination, processingDays: 0, type: "Visa Free" };
    }
    return { destination, processingDays: 21, type: "Visa Required" };
  }
  
  if (destLower.includes("usa") || destLower.includes("united states") || destLower.includes("new york")) {
    // USA takes ~30 days
    if (["us", "usa", "american", "british"].includes(passportCountry.toLowerCase())) {
      return { destination, processingDays: 0, type: "Visa Free" };
    }
    return { destination, processingDays: 30, type: "Visa Required" };
  }

  if (destLower.includes("uae") || destLower.includes("dubai") || destLower.includes("abu dhabi")) {
    // UAE is fast or Visa on Arrival
    if (["us", "usa", "american", "british", "european"].includes(passportCountry.toLowerCase())) {
      return { destination, processingDays: 0, type: "Visa on Arrival" };
    }
    return { destination, processingDays: 3, type: "Visa Required" };
  }

  if (destLower.includes("europe") || destLower.includes("france") || destLower.includes("italy") || destLower.includes("schengen")) {
    // Schengen takes ~15 days
    if (["us", "usa", "american", "british", "european"].includes(passportCountry.toLowerCase())) {
      return { destination, processingDays: 0, type: "Visa Free" };
    }
    return { destination, processingDays: 15, type: "Visa Required" };
  }

  if (destLower.includes("thailand") || destLower.includes("bali") || destLower.includes("indonesia") || destLower.includes("maldives")) {
    // Typically Visa Free or VoA for many, or fast processing
    return { destination, processingDays: 0, type: "Visa on Arrival" };
  }

  // Default fallback for any other destination
  return { destination, processingDays: 10, type: "Visa Required" };
}

export async function checkVisaFeasibility(
  passportCountry: string,
  destination: string,
  travelDate: string // YYYY-MM-DD
): Promise<{ feasible: boolean; requirement: VisaRequirement; daysUntilTravel: number }> {
  const req = await getVisaRequirements(passportCountry, destination);
  
  const today = new Date();
  const travel = new Date(travelDate);
  const diffTime = travel.getTime() - today.getTime();
  const daysUntilTravel = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const feasible = daysUntilTravel >= req.processingDays;

  return { feasible, requirement: req, daysUntilTravel };
}
