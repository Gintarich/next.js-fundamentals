import { db } from '@/db'
import { getSession } from './auth'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import { issues, users } from '@/db/schema'
import { mockDelay } from './utils'
import { unstable_cacheTag as cacheTag } from 'next/cache'

export const getCurrentUser = cache(async () => {
  console.log("get current user");
  await mockDelay(1000);
  const session = await getSession();
  if (!session) {
    return null
  }
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))

    return result[0] || null
  } catch (err) {
    console.log("Error getting user by Id", err);
    return null;
  }
});

export async function getUserByEmail(email: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    return user;
  } catch (err) {
    console.log(err)
    return null;
  }

}

export async function getIssues() {
  'use cache'
  cacheTag("issues")
  try {
    await mockDelay(1000);
    const result = await db.query.issues.findMany({
      with: {
        user: true,
      },
      orderBy: (issues, { desc }) => [desc(issues.createdAt)],
    })
    return result
  } catch (error) {
    console.error('Error fetching issues:', error)
    throw new Error('Failed to fetch issues')
  }
}

export async function getIssue(id: number) {

  try {
    await mockDelay(800);
    const issue = await db.query.issues.findFirst({
      where: eq(issues.id, id),
      with: {
        user: true,
      },
    })

    return issue;
  } catch (err) {
    console.log(err);
    return null;
  }
}
