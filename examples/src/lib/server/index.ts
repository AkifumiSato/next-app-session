import { redSession } from "next-app-session";
import { Redis } from "ioredis";
import { cookies } from "next/headers";

const redis = new Redis();
const { getSession } = redSession({ redis });

export const getUserSession = async () => {
  const cookieStore = cookies();
  let cookieId = cookieStore.get("session-id")?.value;
  if (typeof cookieId === "undefined") {
    // throw new Error('No "session-id" cookie found');
    // todo: redirectして、route.tsでcookieを生成する
    cookieId = "test-user-key";
  }
  console.log("[[[cookieId]]]", cookieId);
  return getSession(cookieId);
};
