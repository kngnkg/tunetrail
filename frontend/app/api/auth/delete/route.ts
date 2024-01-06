import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
  } catch (e) {
    console.error(e)
    return errInternal("internal error")
  }
}
