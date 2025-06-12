import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { validateEnvironment } from "./config/environment";
import {
  initCoreWebVitals,
  PerformanceMonitor,
} from "./utils/performanceUtils";
import { initSecurity } from "./utils/securityUtils";
import "./index.css";

// Validate environment variables
try {
  validateEnvironment();

  // Check connection health in development
  if (import.meta.env.DEV) {
    import("./utils/connectionHealthCheck").then(({ logConnectionHealth }) => {
      logConnectionHealth();
    });
  }
} catch (error) {
  console.error("Environment validation failed:", error);
}

// Initialize performance monitoring
initCoreWebVitals();

// Initialize security measures
initSecurity();

// Performance optimizations are handled by performanceUtils

// Create a client with improved error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error && typeof error === "object" && "status" in error) {
          const status = (error as { status: number }).status;
          if (status >= 400 && status < 500) {
            return false;
          }
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: false, // Don't retry mutations by default
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary level="app">
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ErrorBoundary>,
);
