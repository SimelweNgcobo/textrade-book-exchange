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
import { UserStats } from "@/types/address";
import { logError, getErrorMessage } from "@/utils/errorUtils";
import { useLoadingState } from "@/utils/loadingStateManager";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userStats: UserStats | null;
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const { handleError } = useErrorHandler();

  // Use the improved loading state manager
  const { isLoading, startLoading, stopLoading, forceStopLoading } =
    useLoadingState("AuthContext");

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

  // Handle auth state changes with timeout protection
  const handleAuthStateChange = useCallback(
    async (session: Session) => {
      const loadingId = startLoading("auth-state-change");

      try {
        console.log("Processing auth state change");
        setSession(session);
        setUser(session.user);

        if (session.user) {
          // Add timeout protection for profile fetching
          const profilePromise = fetchUserProfile(session.user);
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Profile fetch timeout")), 15000),
          );

          const userProfile = (await Promise.race([
            profilePromise,
            timeoutPromise,
          ])) as Profile;
          setProfile(userProfile);
          console.log("Auth state updated successfully");
        }
      } catch (error) {
        logError("Error handling auth state change", error);
        handleError(error, "Authentication State Change");
      } finally {
        stopLoading();
      }
    },
    [handleError, startLoading, stopLoading],
  );

  // Initialize auth on mount with improved error handling
  const initializeAuth = useCallback(async () => {
    if (authInitialized) {
      console.log("Auth already initialized, skipping");
      return;
    }

    const loadingId = startLoading("auth-init");

    try {
      console.log("Initializing authentication...");

      const sessionPromise = supabase.auth.getSession();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Session fetch timeout")), 10000),
      );

      const {
        data: { session: currentSession },
      } = (await Promise.race([sessionPromise, timeoutPromise])) as any;

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
      // Force stop loading even on error
      forceStopLoading();
      // Still mark as initialized to prevent infinite retries
      setAuthInitialized(true);
    } finally {
      stopLoading();
    }
  }, [
    authInitialized,
    handleAuthStateChange,
    handleError,
    startLoading,
    stopLoading,
    forceStopLoading,
  ]);

  // Set up auth listener with improved state management
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

      try {
        if (event === "SIGNED_OUT") {
          handleSignOut();
        } else if (session) {
          await handleAuthStateChange(session);
        }
      } catch (error) {
        logError("Error in auth state listener", error);
      } finally {
        // Always ensure loading is stopped
        if (authInitialized && isLoading) {
          stopLoading();
        }
      }
    });

    return () => {
      console.log("Cleaning up auth listener");
      subscription.unsubscribe();
    };
  }, [
    authInitialized,
    handleAuthStateChange,
    handleSignOut,
    isLoading,
    stopLoading,
  ]);

  // Auth operations with improved loading management
  const login = useCallback(
    async (email: string, password: string) => {
      const loadingId = startLoading("login");

      try {
        await loginUser(email, password);
        toast.success("Login successful!");
      } catch (error: unknown) {
        logError("Login failed", error);

        let errorMessage = "Login failed. Please try again.";
        const errorMsg = getErrorMessage(error);

        if (errorMsg.includes("Invalid login credentials")) {
          errorMessage =
            "Invalid email or password. Please check your credentials.";
        } else if (errorMsg.includes("Email not confirmed")) {
          errorMessage =
            "Please check your email and click the confirmation link.";
        }

        toast.error(errorMessage);
        throw error;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading],
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const loadingId = startLoading("register");

      try {
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
        stopLoading();
      }
    },
    [startLoading, stopLoading],
  );

  const logout = useCallback(async () => {
    const loadingId = startLoading("logout");

    try {
      await logoutUser();
      toast.success("Logged out successfully");
    } catch (error) {
      logError("Logout failed", error);
      toast.error("Logout failed. Please try again.");
      throw error;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  const refreshProfile = useCallback(async () => {
    if (!user) return;

    const loadingId = startLoading("refresh-profile");

    try {
      const userProfile = await fetchUserProfile(user);
      setProfile(userProfile);
      console.log("Profile refreshed successfully");
    } catch (error) {
      logError("Error refreshing profile", error);
      handleError(error, "Refresh Profile");
    } finally {
      stopLoading();
    }
  }, [user, handleError, startLoading, stopLoading]);

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
      await initializeAuth();
      cleanup = setupAuthListener();
    };

    setup();

    return () => {
      if (cleanup) {
        cleanup();
      }
      // Force stop any remaining loading states
      forceStopLoading();
    };
  }, []); // Empty dependency array - only run once on mount

  // Load user stats and update activity when user/profile changes
  useEffect(() => {
    if (user && profile && authInitialized) {
      loadUserStats();
      updateUserActivity();
    }
  }, [user, profile, authInitialized, loadUserStats, updateUserActivity]);

  // Emergency timeout to prevent infinite loading
  useEffect(() => {
    if (isLoading) {
      const emergencyTimeout = setTimeout(() => {
        console.error(
          "🚨 AuthContext emergency timeout triggered - force stopping loading",
        );
        forceStopLoading();
        setAuthInitialized(true);
      }, 45000); // 45 seconds emergency timeout

      return () => clearTimeout(emergencyTimeout);
    }
  }, [isLoading, forceStopLoading]);

  const value: AuthContextType = {
    user,
    profile,
    session,
    isLoading,
    isAuthenticated,
    isAdmin,
    userStats,
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
