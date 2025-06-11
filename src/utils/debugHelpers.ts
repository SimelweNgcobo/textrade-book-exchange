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

export const simulateProfileError = () => {
  console.log("=== Simulating Profile Error (Fixed Version) ===");

  // Simulate different types of errors to test serialization
  const errors = [
    new Error("Test regular error"),
    { message: "Test object error", code: "TEST001" },
    { complexObject: { nested: "data" }, someProperty: "value" },
    "String error",
    null,
    undefined,
  ];

  errors.forEach((error, index) => {
    console.log(`--- Test Error ${index + 1} ---`);
    const errorDetails = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      type: error instanceof Error ? error.constructor.name : typeof error,
      name: error instanceof Error ? error.name : undefined,
      code: (error as any)?.code || (error as any)?.error_code,
      details: (error as any)?.details || (error as any)?.hint,
      timestamp: new Date().toISOString(),
    };

    console.error(
      "[AuthContext] Profile fetch failed (v2.0 - FIXED):",
      errorDetails,
    );
  });

  console.log("=== Error Simulation Complete ===");
};

// Call in development only
if (process.env.NODE_ENV === "development") {
  // Make functions available globally for console debugging
  (window as any).debugAuth = {
    testErrorSerialization,
    clearAuthState,
    debugAuthContext,
    simulateProfileError,
  };

  console.log("🔧 Debug utilities available: window.debugAuth");
}
