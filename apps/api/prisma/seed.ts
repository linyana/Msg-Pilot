import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

// initialize Prisma Client
const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  const passwordTest = await bcrypt.hash('123456', roundsOfHashing);

  const tenant = await prisma.tenants.upsert({
    where: {
      email: 'test@test.com',
    },
    update: {},
    create: {
      email: 'test@test.com',
      name: 'test_merchant',
      phone: '111',
    },
  });

  const user = await prisma.users.upsert({
    where: { email: 'test@test.com' },
    update: {
      password: passwordTest,
    },
    create: {
      email: 'test@test.com',
      name: 'test',
      password: passwordTest,
      tenant_id: tenant.id,
    },
  });
  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
