import { useState, useEffect } from "react";
import { loadingManager } from "@/utils/loadingStateManager";
import { emergencyLoadingReset } from "@/utils/emergencyLoadingReset";

const LoadingStateMonitor = () => {
  const [activeStates, setActiveStates] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const updateActiveStates = () => {
      const states = loadingManager.getActiveLoadingStates();
      setActiveStates(states);
    };

    // Update every 2 seconds
    const interval = setInterval(updateActiveStates, 2000);
    updateActiveStates(); // Initial update

    return () => clearInterval(interval);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null;

  // Only show if there are active loading states or if manually opened
  if (!isVisible && activeStates.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800">
          Loading Monitor ({activeStates.length})
        </h3>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>

      {isVisible && (
        <div className="space-y-2">
          {activeStates.length === 0 ? (
            <p className="text-xs text-green-600">
              ✅ No active loading states
            </p>
          ) : (
            <div className="space-y-1">
              {activeStates.map((state) => {
                const duration = Date.now() - state.startTime;
                const isLongRunning = duration > 10000;

                return (
                  <div
                    key={state.id}
                    className={`text-xs p-2 rounded ${
                      isLongRunning
                        ? "bg-red-50 text-red-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    <div className="font-medium">{state.component}</div>
                    <div className="text-xs opacity-75">
                      {Math.round(duration / 1000)}s - {state.id}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => loadingManager.debugActiveStates()}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Debug
            </button>
            <button
              onClick={() => loadingManager.forceStopAllLoading()}
              className="text-xs bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600"
            >
              Stop All
            </button>
            <button
              onClick={emergencyLoadingReset}
              className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Emergency Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingStateMonitor;
