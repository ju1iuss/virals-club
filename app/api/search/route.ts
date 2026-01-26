import { NextResponse } from "next/server";
import { getAllGuides } from "@/lib/mdx";

export async function GET() {
  try {
    const guides = await getAllGuides();
    return NextResponse.json(guides);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch guides" }, { status: 500 });
  }
}
