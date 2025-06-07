import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  Database,
  Zap,
} from "lucide-react";
import { LoadingStateAuditor, AuditResult } from "@/utils/loadingStateAudit";

const LoadingStateDebug = () => {
  const [auditResults, setAuditResults] = useState<AuditResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [lastRunTime, setLastRunTime] = useState<Date | null>(null);

  useEffect(() => {
    // Auto-run audit on component mount
    runAudit();
  }, []);

  const runAudit = async () => {
    setIsRunning(true);
    try {
      const results = await LoadingStateAuditor.runFullAudit();
      setAuditResults(results);
      setLastRunTime(new Date());
    } catch (error) {
      console.error("Audit failed:", error);
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: AuditResult["status"]) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: AuditResult["status"]) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const healthyCount = auditResults.filter(
    (r) => r.status === "healthy",
  ).length;
  const warningCount = auditResults.filter(
    (r) => r.status === "warning",
  ).length;
  const errorCount = auditResults.filter((r) => r.status === "error").length;

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Loading State Audit
          </CardTitle>
          <Button
            onClick={runAudit}
            disabled={isRunning}
            variant="outline"
            size="sm"
          >
            {isRunning ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Run Audit
              </>
            )}
          </Button>
        </div>
        {lastRunTime && (
          <p className="text-sm text-gray-600">
            Last run: {lastRunTime.toLocaleTimeString()}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {healthyCount}
            </div>
            <div className="text-sm text-green-700">Healthy</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">
              {warningCount}
            </div>
            <div className="text-sm text-yellow-700">Warnings</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{errorCount}</div>
            <div className="text-sm text-red-700">Errors</div>
          </div>
        </div>

        {/* Overall Status */}
        {auditResults.length > 0 && (
          <Alert>
            {errorCount > 0 ? (
              <XCircle className="h-4 w-4" />
            ) : warningCount > 0 ? (
              <AlertTriangle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertDescription>
              {errorCount > 0 && (
                <span className="text-red-600 font-medium">
                  Critical issues detected! Please fix errors immediately.
                </span>
              )}
              {errorCount === 0 && warningCount > 0 && (
                <span className="text-yellow-600 font-medium">
                  Some components have warnings that should be addressed.
                </span>
              )}
              {errorCount === 0 && warningCount === 0 && (
                <span className="text-green-600 font-medium">
                  All systems are operating normally!
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Detailed Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Detailed Results</h3>
          {auditResults.map((result, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(result.status)}
                  <span className="font-medium">{result.component}</span>
                </div>
                <Badge className={getStatusColor(result.status)}>
                  {result.status}
                </Badge>
              </div>

              <p className="text-sm text-gray-700 mb-2">{result.message}</p>

              {result.details && (
                <details className="mt-2">
                  <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                    Show Details
                  </summary>
                  <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => LoadingStateAuditor.testEndpoint("books")}
              className="flex items-center"
            >
              <Database className="mr-2 h-4 w-4" />
              Test Books Table
            </Button>
            <Button
              variant="outline"
              onClick={() => LoadingStateAuditor.testEndpoint("profiles")}
              className="flex items-center"
            >
              <Database className="mr-2 h-4 w-4" />
              Test Profiles Table
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="flex items-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reload App
            </Button>
            <Button
              variant="outline"
              onClick={() => localStorage.clear()}
              className="flex items-center"
            >
              <Zap className="mr-2 h-4 w-4" />
              Clear Storage
            </Button>
          </div>
        </div>

        {/* Troubleshooting Tips */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Troubleshooting Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Loading Loops</h4>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>Check useEffect dependencies</li>
                <li>Ensure functions are wrapped in useCallback</li>
                <li>Verify loading states are reset in finally blocks</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">API Issues</h4>
              <ul className="list-disc list-inside text-green-700 space-y-1">
                <li>Check network connectivity</li>
                <li>Verify Supabase configuration</li>
                <li>Check database table existence</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingStateDebug;
