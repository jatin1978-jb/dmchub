const bcrypt = require('bcrypt');
const { PrismaClient } = require('./src/generated/client/index.js');
const prisma = new PrismaClient();

async function fix() {
  const hash = await bcrypt.hash('password123', 10);
  await prisma.user.updateMany({ data: { passwordHash: hash } });
  console.log('Fixed passwords with hash:', hash);
}

fix();
