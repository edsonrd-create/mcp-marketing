export class MemoryCache<V = unknown> {
  private readonly store = new Map<string, { value: V; expiresAt?: number }>();

  set(key: string, value: V, ttlMs?: number): void {
    const entry: { value: V; expiresAt?: number } = { value };
    if (ttlMs !== undefined) {
      entry.expiresAt = Date.now() + ttlMs;
    }
    this.store.set(key, entry);
  }

  get(key: string): V | undefined {
    const entry = this.store.get(key);
    if (!entry) {
      return undefined;
    }
    if (entry.expiresAt !== undefined && Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  size(): number {
    return this.store.size;
  }
}
