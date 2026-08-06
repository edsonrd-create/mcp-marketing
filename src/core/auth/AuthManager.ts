import { Credentials } from "./Credentials.js";
import { TokenStore, type StoredToken } from "./TokenStore.js";

/**
 * Generic auth manager for providers — credentials + token cache.
 * Provider-specific OAuth (e.g. GoogleAdsAuthManager) remains in each provider.
 */
export class AuthManager {
  readonly tokens = new TokenStore();
  private readonly credentials = new Map<string, Credentials>();

  registerCredentials(credentials: Credentials): void {
    this.credentials.set(credentials.providerId, credentials);
  }

  getCredentials(providerId: string): Credentials | undefined {
    return this.credentials.get(providerId);
  }

  setToken(providerId: string, token: StoredToken): void {
    this.tokens.set(providerId, token);
  }

  getToken(providerId: string): StoredToken | undefined {
    return this.tokens.get(providerId);
  }

  clear(providerId?: string): void {
    this.tokens.clear(providerId);
    if (providerId) {
      this.credentials.delete(providerId);
      return;
    }
    this.credentials.clear();
  }
}
