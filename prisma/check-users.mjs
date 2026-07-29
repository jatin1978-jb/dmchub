import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    select: { email: true, role: true, status: true }
  });
  console.log("Users in DB:");
  console.table(users);
}

main().finally(() => prisma.$disconnect());
