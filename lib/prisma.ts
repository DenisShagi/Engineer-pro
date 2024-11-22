import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Логировать запросы в консоль
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
