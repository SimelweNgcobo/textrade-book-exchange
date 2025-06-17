import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Loader2, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifySession = async () => {
      try {
        console.log("Verifying reset password session");

        const accessToken = searchParams.get("access_token");
        const refreshToken = searchParams.get("refresh_token");
        const type = searchParams.get("type");
        const error_code = searchParams.get("error_code");
        const error_description = searchParams.get("error_description");

        console.log("Reset password params:", {
          accessToken: !!accessToken,
          refreshToken: !!refreshToken,
          type,
          error_code,
          error_description,
        });

        // Check for errors in URL
        if (error_code || error_description) {
          console.error("Reset password error from URL:", {
            error_code,
            error_description,
          });
          toast.error(error_description || "Invalid or expired reset link");
          setIsValidSession(false);
          setTimeout(() => navigate("/forgot-password"), 3000);
          return;
        }

        if (accessToken && refreshToken && type === "recovery") {
          console.log("Setting session with recovery tokens");
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error("Session error:", error);
            toast.error("Invalid or expired reset link");
            setIsValidSession(false);
            setTimeout(() => navigate("/forgot-password"), 3000);
            return;
          }

          console.log("Session set successfully:", data);
          setIsValidSession(true);
        } else {
          console.log("Checking existing session");
          const {
            data: { session },
            error,
          } = await supabase.auth.getSession();

          if (error) {
            console.error("Session check error:", error);
          }

          if (session) {
            console.log("Valid session found");
            setIsValidSession(true);
          } else {
            console.log("No valid session found");
            toast.error("Invalid or expired reset link");
            setIsValidSession(false);
            setTimeout(() => navigate("/forgot-password"), 3000);
          }
        }
      } catch (error) {
        console.error("Error verifying session:", error);
        toast.error("Something went wrong. Please try again.");
        setIsValidSession(false);
        setTimeout(() => navigate("/forgot-password"), 3000);
      }
    };

    verifySession();
  }, [searchParams, navigate]);

  const validatePassword = (pwd: string): string[] => {
    const errors: string[] = [];
    if (pwd.length < 6) errors.push("Must be at least 6 characters long");
    if (!/[A-Z]/.test(pwd))
      errors.push("Must contain at least one uppercase letter");
    if (!/[a-z]/.test(pwd))
      errors.push("Must contain at least one lowercase letter");
    if (!/[0-9]/.test(pwd)) errors.push("Must contain at least one number");
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isValidSession === false) {
      toast.error("Invalid session. Please request a new reset link.");
      return;
    }

    setIsLoading(true);

    try {
      if (!password.trim() || !confirmPassword.trim()) {
        throw new Error("Please fill in all fields");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }

      const passwordErrors = validatePassword(password);
      if (passwordErrors.length > 0) {
        throw new Error(`Password requirements: ${passwordErrors.join(", ")}`);
      }

      console.log("Updating user password");
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        console.error("Password update error:", error);
        throw error;
      }

      console.log("Password updated successfully");
      toast.success("Password updated successfully!");

      // Sign out and redirect to login
      await supabase.auth.signOut();
      navigate("/login", { replace: true });
    } catch (error: unknown) {
      console.error("Password reset error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update password";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidSession === null) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center">
              <Loader2 className="h-12 w-12 text-book-600 mx-auto mb-4 animate-spin" />
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
                Verifying reset link...
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Please wait while we verify your password reset link.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isValidSession === false) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
                Invalid Reset Link
              </h2>
              <p className="text-gray-600 text-sm md:text-base mb-4">
                This password reset link is invalid or has expired.
              </p>
              <p className="text-gray-500 text-sm">
                Redirecting you to request a new link...
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const passwordErrors = validatePassword(password);
  const isPasswordValid = password.length > 0 && passwordErrors.length === 0;

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="text-center mb-6">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  Set New Password
                </h1>
                <p className="text-gray-600 text-sm">
                  Enter your new password below
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {password.length > 0 && (
                    <div className="text-xs space-y-1">
                      {passwordErrors.map((error, index) => (
                        <p key={index} className="text-red-500">
                          • {error}
                        </p>
                      ))}
                      {isPasswordValid && (
                        <p className="text-green-500">
                          • Password meets all requirements
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="pl-10 pr-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {confirmPassword.length > 0 && (
                    <div className="text-xs">
                      {password === confirmPassword ? (
                        <p className="text-green-500">• Passwords match</p>
                      ) : (
                        <p className="text-red-500">• Passwords don't match</p>
                      )}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-book-600 hover:bg-book-700"
                  disabled={
                    isLoading ||
                    !isPasswordValid ||
                    password !== confirmPassword
                  }
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating Password...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                  Remember your password?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-book-600 hover:text-book-800 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
