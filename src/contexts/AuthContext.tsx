import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { getUserStats, updateLastActive } from "@/services/userStatsService";
import { isAdminUser } from "@/services/admin/adminAuthService";
import {
  loginUser,
  registerUser,
  logoutUser,
  fetchUserProfile,
  Profile,
} from "@/services/authOperations";
import { EnhancedAuthService } from "@/services/enhancedAuthService";
import { UserStats } from "@/types/address";
import { logError, getErrorMessage } from "@/utils/errorUtils";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userStats: UserStats | null;
  initError: string | null;
  loadUserStats: () => Promise<void>;
  checkAdminStatus: (userId: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Separate the hook export to ensure Fast Refresh compatibility
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.error("useAuth called outside of AuthProvider. Component tree:", {
      AuthContext,
      hasProvider: !!AuthContext,
    });
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  // Use a safer error handler approach
  const { handleError } = useErrorHandler();

  const isAuthenticated = !!user;
  const isAdmin = profile?.isAdmin || false;

  // Handle sign out state
  const handleSignOut = useCallback(() => {
    console.log("Handling sign out");
    setUser(null);
    setProfile(null);
    setSession(null);
    setUserStats(null);
  }, []);

  // Handle auth state changes
  const handleAuthStateChange = useCallback(
    async (session: Session) => {
      try {
        console.log("Processing auth state change");
        setSession(session);
        setUser(session.user);

        if (session.user) {
          const userProfile = await fetchUserProfile(session.user);
          setProfile(userProfile);
          console.log("Auth state updated successfully");
        }
      } catch (error) {
        logError("Error handling auth state change", error);
        handleError(error, "Authentication State Change");
      }
    },
    [handleError],
  );

  // Initialize auth on mount
  const initializeAuth = useCallback(async () => {
    if (authInitialized) {
      console.log("Auth already initialized, skipping");
      return;
    }

    try {
      console.log("Initializing authentication...");
      setIsLoading(true);

      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      console.log(
        "Initial session check:",
        currentSession ? "Found session" : "No session",
      );

      if (currentSession) {
        await handleAuthStateChange(currentSession);
      }

      setAuthInitialized(true);
    } catch (error) {
      logError("Error initializing auth", error);
      handleError(error, "Initialize Authentication");
    } finally {
      setIsLoading(false);
    }
  }, [authInitialized, handleAuthStateChange, handleError]);

  // Set up auth listener
  const setupAuthListener = useCallback(() => {
    console.log("Setting up auth state listener");

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(
        "Auth state changed:",
        event,
        session ? "Session exists" : "No session",
      );

      if (event === "SIGNED_OUT") {
        handleSignOut();
      } else if (session) {
        await handleAuthStateChange(session);
      }

      if (authInitialized) {
        setIsLoading(false);
      }
    });

    return () => {
      console.log("Cleaning up auth listener");
      subscription.unsubscribe();
    };
  }, [authInitialized, handleAuthStateChange, handleSignOut]);

  // Auth operations
  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // Use enhanced authentication service
      const result = await EnhancedAuthService.enhancedLogin(email, password);

      if (result.success) {
        toast.success(result.message);
        return result;
      } else {
        // Enhanced error handling with specific guidance
        logError("Login failed", result.error);

        // Show the enhanced error message
        toast.error(result.message);

        // Add specific guidance based on the error type
        if (result.actionRequired === "verify_email") {
          // Show additional toast with verification guidance
          setTimeout(() => {
            toast.info(
              "💡 Tip: Check your spam/junk folder for the verification email",
              {
                duration: 5000,
              },
            );
          }, 2000);
        } else if (result.actionRequired === "register") {
          setTimeout(() => {
            toast.info(
              "💡 Tip: Make sure you're using the correct email address",
              {
                duration: 5000,
              },
            );
          }, 2000);
        }

        // Throw an enhanced error object that includes the result details
        const enhancedError = new Error(result.message);
        (enhancedError as any).loginResult = result;
        throw enhancedError;
      }
    } catch (error: unknown) {
      // If it's not already an enhanced error, log it
      if (!(error as any).loginResult) {
        logError("Login failed with exception", error);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        setIsLoading(true);
        await registerUser(name, email, password);
        toast.success(
          "Registration successful! Please check your email to confirm your account.",
        );
      } catch (error: unknown) {
        logError("Registration failed", error);

        let errorMessage = "Registration failed. Please try again.";
        const errorMsg = getErrorMessage(error);

        if (errorMsg.includes("already registered")) {
          errorMessage = "An account with this email already exists.";
        }

        toast.error(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await logoutUser();
      toast.success("Logged out successfully");
    } catch (error) {
      logError("Logout failed", error);
      toast.error("Logout failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return;

    try {
      const userProfile = await fetchUserProfile(user);
      setProfile(userProfile);
      console.log("Profile refreshed successfully");
    } catch (error) {
      logError("Error refreshing profile", error);
      handleError(error, "Refresh Profile");
    }
  }, [user, handleError]);

  const loadUserStats = useCallback(async () => {
    if (!user) return;

    try {
      const stats = await getUserStats(user.id);
      setUserStats(stats);
    } catch (error) {
      logError("Error loading user stats", error);
    }
  }, [user]);

  const updateUserActivity = useCallback(async () => {
    if (!user) return;

    try {
      await updateLastActive(user.id);
    } catch (error) {
      logError("Error updating last active", error);
    }
  }, [user]);

  const checkAdminStatus = useCallback(
    async (userId: string): Promise<boolean> => {
      try {
        return await isAdminUser(userId);
      } catch (error) {
        logError("Error checking admin status", error);
        return false;
      }
    },
    [],
  );

  // Initialize auth and set up listener on mount
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const setup = async () => {
      try {
        console.log("🔧 Starting AuthProvider setup");
        await initializeAuth();
        cleanup = setupAuthListener();
        console.log("✅ AuthProvider setup complete");
      } catch (error) {
        console.error("❌ AuthProvider setup failed:", error);
        logError("AuthProvider setup failed", error);
        setInitError(
          `Authentication initialization failed: ${getErrorMessage(error)}`,
        );
        setIsLoading(false);
        setAuthInitialized(true); // Set to true even on error to prevent infinite loading
      }
    };

    setup();

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []); // Empty dependency array - only run once on mount

  // Load user stats and update activity when user/profile changes
  useEffect(() => {
    if (user && profile && authInitialized) {
      loadUserStats();
      updateUserActivity();
    }
  }, [user, profile, authInitialized, loadUserStats, updateUserActivity]);

  const value: AuthContextType = {
    user,
    profile,
    session,
    isLoading,
    isAuthenticated,
    isAdmin,
    userStats,
    initError,
    loadUserStats,
    checkAdminStatus,
    login,
    register,
    logout,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Named exports for Fast Refresh compatibility
export { useAuth, AuthProvider };
