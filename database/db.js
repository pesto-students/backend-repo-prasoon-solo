// app.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const showDBConnection = async () => {
  await prisma.$connect();
  console.log('===========db connected==========')
  await prisma.$disconnect()
}

showDBConnection()
export { prisma}