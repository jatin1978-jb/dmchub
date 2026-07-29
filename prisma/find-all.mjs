import { PrismaClient } from "../src/generated/client/index.js";
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    include: { dmcProfile: true, agentProfile: true }
  });
  console.log("Users in DB:");
  console.table(users.map(u => ({
    email: u.email,
    role: u.role,
    status: u.status,
    hasDMC: !!u.dmcProfile,
    hasAgent: !!u.agentProfile
  })));
}

main().finally(() => prisma.$disconnect());
