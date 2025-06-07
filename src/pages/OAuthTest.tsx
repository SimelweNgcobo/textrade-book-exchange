import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const OAuthTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, session } = useAuth();

  const handleGoogleOAuth = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/oauth-test",
        },
      });

      if (error) {
        console.error("OAuth error:", error);
        toast.error("OAuth failed: " + error.message);
      } else {
        console.log("OAuth initiated:", data);
      }
    } catch (error) {
      console.error("Unexpected OAuth error:", error);
      toast.error("Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (process.env.NODE_ENV !== "development") {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Page Not Available</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This page is only available in development mode.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>OAuth Testing (Development Only)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Current Authentication Status:</h3>
              <div className="bg-gray-100 p-3 rounded">
                <p>User: {user ? user.email : "Not logged in"}</p>
                <p>Session: {session ? "Active" : "None"}</p>
                <p>URL: {window.location.href}</p>
                <p>Hash: {window.location.hash || "none"}</p>
                <p>Search: {window.location.search || "none"}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">OAuth Testing:</h3>
              <Button
                onClick={handleGoogleOAuth}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Starting OAuth..." : "Test Google OAuth"}
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Manual Test URL:</h3>
              <p className="text-sm text-gray-600">
                You can manually test OAuth redirect by visiting a URL with hash
                parameters like:
              </p>
              <code className="block text-xs bg-gray-100 p-2 rounded">
                {window.location.origin}
                /oauth-test#access_token=test&refresh_token=test&type=signup
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OAuthTest;
