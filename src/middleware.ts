import { NextResponse, type NextRequest } from "next/server";
import { nanoid } from "nanoid";

export function middleware(req: NextRequest) {
  const pollToken = req.cookies.get("poll-token");

  if (pollToken) {
    return;
  }

  const token = nanoid();

  const res = NextResponse.next();
  res.cookies.set("poll-token", token, { sameSite: "strict" });

  return res;
}
