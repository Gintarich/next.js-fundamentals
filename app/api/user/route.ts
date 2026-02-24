import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  console.log(req);
  return NextResponse.json({ data: { message: "hello" } })
}

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  console.log(req)
  const stuff = (await headers()).get("Authorization");
  return NextResponse.json(stuff);
}
