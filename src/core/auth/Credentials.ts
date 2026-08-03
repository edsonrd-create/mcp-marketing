export interface CredentialSet {
  providerId: string;
  values: Record<string, string>;
}

export class Credentials {
  constructor(
    readonly providerId: string,
    private readonly values: Record<string, string>,
  ) {}

  get(key: string): string | undefined {
    return this.values[key];
  }

  require(key: string): string {
    const value = this.values[key];
    if (!value) {
      throw new Error(`Missing credential ${key} for provider ${this.providerId}`);
    }
    return value;
  }

  keys(): string[] {
    return Object.keys(this.values);
  }

  toJSON(): CredentialSet {
    return { providerId: this.providerId, values: { ...this.values } };
  }
}
