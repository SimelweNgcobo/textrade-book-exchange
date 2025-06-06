
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Mail, CheckCircle, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EmailConfirmationMessageProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
  type: 'signup' | 'email_change';
}

const EmailConfirmationMessage = ({ 
  email, 
  isOpen, 
  onClose, 
  type 
}: EmailConfirmationMessageProps) => {
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      if (type === 'signup') {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: email
        });
        if (error) throw error;
      } else {
        // For email change, we'd need to trigger the change again
        toast.info('Please update your email again to resend the confirmation');
      }
      toast.success('Confirmation email sent successfully!');
    } catch (error: any) {
      console.error('Error resending email:', error);
      toast.error(error.message || 'Failed to resend email');
    } finally {
      setIsResending(false);
    }
  };

  const getMessage = () => {
    if (type === 'signup') {
      return {
        title: 'Verify Your Email Address',
        description: 'Please check your inbox to complete your registration.',
        message: `We've sent a confirmation link to ${email}. Click the link in the email to verify your account and complete your registration.`
      };
    } else {
      return {
        title: 'Confirm Your Email Change',
        description: 'Please check your inbox to confirm your new email address.',
        message: `We've sent a confirmation link to ${email}. Click the link in the email to confirm your new email address.`
      };
    }
  };

  const content = getMessage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-w-[95vw] mx-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center text-left">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600 flex-shrink-0" />
              <span className="break-words">{content.title}</span>
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-left">
            {content.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <p className="text-gray-700 text-center leading-relaxed">
            {content.message}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
            <p className="text-sm text-blue-800">
              <strong>Don't see the email?</strong> Check your spam folder or click the resend button below.
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2">
          <Button 
            onClick={handleResendEmail}
            variant="outline"
            disabled={isResending}
            className="w-full"
          >
            {isResending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-book-600 mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Resend Email
              </>
            )}
          </Button>
          <Button onClick={onClose} className="w-full bg-book-600 hover:bg-book-700">
            I'll Check My Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailConfirmationMessage;
