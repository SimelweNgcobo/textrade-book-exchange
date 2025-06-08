import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Mail, Send } from "lucide-react";

interface ManualEmailVerificationProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function ManualEmailVerification({
  onSuccess,
  onError,
}: ManualEmailVerificationProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResendVerification = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      console.log("🔄 Resending verification email to:", email);

      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/verify`,
        },
      });

      if (error) {
        console.error("❌ Error resending verification email:", error);
        const errorMessage =
          error.message || "Failed to resend verification email";
        toast.error(errorMessage);
        onError?.(errorMessage);
      } else {
        console.log("✅ Verification email sent successfully");
        toast.success("Verification email sent! Please check your inbox.");
        onSuccess?.();
      }
    } catch (error: any) {
      console.error("❌ Exception while resending verification email:", error);
      const errorMessage =
        error.message || "Failed to resend verification email";
      toast.error(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualVerification = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const tokenHash = urlParams.get("token_hash");
    const type = urlParams.get("type");

    if (!token && !tokenHash) {
      toast.error("No verification token found in URL");
      return;
    }

    if (!type) {
      toast.error("No verification type found in URL");
      return;
    }

    setIsLoading(true);

    try {
      console.log("🔐 Attempting manual verification");

      const verificationData = tokenHash
        ? { token_hash: tokenHash, type: type as any }
        : { token: token!, type: type as any };

      const { data, error } = await supabase.auth.verifyOtp(verificationData);

      if (error) {
        console.error("❌ Manual verification error:", error);
        const errorMessage = error.message || "Manual verification failed";
        toast.error(errorMessage);
        onError?.(errorMessage);
      } else if (data.session) {
        console.log("✅ Manual verification successful");
        toast.success("Email verified successfully!");
        onSuccess?.();
      } else {
        const errorMessage = "Verification did not return a session";
        toast.error(errorMessage);
        onError?.(errorMessage);
      }
    } catch (error: any) {
      console.error("❌ Exception during manual verification:", error);
      const errorMessage = error.message || "Manual verification failed";
      toast.error(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const hasVerificationParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has("token") || urlParams.has("token_hash");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Verification Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasVerificationParams() && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Verification parameters detected in URL. Try manual verification:
            </p>
            <Button
              onClick={handleManualVerification}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Verify Manually
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Didn't receive the verification email? Enter your email to resend:
          </p>
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleResendVerification()}
          />
          <Button
            onClick={handleResendVerification}
            disabled={isLoading || !email.trim()}
            variant="outline"
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            Resend Verification Email
          </Button>
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Check your spam/junk folder</p>
          <p>• Make sure the email address is correct</p>
          <p>• Verification links expire after 24 hours</p>
        </div>
      </CardContent>
    </Card>
  );
}
