import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Custom hook to handle OAuth redirect with token hash fragment
 * Extracts access_token and refresh_token from URL hash and sets the session
 */
export const useOAuthRedirect = () => {
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

        // Parse the hash parameters
        const params = new URLSearchParams(hash);
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");
        const expires_in = params.get("expires_in");
        const token_type = params.get("token_type");
        const type = params.get("type");

        // Check if we have the required tokens
        if (!access_token || !refresh_token) {
          return;
        }

        console.log("OAuth redirect detected, setting session...");
        hasProcessed.current = true;

        // Create session object
        const session = {
          access_token,
          refresh_token,
          expires_in: expires_in ? parseInt(expires_in) : 3600,
          token_type: token_type || "bearer",
          user: null, // This will be populated by Supabase
        };

        // Set the session with Supabase
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          console.error("Error setting OAuth session:", error);
          toast.error("Authentication failed. Please try again.");

          // Clean up URL and redirect to login
          window.history.replaceState(null, "", window.location.pathname);
          navigate("/login", { replace: true });
          return;
        }

        if (data.session && data.user) {
          console.log("OAuth session set successfully");
          toast.success("Login successful! Welcome to ReBooked Solutions!");

          // Clean up the hash fragment from the URL
          window.history.replaceState(null, "", window.location.pathname);

          // Redirect to home page
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("OAuth redirect handling error:", error);
        toast.error("Authentication failed. Please try again.");

        // Clean up URL and redirect to login
        window.history.replaceState(null, "", window.location.pathname);
        navigate("/login", { replace: true });
      }
    };

    handleOAuthRedirect();
  }, [navigate]);

  return null;
};
