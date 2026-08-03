import { MemoryCache } from "../cache/MemoryCache.js";

export interface StoredToken {
  accessToken: string;
  expiresAt: number;
  refreshToken?: string;
}

/** In-memory token cache shared by AuthManager implementations. */
export class TokenStore {
  private readonly cache = new MemoryCache<StoredToken>();

  set(providerId: string, token: StoredToken): void {
    const ttl = Math.max(0, token.expiresAt - Date.now());
    this.cache.set(providerId, token, ttl || undefined);
  }

  get(providerId: string): StoredToken | undefined {
    return this.cache.get(providerId);
  }

  clear(providerId?: string): void {
    if (providerId) {
      this.cache.delete(providerId);
      return;
    }
    this.cache.clear();
  }
}
