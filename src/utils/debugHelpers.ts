// Enhanced debug utilities for development and production environments
// Only logs in development mode to improve production performance

export const devLog = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.log(...args);
  }
};

export const devWarn = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.warn(...args);
  }
};

export const devError = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.error(...args);
  }
};

export const devTable = (data: any) => {
  if (import.meta.env.DEV && console.table) {
    console.table(data);
  }
};

export const devGroup = (label: string, fn: () => void) => {
  if (import.meta.env.DEV) {
    console.group(label);
    fn();
    console.groupEnd();
  }
};

export const devTime = (label: string) => {
  if (import.meta.env.DEV) {
    console.time(label);
  }
};

export const devTimeEnd = (label: string) => {
  if (import.meta.env.DEV) {
    console.timeEnd(label);
  }
};

// Performance monitoring helpers
export const perfMark = (name: string) => {
  if (import.meta.env.DEV && performance.mark) {
    performance.mark(name);
  }
};

export const perfMeasure = (
  name: string,
  startMark: string,
  endMark?: string,
) => {
  if (import.meta.env.DEV && performance.measure) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      devLog(`Performance: ${name} took ${measure.duration.toFixed(2)}ms`);
    } catch (error) {
      devWarn("Performance measurement failed:", error);
    }
  }
};

// Structured logging for better debugging
interface LogContext {
  component?: string;
  action?: string;
  data?: any;
  userId?: string;
  timestamp?: number;
}

export const structuredLog = (
  level: "info" | "warn" | "error",
  message: string,
  context?: LogContext,
) => {
  if (!import.meta.env.DEV && level !== "error") {
    return; // Only log errors in production
  }

  const logData = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...context,
  };

  switch (level) {
    case "info":
      console.log(message, logData);
      break;
    case "warn":
      console.warn(message, logData);
      break;
    case "error":
      console.error(message, logData);
      break;
  }
};

// Network request debugging
export const logApiCall = (method: string, url: string, payload?: any) => {
  if (import.meta.env.DEV) {
    devGroup(`API ${method.toUpperCase()} ${url}`, () => {
      if (payload) {
        devLog("Payload:", payload);
      }
      devTime(`API-${method}-${url}`);
    });
  }
};

export const logApiResponse = (
  method: string,
  url: string,
  response: any,
  error?: any,
) => {
  if (import.meta.env.DEV) {
    devTimeEnd(`API-${method}-${url}`);
    if (error) {
      devError("API Error:", error);
    } else {
      devLog("API Response:", response);
    }
  }
};

// Component lifecycle debugging
export const logComponentMount = (componentName: string, props?: any) => {
  if (import.meta.env.DEV) {
    devLog(`🚀 ${componentName} mounted`, props ? { props } : undefined);
  }
};

export const logComponentUnmount = (componentName: string) => {
  if (import.meta.env.DEV) {
    devLog(`💀 ${componentName} unmounted`);
  }
};

export const logComponentUpdate = (componentName: string, changes?: any) => {
  if (import.meta.env.DEV) {
    devLog(`🔄 ${componentName} updated`, changes ? { changes } : undefined);
  }
};

// Error reporting for production
export const reportError = (error: Error, context?: LogContext) => {
  // Always log errors regardless of environment
  console.error("Application Error:", error, context);

  // In production, you might want to send to error reporting service
  if (!import.meta.env.DEV) {
    // Example: Send to error reporting service
    // errorReportingService.captureException(error, context);
  }
};

// Safe JSON parsing with error handling
export const safeJsonParse = (jsonString: string, fallback: any = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    devWarn("JSON parse failed:", error);
    return fallback;
  }
};

// Safe localStorage operations
export const safeLocalStorage = {
  getItem: (key: string, fallback: any = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      devWarn(`LocalStorage getItem failed for key "${key}":`, error);
      return fallback;
    }
  },

  setItem: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      devWarn(`LocalStorage setItem failed for key "${key}":`, error);
      return false;
    }
  },

  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      devWarn(`LocalStorage removeItem failed for key "${key}":`, error);
      return false;
    }
  },
};

// Feature flag helper
export const isFeatureEnabled = (featureName: string): boolean => {
  if (import.meta.env.DEV) {
    const override = localStorage.getItem(`feature_${featureName}`);
    if (override !== null) {
      return override === "true";
    }
  }

  // Default feature flags based on environment
  const features: Record<string, boolean> = {
    debugMode: import.meta.env.DEV,
    enhancedLogging: import.meta.env.DEV,
    performanceMetrics: import.meta.env.DEV,
    // Add more feature flags as needed
  };

  return features[featureName] ?? false;
};

// Memory usage monitoring (development only)
export const logMemoryUsage = (label: string) => {
  if (import.meta.env.DEV && (performance as any).memory) {
    const memory = (performance as any).memory;
    devLog(`Memory Usage [${label}]:`, {
      used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`,
    });
  }
};

export default {
  devLog,
  devWarn,
  devError,
  devTable,
  devGroup,
  devTime,
  devTimeEnd,
  perfMark,
  perfMeasure,
  structuredLog,
  logApiCall,
  logApiResponse,
  logComponentMount,
  logComponentUnmount,
  logComponentUpdate,
  reportError,
  safeJsonParse,
  safeLocalStorage,
  isFeatureEnabled,
  logMemoryUsage,
};
