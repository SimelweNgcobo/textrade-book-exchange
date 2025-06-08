import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  EnhancedAuthService,
  LoginResult,
} from "@/services/enhancedAuthService";
import { toast } from "sonner";
import {
  AlertCircle,
  Mail,
  Key,
  UserPlus,
  RefreshCw,
  HelpCircle,
  CheckCircle,
} from "lucide-react";

interface LoginErrorHandlerProps {
  error: any;
  email: string;
  onRetry: () => void;
  onClearError: () => void;
}

export default function LoginErrorHandler({
  error,
  email,
  onRetry,
  onClearError,
}: LoginErrorHandlerProps) {
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);

  // Extract login result from enhanced error
  const loginResult: LoginResult = error?.loginResult || {
    success: false,
    message: error?.message || "An unknown error occurred",
    actionRequired: "contact_support",
  };

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      const result = await EnhancedAuthService.resendVerificationEmail(email);
      if (result.success) {
        toast.success(result.message);
        // Clear the error since we've taken action
        onClearError();
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Failed to resend verification email");
    } finally {
      setIsResending(false);
    }
  };

  const getErrorIcon = () => {
    switch (loginResult.actionRequired) {
      case "verify_email":
        return <Mail className="h-5 w-5 text-orange-500" />;
      case "reset_password":
        return <Key className="h-5 w-5 text-yellow-500" />;
      case "register":
        return <UserPlus className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getErrorTitle = () => {
    switch (loginResult.actionRequired) {
      case "verify_email":
        return "Email Verification Required";
      case "reset_password":
        return "Password Issue";
      case "register":
        return "Account Not Found";
      case "contact_support":
        return "Login Issue";
      default:
        return "Login Failed";
    }
  };

  const renderActionButtons = () => {
    const suggestions = EnhancedAuthService.getActionSuggestions(loginResult);

    return (
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => {
          let icon;
          let onClick;
          let disabled = false;

          switch (suggestion.action) {
            case "resend_verification":
              icon = <Mail className="h-4 w-4" />;
              onClick = handleResendVerification;
              disabled = isResending;
              break;
            case "reset_password":
              icon = <Key className="h-4 w-4" />;
              onClick = () =>
                navigate("/forgot-password", {
                  state: { email },
                });
              break;
            case "register":
              icon = <UserPlus className="h-4 w-4" />;
              onClick = () =>
                navigate("/register", {
                  state: { email },
                });
              break;
            case "contact_support":
              icon = <HelpCircle className="h-4 w-4" />;
              onClick = () => navigate("/contact");
              break;
            case "try_again":
              icon = <RefreshCw className="h-4 w-4" />;
              onClick = () => {
                onClearError();
                onRetry();
              };
              break;
            case "check_spam":
              icon = <CheckCircle className="h-4 w-4" />;
              onClick = () => {
                toast.info(
                  'Please check your spam/junk folder and mark our emails as "not spam"',
                  {
                    duration: 5000,
                  },
                );
              };
              break;
            default:
              icon = <RefreshCw className="h-4 w-4" />;
              onClick = onRetry;
          }

          const variant =
            suggestion.type === "primary"
              ? "default"
              : suggestion.type === "warning"
                ? "destructive"
                : "outline";

          return (
            <Button
              key={index}
              variant={variant}
              onClick={onClick}
              disabled={disabled}
              className="w-full"
            >
              {disabled && suggestion.action === "resend_verification" ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <>
                  {icon}
                  <span className="ml-2">{suggestion.label}</span>
                </>
              )}
            </Button>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="w-full border-red-200 bg-red-50">
      <CardContent className="p-6">
        <Alert>
          <div className="flex items-start space-x-3">
            {getErrorIcon()}
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">
                {getErrorTitle()}
              </h4>
              <AlertDescription className="text-gray-700 mb-4">
                {loginResult.message}
              </AlertDescription>

              {loginResult.actionRequired === "verify_email" && (
                <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="text-sm text-orange-800">
                    <p className="font-medium mb-2">
                      📧 Email Verification Steps:
                    </p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>
                        Check your inbox for an email from ReBooked Solutions
                      </li>
                      <li>If not found, check your spam/junk folder</li>
                      <li>Click the verification link in the email</li>
                      <li>Return here to log in</li>
                    </ol>
                  </div>
                </div>
              )}

              {loginResult.actionRequired === "register" && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">💡 Account Not Found</p>
                    <p>
                      No account exists with the email: <strong>{email}</strong>
                    </p>
                    <p>
                      Please check the email address or create a new account.
                    </p>
                  </div>
                </div>
              )}

              {renderActionButtons()}
            </div>
          </div>
        </Alert>
      </CardContent>
    </Card>
  );
}
