import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { EmailChangeService } from "@/services/emailChangeService";
import EmailChangeDialog from "@/components/EmailChangeDialog";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Mail,
  Edit,
  Clock,
  AlertCircle,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

interface AccountInformationProps {
  profile: {
    id: string;
    name?: string;
    email: string;
  };
  onEditProfile: () => void;
}

const AccountInformation = ({
  profile,
  onEditProfile,
}: AccountInformationProps) => {
  const { user, refreshProfile } = useAuth();
  const [showEmailChangeDialog, setShowEmailChangeDialog] = useState(false);
  const [pendingEmailChange, setPendingEmailChange] = useState<{
    pendingEmail?: string;
    expiresAt?: string;
  } | null>(null);
  const [isLoadingPending, setIsLoadingPending] = useState(false);

  // Check for pending email changes on component mount
  useEffect(() => {
    if (user) {
      checkPendingEmailChange();
    }
  }, [user, checkPendingEmailChange]);

  const checkPendingEmailChange = useCallback(async () => {
    if (!user) return;

    setIsLoadingPending(true);
    try {
      const pending = await EmailChangeService.getPendingEmailChange(user.id);
      setPendingEmailChange(
        pending.hasPending
          ? {
              pendingEmail: pending.pendingEmail,
              expiresAt: pending.expiresAt,
            }
          : null,
      );
    } catch (error) {
      console.error("Error checking pending email change:", error);
    } finally {
      setIsLoadingPending(false);
    }
  }, [user]);

  const handleEmailChangeRequested = (pendingEmail: string) => {
    setPendingEmailChange({
      pendingEmail,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
  };

  const formatTimeRemaining = (expiresAt: string) => {
    const expiry = new Date(expiresAt);
    const now = new Date();
    const hoursLeft = Math.ceil(
      (expiry.getTime() - now.getTime()) / (1000 * 60 * 60),
    );

    if (hoursLeft <= 0) {
      return "Expired";
    } else if (hoursLeft === 1) {
      return "1 hour";
    } else if (hoursLeft < 24) {
      return `${hoursLeft} hours`;
    } else {
      const daysLeft = Math.ceil(hoursLeft / 24);
      return `${daysLeft} day${daysLeft > 1 ? "s" : ""}`;
    }
  };

  const handleCancelEmailChange = async () => {
    if (!user) return;

    try {
      const result = await EmailChangeService.cancelEmailChange(user.id);
      if (result.success) {
        setPendingEmailChange(null);
        await refreshProfile();
      }
    } catch (error) {
      console.error("Error cancelling email change:", error);
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg">
            <User className="h-5 w-5 mr-2" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-gray-900 mt-1 break-words">
                {profile.name || "Not set"}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <p className="text-sm font-medium text-gray-500">Email</p>
                {isLoadingPending && (
                  <RefreshCw className="h-3 w-3 animate-spin text-gray-400" />
                )}
              </div>

              {/* Current Email */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="text-gray-900 break-all flex-1">
                    {profile.email}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowEmailChangeDialog(true)}
                    className="text-xs px-3 py-1 h-auto whitespace-nowrap"
                  >
                    Change Email
                  </Button>
                </div>

                {/* Pending Email Change Status */}
                {pendingEmailChange && (
                  <Alert className="border-orange-200 bg-orange-50">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-700">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant="outline"
                            className="bg-orange-100 text-orange-800 border-orange-300"
                          >
                            Waiting for confirmation
                          </Badge>
                        </div>
                        <div className="text-sm space-y-1">
                          <p className="font-medium">
                            New email:
                            <span className="font-mono ml-1 break-all">
                              {pendingEmailChange.pendingEmail}
                            </span>
                          </p>
                          {pendingEmailChange.expiresAt && (
                            <p className="text-xs">
                              Expires in:{" "}
                              {formatTimeRemaining(
                                pendingEmailChange.expiresAt,
                              )}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowEmailChangeDialog(true)}
                            className="text-xs h-auto py-1 px-2"
                          >
                            Manage Change
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={checkPendingEmailChange}
                            className="text-xs h-auto py-1 px-2"
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Refresh Status
                          </Button>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onEditProfile}
              className="w-full sm:w-auto bg-book-600 hover:bg-book-700"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowEmailChangeDialog(true)}
              className="w-full sm:w-auto"
            >
              <Mail className="h-4 w-4 mr-2" />
              {pendingEmailChange ? "Manage Email Change" : "Change Email"}
            </Button>
          </div>

          {/* Security Notice */}
          <Alert className="border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700 text-xs">
              <strong>Security:</strong> Email changes require confirmation via
              email. You'll be logged out after confirming to ensure account
              security.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Email Change Dialog */}
      <EmailChangeDialog
        isOpen={showEmailChangeDialog}
        onClose={() => setShowEmailChangeDialog(false)}
        currentEmail={profile.email}
        onEmailChangeRequested={handleEmailChangeRequested}
      />
    </>
  );
};

export default AccountInformation;
