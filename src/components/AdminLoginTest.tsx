import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  debugAdminLogin,
  testAdminLogin,
  quickAdminCheck,
} from "@/utils/adminLoginDebug";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, User, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

const AdminLoginTest = () => {
  const { user, isAdmin, login, logout } = useAuth();
  const [email, setEmail] = useState("AdminSimnLi@gmail.com");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debugResult, setDebugResult] = useState<any>(null);
  const [loginResult, setLoginResult] = useState<any>(null);

  const handleDebugAdmin = async () => {
    setIsLoading(true);
    try {
      const result = await debugAdminLogin(email);
      setDebugResult(result);
      console.log("Debug result:", result);
    } catch (error) {
      console.error("Debug failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestLogin = async () => {
    if (!password) {
      alert("Please enter password");
      return;
    }

    setIsLoading(true);
    try {
      const result = await testAdminLogin(email, password);
      setLoginResult(result);
      console.log("Login test result:", result);

      if (result.success) {
        // Also test through the auth context
        await login(email, password);
      }
    } catch (error) {
      console.error("Login test failed:", error);
      setLoginResult({ success: false, error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickCheck = async () => {
    setIsLoading(true);
    try {
      const result = await quickAdminCheck();
      setDebugResult(result);
      console.log("Quick check result:", result);
    } catch (error) {
      console.error("Quick check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setLoginResult(null);
      setDebugResult(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Admin Login Debug Tool
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
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              <span>Logged in: {user ? "Yes" : "No"}</span>
            </div>
            {user && (
              <>
                <div>Email: {user.email}</div>
                <div className="flex items-center gap-2">
                  {isAdmin ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span>
                    Admin status: {isAdmin ? "Admin" : "Regular user"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Debug Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Admin Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <Label htmlFor="password">Password (for login test)</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to test login"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleDebugAdmin}
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Shield className="h-4 w-4 mr-2" />
              )}
              Debug Admin Profile
            </Button>

            <Button
              onClick={handleTestLogin}
              disabled={isLoading || !password}
              variant="default"
              size="sm"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <User className="h-4 w-4 mr-2" />
              )}
              Test Login
            </Button>

            <Button
              onClick={handleQuickCheck}
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              Quick Check
            </Button>

            {user && (
              <Button onClick={handleLogout} variant="destructive" size="sm">
                Logout
              </Button>
            )}
          </div>
        </div>

        {/* Debug Results */}
        {debugResult && (
          <Alert
            className={
              debugResult.success
                ? "border-green-200 bg-green-50"
                : "border-red-200 bg-red-50"
            }
          >
            <AlertDescription>
              <div className="space-y-2">
                <h4 className="font-semibold">Debug Results:</h4>
                <pre className="text-xs bg-white p-2 rounded border overflow-auto">
                  {JSON.stringify(debugResult, null, 2)}
                </pre>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Login Results */}
        {loginResult && (
          <Alert
            className={
              loginResult.success
                ? "border-green-200 bg-green-50"
                : "border-red-200 bg-red-50"
            }
          >
            <AlertDescription>
              <div className="space-y-2">
                <h4 className="font-semibold">Login Test Results:</h4>
                <pre className="text-xs bg-white p-2 rounded border overflow-auto">
                  {JSON.stringify(loginResult, null, 2)}
                </pre>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Instructions */}
        <Alert className="border-blue-200 bg-blue-50">
          <AlertDescription className="text-blue-700 text-sm">
            <strong>How to use:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>
                First click "Debug Admin Profile" to check if the admin profile
                exists
              </li>
              <li>
                If profile exists, enter the password and click "Test Login"
              </li>
              <li>
                Check the results to see what's happening with the admin status
              </li>
              <li>Use "Quick Check" to verify current login status anytime</li>
            </ol>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default AdminLoginTest;
