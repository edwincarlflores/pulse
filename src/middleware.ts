import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const userCookie = req.cookies.get("userCookie");

  if (userCookie) {
    return;
  }

  const random = Math.random().toString();

  const res = NextResponse.next();
  res.cookies.set("userCookie", random, { sameSite: "strict" });

  return res;
}
