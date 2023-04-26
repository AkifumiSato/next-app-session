import { Redis, Cluster } from "ioredis";

export class Session<T extends Record<string, any>> {
  private readonly redis: Redis | Cluster;
  private readonly key: string;
  private readonly ttl: number | undefined;

  constructor({
    redis,
    key,
    ttl,
  }: {
    redis: Redis | Cluster;
    key: string;
    ttl?: number;
  }) {
    this.redis = redis;
    this.key = key;
    this.ttl = ttl;
  }

  async set<K extends keyof T>(key: K, value: T[K]) {
    const prev = await this.get(key);
    const items = {
      ...prev,
      [key]: value,
    };
    await this.redis.set(this.key, JSON.stringify(items));
    if (typeof this.ttl === "number" && this.ttl > 0) {
      await this.redis.expire(this.key, this.ttl);
    }
  }

  async get<K extends keyof T>(key: K): Promise<T[K] | null> {
    const store = await this.redis.get(this.key);
    const items: T = store ? JSON.parse(store) : {};
    return items[key] ?? null;
  }
}
