import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const email = "jatin1978@gmail.com";
  const password = "password123";
  const passwordHash = await bcrypt.hash(password, 10);

  console.log(`Resetting password for ${email}...`);

  const user = await prisma.user.upsert({
    where: { email },
    update: { 
      passwordHash,
      status: "ACTIVE", // Ensure it's active
      role: "AGENT"
    },
    create: {
      email,
      passwordHash,
      role: "AGENT",
      status: "ACTIVE",
      agentProfile: {
        create: {
          agencyName: "Jatin Travels",
          contactPerson: "Jatin",
          phone: "1234567890",
          country: "India",
          address: "Delhi, India"
        }
      }
    }
  });

  console.log("Password reset successful!");
}

main().finally(() => prisma.$disconnect());
