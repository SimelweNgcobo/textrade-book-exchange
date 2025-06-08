import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { Loader2, CheckCircle, XCircle, Info } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  EmailVerificationService,
  VerificationParams,
} from "@/services/emailVerificationService";

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "debug"
  >("loading");
  const [message, setMessage] = useState("");
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    const handleVerification = async () => {
      try {
        console.log("🔍 Starting email verification process");
        console.log("📍 Current URL:", window.location.href);
        console.log("📍 Location:", location);

        // Extract parameters using the service
        const params =
          EmailVerificationService.extractParamsFromUrl(searchParams);

        const urlParams = {
          ...params,
          fullUrl: window.location.href,
          searchString: window.location.search,
          hash: window.location.hash,
        };

        console.log("🔍 All URL parameters:", urlParams);
        setDebugInfo(urlParams);

        // Use the verification service
        const result = await EmailVerificationService.verifyEmail(
          params,
          window.location.href,
        );

        if (result.success) {
          console.log("✅ Email verification successful:", result);
          setStatus("success");
          setMessage(result.message);
          toast.success("Email verified successfully!");

          // Redirect to home page after successful verification
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 2000);
        } else {
          console.error("❌ Email verification failed:", result);

          // Get user-friendly error message
          const errorMessage =
            EmailVerificationService.getFormattedErrorMessage(result);

          // If no verification parameters found, show debug mode
          if (
            !params.token_hash &&
            !params.token &&
            !params.code &&
            !params.error_code
          ) {
            setStatus("debug");
            setMessage(
              "No verification parameters found in URL. Please see debug information below.",
            );
          } else {
            setStatus("error");
            setMessage(errorMessage);
            toast.error(errorMessage);
          }
        }
      } catch (error: any) {
        console.error("❌ Email verification exception:", error);
        setStatus("error");

        const errorMessage = EmailVerificationService.getFormattedErrorMessage({
          success: false,
          message: "Unexpected error during verification",
          error,
        });

        setMessage(errorMessage);
        toast.error(errorMessage);
      }
    };

    handleVerification();
  }, [navigate, searchParams, location]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center">
            {status === "loading" && (
              <>
                <Loader2 className="h-12 w-12 text-book-600 mx-auto mb-4 animate-spin" />
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
                  Verifying your email...
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Please wait while we verify your email address.
                </p>
                {debugInfo && (
                  <div className="mt-4 text-xs text-gray-500">
                    Processing: {debugInfo.type || "unknown"} verification
                  </div>
                )}
              </>
            )}

            {status === "success" && (
              <>
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
                  Email Verified!
                </h2>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  {message}
                </p>
                <p className="text-xs md:text-sm text-gray-500 mb-4">
                  Welcome to ReBooked Solutions - Pre-Loved Pages, New
                  Adventures
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  Redirecting you to the home page...
                </p>
              </>
            )}

            {status === "error" && (
              <>
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
                  Verification Failed
                </h2>
                <p className="text-gray-600 mb-6 text-sm md:text-base">
                  {message}
                </p>

                {debugInfo && (
                  <Card className="mb-6 text-left">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2 text-sm">
                        Debug Information:
                      </h4>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>URL: {debugInfo.fullUrl}</div>
                        <div>Type: {debugInfo.type || "none"}</div>
                        <div>
                          Token Hash:{" "}
                          {debugInfo.token_hash ? "present" : "none"}
                        </div>
                        <div>
                          Legacy Token: {debugInfo.token ? "present" : "none"}
                        </div>
                        <div>Code: {debugInfo.code ? "present" : "none"}</div>
                        {debugInfo.error_code && (
                          <div>Error Code: {debugInfo.error_code}</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-6">
                  <ManualEmailVerification
                    onSuccess={() => {
                      setStatus("success");
                      setMessage(
                        "Email verified successfully! You are now logged in.",
                      );
                      toast.success("Email verified successfully!");
                      setTimeout(() => navigate("/"), 2000);
                    }}
                    onError={(error) => {
                      console.error("Manual verification error:", error);
                    }}
                  />

                  <div className="space-y-3">
                    <Button
                      onClick={() => navigate("/login")}
                      className="bg-book-600 hover:bg-book-700 text-white px-4 md:px-6 py-2 rounded-lg transition-colors text-sm md:text-base w-full"
                    >
                      Go to Login
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/register")}
                      className="px-4 md:px-6 py-2 rounded-lg transition-colors text-sm md:text-base w-full"
                    >
                      Register Again
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => navigate("/")}
                      className="text-sm text-gray-500 w-full"
                    >
                      Go to Home Page
                    </Button>
                  </div>
                </div>
              </>
            )}

            {status === "debug" && (
              <>
                <Info className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
                  Debug Information
                </h2>
                <p className="text-gray-600 mb-6 text-sm md:text-base">
                  {message}
                </p>

                {debugInfo && (
                  <Card className="mb-6 text-left">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">
                        Email Verification Debug Info:
                      </h4>
                      <div className="text-sm text-gray-700 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="font-medium">Full URL:</div>
                          <div className="break-all">{debugInfo.fullUrl}</div>

                          <div className="font-medium">Search String:</div>
                          <div>{debugInfo.searchString || "none"}</div>

                          <div className="font-medium">Hash:</div>
                          <div>{debugInfo.hash || "none"}</div>

                          <div className="font-medium">Type:</div>
                          <div>{debugInfo.type || "none"}</div>

                          <div className="font-medium">Token Hash:</div>
                          <div>{debugInfo.token_hash ? "present" : "none"}</div>

                          <div className="font-medium">Legacy Token:</div>
                          <div>{debugInfo.token ? "present" : "none"}</div>

                          <div className="font-medium">PKCE Code:</div>
                          <div>{debugInfo.code ? "present" : "none"}</div>

                          {debugInfo.error_code && (
                            <>
                              <div className="font-medium">Error Code:</div>
                              <div>{debugInfo.error_code}</div>
                            </>
                          )}

                          {debugInfo.error_description && (
                            <>
                              <div className="font-medium">
                                Error Description:
                              </div>
                              <div>{debugInfo.error_description}</div>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-6">
                  <ManualEmailVerification
                    onSuccess={() => {
                      setStatus("success");
                      setMessage(
                        "Email verified successfully! You are now logged in.",
                      );
                      toast.success("Email verified successfully!");
                      setTimeout(() => navigate("/"), 2000);
                    }}
                    onError={(error) => {
                      toast.error(error);
                    }}
                  />

                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Please share the debug information above with support if
                      you need help.
                    </p>
                    <Button
                      onClick={() => window.location.reload()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-lg transition-colors text-sm md:text-base w-full"
                    >
                      Try Again
                    </Button>
                    <Button
                      onClick={() => navigate("/login")}
                      className="bg-book-600 hover:bg-book-700 text-white px-4 md:px-6 py-2 rounded-lg transition-colors text-sm md:text-base w-full"
                    >
                      Go to Login
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/register")}
                      className="px-4 md:px-6 py-2 rounded-lg transition-colors text-sm md:text-base w-full"
                    >
                      Register Again
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => navigate("/")}
                      className="text-sm text-gray-500 w-full"
                    >
                      Go to Home Page
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Verify;
