/**
 * Test utility to verify error handling is working correctly
 * This file can be removed after testing
 */

import { logError, getErrorMessage, getUserErrorMessage } from "./errorUtils";

export const testErrorHandling = () => {
  console.log("🧪 Testing error handling utilities...");

  // Test different error types
  const testErrors = [
    {
      error: new Error("Test error message"),
      description: "Standard Error object",
    },
    { error: "Simple string error", description: "String error" },
    {
      error: { message: "Supabase error message" },
      description: "Supabase-style error",
    },
    {
      error: { code: "PGRST116", details: "Not found" },
      description: "PostgreSQL error",
    },
    { error: { someProperty: "value" }, description: "Generic object error" },
    { error: null, description: "Null error" },
    { error: undefined, description: "Undefined error" },
  ];

  testErrors.forEach(({ error, description }) => {
    console.log(`\n--- Testing: ${description} ---`);

    // Test getErrorMessage
    const message = getErrorMessage(error);
    console.log("getErrorMessage result:", message);

    // Test getUserErrorMessage
    const userMessage = getUserErrorMessage(error, "Test context");
    console.log("getUserErrorMessage result:", userMessage);

    // Test logError (check console for proper output)
    logError("Test error logging", error);
  });

  console.log(
    "\n✅ Error handling test completed. Check console output above.",
  );
};

// Auto-run test in development
if (process.env.NODE_ENV === "development") {
  // Wait a bit for the app to load before running test
  setTimeout(() => {
    if (window.location.pathname === "/test-error-handling") {
      testErrorHandling();
    }
  }, 2000);
}
