import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export const config = {
  matcher: "/([^/.]*)",
};

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl.pathname;
  const key = url.split("/")[1];
  if (key.length === 0) {
    return NextResponse.next();
  } // skip root
  const target = await redis.hget<string>("links", key);
  if (target) {
    ev.waitUntil(redis.hincrby("stats", key, 1)); // increment click count
    return NextResponse.redirect(target);
  } else {
    return NextResponse.redirect("/");
  }
}