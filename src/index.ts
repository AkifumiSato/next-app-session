import { Session } from "./session";
import { Redis, Cluster } from "ioredis";

export function redSession<T extends Record<string, any>>({
  redis,
  ttl,
}: {
  redis: Redis | Cluster;
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
