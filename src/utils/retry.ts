/**
 * Shared retry with exponential backoff for provider HTTP/API calls.
 */
export interface RetryOptions {
  retries?: number;
  minDelayMs?: number;
  maxDelayMs?: number;
  shouldRetry?: (error: unknown) => boolean;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withRetry<T>(
  operation: string,
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const retries = options.retries ?? 3;
  const minDelayMs = options.minDelayMs ?? 200;
  const maxDelayMs = options.maxDelayMs ?? 2000;
  const shouldRetry =
    options.shouldRetry ??
    ((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      return /timeout|ECONNRESET|429|5\d\d|temporar/i.test(message);
    });

  let attempt = 0;
  let lastError: unknown;
  while (attempt <= retries) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === retries || !shouldRetry(error)) {
        throw error;
      }
      const delay = Math.min(maxDelayMs, minDelayMs * 2 ** attempt);
      await sleep(delay);
      attempt += 1;
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error(`Retry exhausted for ${operation}`);
}
