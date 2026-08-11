const { PrismaClient } = require('./src/generated/client/index.js');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function test() {
  const dmc = await prisma.user.findUnique({ where: { email: 'dmc@example.com' } });
  const agent = await prisma.user.findUnique({ where: { email: 'agent@example.com' } });
  const admin = await prisma.user.findUnique({ where: { email: 'admin@dmchub.com' } });

  console.log('DMC User exists:', !!dmc, 'Status:', dmc?.status, 'Role:', dmc?.role);
  if (dmc) {
    const valid = await bcrypt.compare('password123', dmc.passwordHash);
    console.log('DMC Password (password123) valid:', valid);
  }

  console.log('Agent User exists:', !!agent, 'Status:', agent?.status, 'Role:', agent?.role);
  if (agent) {
    const valid = await bcrypt.compare('password123', agent.passwordHash);
    console.log('Agent Password (password123) valid:', valid);
  }

  console.log('Admin User exists:', !!admin, 'Status:', admin?.status, 'Role:', admin?.role);
  if (admin) {
    const valid = await bcrypt.compare('admin123', admin.passwordHash);
    console.log('Admin Password (admin123) valid:', valid);
  }
}

test();
