import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({
  log: ["error"],
});

async function main() {
  console.log("Seeding started...");

  const hash123 = await bcrypt.hash("password123", 10);
  const hashAdmin123 = await bcrypt.hash("admin123", 10);

  // 1. Admin
  await prisma.user.upsert({
    where: { email: "admin@dmchub.com" },
    update: { passwordHash: hashAdmin123 },
    create: {
      email: "admin@dmchub.com",
      passwordHash: hashAdmin123,
      role: "ADMIN",
      status: "ACTIVE",
    }
  });
  console.log("Admin user ready: admin@dmchub.com / admin123");

  // 2. DMC
  const dmcUser = await prisma.user.upsert({
    where: { email: "dmc@example.com" },
    update: { passwordHash: hash123 },
    create: {
      email: "dmc@example.com",
      passwordHash: hash123,
      role: "DMC",
      status: "ACTIVE",
      dmcProfile: {
        create: {
          companyName: "Global DMC Hub",
          contactPerson: "DMC Manager",
          phone: "+123456789",
          country: "Global",
          address: "100 World Trade Tower"
        }
      }
    }
  });
  console.log("DMC user ready: dmc@example.com / password123");

  // 3. Agent
  const agentUser = await prisma.user.upsert({
    where: { email: "agent@example.com" },
    update: { passwordHash: hash123 },
    create: {
      email: "agent@example.com",
      passwordHash: hash123,
      role: "AGENT",
      status: "ACTIVE",
      agentProfile: {
        create: {
          agencyName: "Global Travel Agency",
          contactPerson: "Agent User",
          phone: "+1 555-0199",
          country: "UAE",
          address: "Dubai, UAE"
        }
      }
    }
  });

  // Ensure TravelAgentProfile exists if user was previously created
  const existingAgentProfile = await prisma.travelAgentProfile.findUnique({ where: { userId: agentUser.id } });
  if (!existingAgentProfile) {
    await prisma.travelAgentProfile.create({
      data: {
        userId: agentUser.id,
        agencyName: "Global Travel Agency",
        contactPerson: "Agent User",
        phone: "+1 555-0199",
        country: "UAE",
        address: "Dubai, UAE"
      }
    });
  }
  console.log("Agent user & profile ready: agent@example.com / password123");

  // 4. dmc1@example.com
  await prisma.user.upsert({
    where: { email: "dmc1@example.com" },
    update: { passwordHash: hash123 },
    create: {
      email: "dmc1@example.com",
      passwordHash: hash123,
      role: "DMC",
      status: "ACTIVE",
      dmcProfile: {
        create: {
          companyName: "Premium DMC 1",
          contactPerson: "Contact 1",
          phone: "+123456789",
          country: "Global",
          address: "123 Main St"
        }
      }
    }
  });
  console.log("DMC1 user ready: dmc1@example.com / password123");

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
