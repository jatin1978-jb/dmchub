import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const dmcProfiles = await prisma.dMCProfile.findMany({
    select: { id: true, companyName: true }
  });
  console.log("DMCs in DB:");
  console.table(dmcProfiles);
}

main().finally(() => prisma.$disconnect());
