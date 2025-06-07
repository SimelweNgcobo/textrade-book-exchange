import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DebugInfo } from "@/types/address";

/**
 * Debug component to show OAuth and session information
 * Only visible in development mode
 */
export const OAuthDebugInfo = () => {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const gatherDebugInfo = async () => {
      const hash = window.location.hash;
      const search = window.location.search;
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setDebugInfo({
        url: window.location.href,
        hash: hash || "none",
        search: search || "none",
        hasSession: !!session,
        sessionUser: session?.user?.email || "none",
        timestamp: new Date().toISOString(),
      });
    };

    gatherDebugInfo();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔐 Auth State Change:", event, !!session);
      gatherDebugInfo();
    });

    return () => subscription.unsubscribe();
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== "development" || !debugInfo) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        background: "rgba(0,0,0,0.8)",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        fontSize: "12px",
        zIndex: 9999,
        maxWidth: "300px",
        fontFamily: "monospace",
      }}
    >
      <div>
        <strong>OAuth Debug Info</strong>
      </div>
      <div>Hash: {debugInfo.hash}</div>
      <div>Search: {debugInfo.search}</div>
      <div>Session: {debugInfo.hasSession ? "Yes" : "No"}</div>
      <div>User: {debugInfo.sessionUser}</div>
      <div>Time: {debugInfo.timestamp.split("T")[1].split(".")[0]}</div>
    </div>
  );
};

export default OAuthDebugInfo;
