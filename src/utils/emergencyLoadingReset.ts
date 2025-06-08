/**
 * Emergency utility to reset stuck loading states
 * Use this when components get stuck in infinite loading
 */

export const emergencyLoadingReset = () => {
  console.log("🚨 Emergency loading state reset initiated");

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

  console.log("✅ Emergency reset completed - page should reload");

  // Force page reload as last resort
  setTimeout(() => {
    window.location.reload();
  }, 1000);
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
};

// Auto-detect stuck loading states
export const monitorLoadingStates = () => {
  if (process.env.NODE_ENV !== "development") return;

  let loadingCount = 0;
  let lastLoadingCheck = Date.now();

  const checkInterval = setInterval(() => {
    const loadingElements = document.querySelectorAll(
      '[data-loading="true"], .animate-spin, .loading',
    );
    const currentTime = Date.now();

    if (loadingElements.length > 0) {
      loadingCount++;

      // If loading for more than 30 seconds, warn
      if (currentTime - lastLoadingCheck > 30000) {
        console.warn(
          "⚠️ Loading state detected for 30+ seconds. Possible infinite loop.",
        );
        console.log("Loading elements found:", loadingElements);
      }

      // If loading for more than 60 seconds, trigger emergency reset
      if (currentTime - lastLoadingCheck > 60000) {
        console.error(
          "🚨 Loading state stuck for 60+ seconds. Triggering emergency reset.",
        );
        emergencyLoadingReset();
      }
    } else {
      loadingCount = 0;
      lastLoadingCheck = currentTime;
    }
  }, 5000);

  return () => clearInterval(checkInterval);
};
