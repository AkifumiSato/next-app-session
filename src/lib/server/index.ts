import { Session } from "@/lib/server/session";
import { Redis } from "ioredis";
import { cookies } from "next/headers";

const redis = new Redis();

export const getSession = async () => {
  const cookieStore = cookies();
  let cookieId = cookieStore.get("session-id")?.value;
  if (typeof cookieId === "undefined") {
    // throw new Error('No "session-id" cookie found');
    // todo: route.tsでPOSTを生やして、そこでcookieを生成する
    cookieId = "test-user-key";
  }
  console.log("[[[cookieId]]]", cookieId);
  return new Session<{
    counter: number;
  }>(redis, cookieId);
};
