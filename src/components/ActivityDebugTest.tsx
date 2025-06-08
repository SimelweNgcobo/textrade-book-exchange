import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ActivityService } from "@/services/activityService";
import { useAuth } from "@/contexts/AuthContext";
import {
  Activity,
  Loader2,
  Bug,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";

const ActivityDebugTest = () => {
  const { user } = useAuth();
  const [isDebugging, setIsDebugging] = useState(false);
  const [debugResult, setDebugResult] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);

  const runDebugTest = async () => {
    if (!user) {
      alert("Please log in first");
      return;
    }

    setIsDebugging(true);
    try {
      console.log("🔍 Starting activity debug test...");
      const result = await ActivityService.debugActivityLogging(user.id);
      setDebugResult(result);

      // Also fetch current activities
      const userActivities = await ActivityService.getUserActivities(
        user.id,
        10,
      );
      setActivities(userActivities);
    } catch (error) {
      console.error("Debug test failed:", error);
      setDebugResult({
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsDebugging(false);
    }
  };

  const testSpecificActivity = async () => {
    if (!user) return;

    try {
      console.log("🧪 Testing specific activity...");
      const result = await ActivityService.logActivity(
        user.id,
        "profile_updated",
        "Manual Debug Test",
        "Testing activity logging from debug component",
        { debug: true, timestamp: new Date().toISOString() },
      );

      console.log("Manual test result:", result);

      if (result.success) {
        alert("✅ Activity logged successfully!");
      } else {
        alert(`❌ Failed to log activity: ${result.error}`);
      }

      // Refresh activities
      const userActivities = await ActivityService.getUserActivities(
        user.id,
        10,
      );
      setActivities(userActivities);
    } catch (error) {
      console.error("Manual test failed:", error);
      alert(
        `❌ Test failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="h-5 w-5" />
          Activity Service Debug Tool
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Current Status</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              {user ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span>User logged in: {user ? "Yes" : "No"}</span>
            </div>
            {user && (
              <>
                <div>User ID: {user.id}</div>
                <div>Email: {user.email}</div>
              </>
            )}
          </div>
        </div>

        {/* Test Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={runDebugTest}
            disabled={isDebugging || !user}
            variant="default"
          >
            {isDebugging ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Bug className="h-4 w-4 mr-2" />
            )}
            Run Full Debug Test
          </Button>

          <Button
            onClick={testSpecificActivity}
            disabled={!user}
            variant="outline"
          >
            <Activity className="h-4 w-4 mr-2" />
            Test Single Activity
          </Button>

          <Button
            onClick={async () => {
              if (user) {
                const userActivities = await ActivityService.getUserActivities(
                  user.id,
                  10,
                );
                setActivities(userActivities);
              }
            }}
            disabled={!user}
            variant="outline"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Activities
          </Button>
        </div>

        {/* Debug Results */}
        {debugResult && (
          <Alert
            className={
              debugResult.error
                ? "border-red-200 bg-red-50"
                : "border-green-200 bg-green-50"
            }
          >
            <AlertDescription>
              <div className="space-y-3">
                <h4 className="font-semibold">Debug Test Results:</h4>

                {debugResult.error ? (
                  <div className="text-red-700">
                    <strong>Error:</strong> {debugResult.error}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      Test completed at:{" "}
                      {new Date(debugResult.timestamp).toLocaleString()}
                    </div>

                    <div className="space-y-2">
                      {debugResult.tests?.map((test: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 p-2 bg-white rounded border"
                        >
                          {test.success ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">{test.name}</div>
                            <div className="text-sm text-gray-600">
                              {test.details}
                            </div>
                            {test.error && (
                              <div className="text-sm text-red-600 mt-1">
                                Error:{" "}
                                {typeof test.error === "string"
                                  ? test.error
                                  : JSON.stringify(test.error)}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <details className="mt-3">
                  <summary className="cursor-pointer text-sm text-gray-600">
                    View Raw Debug Data
                  </summary>
                  <pre className="mt-2 text-xs bg-gray-100 p-3 rounded border overflow-auto max-h-64">
                    {JSON.stringify(debugResult, null, 2)}
                  </pre>
                </details>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Current Activities */}
        {activities.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">
              Recent Activities ({activities.length})
            </h3>
            <div className="space-y-2 max-h-64 overflow-auto">
              {activities.map((activity, index) => (
                <div
                  key={activity.id || index}
                  className="p-3 bg-gray-50 rounded border"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-sm text-gray-600">
                        {activity.description}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Type: {activity.type} |{" "}
                        {new Date(activity.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  {activity.metadata &&
                    Object.keys(activity.metadata).length > 0 && (
                      <details className="mt-2">
                        <summary className="text-xs text-gray-500 cursor-pointer">
                          Metadata
                        </summary>
                        <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto">
                          {JSON.stringify(activity.metadata, null, 2)}
                        </pre>
                      </details>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <Alert className="border-blue-200 bg-blue-50">
          <AlertDescription className="text-blue-700 text-sm">
            <strong>How to use this debug tool:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>
                Click "Run Full Debug Test" to test all activity logging
                functions
              </li>
              <li>
                Check the results to see what's working and what's failing
              </li>
              <li>Look at the console logs for detailed error information</li>
              <li>Use "Test Single Activity" to test just one activity log</li>
              <li>Check "Recent Activities" to see what's been logged</li>
            </ol>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ActivityDebugTest;
