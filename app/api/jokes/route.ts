import { NextResponse } from "next/server";
import { JOKES } from "@/lib/jokes";

export function GET() {
  return NextResponse.json([...JOKES]);
}
