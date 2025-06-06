import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getErrorMessage,
  logError,
  getUserErrorMessage,
} from "@/utils/errorUtils";

const ErrorHandlingTest = () => {
  const [testResult, setTestResult] = useState<string>("");

  const testErrorHandling = () => {
    // Test different error types
    const testCases = [
      new Error("Test error message"),
      { message: "Supabase error message" },
      { details: "PostgreSQL error details" },
      "String error",
      null,
      undefined,
      { someProperty: "not an error object" },
    ];

    const results = testCases.map((testCase, index) => {
      const message = getErrorMessage(testCase, `Fallback for case ${index}`);
      const userMessage = getUserErrorMessage(testCase, "Operation failed");

      return `Case ${index}: "${message}" | User: "${userMessage}"`;
    });

    setTestResult(results.join("\n"));

    // Test logging (will appear in console)
    logError("Test error logging", new Error("This is a test error"));
    logError("Test object error logging", { message: "Object error message" });
  };

  if (process.env.NODE_ENV !== "development") {
    return null; // Only show in development
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-4">
      <CardHeader>
        <CardTitle>Error Handling Test (Dev Only)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testErrorHandling}>
          Test Error Message Extraction
        </Button>

        {testResult && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Test Results:</h4>
            <pre className="text-xs whitespace-pre-wrap">{testResult}</pre>
          </div>
        )}

        <div className="text-sm text-gray-600">
          <strong>Note:</strong> Check browser console for logging tests. This
          component only appears in development mode.
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorHandlingTest;
