const { PrismaClient } = require('./src/generated/client/index.js');
const prisma = new PrismaClient();

async function fix() {
  // bcrypt hash for "password123"
  const hash = "$2b$10$EPXG64tYtJp3/OQ2yZ/qZ.V4FvQ9jU/M/E7v8kR/1v8U1x4cZ/1mO";
  await prisma.user.updateMany({ data: { passwordHash: hash } });
  console.log('Fixed passwords');
}

fix();
