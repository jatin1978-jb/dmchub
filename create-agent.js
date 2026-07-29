const { PrismaClient } = require('./src/generated/client/index.js');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function createAgent() {
  const hash = await bcrypt.hash('password123', 10);
  await prisma.user.create({
    data: {
      email: 'agent@example.com',
      passwordHash: hash,
      role: 'AGENT',
      status: 'ACTIVE',
      agentProfile: {
        create: {
          agencyName: 'Travel Pro Agency',
          phone: '+1234567890',
          country: 'USA',
          contactPerson: 'Jane Doe',
          address: '123 Test St'
        }
      }
    }
  });
  console.log('Agent created');
}

createAgent().catch(console.error).finally(() => prisma.$disconnect());
