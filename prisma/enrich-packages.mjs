import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Enriching packages with detailed itineraries...");
  
  const packages = await prisma.package.findMany();
  
  for (const pkg of packages) {
    let itinerary = "";
    let inclusions = "";
    
    if (pkg.destination.includes("Dubai")) {
      itinerary = `Day 1: Arrival at Dubai Int'l Airport. Private transfer to hotel. Evening Marina Dhow Cruise with Dinner.\nDay 2: Half-day Dubai City Tour (Burj Al Arab, Palm Jumeirah). Evening Burj Khalifa At the Top (124th Floor).\nDay 3: Morning at leisure. Afternoon Desert Safari with Dune Bashing, BBQ Dinner & Belly Dance.\nDay 4: Abu Dhabi Full Day Tour with Sheikh Zayed Grand Mosque & Ferrari World photo stop.`;
      if (pkg.durationNights >= 5) {
        itinerary += `\nDay 5: Visit to Museum of the Future. Evening Global Village & Miracle Garden tour.\nDay 6: Leisurely breakfast. Transfer to Airport for departure.`;
      }
      
      inclusions = `• Hotels: Choice of 4* (e.g. Aloft) or 5* (e.g. JW Marriott)
• Daily Breakfast at the hotel
• All Tours & Sightseeing on Sharing or Private basis
• Airport Transfers via Private Luxury Sedan
• 24/7 Local Support via WhatsApp`;
    } else {
      // Thailand
      itinerary = `Day 1: Arrival at Bangkok/Phuket. Meet & Greet by local rep. Transfer to Beach Resort.\nDay 2: Phi Phi Islands Speedboat Tour with Lunch. Snorkeling at Maya Bay.\nDay 3: James Bond Island Tour by Long-tail boat. Visit to Sea Gypsy Village.\nDay 4: Morning Elephant Sanctuary Visit (Ethical). Afternoon City & Temples Tour.`;
      if (pkg.durationNights >= 5) {
        itinerary += `\nDay 5: Full Day Jungle Safari at Khao Sok National Park.\nDay 6: Relaxing Spa & Massage session. Evening Thai Cooking Class.\nDay 7: Leisure time for shopping at local night markets.`;
        if (pkg.durationNights >= 7) {
          itinerary += `\nDay 8: Private transfer to Airport for your flight back home.`;
        }
      }

      inclusions = `• Hotels: 3* (Superior), 4* (Deluxe), or 5* (Luxury Villas)
• Daily Buffet Breakfast
• Speedboat and Ferry tickets included
• English Speaking Professional Guides
• All Entrance Fees to National Parks`;
    }

    await prisma.package.update({
      where: { id: pkg.id },
      data: {
        description: itinerary,
        inclusions: inclusions
      }
    });
  }
  
  console.log("Enrichment finished!");
}

main().finally(() => prisma.$disconnect());
