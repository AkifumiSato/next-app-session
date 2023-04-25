import Redis from "ioredis";

export class Session<T extends Record<string, any>> {
  private readonly items: Partial<T>;
  private readonly redis: Redis;
  private readonly key: string;

  constructor(redis: Redis, key: string) {
    this.items = {};
    this.redis = redis;
    this.key = key;
  }

  async set<K extends keyof T>(key: K, value: T[K]) {
    this.items[key] = value;
    await this.redis.set(this.key, JSON.stringify(this.items));
  }

  async get<K extends keyof T>(key: K): Promise<T[K] | null> {
    const store = await this.redis.get(this.key);
    const items: T = store ? JSON.parse(store) : {};
    return items[key] ?? null;
  }
}
