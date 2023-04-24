import { Session } from "@/lib/server/redis";

export const session = new Session<{
  counter: number;
}>();
