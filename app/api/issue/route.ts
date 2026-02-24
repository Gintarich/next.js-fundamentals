import { db } from "@/db";
import { issues } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const issues = await db.query.issues.findMany({});
    return NextResponse.json({ data: { issues } })
  } catch (e) {
    console.log(e)
    return NextResponse.json({ error: "nah" }, { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json()

    // Validate required fields
    if (!data.title || !data.userId) {
      return NextResponse.json(
        { error: 'Title and userId are required' },
        { status: 400 }
      )
    }

    // Create the issue
    const newIssue = await db
      .insert(issues)
      .values({
        title: data.title,
        description: data.description || null,
        status: data.status || 'backlog',
        priority: data.priority || 'medium',
        userId: data.userId,
      })
      .returning()

    return NextResponse.json(
      { message: 'Issue created successfully', issue: newIssue[0] },
      { status: 201 }
    )
  } catch (e) {
    console.log(e);
  }
}
