import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding package images...");
  
  const packages = await prisma.package.findMany();
  
  for (const pkg of packages) {
    const imageUrl = pkg.destination.includes("Dubai") 
      ? "/images/dubai.png" 
      : "/images/thailand.png";
      
    await prisma.packageImage.create({
      data: {
        packageId: pkg.id,
        url: imageUrl,
        isPrimary: true
      }
    });
  }
  
  console.log("Images seeded!");
}

main().finally(() => prisma.$disconnect());
