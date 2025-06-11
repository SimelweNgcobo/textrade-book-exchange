/**
 * Debug utilities for testing error serialization and authentication flow
 */

export const testErrorSerialization = () => {
  console.log("=== Testing Error Serialization ===");

  // Test 1: Regular Error object
  const regularError = new Error("Test error message");
  console.log("Regular Error:", {
    message: regularError.message,
    stack: regularError.stack,
    name: regularError.name,
  });

  // Test 2: Supabase-like error object
  const supabaseError = {
    message: "Test Supabase error",
    code: "PGRST116",
    details: "No rows found",
    hint: "Check your query",
  };
  console.log("Supabase Error:", {
    message: supabaseError.message,
    code: supabaseError.code,
    details: supabaseError.details,
  });

  // Test 3: Unknown object error
  const unknownError = { someProperty: "value", nested: { data: "test" } };
  console.log("Unknown Error:", {
    type: typeof unknownError,
    stringValue: String(unknownError),
    properties: Object.keys(unknownError),
  });

  console.log("=== Error Serialization Test Complete ===");
};

export const clearAuthState = () => {
  console.log("=== Clearing Authentication State ===");

  // Clear localStorage items related to auth
  const authKeys = ["supabase.auth.token", "viewedBroadcasts", "sb-"];

  Object.keys(localStorage).forEach((key) => {
    if (authKeys.some((authKey) => key.includes(authKey))) {
      localStorage.removeItem(key);
      console.log(`Cleared localStorage key: ${key}`);
    }
  });

  // Clear sessionStorage
  Object.keys(sessionStorage).forEach((key) => {
    if (authKeys.some((authKey) => key.includes(authKey))) {
      sessionStorage.removeItem(key);
      console.log(`Cleared sessionStorage key: ${key}`);
    }
  });

  console.log("=== Authentication State Cleared ===");
};

export const debugAuthContext = () => {
  console.log("=== Authentication Context Debug Info ===");
  console.log("User Agent:", navigator.userAgent);
  console.log("Online Status:", navigator.onLine);
  console.log("Current URL:", window.location.href);
  console.log("Timestamp:", new Date().toISOString());
  console.log("=== Debug Info Complete ===");
};

// Call in development only
if (process.env.NODE_ENV === "development") {
  // Make functions available globally for console debugging
  (window as any).debugAuth = {
    testErrorSerialization,
    clearAuthState,
    debugAuthContext,
  };

  console.log("🔧 Debug utilities available: window.debugAuth");
}
