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

    // Handle other object error formats
    if ("error" in errorObj && typeof errorObj.error === "string") {
      return errorObj.error;
    }

    if ("details" in errorObj && typeof errorObj.details === "string") {
      return errorObj.details;
    }
  }

  return fallback;
};

/**
 * Logs error with context information
 */
export const logError = (context: string, error: unknown, metadata?: any) => {
  const errorMessage = getErrorMessage(error);

  if (process.env.NODE_ENV === "development") {
    console.error(`[${context}]:`, errorMessage);
    if (metadata) {
      console.error("Metadata:", metadata);
    }
    if (error) {
      console.error("Full error:", error);
    }
  }
};

/**
 * Database-specific error logging (replacement for logDatabaseError)
 */
export const logDatabaseError = (
  context: string,
  error: unknown,
  metadata?: any,
) => {
  logError(`Database - ${context}`, error, metadata);
};

/**
 * Query debug logging (replacement for logQueryDebug) - only in development
 */
export const logQueryDebug = (context: string, query: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Query Debug - ${context}]:`, query);
  }
};

/**
 * Creates a standardized error object
 */
export const createError = (message: string, code?: string, details?: any) => {
  const error = new Error(message) as any;
  if (code) error.code = code;
  if (details) error.details = details;
  return error;
};

/**
 * Handles and formats Supabase-specific errors
 */
export const handleSupabaseError = (error: any, context: string) => {
  const message = getErrorMessage(error);
  logError(context, error);

  // Return user-friendly error message
  if (message.includes("duplicate key value")) {
    return "This item already exists";
  }
  if (message.includes("violates foreign key constraint")) {
    return "Referenced item does not exist";
  }
  if (message.includes("violates not-null constraint")) {
    return "Required field is missing";
  }

  return message;
};

/**
 * Gets user-friendly error message with fallback (replacement for getUserErrorMessage)
 */
export const getUserErrorMessage = (
  error: unknown,
  fallback = "An error occurred",
): string => {
  const message = getErrorMessage(error, fallback);

  // Convert technical errors to user-friendly messages
  if (message.includes("Failed to fetch")) {
    return "Network connection error. Please check your internet connection and try again.";
  }
  if (message.includes("PGRST116")) {
    return "The requested profile could not be found.";
  }
  if (message.includes("permission denied")) {
    return "You don't have permission to access this resource.";
  }
  if (message.includes("invalid input")) {
    return "Invalid information provided. Please check your input and try again.";
  }

  return message;
};
