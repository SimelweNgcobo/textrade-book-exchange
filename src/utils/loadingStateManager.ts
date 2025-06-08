/**
 * Improved loading state manager to prevent infinite loading issues
 */

interface LoadingState {
  id: string;
  startTime: number;
  component: string;
  timeout?: NodeJS.Timeout;
}

class LoadingStateManager {
  private activeLoading: Map<string, LoadingState> = new Map();
  private maxLoadingTime = 30000; // 30 seconds max loading time
  private warningTime = 15000; // Warn after 15 seconds

  startLoading(component: string, id: string = "default"): string {
    const loadingId = `${component}-${id}`;

    // Clear any existing loading state for this component
    this.stopLoading(loadingId);

    const loadingState: LoadingState = {
      id: loadingId,
      startTime: Date.now(),
      component,
    };

    // Set up timeout to auto-clear loading after max time
    loadingState.timeout = setTimeout(() => {
      console.error(`🚨 Loading timeout for ${component} (${loadingId})`);
      this.forceStopLoading(loadingId);
    }, this.maxLoadingTime);

    // Set up warning after warning time
    setTimeout(() => {
      if (this.activeLoading.has(loadingId)) {
        console.warn(
          `⚠️ Long loading detected for ${component} (${loadingId})`,
        );
      }
    }, this.warningTime);

    this.activeLoading.set(loadingId, loadingState);
    console.log(`🔄 Loading started: ${loadingId}`);

    return loadingId;
  }

  stopLoading(loadingId: string): boolean {
    const loadingState = this.activeLoading.get(loadingId);

    if (loadingState) {
      if (loadingState.timeout) {
        clearTimeout(loadingState.timeout);
      }

      const duration = Date.now() - loadingState.startTime;
      console.log(`✅ Loading completed: ${loadingId} (${duration}ms)`);

      this.activeLoading.delete(loadingId);
      return true;
    }

    return false;
  }

  forceStopLoading(loadingId: string): void {
    const loadingState = this.activeLoading.get(loadingId);

    if (loadingState) {
      if (loadingState.timeout) {
        clearTimeout(loadingState.timeout);
      }

      console.warn(`🛑 Force stopped loading: ${loadingId}`);
      this.activeLoading.delete(loadingId);
    }
  }

  forceStopAllLoading(): void {
    console.warn(
      `🛑 Force stopping all loading states (${this.activeLoading.size} active)`,
    );

    this.activeLoading.forEach((loadingState) => {
      if (loadingState.timeout) {
        clearTimeout(loadingState.timeout);
      }
    });

    this.activeLoading.clear();
  }

  getActiveLoadingStates(): LoadingState[] {
    return Array.from(this.activeLoading.values());
  }

  hasActiveLoading(): boolean {
    return this.activeLoading.size > 0;
  }

  getLoadingDuration(loadingId: string): number | null {
    const loadingState = this.activeLoading.get(loadingId);
    return loadingState ? Date.now() - loadingState.startTime : null;
  }

  // Debug method to log all active loading states
  debugActiveStates(): void {
    if (this.activeLoading.size === 0) {
      console.log("📊 No active loading states");
      return;
    }

    console.log(`�� Active loading states (${this.activeLoading.size}):`);
    this.activeLoading.forEach((state, id) => {
      const duration = Date.now() - state.startTime;
      console.log(`  - ${id}: ${duration}ms (${state.component})`);
    });
  }
}

// Global instance
export const loadingManager = new LoadingStateManager();

// React hook for easy usage
import { useState, useCallback, useRef, useEffect } from "react";

export function useLoadingState(componentName: string) {
  const [isLoading, setIsLoading] = useState(false);
  const loadingIdRef = useRef<string | null>(null);

  const startLoading = useCallback(
    (id: string = "default") => {
      if (loadingIdRef.current) {
        loadingManager.stopLoading(loadingIdRef.current);
      }

      loadingIdRef.current = loadingManager.startLoading(componentName, id);
      setIsLoading(true);

      return loadingIdRef.current;
    },
    [componentName],
  );

  const stopLoading = useCallback(() => {
    if (loadingIdRef.current) {
      loadingManager.stopLoading(loadingIdRef.current);
      loadingIdRef.current = null;
    }
    setIsLoading(false);
  }, []);

  const forceStopLoading = useCallback(() => {
    if (loadingIdRef.current) {
      loadingManager.forceStopLoading(loadingIdRef.current);
      loadingIdRef.current = null;
    }
    setIsLoading(false);
  }, []);

  // Auto-cleanup on unmount
  useEffect(() => {
    return () => {
      if (loadingIdRef.current) {
        loadingManager.stopLoading(loadingIdRef.current);
      }
    };
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    forceStopLoading,
  };
}

// Utility to create a safe async wrapper
export function createSafeAsyncOperation<T extends any[], R>(
  operation: (...args: T) => Promise<R>,
  componentName: string,
  timeout: number = 30000,
) {
  return async (...args: T): Promise<R> => {
    const loadingId = loadingManager.startLoading(componentName);

    try {
      // Race between the operation and timeout
      const result = await Promise.race([
        operation(...args),
        new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new Error(`Operation timed out after ${timeout}ms`)),
            timeout,
          ),
        ),
      ]);

      loadingManager.stopLoading(loadingId);
      return result;
    } catch (error) {
      loadingManager.forceStopLoading(loadingId);
      throw error;
    }
  };
}

// Development debugging
if (process.env.NODE_ENV === "development") {
  // Add global debug function
  (window as any).debugLoadingStates = () => loadingManager.debugActiveStates();
  (window as any).forceStopAllLoading = () =>
    loadingManager.forceStopAllLoading();

  // Periodic logging of long-running loading states
  setInterval(() => {
    const activeStates = loadingManager.getActiveLoadingStates();
    const longRunning = activeStates.filter(
      (state) => Date.now() - state.startTime > 10000, // 10 seconds
    );

    if (longRunning.length > 0) {
      console.warn(`⚠️ Long-running loading states detected:`, longRunning);
    }
  }, 10000);
}
