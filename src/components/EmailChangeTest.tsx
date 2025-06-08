import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EmailChangeService } from "@/services/emailChangeService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Mail,
  TestTube,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
} from "lucide-react";

const EmailChangeTest = () => {
  const { user } = useAuth();
  const [testEmail, setTestEmail] = useState("");
  const [testToken, setTestToken] = useState("");
  const [isRequestTesting, setIsRequestTesting] = useState(false);
  const [isConfirmTesting, setIsConfirmTesting] = useState(false);
  const [isStatusTesting, setIsStatusTesting] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [pendingStatus, setPendingStatus] = useState<any>(null);

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const addTestResult = (
    test: string,
    success: boolean,
    message: string,
    data?: any,
  ) => {
    const result = {
      test,
      success,
      message,
      data,
      timestamp: new Date().toLocaleTimeString(),
    };
    setTestResults((prev) => [result, ...prev.slice(0, 9)]);
  };

  const testEmailChangeRequest = async () => {
    if (!user || !testEmail) {
      toast.error("Please log in and enter a test email");
      return;
    }

    setIsRequestTesting(true);
    try {
      const result = await EmailChangeService.requestEmailChange(
        user.id,
        testEmail,
      );

      if (result.success) {
        addTestResult("Email Change Request", true, result.message, {
          pendingEmail: result.pendingEmail,
        });
        toast.success("Test request successful");
        checkPendingStatus();
      } else {
        addTestResult(
          "Email Change Request",
          false,
          result.message,
          result.error,
        );
        toast.error("Test request failed");
      }
    } catch (error: any) {
      addTestResult("Email Change Request", false, error.message, error);
      toast.error("Test request exception");
    } finally {
      setIsRequestTesting(false);
    }
  };

  const testEmailChangeConfirm = async () => {
    if (!testToken) {
      toast.error("Please enter a test token");
      return;
    }

    setIsConfirmTesting(true);
    try {
      const result = await EmailChangeService.confirmEmailChange(testToken);

      if (result.success) {
        addTestResult("Email Change Confirm", true, result.message);
        toast.success("Test confirmation successful");
        checkPendingStatus();
      } else {
        addTestResult(
          "Email Change Confirm",
          false,
          result.message,
          result.error,
        );
        toast.error("Test confirmation failed");
      }
    } catch (error: any) {
      addTestResult("Email Change Confirm", false, error.message, error);
      toast.error("Test confirmation exception");
    } finally {
      setIsConfirmTesting(false);
    }
  };

  const checkPendingStatus = async () => {
    if (!user) return;

    setIsStatusTesting(true);
    try {
      const status = await EmailChangeService.getPendingEmailChange(user.id);
      setPendingStatus(status);

      addTestResult("Pending Status Check", true, "Status retrieved", status);
    } catch (error: any) {
      addTestResult("Pending Status Check", false, error.message, error);
    } finally {
      setIsStatusTesting(false);
    }
  };

  const cancelPendingChange = async () => {
    if (!user) return;

    try {
      const result = await EmailChangeService.cancelEmailChange(user.id);

      if (result.success) {
        addTestResult("Cancel Email Change", true, result.message);
        toast.success("Test cancellation successful");
        setPendingStatus(null);
      } else {
        addTestResult(
          "Cancel Email Change",
          false,
          result.message,
          result.error,
        );
        toast.error("Test cancellation failed");
      }
    } catch (error: any) {
      addTestResult("Cancel Email Change", false, error.message, error);
      toast.error("Test cancellation exception");
    }
  };

  const clearResults = () => {
    setTestResults([]);
    setPendingStatus(null);
  };

  if (!user) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <Alert>
            <AlertDescription>
              Please log in to test email change functionality.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TestTube className="h-5 w-5" />
          Email Change Testing
          <Badge variant="outline" className="bg-blue-100">
            Development Only
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Current User: {user.email}
          </h4>

          {pendingStatus && (
            <Alert
              className={
                pendingStatus.hasPending
                  ? "border-orange-200 bg-orange-50"
                  : "border-green-200 bg-green-50"
              }
            >
              <Clock className="h-4 w-4" />
              <AlertDescription>
                {pendingStatus.hasPending ? (
                  <div className="space-y-1">
                    <p>
                      <strong>Pending Email:</strong>{" "}
                      {pendingStatus.pendingEmail}
                    </p>
                    <p>
                      <strong>Expires:</strong>{" "}
                      {new Date(pendingStatus.expiresAt).toLocaleString()}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={cancelPendingChange}
                      className="mt-2"
                    >
                      Cancel Pending Change
                    </Button>
                  </div>
                ) : (
                  <p>No pending email changes</p>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Test Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Request Test */}
          <div className="space-y-3">
            <h5 className="font-medium">Test Email Change Request</h5>
            <Input
              placeholder="test@example.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              type="email"
            />
            <Button
              onClick={testEmailChangeRequest}
              disabled={isRequestTesting || !testEmail}
              className="w-full"
              size="sm"
            >
              {isRequestTesting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Mail className="h-4 w-4 mr-2" />
              )}
              Test Request
            </Button>
          </div>

          {/* Confirm Test */}
          <div className="space-y-3">
            <h5 className="font-medium">Test Email Change Confirm</h5>
            <Input
              placeholder="confirmation-token"
              value={testToken}
              onChange={(e) => setTestToken(e.target.value)}
            />
            <Button
              onClick={testEmailChangeConfirm}
              disabled={isConfirmTesting || !testToken}
              className="w-full"
              size="sm"
            >
              {isConfirmTesting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              Test Confirm
            </Button>
          </div>
        </div>

        {/* Status Check */}
        <div className="flex gap-2">
          <Button
            onClick={checkPendingStatus}
            disabled={isStatusTesting}
            variant="outline"
            size="sm"
          >
            {isStatusTesting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Check Status
          </Button>

          <Button onClick={clearResults} variant="ghost" size="sm">
            Clear Results
          </Button>
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="space-y-3">
            <h5 className="font-medium">Test Results</h5>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border text-sm ${
                    result.success
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {result.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="font-medium">{result.test}</span>
                    <Badge variant="outline" className="text-xs">
                      {result.timestamp}
                    </Badge>
                  </div>
                  <p
                    className={
                      result.success ? "text-green-700" : "text-red-700"
                    }
                  >
                    {result.message}
                  </p>
                  {result.data && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-xs opacity-70">
                        View Data
                      </summary>
                      <pre className="mt-1 text-xs overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Usage Instructions */}
        <Alert>
          <AlertDescription className="text-xs space-y-2">
            <p>
              <strong>Testing Instructions:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Enter a test email and click "Test Request"</li>
              <li>Check the database for the pending email and token</li>
              <li>Copy the token and paste it in the confirm field</li>
              <li>Click "Test Confirm" to complete the change</li>
              <li>Use "Check Status" to verify the current state</li>
            </ol>
            <p className="text-xs opacity-70 mt-2">
              This component only appears in development mode.
            </p>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default EmailChangeTest;
