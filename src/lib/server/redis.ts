export class Session<T extends Record<string, any>> {
  private readonly items: Partial<T>;

  constructor() {
    this.items = {};
  }

  async set<K extends keyof T>(key: K, value: T[K]) {
    this.items[key] = value;
  }

  async get<K extends keyof T>(key: K): Promise<T[K] | null> {
    return this.items[key] ?? null;
  }
}
