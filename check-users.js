const { PrismaClient } = require('./src/generated/client/index.js');
const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.findMany();
  console.log(users);
}
check();
