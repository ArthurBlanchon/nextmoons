import { signOut } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  await signOut()
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_URL))
}