import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface OAuthRedirectHandlerProps {
  /** Optional redirect path after successful OAuth authentication */
  redirectTo?: string;
  /** Whether to show toast notifications */
  showNotifications?: boolean;
  /** Custom success message */
  successMessage?: string;
  /** Custom error message */
  errorMessage?: string;
}

/**
 * Component to handle OAuth redirect with token hash fragment
 * Extracts tokens from URL hash and sets the Supabase session
 */
export const OAuthRedirectHandler: React.FC<OAuthRedirectHandlerProps> = ({
  redirectTo = "/",
  showNotifications = true,
  successMessage = "Login successful! Welcome to ReBooked Solutions!",
  errorMessage = "Authentication failed. Please try again.",
}) => {
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent processing multiple times
    if (hasProcessed.current) return;

    const handleOAuthRedirect = async () => {
      try {
        // Get the hash fragment from the URL
        const hash = window.location.hash.substring(1);

        if (!hash) return;

        console.log("Processing OAuth redirect with hash:", hash);

        // Parse the hash parameters
        const params = new URLSearchParams(hash);
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");
        const expires_in = params.get("expires_in");
        const token_type = params.get("token_type");
        const type = params.get("type");
        const error = params.get("error");
        const error_description = params.get("error_description");

        // Handle OAuth errors first
        if (error) {
          console.error("OAuth error:", error, error_description);
          hasProcessed.current = true;

          if (showNotifications) {
            toast.error(error_description || errorMessage);
          }

          // Clean up URL and redirect to login
          window.history.replaceState(null, "", window.location.pathname);
          navigate("/login", { replace: true });
          return;
        }

        // Check if we have the required tokens
        if (!access_token || !refresh_token) {
          return;
        }

        console.log("OAuth tokens found, setting session...");
        hasProcessed.current = true;

        // Set the session with Supabase
        const { data, error: sessionError } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (sessionError) {
          console.error("Error setting OAuth session:", sessionError);

          if (showNotifications) {
            toast.error(errorMessage);
          }

          // Clean up URL and redirect to login
          window.history.replaceState(null, "", window.location.pathname);
          navigate("/login", { replace: true });
          return;
        }

        if (data.session && data.user) {
          console.log("OAuth session set successfully");

          if (showNotifications) {
            toast.success(successMessage);
          }

          // Clean up the hash fragment from the URL
          window.history.replaceState(null, "", window.location.pathname);

          // Redirect to specified path
          navigate(redirectTo, { replace: true });
        }
      } catch (error) {
        console.error("OAuth redirect handling error:", error);
        hasProcessed.current = true;

        if (showNotifications) {
          toast.error(errorMessage);
        }

        // Clean up URL and redirect to login
        window.history.replaceState(null, "", window.location.pathname);
        navigate("/login", { replace: true });
      }
    };

    handleOAuthRedirect();
  }, [navigate, redirectTo, showNotifications, successMessage, errorMessage]);

  return null;
};

export default OAuthRedirectHandler;
