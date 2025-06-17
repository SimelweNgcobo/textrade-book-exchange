import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { verifyAdminStatus } from "@/utils/adminVerification";
import { useState } from "react";

const AdminDebug = () => {
  const { user, profile, isAuthenticated, isAdmin, isLoading } = useAuth();
  const [debugResult, setDebugResult] = useState<Record<
    string,
    unknown
  > | null>(null);

  const runAdminCheck = async () => {
    if (!user) return;

    // Debug information available in development mode only
    if (import.meta.env.DEV) {
      console.log("=== ADMIN DEBUG ===");
      console.log("User ID:", user.id);
      console.log("User Email:", user.email);
      console.log("Profile:", profile);
      console.log("isAuthenticated:", isAuthenticated);
      console.log("isAdmin:", isAdmin);
      console.log("isLoading:", isLoading);
    }

    // Manual admin verification
    const manualAdminCheck = await verifyAdminStatus(user.id);

    if (import.meta.env.DEV) {
      console.log("Manual admin check result:", manualAdminCheck);
    }

    setDebugResult({
      userId: user.id,
      userEmail: user.email,
      profile,
      isAuthenticated,
      isAdmin,
      isLoading,
      manualAdminCheck,
      timestamp: new Date().toISOString(),
    });
  };

  if (!isAuthenticated) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-4">
        <CardHeader>
          <CardTitle>Admin Debug - Not Authenticated</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please log in to debug admin status.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-4">
      <CardHeader>
        <CardTitle>Admin Debug Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>User ID:</strong> {user?.id}
          </div>
          <div>
            <strong>Email:</strong> {user?.email}
          </div>
          <div>
            <strong>Authenticated:</strong>{" "}
            {isAuthenticated ? "✅ Yes" : "❌ No"}
          </div>
          <div>
            <strong>Is Admin:</strong> {isAdmin ? "✅ Yes" : "❌ No"}
          </div>
          <div>
            <strong>Loading:</strong> {isLoading ? "⏳ Yes" : "✅ No"}
          </div>
          <div>
            <strong>Profile Admin Flag:</strong>{" "}
            {profile?.isAdmin ? "✅ Yes" : "❌ No"}
          </div>
        </div>

        <Button onClick={runAdminCheck} className="w-full">
          Run Admin Verification Check
        </Button>

        {debugResult && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Debug Results:</h4>
            <pre className="text-xs overflow-auto whitespace-pre-wrap">
              {JSON.stringify(debugResult, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-4 space-y-2">
          <h4 className="font-semibold">Quick Actions:</h4>
          <div className="space-y-2">
            <Button
              onClick={() => (window.location.href = "/admin")}
              variant="outline"
              className="w-full"
            >
              Try Direct Admin Access (/admin)
            </Button>
            <Button
              onClick={() => (window.location.href = "/profile")}
              variant="outline"
              className="w-full"
            >
              Back to Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDebug;
