import { supabase } from "@/integrations/supabase/client";

export interface ConnectionHealthResult {
  isOnline: boolean;
  supabaseConnected: boolean;
  authStatus: "connected" | "disconnected" | "error";
  latency?: number;
  error?: string;
  timestamp: string;
}

/**
 * Check overall connection health
 */
export const checkConnectionHealth =
  async (): Promise<ConnectionHealthResult> => {
    const startTime = Date.now();

    const result: ConnectionHealthResult = {
      isOnline: navigator.onLine,
      supabaseConnected: false,
      authStatus: "disconnected",
      timestamp: new Date().toISOString(),
    };

    try {
      // Test basic Supabase connection with a simple query
      const { data, error } = (await Promise.race([
        supabase.from("profiles").select("id").limit(1),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Connection timeout")), 5000),
        ),
      ])) as any;

      const endTime = Date.now();
      result.latency = endTime - startTime;

      if (error) {
        result.error = error.message;
        result.supabaseConnected = false;
      } else {
        result.supabaseConnected = true;
      }

      // Check auth status
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();

      if (authError) {
        result.authStatus = "error";
        result.error = authError.message;
      } else if (session) {
        result.authStatus = "connected";
      } else {
        result.authStatus = "disconnected";
      }
    } catch (error) {
      result.error =
        error instanceof Error ? error.message : "Unknown connection error";
      result.supabaseConnected = false;
      result.authStatus = "error";
    }

    return result;
  };

/**
 * Quick connection test
 */
export const quickConnectionTest = async (): Promise<boolean> => {
  try {
    const { error } = (await Promise.race([
      supabase.from("profiles").select("id").limit(1),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 3000),
      ),
    ])) as any;

    return !error;
  } catch {
    return false;
  }
};

/**
 * Enhanced error handler with connection context
 */
export const handleConnectionError = (
  error: any,
  operation: string,
): string => {
  console.error(`Connection error in ${operation}:`, error);

  // Network-related errors
  if (
    error?.message?.includes("Failed to fetch") ||
    error?.message?.includes("Network request failed") ||
    error?.message?.includes("fetch")
  ) {
    if (!navigator.onLine) {
      return "You appear to be offline. Please check your internet connection and try again.";
    }
    return "Connection failed. Please check your internet connection and try again.";
  }

  // Timeout errors
  if (
    error?.message?.includes("timeout") ||
    error?.message?.includes("Timeout")
  ) {
    return "Connection timed out. Please try again.";
  }

  // CORS errors
  if (error?.message?.includes("CORS")) {
    return "Connection blocked. Please refresh the page and try again.";
  }

  // Authentication errors
  if (error?.message?.includes("JWT") || error?.message?.includes("auth")) {
    return "Session expired. Please log in again.";
  }

  // Generic fallback
  return `Connection error: ${error?.message || "Please try again"}`;
};

/**
 * Connection retry utility
 */
export const retryWithConnection = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
): Promise<T> => {
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Check connection before retry (except first attempt)
      if (attempt > 1) {
        const isConnected = await quickConnectionTest();
        if (!isConnected) {
          throw new Error("No connection available");
        }
      }

      return await operation();
    } catch (error) {
      lastError = error;

      // Don't retry on certain errors
      if (
        error?.message?.includes("JWT") ||
        error?.message?.includes("auth") ||
        error?.code === "PGRST116" // Not found
      ) {
        throw error;
      }

      if (attempt < maxRetries) {
        console.log(`Retry attempt ${attempt}/${maxRetries} in ${delay}ms`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 1.5; // Exponential backoff
      }
    }
  }

  throw lastError;
};

/**
 * Log connection health for debugging
 */
export const logConnectionHealth = async (): Promise<void> => {
  if (process.env.NODE_ENV === "development") {
    const health = await checkConnectionHealth();
    console.log("🔗 Connection Health:", health);
  }
};
