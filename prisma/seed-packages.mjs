import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const DMCs = {
  test: 'cmp0xtzsu00019kz8i6jl9xw9',
  dubai: 'cmp0y7s2u00059kz8l92gxgr8',
  thai: 'cmp0y8iey00089kz89o0rbnsn'
};

const packages = [
  // DMC 1 - Test DMC
  { dmcId: DMCs.test, title: "3 Nights Dubai - Indian National", destination: "Dubai", durationDays: 4, durationNights: 3, price: 110, target: "Indian", seasonality: "Winter" },
  { dmcId: DMCs.test, title: "5 Nights Dubai - Indian National", destination: "Dubai", durationDays: 6, durationNights: 5, price: 180, target: "Indian", seasonality: "Year-round" },
  { dmcId: DMCs.test, title: "3 Nights Dubai - Saudi National", destination: "Dubai", durationDays: 4, durationNights: 3, price: 140, target: "Saudi", seasonality: "Winter" },
  { dmcId: DMCs.test, title: "5 Nights Dubai - Saudi National", destination: "Dubai", durationDays: 6, durationNights: 5, price: 220, target: "Saudi", seasonality: "Year-round" },

  // DMC 2 - Dubai DMC
  { dmcId: DMCs.dubai, title: "3 Nights Dubai - Indian National", destination: "Dubai", durationDays: 4, durationNights: 3, price: 120, target: "Indian", seasonality: "Summer" },
  { dmcId: DMCs.dubai, title: "5 Nights Dubai - Indian National", destination: "Dubai", durationDays: 6, durationNights: 5, price: 160, target: "Indian", seasonality: "Year-round" },
  { dmcId: DMCs.dubai, title: "3 Nights Dubai - Saudi National", destination: "Dubai", durationDays: 4, durationNights: 3, price: 130, target: "Saudi", seasonality: "Summer" },
  { dmcId: DMCs.dubai, title: "5 Nights Dubai - Saudi National", destination: "Dubai", durationDays: 6, durationNights: 5, price: 230, target: "Saudi", seasonality: "Year-round" },

  // DMC 3 - Thai DMC
  { dmcId: DMCs.thai, title: "3 Nights Thailand - Indian National", destination: "Thailand", durationDays: 4, durationNights: 3, price: 95, target: "Indian", seasonality: "Winter" },
  { dmcId: DMCs.thai, title: "5 Nights Thailand - Indian National", destination: "Thailand", durationDays: 6, durationNights: 5, price: 120, target: "Indian", seasonality: "Year-round" },
  { dmcId: DMCs.thai, title: "7 Nights Thailand - Indian National", destination: "Thailand", durationDays: 8, durationNights: 7, price: 180, target: "Indian", seasonality: "Winter" },
  
  { dmcId: DMCs.thai, title: "3 Nights Thailand - Saudi National", destination: "Thailand", durationDays: 4, durationNights: 3, price: 110, target: "Saudi", seasonality: "Summer" },
  { dmcId: DMCs.thai, title: "5 Nights Thailand - Saudi National", destination: "Thailand", durationDays: 6, durationNights: 5, price: 130, target: "Saudi", seasonality: "Year-round" },
  { dmcId: DMCs.thai, title: "7 Nights Thailand - Saudi National", destination: "Thailand", durationDays: 8, durationNights: 7, price: 170, target: "Saudi", seasonality: "Summer" },

  { dmcId: DMCs.thai, title: "3 Nights Thailand - Egyptian National", destination: "Thailand", durationDays: 4, durationNights: 3, price: 270, target: "Egyptian", seasonality: "Year-round" }, // 90 USD/Night * 3
];

async function main() {
  console.log("Seeding packages...");
  
  for (const p of packages) {
    await prisma.package.create({
      data: {
        dmcId: p.dmcId,
        title: p.title,
        destination: p.destination,
        durationDays: p.durationDays,
        durationNights: p.durationNights,
        pricePerPerson: p.price,
        targetNationalities: p.target,
        seasonality: p.seasonality,
        description: `Premium package for ${p.target} travelers in ${p.destination}.`,
        inclusions: "Hotels, Transfers, Half-day tour.",
        exclusions: "Visas, Airfare.",
        status: "PUBLISHED",
        culturalNotes: p.target === "Indian" ? "Near Indian stores and veg food." : p.target === "Saudi" ? "Near mosque and large family suites." : "Centrally located with halal options."
      }
    });
  }
  
  console.log("Seeding finished!");
}

main().finally(() => prisma.$disconnect());
