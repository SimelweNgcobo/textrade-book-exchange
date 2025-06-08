import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EmailChangeService } from "@/services/emailChangeService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Mail,
  Loader2,
  AlertCircle,
  Clock,
  CheckCircle,
  X,
  RefreshCw,
} from "lucide-react";

interface EmailChangeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmail: string;
  onEmailChangeRequested?: (pendingEmail: string) => void;
}

const EmailChangeDialog = ({
  isOpen,
  onClose,
  currentEmail,
  onEmailChangeRequested,
}: EmailChangeDialogProps) => {
  const { user, refreshProfile } = useAuth();
  const [newEmail, setNewEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingChange, setPendingChange] = useState<{
    pendingEmail?: string;
    expiresAt?: string;
  } | null>(null);
  const [isCheckingPending, setIsCheckingPending] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  // Check for pending email change when dialog opens
  useEffect(() => {
    if (isOpen && user) {
      checkPendingChange();
    }
  }, [isOpen, user]);

  const checkPendingChange = async () => {
    if (!user) return;

    setIsCheckingPending(true);
    try {
      const pending = await EmailChangeService.getPendingEmailChange(user.id);
      setPendingChange(
        pending.hasPending
          ? {
              pendingEmail: pending.pendingEmail,
              expiresAt: pending.expiresAt,
            }
          : null,
      );
    } catch (error) {
      console.error("Error checking pending change:", error);
    } finally {
      setIsCheckingPending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Validate input
      if (!newEmail.trim()) {
        setError("Please enter a new email address");
        return;
      }

      if (newEmail.toLowerCase() === currentEmail.toLowerCase()) {
        setError("New email must be different from your current email");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmail)) {
        setError("Please enter a valid email address");
        return;
      }

      // Request email change
      const result = await EmailChangeService.requestEmailChange(
        user.id,
        newEmail,
      );

      if (result.success) {
        toast.success(result.message, { duration: 5000 });

        // Update pending status
        setPendingChange({
          pendingEmail: result.pendingEmail,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        });

        // Notify parent component
        if (onEmailChangeRequested && result.pendingEmail) {
          onEmailChangeRequested(result.pendingEmail);
        }

        // Clear form
        setNewEmail("");

        // Refresh profile to get latest data
        await refreshProfile();
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to request email change";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelChange = async () => {
    if (!user) return;

    setIsCancelling(true);
    try {
      const result = await EmailChangeService.cancelEmailChange(user.id);

      if (result.success) {
        toast.success(result.message);
        setPendingChange(null);
        await refreshProfile();
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error("Failed to cancel email change");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleClose = () => {
    setNewEmail("");
    setError(null);
    onClose();
  };

  const formatExpiryTime = (expiresAt: string) => {
    const expiry = new Date(expiresAt);
    const now = new Date();
    const hoursLeft = Math.ceil(
      (expiry.getTime() - now.getTime()) / (1000 * 60 * 60),
    );

    if (hoursLeft <= 0) {
      return "Expired";
    } else if (hoursLeft === 1) {
      return "1 hour remaining";
    } else {
      return `${hoursLeft} hours remaining`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Mail className="h-5 w-5" />
            Change Email Address
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Update your account email address. You'll need to confirm the change
            via email.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Current Email */}
          <div>
            <Label className="text-sm font-medium text-gray-700">
              Current Email
            </Label>
            <div className="mt-1 p-3 bg-gray-50 rounded-md border">
              <p className="text-sm text-gray-900 break-all">{currentEmail}</p>
            </div>
          </div>

          {/* Pending Change Status */}
          {isCheckingPending ? (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              Checking for pending changes...
            </div>
          ) : pendingChange ? (
            <Alert className="border-orange-200 bg-orange-50">
              <Clock className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-700">
                <div className="space-y-2">
                  <p className="font-medium">Pending Email Change</p>
                  <p className="text-sm">
                    New email:{" "}
                    <span className="font-mono break-all">
                      {pendingChange.pendingEmail}
                    </span>
                  </p>
                  {pendingChange.expiresAt && (
                    <p className="text-sm">
                      {formatExpiryTime(pendingChange.expiresAt)}
                    </p>
                  )}
                  <p className="text-xs">
                    Please check your new email for the confirmation link.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelChange}
                    disabled={isCancelling}
                    className="mt-2"
                  >
                    {isCancelling ? (
                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    ) : (
                      <X className="h-3 w-3 mr-1" />
                    )}
                    Cancel Change
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <>
              {/* New Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label
                    htmlFor="newEmail"
                    className="text-sm font-medium text-gray-700"
                  >
                    New Email Address
                  </Label>
                  <Input
                    id="newEmail"
                    type="email"
                    value={newEmail}
                    onChange={(e) => {
                      setNewEmail(e.target.value);
                      setError(null);
                    }}
                    placeholder="your.new.email@example.com"
                    disabled={isSubmitting}
                    className="mt-1"
                    required
                  />
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Alert className="border-blue-200 bg-blue-50">
                  <AlertDescription className="text-blue-700 text-xs">
                    <strong>Important:</strong> A confirmation email will be
                    sent to your new address. You'll need to click the link in
                    that email to complete the change.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !newEmail.trim()}
                    className="w-full sm:w-auto bg-book-600 hover:bg-book-700"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Confirmation
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailChangeDialog;
