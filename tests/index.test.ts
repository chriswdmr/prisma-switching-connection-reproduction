import prisma from '../db'
import { main } from '../index'

import './helpers/db'

it('returns two posts', async () => {
  await prisma.post.create({
    data: {
      title: 'First Post'
    }
  })

  await prisma.post.create({
    data: {
      title: 'Second Post'
    }
  })

  const posts = await main()

  expect(posts).toHaveLength(2)
})

it('returns two posts', async () => {
  await prisma.post.create({
    data: {
      title: 'First Post'
    }
  })

  await prisma.post.create({
    data: {
      title: 'Second Post'
    }
  })

  const posts = await main()

  expect(posts).toHaveLength(2)
})