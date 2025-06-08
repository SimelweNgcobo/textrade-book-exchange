import { useState } from "react";
import { useAuth, useSafeAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EnhancedAuthService } from "@/services/enhancedAuthService";
import { debugAdminStatus } from "@/utils/adminDebug";
import EmailChangeTest from "@/components/EmailChangeTest";
import { toast } from "sonner";
import {
  User,
  Shield,
  Database,
  CheckCircle,
  XCircle,
  Loader2,
  Mail,
  AlertCircle,
} from "lucide-react";

const AuthTest = () => {
  const [testEmail, setTestEmail] = useState("");
  const [testPassword, setTestPassword] = useState("");
  const [isTestingLogin, setIsTestingLogin] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [userCheckResult, setUserCheckResult] = useState<any>(null);
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false);
  const [adminCheckResult, setAdminCheckResult] = useState<any>(null);
  const [isDebuggingAdmin, setIsDebuggingAdmin] = useState(false);
  const [adminDebugResult, setAdminDebugResult] = useState<any>(null);

  // Test both hooks
  let authContext = null;
  let safeAuthContext = null;
  let authError = null;

  try {
    authContext = useAuth();
  } catch (error) {
    authError = error;
  }

  try {
    safeAuthContext = useSafeAuth();
  } catch (error) {
    console.error("Safe auth also failed:", error);
  }

  const handleTestLogin = async () => {
    if (!testEmail || !testPassword) {
      toast.error("Please enter email and password");
      return;
    }

    setIsTestingLogin(true);
    try {
      if (authContext) {
        await authContext.login(testEmail, testPassword);
        toast.success("Test login successful!");
      } else {
        toast.error("Auth context not available");
      }
    } catch (error: any) {
      console.error("Test login failed:", error);
      toast.error(`Test login failed: ${error.message}`);
    } finally {
      setIsTestingLogin(false);
    }
  };

  const handleCheckUser = async () => {
    if (!testEmail) {
      toast.error("Please enter an email to check");
      return;
    }

    setIsCheckingUser(true);
    try {
      const result =
        await EnhancedAuthService.checkUserVerificationStatus(testEmail);
      setUserCheckResult(result);
    } catch (error) {
      console.error("User check failed:", error);
      toast.error("User check failed");
    } finally {
      setIsCheckingUser(false);
    }
  };

  const handleResendVerification = async () => {
    if (!testEmail) {
      toast.error("Please enter an email");
      return;
    }

    setIsResendingVerification(true);
    try {
      const result =
        await EnhancedAuthService.resendVerificationEmail(testEmail);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Resend failed:", error);
      toast.error("Failed to resend verification email");
    } finally {
      setIsResendingVerification(false);
    }
  };

  const handleCheckAdminStatus = async () => {
    if (!currentContext?.user?.id) {
      toast.error("Please log in first to check admin status");
      return;
    }

    setIsCheckingAdmin(true);
    try {
      console.log("🔍 Testing admin status check for:", currentContext.user.id);
      const isAdmin = await currentContext.checkAdminStatus(
        currentContext.user.id,
      );
      setAdminCheckResult({
        userId: currentContext.user.id,
        isAdmin,
        timestamp: new Date().toISOString(),
      });
      toast.success(
        `Admin status check complete: ${isAdmin ? "Admin" : "Not Admin"}`,
      );
    } catch (error) {
      console.error("Admin status check failed:", error);
      setAdminCheckResult({
        userId: currentContext.user.id,
        isAdmin: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      });
      toast.error("Admin status check failed");
    } finally {
      setIsCheckingAdmin(false);
    }
  };

  const handleDebugAdminStatus = async () => {
    if (!currentContext?.user?.id) {
      toast.error("Please log in first to debug admin status");
      return;
    }

    setIsDebuggingAdmin(true);
    try {
      console.log(
        "🔍 Starting comprehensive admin debug for:",
        currentContext.user.id,
      );
      const debugResult = await debugAdminStatus(currentContext.user.id);
      setAdminDebugResult(debugResult);
      toast.success("Admin debug complete - check results below");
    } catch (error) {
      console.error("Admin debug failed:", error);
      toast.error("Admin debug failed");
    } finally {
      setIsDebuggingAdmin(false);
    }
  };

  const currentContext = authContext || safeAuthContext;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Authentication System Test</h1>

        {authError && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              <strong>Auth Context Error:</strong> {authError.message}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Context Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Auth Context Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>useAuth Available:</span>
                  <Badge variant={authContext ? "default" : "destructive"}>
                    {authContext ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>useSafeAuth Available:</span>
                  <Badge variant={safeAuthContext ? "default" : "destructive"}>
                    {safeAuthContext ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Is Authenticated:</span>
                  <Badge
                    variant={
                      currentContext?.isAuthenticated ? "default" : "secondary"
                    }
                  >
                    {currentContext?.isAuthenticated ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Is Loading:</span>
                  <Badge
                    variant={
                      currentContext?.isLoading ? "outline" : "secondary"
                    }
                  >
                    {currentContext?.isLoading ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Init Error:</span>
                  <Badge
                    variant={
                      currentContext?.initError ? "destructive" : "default"
                    }
                  >
                    {currentContext?.initError ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>

              {currentContext?.initError && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700 text-sm">
                    {currentContext.initError}
                  </AlertDescription>
                </Alert>
              )}

              {currentContext?.user && (
                <div className="space-y-2">
                  <h4 className="font-medium">User Info:</h4>
                  <div className="text-sm space-y-1">
                    <div>Email: {currentContext.user.email}</div>
                    <div>ID: {currentContext.user.id}</div>
                    <div>
                      Created:{" "}
                      {new Date(
                        currentContext.user.created_at,
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
              )}

              {currentContext?.profile && (
                <div className="space-y-2">
                  <h4 className="font-medium">Profile Info:</h4>
                  <div className="text-sm space-y-1">
                    <div>Name: {currentContext.profile.name}</div>
                    <div>
                      Admin: {currentContext.profile.isAdmin ? "Yes" : "No"}
                    </div>
                    <div>Status: {currentContext.profile.status}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test Login */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Test Login
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Test email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Test password"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleTestLogin}
                  disabled={isTestingLogin || !currentContext}
                  className="w-full"
                >
                  {isTestingLogin ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Test Login
                </Button>

                <Button
                  onClick={handleCheckUser}
                  disabled={isCheckingUser}
                  variant="outline"
                  className="w-full"
                >
                  {isCheckingUser ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Database className="h-4 w-4 mr-2" />
                  )}
                  Check User Status
                </Button>

                <Button
                  onClick={handleResendVerification}
                  disabled={isResendingVerification}
                  variant="outline"
                  className="w-full"
                >
                  {isResendingVerification ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Mail className="h-4 w-4 mr-2" />
                  )}
                  Resend Verification
                </Button>

                <Button
                  onClick={handleCheckAdminStatus}
                  disabled={isCheckingAdmin || !currentContext?.user}
                  variant="outline"
                  className="w-full"
                >
                  {isCheckingAdmin ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Shield className="h-4 w-4 mr-2" />
                  )}
                  Check Admin Status
                </Button>

                <Button
                  onClick={handleDebugAdminStatus}
                  disabled={isDebuggingAdmin || !currentContext?.user}
                  variant="outline"
                  className="w-full"
                >
                  {isDebuggingAdmin ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <AlertCircle className="h-4 w-4 mr-2" />
                  )}
                  Debug Admin Status
                </Button>
              </div>

              {userCheckResult && (
                <Alert>
                  <AlertDescription>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>User Exists:</span>
                        {userCheckResult.userExists ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div className="flex justify-between">
                        <span>Email Confirmed:</span>
                        {userCheckResult.emailConfirmed ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      {userCheckResult.error && (
                        <div className="text-red-600">
                          Error: {userCheckResult.error.message}
                        </div>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {adminCheckResult && (
                <Alert>
                  <AlertDescription>
                    <div className="space-y-1 text-sm">
                      <div className="font-medium mb-2">
                        Admin Status Check Result:
                      </div>
                      <div className="flex justify-between">
                        <span>User ID:</span>
                        <span className="font-mono text-xs">
                          {adminCheckResult.userId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Is Admin:</span>
                        {adminCheckResult.isAdmin ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div className="flex justify-between">
                        <span>Checked At:</span>
                        <span className="text-xs">
                          {new Date(
                            adminCheckResult.timestamp,
                          ).toLocaleTimeString()}
                        </span>
                      </div>
                      {adminCheckResult.error && (
                        <div className="text-red-600">
                          Error: {adminCheckResult.error}
                        </div>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {adminDebugResult && (
                <Alert className="mt-4">
                  <AlertDescription>
                    <div className="space-y-2 text-sm">
                      <div className="font-medium mb-2">
                        Admin Debug Result:
                      </div>
                      <div className="flex justify-between">
                        <span>Overall Success:</span>
                        {adminDebugResult.success ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div className="flex justify-between">
                        <span>Final Result:</span>
                        <span className="font-semibold">
                          {adminDebugResult.finalResult ? "ADMIN" : "NOT ADMIN"}
                        </span>
                      </div>
                      {adminDebugResult.error && (
                        <div className="text-red-600 text-xs">
                          Error: {adminDebugResult.error}
                        </div>
                      )}

                      <details className="mt-2">
                        <summary className="cursor-pointer text-xs text-gray-600">
                          View Debug Steps (
                          {adminDebugResult.steps?.length || 0})
                        </summary>
                        <div className="mt-2 space-y-1 text-xs">
                          {adminDebugResult.steps?.map(
                            (step: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 p-1 bg-gray-50 rounded"
                              >
                                {step.success ? (
                                  <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                                ) : (
                                  <XCircle className="h-3 w-3 text-red-500 flex-shrink-0" />
                                )}
                                <span className="flex-1">{step.step}</span>
                                {step.error && (
                                  <span className="text-red-600 text-xs">
                                    ({step.error})
                                  </span>
                                )}
                              </div>
                            ),
                          )}
                        </div>
                      </details>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        {currentContext?.isAuthenticated && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Authenticated Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  onClick={() => currentContext.logout()}
                  variant="outline"
                  className="w-full"
                >
                  Logout
                </Button>
                <Button
                  onClick={() => currentContext.refreshProfile()}
                  variant="outline"
                  className="w-full"
                >
                  Refresh Profile
                </Button>
                <Button
                  onClick={() => currentContext.loadUserStats()}
                  variant="outline"
                  className="w-full"
                >
                  Load User Stats
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Email Change Testing */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8">
            <EmailChangeTest />
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            This page helps debug authentication issues in development.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AuthTest;
