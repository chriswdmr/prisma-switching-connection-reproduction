import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function main() {
  const posts = await  prisma.post.findMany()
  await prisma.$disconnect()

  return posts
}
