interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<unknown>>();
  private defaultTtlMs = 60 * 60 * 1000; // 1 hour

  get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.defaultTtlMs) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  set<T>(key: string, data: T, ttlMs?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() - (ttlMs ? this.defaultTtlMs - ttlMs : 0),
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

// Global singleton across serverless invocations in dev/prod
const globalForCache = globalThis as unknown as { apiCache?: MemoryCache };
export const apiCache = globalForCache.apiCache || new MemoryCache();
if (process.env.NODE_ENV !== 'production') globalForCache.apiCache = apiCache;

