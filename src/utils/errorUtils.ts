/**
 * Safely extracts error message from various error types
 */
export const getErrorMessage = (
  error: unknown,
  fallback = "An error occurred",
): string => {
  if (!error) return fallback;

  if (typeof error === "string") return error;

  if (error instanceof Error) return error.message;

  if (typeof error === "object" && error !== null) {
    const errorObj = error as any;

    // Handle Supabase error format
    if ("message" in errorObj && typeof errorObj.message === "string") {
      // Handle specific Supabase errors with user-friendly messages
      if (
        errorObj.message.includes(
          "JSON object requested, multiple (or no) rows returned",
        )
      ) {
        return "Profile not found or multiple profiles exist";
      }
      return errorObj.message;
    }

    // Handle PostgreSQL error format
    if ("details" in errorObj && typeof errorObj.details === "string") {
      return errorObj.details;
    }

    // Handle other error objects
    if ("error" in errorObj && typeof errorObj.error === "string") {
      return errorObj.error;
    }

    // Handle error codes
    if ("code" in errorObj && typeof errorObj.code === "string") {
      switch (errorObj.code) {
        case "PGRST116":
          return "Resource not found";
        case "PGRST200":
          return "Database constraint error";
        default:
          return `Database error (${errorObj.code})`;
      }
    }
  }

  return fallback;
};

/**
 * Safely logs error with proper message extraction
 */
export const logError = (context: string, error: unknown): void => {
  const message = getErrorMessage(error);
  console.error(`${context}:`, message);

  // In development, also log the full error object for debugging (safely)
  if (process.env.NODE_ENV === "development" && error) {
    try {
      // Try to stringify the error object safely
      const errorDetails =
        typeof error === "object"
          ? JSON.stringify(error, null, 2)
          : String(error);
      console.error("Full error details:", errorDetails);
    } catch (stringifyError) {
      // If stringify fails, just log key properties
      if (typeof error === "object" && error !== null) {
        const errorObj = error as any;
        console.error("Error properties:", {
          message: errorObj.message,
          code: errorObj.code,
          details: errorObj.details,
          hint: errorObj.hint,
        });
      }
    }
  }
};

/**
 * Creates user-friendly error message for display
 */
export const getUserErrorMessage = (error: unknown, context = ""): string => {
  const message = getErrorMessage(error);

  // Don't include technical error messages in user display
  if (
    message.includes("PGRST") ||
    message.includes("SQL") ||
    message.includes("pg_")
  ) {
    return `${context ? context + ": " : ""}Unable to complete operation. Please try again.`;
  }

  return `${context ? context + ": " : ""}${message}`;
};
