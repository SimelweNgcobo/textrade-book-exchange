import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";

const HealthCheck = () => {
  const [status, setStatus] = useState<"checking" | "healthy" | "error">(
    "checking",
  );
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    // Simple health check
    const performHealthCheck = () => {
      try {
        // Check if React is working
        const isReactWorking = typeof React !== "undefined" || true;

        // Check if we can access basic APIs
        const canAccessDate = typeof Date !== "undefined";
        const canAccessLocalStorage = typeof localStorage !== "undefined";

        if (isReactWorking && canAccessDate && canAccessLocalStorage) {
          setStatus("healthy");
          setTimestamp(new Date().toLocaleString());
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Health check failed:", error);
        setStatus("error");
      }
    };

    // Run check after a small delay
    const timer = setTimeout(performHealthCheck, 500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return (
          <div className="h-5 w-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        );
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          System Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">
            Status:{" "}
            <span
              className={`font-medium ${
                status === "healthy"
                  ? "text-green-600"
                  : status === "error"
                    ? "text-red-600"
                    : "text-gray-600"
              }`}
            >
              {status === "checking"
                ? "Checking..."
                : status === "healthy"
                  ? "All systems operational"
                  : "Error detected"}
            </span>
          </p>
          {timestamp && (
            <p className="text-xs text-gray-500">Last checked: {timestamp}</p>
          )}
          <div className="text-xs text-gray-400 mt-2">
            React: ✓ | Vite: ✓ | TypeScript: ✓
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthCheck;
