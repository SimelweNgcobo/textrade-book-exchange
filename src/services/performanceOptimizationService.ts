import { supabase } from "@/integrations/supabase/client";
import { logError } from "@/utils/errorUtils";

/**
 * Performance optimization service to handle high user load
 */
export class PerformanceOptimizationService {
  // Cache for frequently accessed data
  private static cache = new Map<
    string,
    { data: any; timestamp: number; ttl: number }
  >();

  // Debounce timers
  private static debounceTimers = new Map<string, NodeJS.Timeout>();

  // Connection pool optimization
  private static connectionPoolSize = 10;
  private static activeConnections = 0;

  /**
   * Optimized caching with TTL
   */
  static setCache(key: string, data: any, ttlSeconds: number = 300) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000,
    });
  }

  static getCache(key: string) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  static clearCache(pattern?: string) {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  /**
   * Debounced function execution
   */
  static debounce<T extends (...args: any[]) => any>(
    key: string,
    func: T,
    delay: number,
  ): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>) => {
      const existing = this.debounceTimers.get(key);
      if (existing) {
        clearTimeout(existing);
      }

      const timer = setTimeout(() => {
        func(...args);
        this.debounceTimers.delete(key);
      }, delay);

      this.debounceTimers.set(key, timer);
    };
  }

  /**
   * Throttled function execution
   */
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number,
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return function (this: any, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  /**
   * Optimized database queries with pagination and caching
   */
  static async getOptimizedBooks(
    page: number = 1,
    limit: number = 20,
    filters?: { category?: string; university?: string; search?: string },
  ) {
    const cacheKey = `books_${page}_${limit}_${JSON.stringify(filters)}`;
    const cached = this.getCache(cacheKey);

    if (cached) {
      console.log("📦 Serving books from cache");
      return cached;
    }

    try {
      this.activeConnections++;

      let query = supabase
        .from("books")
        .select(
          `
          id,
          title,
          author,
          price,
          condition,
          university,
          category,
          images,
          created_at,
          seller_id,
          sold
        `,
        )
        .eq("sold", false)
        .order("created_at", { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (filters?.category) {
        query = query.eq("category", filters.category);
      }

      if (filters?.university) {
        query = query.eq("university", filters.university);
      }

      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,author.ilike.%${filters.search}%`,
        );
      }

      const { data, error, count } = await query;

      if (error) {
        logError("Error fetching optimized books", error);
        return { books: [], total: 0, page, limit };
      }

      const result = {
        books: data || [],
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      };

      // Cache for 5 minutes
      this.setCache(cacheKey, result, 300);

      return result;
    } catch (error) {
      logError("Exception in getOptimizedBooks", error);
      return { books: [], total: 0, page, limit };
    } finally {
      this.activeConnections--;
    }
  }

  /**
   * Batch operations for better performance
   */
  static async batchUpdateLastActive(userIds: string[]) {
    if (userIds.length === 0) return;

    try {
      // Process in chunks of 100
      const chunks = [];
      for (let i = 0; i < userIds.length; i += 100) {
        chunks.push(userIds.slice(i, i + 100));
      }

      const timestamp = new Date().toISOString();

      for (const chunk of chunks) {
        const { error } = await supabase
          .from("profiles")
          .update({ updated_at: timestamp })
          .in("id", chunk);

        if (error) {
          logError("Error in batch update last active", error);
        }
      }
    } catch (error) {
      logError("Exception in batchUpdateLastActive", error);
    }
  }

  /**
   * Lazy loading with intersection observer
   */
  static createIntersectionObserver(
    callback: (entries: IntersectionObserverEntry[]) => void,
    options?: IntersectionObserverInit,
  ): IntersectionObserver {
    const defaultOptions = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
      ...options,
    };

    return new IntersectionObserver(callback, defaultOptions);
  }

  /**
   * Memory usage optimization
   */
  static optimizeMemory() {
    // Clear old cache entries
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > value.ttl) {
        this.cache.delete(key);
      }
    }

    // Clear completed debounce timers
    for (const [key, timer] of this.debounceTimers.entries()) {
      if (!timer) {
        this.debounceTimers.delete(key);
      }
    }

    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
  }

  /**
   * Image optimization for better loading
   */
  static optimizeImageUrl(
    url: string,
    width?: number,
    quality?: number,
  ): string {
    if (!url) return "";

    // If it's a Supabase storage URL, add optimization parameters
    if (url.includes("supabase")) {
      const urlObj = new URL(url);
      if (width) urlObj.searchParams.set("width", width.toString());
      if (quality) urlObj.searchParams.set("quality", quality.toString());
      return urlObj.toString();
    }

    return url;
  }

  /**
   * Connection monitoring
   */
  static getConnectionStatus() {
    return {
      activeConnections: this.activeConnections,
      maxConnections: this.connectionPoolSize,
      cacheSize: this.cache.size,
      debounceTimers: this.debounceTimers.size,
    };
  }

  /**
   * Performance monitoring
   */
  static startPerformanceMonitoring() {
    // Monitor every 30 seconds
    setInterval(() => {
      this.optimizeMemory();

      const status = this.getConnectionStatus();
      console.log("📊 Performance Status:", status);

      // Warn if too many connections
      if (status.activeConnections > status.maxConnections * 0.8) {
        console.warn("⚠️ High connection usage detected");
      }

      // Warn if cache is getting too large
      if (status.cacheSize > 1000) {
        console.warn("⚠️ Large cache size detected, clearing old entries");
        this.optimizeMemory();
      }
    }, 30000);
  }

  /**
   * Initialize performance optimizations
   */
  static initialize() {
    console.log("🚀 Initializing performance optimizations...");

    // Start monitoring
    this.startPerformanceMonitoring();

    // Optimize scroll performance
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Optimized scroll handling can go here
          ticking = false;
        });
        ticking = true;
      }
    });

    // Optimize resize performance
    window.addEventListener(
      "resize",
      this.throttle(() => {
        // Optimized resize handling
        this.clearCache("layout");
      }, 250),
    );

    console.log("✅ Performance optimizations initialized");
  }
}
