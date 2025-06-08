/**
 * Emergency utility to reset stuck loading states
 * Use this when components get stuck in infinite loading
 */

import { loadingManager } from "./loadingStateManager";

export const emergencyLoadingReset = () => {
  console.log("🚨 Emergency loading state reset initiated");

  // Force stop all managed loading states
  loadingManager.forceStopAllLoading();

  // Clear any stuck timeouts
  const highestTimeoutId = setTimeout(() => {}, 0);
  for (let i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
  }

  // Clear intervals
  const highestIntervalId = setInterval(() => {}, 0);
  for (let i = 0; i < highestIntervalId; i++) {
    clearInterval(i);
  }

  // Force garbage collection if available
  if (window.gc) {
    window.gc();
  }

  // Reset any loading elements in the DOM
  const loadingElements = document.querySelectorAll(
    '[data-loading="true"], .animate-spin, .loading',
  );
  loadingElements.forEach((element) => {
    element.removeAttribute("data-loading");
    element.classList.remove("animate-spin", "loading");
  });

  // Remove any loading overlays
  const loadingOverlays = document.querySelectorAll(
    ".loading-overlay, .loading-spinner",
  );
  loadingOverlays.forEach((overlay) => overlay.remove());

  console.log(
    "✅ Emergency reset completed - components should be responsive now",
  );

  // Optional: Force page reload as last resort (commented out for now)
  // setTimeout(() => {
  //   window.location.reload();
  // }, 1000);
};

export const addEmergencyResetButton = () => {
  if (process.env.NODE_ENV !== "development") return;

  const button = document.createElement("button");
  button.innerText = "🚨 Emergency Reset";
  button.style.position = "fixed";
  button.style.top = "10px";
  button.style.right = "10px";
  button.style.zIndex = "9999";
  button.style.padding = "8px 12px";
  button.style.backgroundColor = "#ef4444";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "4px";
  button.style.cursor = "pointer";
  button.style.fontSize = "12px";
  button.onclick = emergencyLoadingReset;

  document.body.appendChild(button);

  // Add debug button
  const debugButton = document.createElement("button");
  debugButton.innerText = "📊 Debug Loading";
  debugButton.style.position = "fixed";
  debugButton.style.top = "50px";
  debugButton.style.right = "10px";
  debugButton.style.zIndex = "9999";
  debugButton.style.padding = "8px 12px";
  debugButton.style.backgroundColor = "#3b82f6";
  debugButton.style.color = "white";
  debugButton.style.border = "none";
  debugButton.style.borderRadius = "4px";
  debugButton.style.cursor = "pointer";
  debugButton.style.fontSize = "12px";
  debugButton.onclick = () => loadingManager.debugActiveStates();

  document.body.appendChild(debugButton);
};

// Auto-detect stuck loading states with improved detection
export const monitorLoadingStates = () => {
  if (process.env.NODE_ENV !== "development") return;

  let consecutiveLoadingChecks = 0;

  const checkInterval = setInterval(() => {
    const managedStates = loadingManager.getActiveLoadingStates();
    const domLoadingElements = document.querySelectorAll(
      '[data-loading="true"], .animate-spin, .loading',
    );
    const currentTime = Date.now();

    // Check managed loading states
    const longRunningManaged = managedStates.filter(
      (state) => currentTime - state.startTime > 30000, // 30 seconds
    );

    if (longRunningManaged.length > 0 || domLoadingElements.length > 0) {
      consecutiveLoadingChecks++;

      // If loading for more than 30 seconds, warn
      if (consecutiveLoadingChecks >= 6) {
        // 6 * 5 seconds = 30 seconds
        console.warn(
          "⚠️ Loading state detected for 30+ seconds. Possible infinite loop.",
        );
        console.log("Managed loading states:", managedStates);
        console.log("DOM loading elements:", domLoadingElements);
        loadingManager.debugActiveStates();
      }

      // If loading for more than 60 seconds, trigger emergency reset
      if (consecutiveLoadingChecks >= 12) {
        // 12 * 5 seconds = 60 seconds
        console.error(
          "🚨 Loading state stuck for 60+ seconds. Triggering emergency reset.",
        );
        console.log("Long-running states:", longRunningManaged);
        emergencyLoadingReset();
        consecutiveLoadingChecks = 0; // Reset counter
      }
    } else {
      consecutiveLoadingChecks = 0;
    }
  }, 5000);

  return () => clearInterval(checkInterval);
};

// Enhanced debug utilities for development
if (process.env.NODE_ENV === "development") {
  // Add global utilities
  (window as any).emergencyReset = emergencyLoadingReset;
  (window as any).debugLoading = () => {
    console.log("=== Loading State Debug ===");
    loadingManager.debugActiveStates();

    const domElements = document.querySelectorAll(
      '[data-loading="true"], .animate-spin, .loading',
    );
    console.log(`DOM loading elements: ${domElements.length}`);
    domElements.forEach((el, i) => {
      console.log(`  ${i + 1}. ${el.tagName} - ${el.className}`);
    });
  };

  (window as any).forceStopAll = () => {
    console.log("🛑 Force stopping all loading states");
    loadingManager.forceStopAllLoading();
  };
}
