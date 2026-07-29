import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);
  await prisma.user.updateMany({
    where: { role: "DMC" },
    data: { passwordHash }
  });
  console.log("All DMC passwords reset to password123");
}

main().finally(() => prisma.$disconnect());
