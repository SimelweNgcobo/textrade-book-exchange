import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, User, Mail, Database } from "lucide-react";

interface VerificationStatusDebugProps {
  email?: string;
}

interface UserStatus {
  emailInProfiles: boolean;
  profileCreatedAt?: string;
  daysSinceCreation?: number;
  canResendVerification: boolean;
  error?: string;
}

export default function VerificationStatusDebug({
  email: initialEmail,
}: VerificationStatusDebugProps) {
  const [email, setEmail] = useState(initialEmail || "");
  const [isChecking, setIsChecking] = useState(false);
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);

  const checkUserStatus = async () => {
    if (!email.trim()) return;

    setIsChecking(true);
    setUserStatus(null);

    try {
      console.log("🔍 Checking status for email:", email);

      // Check if user exists in profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, email, created_at")
        .eq("email", email.trim())
        .single();

      let status: UserStatus = {
        emailInProfiles: !!profile,
        canResendVerification: false,
      };

      if (profileError && profileError.code !== "PGRST116") {
        status.error = `Error checking profiles: ${profileError.message}`;
      } else if (profile) {
        const createdAt = new Date(profile.created_at);
        const now = new Date();
        const daysSinceCreation =
          (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

        status.profileCreatedAt = createdAt.toLocaleString();
        status.daysSinceCreation = Math.round(daysSinceCreation * 10) / 10;

        // Test if we can resend verification email
        try {
          const { error: resendError } = await supabase.auth.resend({
            type: "signup",
            email: email.trim(),
            options: {
              emailRedirectTo: `${window.location.origin}/verify`,
            },
          });

          status.canResendVerification = !resendError;
          if (resendError) {
            console.log("Resend test error:", resendError.message);
          }
        } catch (resendError) {
          console.log("Resend test failed:", resendError);
          status.canResendVerification = false;
        }
      }

      setUserStatus(status);
    } catch (error) {
      console.error("Error checking user status:", error);
      setUserStatus({
        emailInProfiles: false,
        canResendVerification: false,
        error: "Failed to check user status",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusIndicator = (status: UserStatus) => {
    if (status.error) {
      return <Badge variant="destructive">Error</Badge>;
    }

    if (!status.emailInProfiles) {
      return <Badge variant="secondary">Not Found</Badge>;
    }

    if (status.canResendVerification) {
      return <Badge variant="outline">Likely Unverified</Badge>;
    }

    return <Badge variant="default">Likely Verified</Badge>;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Search className="h-5 w-5" />
          Email Status Checker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter email to check..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkUserStatus()}
          />
          <Button
            onClick={checkUserStatus}
            disabled={isChecking || !email.trim()}
            size="sm"
          >
            {isChecking ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        {userStatus && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              {getStatusIndicator(userStatus)}
            </div>

            {userStatus.error ? (
              <div className="text-sm text-red-600">{userStatus.error}</div>
            ) : (
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-gray-500" />
                  <span>In profiles table: </span>
                  <Badge
                    variant={
                      userStatus.emailInProfiles ? "default" : "secondary"
                    }
                  >
                    {userStatus.emailInProfiles ? "Yes" : "No"}
                  </Badge>
                </div>

                {userStatus.emailInProfiles && (
                  <>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>Created: {userStatus.profileCreatedAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span>
                        Days since creation: {userStatus.daysSinceCreation}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>Can resend verification: </span>
                      <Badge
                        variant={
                          userStatus.canResendVerification
                            ? "default"
                            : "secondary"
                        }
                      >
                        {userStatus.canResendVerification ? "Yes" : "No"}
                      </Badge>
                    </div>

                    {userStatus.daysSinceCreation !== undefined &&
                      userStatus.daysSinceCreation <= 7 && (
                        <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-800">
                          💡 Recent account - likely needs email verification
                        </div>
                      )}
                  </>
                )}

                {!userStatus.emailInProfiles && (
                  <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
                    💡 Account not found - user needs to register
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-gray-500">
          This tool helps diagnose login issues by checking if an email exists
          in our system and whether it might need verification.
        </div>
      </CardContent>
    </Card>
  );
}
