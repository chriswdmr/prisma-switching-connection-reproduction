import { execSync } from 'child_process'
import { nanoid } from 'nanoid'
import { join } from 'path'
import prisma from '../../db'
import fs from 'fs'

// small helper to determine if prisma 2 or prisma 3 is being used
const pkg = JSON.parse(fs.readFileSync(join(__dirname, '..', '..', 'package.json'), 'utf8'))
const prismaVersion = pkg.devDependencies.prisma.charAt(1)

const DATABASE_TEMPLATE_URL = `postgresql://user:password@localhost:5432/database-template`
const databases: string[] = []

beforeAll(async () => {
  await execSync(`${join(__dirname, '..', '..', 'node_modules', '.bin', 'prisma')} db push —-force-reset --skip-generate --accept-data-loss`, {
    env: {
      ...process.env,
      DATABASE_URL: DATABASE_TEMPLATE_URL
    }
  })
})

beforeEach(async () => {
  const database = `testing-${nanoid(4)}`
  databases.push(database)

  // since the api has changed between versions, we have to execute it differently based on the version
  if (prismaVersion === '3') {
    // @ts-ignore
    await prisma.$executeRawUnsafe(`CREATE DATABASE "${database}" WITH TEMPLATE "database-template"`)
  } else {
    // @ts-ignore
    await prisma.$executeRaw(`CREATE DATABASE "${database}" WITH TEMPLATE "database-template"`)
  }

  await prisma.$disconnect()

  process.env.DATABASE_URL = `postgresql://user:password@localhost:5432/${database}`
})

afterAll(async () => {
  await prisma.$disconnect()
  process.env.DATABASE_URL = DATABASE_TEMPLATE_URL

  // since the api has changed between versions, we have to execute it differently based on the version
  if (prismaVersion === '3') {
    // @ts-ignore
    await Promise.all(databases.map(db => prisma.$executeRawUnsafe(`DROP DATABASE IF EXISTS "${db}"`)))
  } else {
    // @ts-ignore
    await Promise.all(databases.map(db => prisma.$executeRaw(`DROP DATABASE IF EXISTS "${db}"`)))
  }

  await prisma.$disconnect()
})