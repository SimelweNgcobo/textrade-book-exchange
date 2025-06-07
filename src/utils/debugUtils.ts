/**
 * Enhanced error logging utility for debugging database and API errors
 */

export interface DatabaseError {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
  [key: string]: any;
}

/**
 * Logs database errors with detailed information
 */
export const logDatabaseError = (
  context: string,
  error: DatabaseError | Error | any,
  additionalData?: any,
) => {
  console.group(`🔴 Database Error: ${context}`);

  if (error && typeof error === "object") {
    // Handle Supabase/PostgreSQL errors
    if (error.message) {
      console.error("Message:", error.message);
    }
    if (error.code) {
      console.error("Error Code:", error.code);
    }
    if (error.details) {
      console.error("Details:", error.details);
    }
    if (error.hint) {
      console.error("Hint:", error.hint);
    }

    // Log additional fields that might be present
    const knownFields = ["message", "code", "details", "hint"];
    const additionalFields = Object.keys(error).filter(
      (key) => !knownFields.includes(key),
    );

    if (additionalFields.length > 0) {
      console.error(
        "Additional Error Info:",
        additionalFields.reduce(
          (acc, key) => ({ ...acc, [key]: error[key] }),
          {},
        ),
      );
    }
  } else {
    console.error("Raw Error:", error);
  }

  if (additionalData) {
    console.error("Additional Context:", additionalData);
  }

  // Log the full error object for complete debugging
  console.error("Full Error Object:", error);

  console.groupEnd();
};

/**
 * Logs query information for debugging
 */
export const logQueryDebug = (
  queryName: string,
  params?: any,
  result?: any,
) => {
  if (process.env.NODE_ENV === "development") {
    console.group(`🔍 Query Debug: ${queryName}`);

    if (params) {
      console.log("Parameters:", params);
    }

    if (result) {
      console.log("Result:", {
        success: !result.error,
        dataLength: result.data?.length || 0,
        error: result.error || null,
      });
    }

    console.groupEnd();
  }
};

/**
 * Creates a more descriptive error message from Supabase errors
 */
export const createErrorMessage = (error: DatabaseError): string => {
  if (!error) return "Unknown error occurred";

  if (error.message) {
    let message = error.message;

    // Add more context based on error code
    if (error.code) {
      switch (error.code) {
        case "PGRST116":
          message += " (Record not found)";
          break;
        case "PGRST202":
          message += " (Permission denied)";
          break;
        case "23503":
          message += " (Foreign key constraint violation)";
          break;
        case "23505":
          message += " (Unique constraint violation)";
          break;
        default:
          message += ` (Error code: ${error.code})`;
      }
    }

    if (error.hint) {
      message += ` Hint: ${error.hint}`;
    }

    return message;
  }

  return "Database operation failed";
};

/**
 * Safely stringify any object for logging
 */
export const safeStringify = (obj: any): string => {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (error) {
    return String(obj);
  }
};
