// Environment configuration for production readiness
export const ENV = {
  NODE_ENV: import.meta.env.NODE_ENV || "development",
  VITE_SUPABASE_URL:
    import.meta.env.VITE_SUPABASE_URL ||
    "https://kbpjqzaqbqukutflwixf.supabase.co",
  VITE_SUPABASE_ANON_KEY:
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticGpxemFxYnF1a3V0Zmx3aXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NjMzNzcsImV4cCI6MjA2MzEzOTM3N30.3EdAkGlyFv1JRaRw9OFMyA5AkkKoXp0hdX1bFWpLVMc",
  VITE_PAYSTACK_PUBLIC_KEY: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "",
  VITE_APP_URL:
    import.meta.env.VITE_APP_URL || "https://rebookedsolutions.co.za",
} as const;

export const IS_PRODUCTION = ENV.NODE_ENV === "production";
export const IS_DEVELOPMENT = ENV.NODE_ENV === "development";

// Validate required environment variables
export const validateEnvironment = () => {
  const required = ["VITE_SUPABASE_URL", "VITE_SUPABASE_ANON_KEY"];

  const missing = required.filter((key) => !ENV[key as keyof typeof ENV]);

  if (missing.length > 0) {
    console.warn(
      `Missing environment variables: ${missing.join(", ")} - using fallback values`,
    );
    // Don't throw in development, just warn
    if (ENV.NODE_ENV === "production") {
      throw new Error(
        `Missing required environment variables: ${missing.join(", ")}`,
      );
    }
  }
};

// Production-specific configurations
export const PRODUCTION_CONFIG = {
  // Rate limiting (requests per minute)
  RATE_LIMIT: {
    auth: 5,
    booking: 10,
    general: 60,
  },

  // Cache durations (in milliseconds)
  CACHE_DURATION: {
    books: 5 * 60 * 1000, // 5 minutes
    profile: 10 * 60 * 1000, // 10 minutes
    static: 60 * 60 * 1000, // 1 hour
  },

  // Security headers
  SECURITY_HEADERS: {
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
};
