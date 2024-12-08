import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

// initialize Prisma Client
const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  const passwordTest = await bcrypt.hash('123456', roundsOfHashing);

  const merchant = await prisma.merchant.upsert({
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

  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {
      password: passwordTest,
    },
    create: {
      email: 'test@test.com',
      name: 'test',
      password: passwordTest,
      merchant_id: merchant.id,
    },
  });
  console.log({ user });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
