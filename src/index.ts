import { Session } from "./session";
import Redis from "ioredis";

export function redSession<T extends Record<string, any>>({
  redis,
  ttl,
}: {
  redis: Redis;
  ttl?: number;
}) {
  return {
    getSession: (key: string) => {
      return new Session<T>({
        redis,
        key,
        ttl,
      });
    },
  };
}
