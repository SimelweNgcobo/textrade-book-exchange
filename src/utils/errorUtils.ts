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
    // Handle Supabase error format
    if ("message" in error && typeof (error as any).message === "string") {
      return (error as any).message;
    }

    // Handle PostgreSQL error format
    if ("details" in error && typeof (error as any).details === "string") {
      return (error as any).details;
    }

    // Handle other error objects
    if ("error" in error && typeof (error as any).error === "string") {
      return (error as any).error;
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

  // In development, also log the full error object for debugging
  if (process.env.NODE_ENV === "development") {
    console.error("Full error object:", error);
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
