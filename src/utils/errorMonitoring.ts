import { IS_PRODUCTION } from "@/config/environment";

interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  userId?: string;
  severity: "low" | "medium" | "high" | "critical";
  context?: Record<string, unknown>;
}

class ErrorMonitor {
  private errorQueue: ErrorReport[] = [];
  private isReporting = false;

  constructor() {
    this.setupGlobalErrorHandlers();
  }

  private setupGlobalErrorHandlers() {
    // Catch unhandled JavaScript errors
    window.addEventListener("error", (event) => {
      this.reportError({
        message: event.message,
        stack: event.error?.stack,
        url: event.filename || window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        severity: "high",
        context: {
          lineno: event.lineno,
          colno: event.colno,
          type: "javascript_error",
        },
      });
    });

    // Catch unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      this.reportError({
        message: event.reason?.message || String(event.reason),
        stack: event.reason?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        severity: "high",
        context: {
          type: "unhandled_promise_rejection",
          reason: event.reason,
        },
      });
    });

    // Monitor network errors
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);

        // Report HTTP errors
        if (!response.ok && response.status >= 500) {
          this.reportError({
            message: `HTTP ${response.status}: ${response.statusText}`,
            url: typeof args[0] === "string" ? args[0] : args[0].url,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            severity: "medium",
            context: {
              type: "http_error",
              status: response.status,
              statusText: response.statusText,
            },
          });
        }

        return response;
      } catch (error) {
        // Report network errors
        this.reportError({
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          url: typeof args[0] === "string" ? args[0] : args[0].url,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          severity: "medium",
          context: {
            type: "network_error",
            fetchArgs: args[1], // Request options
          },
        });
        throw error;
      }
    };
  }

  reportError(errorReport: ErrorReport) {
    // Add to queue
    this.errorQueue.push(errorReport);

    // Log to console in development
    if (!IS_PRODUCTION) {
      console.group("🚨 Error Report");
      console.error("Message:", errorReport.message);
      console.error("Stack:", errorReport.stack);
      console.error("Context:", errorReport.context);
      console.groupEnd();
    }

    // Process queue (batch send to avoid spam)
    this.processErrorQueue();
  }

  private async processErrorQueue() {
    if (this.isReporting || this.errorQueue.length === 0) {
      return;
    }

    this.isReporting = true;

    try {
      const errors = this.errorQueue.splice(0, 10); // Process up to 10 errors at once

      // In production, you would send to your error tracking service
      // For now, we'll store in localStorage and console log
      if (IS_PRODUCTION) {
        // Store in localStorage for now (in real app, send to Sentry/LogRocket/etc)
        const existingErrors = JSON.parse(
          localStorage.getItem("error_reports") || "[]",
        );
        const allErrors = [...existingErrors, ...errors].slice(-50); // Keep last 50 errors
        localStorage.setItem("error_reports", JSON.stringify(allErrors));
      }

      // Always log critical errors
      const criticalErrors = errors.filter((e) => e.severity === "critical");
      if (criticalErrors.length > 0) {
        console.error("Critical errors detected:", criticalErrors);
      }
    } catch (reportingError) {
      console.error("Failed to report errors:", reportingError);
    } finally {
      this.isReporting = false;

      // Process remaining errors if any
      if (this.errorQueue.length > 0) {
        setTimeout(() => this.processErrorQueue(), 5000);
      }
    }
  }

  // Manual error reporting for custom errors
  reportCustomError(
    error: Error | string,
    context?: Record<string, unknown>,
    severity: ErrorReport["severity"] = "medium",
  ) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    this.reportError({
      message: errorMessage,
      stack: errorStack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      severity,
      context: {
        ...context,
        type: "custom_error",
      },
    });
  }

  // Get stored error reports (for debugging)
  getStoredErrors(): ErrorReport[] {
    try {
      return JSON.parse(localStorage.getItem("error_reports") || "[]");
    } catch {
      return [];
    }
  }

  // Clear stored errors
  clearStoredErrors() {
    localStorage.removeItem("error_reports");
  }
}

// Create singleton instance
export const errorMonitor = new ErrorMonitor();

// Export convenience functions
export const reportError = (
  error: Error | string,
  context?: Record<string, unknown>,
  severity?: ErrorReport["severity"],
) => {
  errorMonitor.reportCustomError(error, context, severity);
};

export const getErrorReports = () => errorMonitor.getStoredErrors();
export const clearErrorReports = () => errorMonitor.clearStoredErrors();
